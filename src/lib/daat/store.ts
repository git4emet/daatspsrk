import { useEffect, useState } from "react";
import { SAMPLE_VECTORS, type Aspect, type IntentVector } from "./lattice";
import {
  aspectsFromPhrase,
  refreshEdge,
  sieveShiftSort,
  sparkPath,
  type ScoredIntent,
  type SieveResult,
} from "./sieve";

const KEY = "daat-spark-v1";

export type Receipt = {
  id: string;
  at: number;
  phrase: string;
  whole: number;
  coherence: number;
  bandwidth: number;
  phaseLock: boolean;
  bridge: string;
  juliaEdge: number;
  topSite: string;
  gate: string;
};

export type SparkState = {
  phrase: string;
  live: boolean;
  teachMode: boolean;
  alphaLock: boolean;
  vectors: IntentVector[];
  selectedId: string;
  history: number[][];
  receipts: Receipt[];
  edgeNote: string;
  whisper: {
    listening: boolean;
    confidence: number;
    tokens: { text: string; confidence: number }[];
    meaning: string;
  };
};

type Persist = Pick<SparkState, "phrase" | "teachMode" | "vectors" | "receipts" | "selectedId">;

function load(): Partial<Persist> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return {};
    return JSON.parse(raw) as Partial<Persist>;
  } catch {
    return {};
  }
}

function tokenize(phrase: string, confidence: number) {
  const parts = phrase.split(/\s+/).filter(Boolean);
  return parts.map((text, i) => {
    const wobble = ((i * 17) % 11) / 40;
    return { text, confidence: Math.min(0.99, Math.max(0.42, confidence - wobble)) };
  });
}

export function useSpark() {
  const [phrase, setPhrase] = useState(SAMPLE_VECTORS[0].phrase);
  const [teachMode, setTeachMode] = useState(true);
  const [alphaLock, setAlphaLock] = useState(true);
  const [live, setLive] = useState(false);
  const [vectors, setVectors] = useState<IntentVector[]>(SAMPLE_VECTORS);
  const [selectedId, setSelectedId] = useState(SAMPLE_VECTORS[0].id);
  const [history, setHistory] = useState<number[][]>([]);
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [edgeNote, setEdgeNote] = useState("Edges hold their measured uncertainty.");
  const [hydrated, setHydrated] = useState(false);
  const [listening, setListening] = useState(false);
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    const saved = load();
    if (saved.phrase) setPhrase(saved.phrase);
    if (typeof saved.teachMode === "boolean") setTeachMode(saved.teachMode);
    if (saved.vectors?.length) setVectors(saved.vectors);
    if (saved.receipts?.length) setReceipts(saved.receipts);
    if (saved.selectedId) setSelectedId(saved.selectedId);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const payload: Persist = { phrase, teachMode, vectors, receipts: receipts.slice(0, 24), selectedId };
    localStorage.setItem(KEY, JSON.stringify(payload));
  }, [phrase, teachMode, vectors, receipts, selectedId, hydrated]);

  const selected = vectors.find((v) => v.id === selectedId) ?? vectors[0];
  const aspects: Record<Aspect, number> = selected?.aspects ?? aspectsFromPhrase(phrase);
  const spark: SieveResult = sparkPath(phrase, aspects, history);
  const scored: ScoredIntent[] = sieveShiftSort(vectors, teachMode);
  const confidence = Math.min(
    0.98,
    Math.max(0.4, 0.55 + spark.coherence * 0.3 - (selected?.uncertainty ?? 0.2) * 0.25),
  );

  useEffect(() => {
    if (!live) return;
    const id = window.setInterval(() => setPulse((n) => n + 1), 770);
    return () => window.clearInterval(id);
  }, [live]);

  useEffect(() => {
    if (!live) return;
    setHistory((h) => {
      const row = spark.streams.map((s) => Number(s.memory.toFixed(4)));
      const next = [...h, row];
      return next.slice(-12);
    });
    // pulse is the clock; spark is derived
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pulse, live]);

  function select(id: string) {
    const v = vectors.find((x) => x.id === id);
    if (!v) return;
    setSelectedId(id);
    setPhrase(v.phrase);
  }

  function speak(nextPhrase?: string) {
    const text = (nextPhrase ?? phrase).trim();
    if (!text) return;
    const drafted = aspectsFromPhrase(text);
    const id = `v-${Date.now().toString(36)}`;
    const vector: IntentVector = {
      id,
      phrase: text,
      source: "Whisper++ · operator",
      aspects: drafted,
      uncertainty: 0.28,
      teach: teachMode,
    };
    setVectors((vs) => [vector, ...vs].slice(0, 16));
    setSelectedId(id);
    setPhrase(text);
    setListening(true);
    window.setTimeout(() => setListening(false), 900);
  }

  function seal() {
    const top = [...spark.streams].sort((a, b) => b.forward - a.forward)[0];
    const topScore = scored.find((s) => s.vector.id === selectedId);
    const receipt: Receipt = {
      id: spark.receiptId,
      at: Date.now(),
      phrase,
      whole: spark.whole,
      coherence: spark.coherence,
      bandwidth: spark.bandwidth,
      phaseLock: alphaLock ? spark.phaseLock : false,
      bridge: spark.bridge ? `${spark.bridge.from} → ${spark.bridge.to}` : "—",
      juliaEdge: spark.juliaEdge,
      topSite: top?.site.id ?? "—",
      gate: topScore?.gate ?? "FOUND",
    };
    setReceipts((rs) => [receipt, ...rs.filter((r) => r.id !== receipt.id)].slice(0, 24));
    setEdgeNote(`Sealed ${receipt.id.slice(0, 8)} · gate ${receipt.gate}.`);
  }

  function refreshSelectedEdge() {
    setVectors((vs) =>
      vs.map((v) => (v.id === selectedId ? { ...v, uncertainty: refreshEdge(v.uncertainty) } : v)),
    );
    const before = selected?.uncertainty ?? 0;
    setEdgeNote(`Edge ${selectedId} pulled from ${before.toFixed(2)} toward the floor.`);
  }

  function resetDeck() {
    setVectors(SAMPLE_VECTORS);
    setSelectedId(SAMPLE_VECTORS[0].id);
    setPhrase(SAMPLE_VECTORS[0].phrase);
    setHistory([]);
    setEdgeNote("Deck restored to the mounted sample vectors.");
  }

  const tokens = tokenize(phrase, confidence);
  const meaning = tokens
    .filter((t) => t.confidence > 0.62)
    .map((t) => t.text)
    .join(" ");

  return {
    phrase,
    setPhrase,
    teachMode,
    setTeachMode,
    alphaLock,
    setAlphaLock,
    live,
    setLive,
    vectors,
    selected,
    selectedId,
    select,
    spark,
    scored,
    receipts,
    edgeNote,
    speak,
    seal,
    refreshSelectedEdge,
    resetDeck,
    whisper: {
      listening,
      confidence,
      tokens,
      meaning: meaning || phrase,
    },
  };
}
