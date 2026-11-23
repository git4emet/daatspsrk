/**
 * Sieve-shift-sort and Caputo fractionation.
 * Memory kernel is a discrete power-law — history is not thrown away.
 * Dual encoding: forward value and backward provenance travel together.
 */
import {
  ALPHA,
  ASPECTS,
  COHERENCE_FLOOR,
  GATES,
  PHI,
  SITES,
  type Aspect,
  type Gate,
  type IntentVector,
  type Site,
} from "./lattice";

export type Stream = {
  site: Site;
  /** Forward encoding — the recombined contribution. */
  forward: number;
  /** Backward encoding — provenance mass of this site. */
  provenance: number;
  memory: number;
  weight: number;
  phaseLocked: boolean;
};

export type ScoredIntent = {
  vector: IntentVector;
  resonance: number;
  priority: number;
  dominant: Aspect;
  gate: Gate;
  teachRank: number;
};

export type SieveResult = {
  streams: Stream[];
  whole: number;
  coherence: number;
  bandwidth: number;
  phaseLock: boolean;
  scored: ScoredIntent[];
  bridge: { from: string; to: string; tunnel: number } | null;
  juliaEdge: number;
  receiptId: string;
};

function clamp(n: number, lo = 0, hi = 1) {
  return Math.min(hi, Math.max(lo, n));
}

/** Discrete Caputo-like memory: recent samples weigh more, history never zeros. */
export function caputoMemory(signal: number[], alpha: number): number {
  const n = signal.length;
  if (n === 0) return 0;
  let acc = 0;
  let norm = 0;
  for (let k = 0; k < n; k++) {
    const lag = n - k;
    const kernel = Math.pow(lag, -alpha);
    acc += signal[k] * kernel;
    norm += kernel;
  }
  return norm === 0 ? 0 : acc / norm;
}

function siteAffinity(site: Site, aspects: Record<Aspect, number>): number {
  const map: Record<string, Aspect[]> = {
    "doinbetter.com": ["structural", "intent"],
    "doinbetter.org": ["ethics", "relational"],
    "heymico.com": ["voice", "intent"],
    "timmyu.in": ["structural", "fractal"],
    "tailly.cc": ["relational", "ethics"],
    "winxm.art": ["styling", "fractal"],
    "catlabs.studio": ["styling", "intent"],
    "mobiius.net": ["relational", "fractal"],
  };
  const keys = map[site.id] ?? ["intent"];
  const mean = keys.reduce((s, k) => s + aspects[k], 0) / keys.length;
  return clamp(mean);
}

export function fractionate(
  aspects: Record<Aspect, number>,
  history: number[][],
): { streams: Stream[]; whole: number } {
  const signal = ASPECTS.map((a) => aspects[a]);
  const signalMean = signal.reduce((s, n) => s + n, 0) / signal.length;
  const streams: Stream[] = SITES.map((site, i) => {
    const weight = siteAffinity(site, aspects);
    const prior = history.map((h) => h[i] ?? 0);
    const series = [...prior, signalMean * 0.35 + weight * 0.65];
    const memory = caputoMemory(series, site.alpha);
    const forward = memory * weight;
    const provenance = memory * (1 - aspects.intent * 0.15);
    return {
      site,
      forward,
      provenance: clamp(provenance),
      memory,
      weight,
      phaseLocked: Math.abs(site.alpha - ALPHA) < 0.02 && memory >= ALPHA * 0.85,
    };
  });
  const mass = streams.reduce((s, st) => s + st.weight, 0) || 1;
  const whole = streams.reduce((s, st) => s + st.forward, 0) / mass;
  return { streams, whole };
}

function dominantAspect(aspects: Record<Aspect, number>): Aspect {
  return ASPECTS.reduce((best, a) => (aspects[a] > aspects[best] ? a : best), ASPECTS[0]);
}

/** Fibonacci-weighted priority. Teach-mode floats reflective items without burying urgency. */
export function sieveShiftSort(vectors: IntentVector[], teachMode: boolean): ScoredIntent[] {
  const scored = vectors.map((vector, index) => {
    const fib = PHI ** ((index % 8) / 3);
    const aspectMean =
      ASPECTS.reduce((s, a) => s + vector.aspects[a], 0) / ASPECTS.length;
    const resonance = clamp(aspectMean * (1 - vector.uncertainty * 0.45) * (fib / PHI));
    const intentBoost = vector.aspects.intent * 0.35;
    const teachRank = vector.teach ? 1 : 0;
    const priority =
      resonance * 0.62 +
      intentBoost +
      (teachMode ? teachRank * 0.18 : 0) -
      vector.uncertainty * 0.22;
    const gateIndex = Math.min(
      GATES.length - 1,
      Math.floor(clamp(resonance) * (GATES.length - 1) + (vector.uncertainty < 0.2 ? 1 : 0)),
    );
    return {
      vector,
      resonance,
      priority,
      dominant: dominantAspect(vector.aspects),
      gate: GATES[gateIndex],
      teachRank,
    };
  });
  scored.sort((a, b) => b.priority - a.priority || a.vector.uncertainty - b.vector.uncertainty);
  return scored;
}

/** Percolation refresh: pull one uncertain edge toward the floor without erasing it. */
export function refreshEdge(uncertainty: number, pull = 0.37): number {
  const next = uncertainty * (1 - pull) + (1 - COHERENCE_FLOOR) * pull;
  return clamp(Number(next.toFixed(3)), 0.02, 0.95);
}

function hash32(input: string): string {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0).toString(16).padStart(8, "0");
}

export function sparkPath(phrase: string, aspects: Record<Aspect, number>, history: number[][]): SieveResult {
  const { streams, whole } = fractionate(aspects, history);
  const provenanceMean = streams.reduce((s, st) => s + st.provenance, 0) / streams.length;
  const lockCount = streams.filter((s) => s.phaseLocked).length;
  const coherence = clamp(0.72 + whole * 0.2 + provenanceMean * 0.08 + lockCount * 0.012);
  const bandwidth = streams.filter((s) => s.weight > 0.05).length * (1 + provenanceMean);
  const ranked = [...streams].sort((a, b) => b.forward - a.forward);
  const bridge =
    ranked.length >= 2
      ? {
          from: ranked[0].site.id,
          to: ranked[1].site.id,
          tunnel: clamp((ranked[0].forward + ranked[1].provenance) / 2),
        }
      : null;
  const juliaEdge = clamp(
    streams.reduce((s, st) => s + Math.abs(st.memory - st.weight), 0) / streams.length,
  );
  const receiptId = hash32(
    `${phrase}|${whole.toFixed(4)}|${streams.map((s) => s.forward.toFixed(3)).join(",")}`,
  );
  return {
    streams,
    whole,
    coherence,
    bandwidth,
    phaseLock: coherence >= ALPHA && lockCount > 0,
    scored: [],
    bridge,
    juliaEdge,
    receiptId,
  };
}

export function aspectsFromPhrase(phrase: string): Record<Aspect, number> {
  const p = phrase.toLowerCase();
  const hit = (words: string[]) => {
    const n = words.reduce((s, w) => s + (p.includes(w) ? 1 : 0), 0);
    return clamp(0.18 + n * 0.22);
  };
  return {
    structural: hit(["system", "lattice", "route", "kernel", "stack", "parse", "structure", "build"]),
    styling: hit(["glyph", "color", "visual", "form", "style", "spiral", "julia", "draw"]),
    intent: hit(["want", "please", "fuse", "inject", "run", "make", "hold", "record", "whisper"]),
    relational: hit(["between", "bridge", "site", "together", "relation", "tunnel", "fuse", "with"]),
    fractal: hit(["fractal", "julia", "fibonacci", "spiral", "sierpinski", "edge", "0.743", "golden"]),
    ethics: hit(["consent", "permission", "ethics", "guardian", "boundary", "repair", "truth"]),
    voice: hit(["whisper", "voice", "speak", "say", "hear", "speech", "sound", "mirror"]),
  };
}
