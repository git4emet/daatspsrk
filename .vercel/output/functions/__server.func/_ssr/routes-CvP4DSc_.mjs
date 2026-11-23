import { i as __toESM } from "../_runtime.mjs";
import { K as require_react, b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CvP4DSc_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/** Da'at Spark — constants, sites, gates, and sample intent vectors. */
var ALPHA = .743;
var PHI = 1.6180339887;
var COHERENCE_FLOOR = .987;
var ASPECTS = [
	"structural",
	"styling",
	"intent",
	"relational",
	"fractal",
	"ethics",
	"voice"
];
var SITES = [
	{
		id: "doinbetter.com",
		name: "Collective Core",
		vertex: 1,
		forward: "Commerce",
		backward: "Provenance",
		alpha: .743,
		hue: "#d6b26a"
	},
	{
		id: "doinbetter.org",
		name: "Boundary",
		vertex: 2,
		forward: "Ethics",
		backward: "Audit",
		alpha: .618,
		hue: "#c96b4a"
	},
	{
		id: "heymico.com",
		name: "Voice & Face",
		vertex: 3,
		forward: "Interface",
		backward: "Intent",
		alpha: .81,
		hue: "#8ec8c4"
	},
	{
		id: "timmyu.in",
		name: "Scholar & Vault",
		vertex: 4,
		forward: "Archive",
		backward: "Recall",
		alpha: .5,
		hue: "#b7a48a"
	},
	{
		id: "tailly.cc",
		name: "Identity Torus",
		vertex: 5,
		forward: "Identity",
		backward: "Alias",
		alpha: .9,
		hue: "#e8e2d4"
	},
	{
		id: "winxm.art",
		name: "Vibe Reader",
		vertex: 6,
		forward: "Projection",
		backward: "Source",
		alpha: .382,
		hue: "#7aa2c4"
	},
	{
		id: "catlabs.studio",
		name: "Studio Hub",
		vertex: 7,
		forward: "Creation",
		backward: "Receipt",
		alpha: 1,
		hue: "#d08a6a"
	},
	{
		id: "mobiius.net",
		name: "Stargate Port",
		vertex: 8,
		forward: "Entry",
		backward: "Return",
		alpha: .743,
		hue: "#9ad0a8"
	}
];
var GATES = [
	"FOUND",
	"HASHED",
	"ATTRIBUTED",
	"CONTAMINATION-CHECKED",
	"INSPECTED",
	"TESTED",
	"PROMOTED"
];
/** Sample intent vectors drawn from mounted source, not invented users. */
var SAMPLE_VECTORS = [
	{
		id: "v-daat",
		phrase: "Inject the Da'at spark path and phase-lock the hidden node",
		source: "AGENTS.project · next cycle",
		aspects: {
			structural: .82,
			styling: .2,
			intent: .96,
			relational: .74,
			fractal: .88,
			ethics: .55,
			voice: .3
		},
		uncertainty: .18,
		teach: true
	},
	{
		id: "v-whisper",
		phrase: "Whisper a line and mirror confidence before it becomes meaning",
		source: "Whisper++ STmmT",
		aspects: {
			structural: .4,
			styling: .35,
			intent: .9,
			relational: .5,
			fractal: .42,
			ethics: .7,
			voice: .98
		},
		uncertainty: .31,
		teach: false
	},
	{
		id: "v-symph",
		phrase: "Fuse the sieve into the Symphonizer and keep the receipt",
		source: "Symphonizer spec · fuse",
		aspects: {
			structural: .78,
			styling: .55,
			intent: .92,
			relational: .84,
			fractal: .6,
			ethics: .48,
			voice: .72
		},
		uncertainty: .22,
		teach: true
	},
	{
		id: "v-er",
		phrase: "Tunnel uncertainty across an Einstein-Rosen bridge between sites",
		source: "ER=EPR overlay",
		aspects: {
			structural: .7,
			styling: .15,
			intent: .66,
			relational: .95,
			fractal: .8,
			ethics: .4,
			voice: .2
		},
		uncertainty: .44,
		teach: false
	},
	{
		id: "v-julia",
		phrase: "Refresh the Julia boundary where the edge is still percolating",
		source: "Julia overlay",
		aspects: {
			structural: .5,
			styling: .72,
			intent: .58,
			relational: .4,
			fractal: .97,
			ethics: .22,
			voice: .18
		},
		uncertainty: .57,
		teach: true
	},
	{
		id: "v-fibo",
		phrase: "Weight the queue by golden-ratio resonance and shift the priority",
		source: "Fibonacci sieve",
		aspects: {
			structural: .88,
			styling: .3,
			intent: .74,
			relational: .45,
			fractal: .9,
			ethics: .28,
			voice: .15
		},
		uncertainty: .12,
		teach: false
	},
	{
		id: "v-consent",
		phrase: "Nothing public without permission — hold the boundary gate",
		source: "Foxy desk · guardian",
		aspects: {
			structural: .35,
			styling: .1,
			intent: .8,
			relational: .62,
			fractal: .2,
			ethics: .99,
			voice: .4
		},
		uncertainty: .08,
		teach: true
	},
	{
		id: "v-ledger",
		phrase: "Record the transition and make the repair traceable",
		source: "TOFAR ledger",
		aspects: {
			structural: .9,
			styling: .12,
			intent: .7,
			relational: .77,
			fractal: .33,
			ethics: .86,
			voice: .25
		},
		uncertainty: .15,
		teach: false
	}
];
/**
* Sieve-shift-sort and Caputo fractionation.
* Memory kernel is a discrete power-law — history is not thrown away.
* Dual encoding: forward value and backward provenance travel together.
*/
function clamp(n, lo = 0, hi = 1) {
	return Math.min(hi, Math.max(lo, n));
}
/** Discrete Caputo-like memory: recent samples weigh more, history never zeros. */
function caputoMemory(signal, alpha) {
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
function siteAffinity(site, aspects) {
	const keys = {
		"doinbetter.com": ["structural", "intent"],
		"doinbetter.org": ["ethics", "relational"],
		"heymico.com": ["voice", "intent"],
		"timmyu.in": ["structural", "fractal"],
		"tailly.cc": ["relational", "ethics"],
		"winxm.art": ["styling", "fractal"],
		"catlabs.studio": ["styling", "intent"],
		"mobiius.net": ["relational", "fractal"]
	}[site.id] ?? ["intent"];
	return clamp(keys.reduce((s, k) => s + aspects[k], 0) / keys.length);
}
function fractionate(aspects, history) {
	const signal = ASPECTS.map((a) => aspects[a]);
	const signalMean = signal.reduce((s, n) => s + n, 0) / signal.length;
	const streams = SITES.map((site, i) => {
		const weight = siteAffinity(site, aspects);
		const memory = caputoMemory([...history.map((h) => h[i] ?? 0), signalMean * .35 + weight * .65], site.alpha);
		return {
			site,
			forward: memory * weight,
			provenance: clamp(memory * (1 - aspects.intent * .15)),
			memory,
			weight,
			phaseLocked: Math.abs(site.alpha - .743) < .02 && memory >= .63155
		};
	});
	const mass = streams.reduce((s, st) => s + st.weight, 0) || 1;
	return {
		streams,
		whole: streams.reduce((s, st) => s + st.forward, 0) / mass
	};
}
function dominantAspect(aspects) {
	return ASPECTS.reduce((best, a) => aspects[a] > aspects[best] ? a : best, ASPECTS[0]);
}
/** Fibonacci-weighted priority. Teach-mode floats reflective items without burying urgency. */
function sieveShiftSort(vectors, teachMode) {
	const scored = vectors.map((vector, index) => {
		const fib = PHI ** (index % 8 / 3);
		const resonance = clamp(ASPECTS.reduce((s, a) => s + vector.aspects[a], 0) / ASPECTS.length * (1 - vector.uncertainty * .45) * (fib / PHI));
		const intentBoost = vector.aspects.intent * .35;
		const teachRank = vector.teach ? 1 : 0;
		const priority = resonance * .62 + intentBoost + (teachMode ? teachRank * .18 : 0) - vector.uncertainty * .22;
		const gateIndex = Math.min(GATES.length - 1, Math.floor(clamp(resonance) * (GATES.length - 1) + (vector.uncertainty < .2 ? 1 : 0)));
		return {
			vector,
			resonance,
			priority,
			dominant: dominantAspect(vector.aspects),
			gate: GATES[gateIndex],
			teachRank
		};
	});
	scored.sort((a, b) => b.priority - a.priority || a.vector.uncertainty - b.vector.uncertainty);
	return scored;
}
/** Percolation refresh: pull one uncertain edge toward the floor without erasing it. */
function refreshEdge(uncertainty, pull = .37) {
	const next = uncertainty * (1 - pull) + (1 - COHERENCE_FLOOR) * pull;
	return clamp(Number(next.toFixed(3)), .02, .95);
}
function hash32(input) {
	let h = 2166136261;
	for (let i = 0; i < input.length; i++) {
		h ^= input.charCodeAt(i);
		h = Math.imul(h, 16777619);
	}
	return (h >>> 0).toString(16).padStart(8, "0");
}
function sparkPath(phrase, aspects, history) {
	const { streams, whole } = fractionate(aspects, history);
	const provenanceMean = streams.reduce((s, st) => s + st.provenance, 0) / streams.length;
	const lockCount = streams.filter((s) => s.phaseLocked).length;
	const coherence = clamp(.72 + whole * .2 + provenanceMean * .08 + lockCount * .012);
	const bandwidth = streams.filter((s) => s.weight > .05).length * (1 + provenanceMean);
	const ranked = [...streams].sort((a, b) => b.forward - a.forward);
	const bridge = ranked.length >= 2 ? {
		from: ranked[0].site.id,
		to: ranked[1].site.id,
		tunnel: clamp((ranked[0].forward + ranked[1].provenance) / 2)
	} : null;
	const juliaEdge = clamp(streams.reduce((s, st) => s + Math.abs(st.memory - st.weight), 0) / streams.length);
	const receiptId = hash32(`${phrase}|${whole.toFixed(4)}|${streams.map((s) => s.forward.toFixed(3)).join(",")}`);
	return {
		streams,
		whole,
		coherence,
		bandwidth,
		phaseLock: coherence >= .743 && lockCount > 0,
		scored: [],
		bridge,
		juliaEdge,
		receiptId
	};
}
function aspectsFromPhrase(phrase) {
	const p = phrase.toLowerCase();
	const hit = (words) => {
		return clamp(.18 + words.reduce((s, w) => s + (p.includes(w) ? 1 : 0), 0) * .22);
	};
	return {
		structural: hit([
			"system",
			"lattice",
			"route",
			"kernel",
			"stack",
			"parse",
			"structure",
			"build"
		]),
		styling: hit([
			"glyph",
			"color",
			"visual",
			"form",
			"style",
			"spiral",
			"julia",
			"draw"
		]),
		intent: hit([
			"want",
			"please",
			"fuse",
			"inject",
			"run",
			"make",
			"hold",
			"record",
			"whisper"
		]),
		relational: hit([
			"between",
			"bridge",
			"site",
			"together",
			"relation",
			"tunnel",
			"fuse",
			"with"
		]),
		fractal: hit([
			"fractal",
			"julia",
			"fibonacci",
			"spiral",
			"sierpinski",
			"edge",
			"0.743",
			"golden"
		]),
		ethics: hit([
			"consent",
			"permission",
			"ethics",
			"guardian",
			"boundary",
			"repair",
			"truth"
		]),
		voice: hit([
			"whisper",
			"voice",
			"speak",
			"say",
			"hear",
			"speech",
			"sound",
			"mirror"
		])
	};
}
var KEY = "daat-spark-v1";
function load() {
	if (typeof window === "undefined") return {};
	try {
		const raw = localStorage.getItem(KEY);
		if (!raw) return {};
		return JSON.parse(raw);
	} catch {
		return {};
	}
}
function tokenize(phrase, confidence) {
	return phrase.split(/\s+/).filter(Boolean).map((text, i) => {
		const wobble = i * 17 % 11 / 40;
		return {
			text,
			confidence: Math.min(.99, Math.max(.42, confidence - wobble))
		};
	});
}
function useSpark() {
	const [phrase, setPhrase] = (0, import_react.useState)(SAMPLE_VECTORS[0].phrase);
	const [teachMode, setTeachMode] = (0, import_react.useState)(true);
	const [alphaLock, setAlphaLock] = (0, import_react.useState)(true);
	const [live, setLive] = (0, import_react.useState)(false);
	const [vectors, setVectors] = (0, import_react.useState)(SAMPLE_VECTORS);
	const [selectedId, setSelectedId] = (0, import_react.useState)(SAMPLE_VECTORS[0].id);
	const [history, setHistory] = (0, import_react.useState)([]);
	const [receipts, setReceipts] = (0, import_react.useState)([]);
	const [edgeNote, setEdgeNote] = (0, import_react.useState)("Edges hold their measured uncertainty.");
	const [hydrated, setHydrated] = (0, import_react.useState)(false);
	const [listening, setListening] = (0, import_react.useState)(false);
	const [pulse, setPulse] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		const saved = load();
		if (saved.phrase) setPhrase(saved.phrase);
		if (typeof saved.teachMode === "boolean") setTeachMode(saved.teachMode);
		if (saved.vectors?.length) setVectors(saved.vectors);
		if (saved.receipts?.length) setReceipts(saved.receipts);
		if (saved.selectedId) setSelectedId(saved.selectedId);
		setHydrated(true);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!hydrated) return;
		const payload = {
			phrase,
			teachMode,
			vectors,
			receipts: receipts.slice(0, 24),
			selectedId
		};
		localStorage.setItem(KEY, JSON.stringify(payload));
	}, [
		phrase,
		teachMode,
		vectors,
		receipts,
		selectedId,
		hydrated
	]);
	const selected = vectors.find((v) => v.id === selectedId) ?? vectors[0];
	const spark = sparkPath(phrase, selected?.aspects ?? aspectsFromPhrase(phrase), history);
	const scored = sieveShiftSort(vectors, teachMode);
	const confidence = Math.min(.98, Math.max(.4, .55 + spark.coherence * .3 - (selected?.uncertainty ?? .2) * .25));
	(0, import_react.useEffect)(() => {
		if (!live) return;
		const id = window.setInterval(() => setPulse((n) => n + 1), 770);
		return () => window.clearInterval(id);
	}, [live]);
	(0, import_react.useEffect)(() => {
		if (!live) return;
		setHistory((h) => {
			const row = spark.streams.map((s) => Number(s.memory.toFixed(4)));
			return [...h, row].slice(-12);
		});
	}, [pulse, live]);
	function select(id) {
		const v = vectors.find((x) => x.id === id);
		if (!v) return;
		setSelectedId(id);
		setPhrase(v.phrase);
	}
	function speak(nextPhrase) {
		const text = (nextPhrase ?? phrase).trim();
		if (!text) return;
		const drafted = aspectsFromPhrase(text);
		const id = `v-${Date.now().toString(36)}`;
		const vector = {
			id,
			phrase: text,
			source: "Whisper++ · operator",
			aspects: drafted,
			uncertainty: .28,
			teach: teachMode
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
		const receipt = {
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
			gate: topScore?.gate ?? "FOUND"
		};
		setReceipts((rs) => [receipt, ...rs.filter((r) => r.id !== receipt.id)].slice(0, 24));
		setEdgeNote(`Sealed ${receipt.id.slice(0, 8)} · gate ${receipt.gate}.`);
	}
	function refreshSelectedEdge() {
		setVectors((vs) => vs.map((v) => v.id === selectedId ? {
			...v,
			uncertainty: refreshEdge(v.uncertainty)
		} : v));
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
			meaning: tokens.filter((t) => t.confidence > .62).map((t) => t.text).join(" ") || phrase
		}
	};
}
var CX = 210;
var CY = 210;
function vertex(i, r) {
	const a = -Math.PI / 2 + i * Math.PI / 4;
	return {
		x: CX + Math.cos(a) * r,
		y: CY + Math.sin(a) * r
	};
}
/** A quiet Julia-like boundary: c sits near the lock, not a textbook postcard. */
function juliaPath() {
	const cRe = -.12;
	const cIm = .74;
	const pts = [];
	const steps = 96;
	for (let i = 0; i <= steps; i++) {
		const t = i / steps * Math.PI * 2;
		let re = .62 * Math.cos(t);
		let im = .62 * Math.sin(t);
		let escaped = false;
		for (let n = 0; n < 18; n++) {
			const nr = re * re - im * im + cRe;
			const ni = 2 * re * im + cIm * .35;
			re = nr;
			im = ni;
			if (re * re + im * im > 4) {
				escaped = true;
				break;
			}
		}
		const mag = Math.min(1.4, Math.sqrt(re * re + im * im));
		const rad = 78 + (escaped ? 18 : 6) + mag * 10 + Math.sin(t * PHI) * 4;
		const x = CX + Math.cos(t) * rad;
		const y = CY + Math.sin(t) * rad * .92;
		pts.push(`${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`);
	}
	return `${pts.join(" ")} Z`;
}
var BOUNDARY = juliaPath();
function LatticeView({ streams, coherence, phaseLock, tunnel, live }) {
	const ring = 168;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 420 420",
		className: "h-full w-full",
		role: "img",
		"aria-label": "Eight-site star lattice",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("radialGradient", {
				id: "coreglow",
				cx: "50%",
				cy: "50%",
				r: "50%",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "0%",
						stopColor: "#d6b26a",
						stopOpacity: "0.55"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "55%",
						stopColor: "#d6b26a",
						stopOpacity: "0.05"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "100%",
						stopColor: "#d6b26a",
						stopOpacity: "0"
					})
				]
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: CX,
				cy: CY,
				r: "150",
				fill: "url(#coreglow)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: BOUNDARY,
				fill: "none",
				stroke: "#8ec8c4",
				strokeOpacity: "0.45",
				strokeWidth: "1.25"
			}),
			[
				1,
				1,
				2,
				3,
				5,
				8
			].map((f, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: CX,
				cy: CY,
				r: 18 + f * 11,
				fill: "none",
				stroke: "#d6b26a",
				strokeOpacity: .08 + i * .03
			}, f + "-" + i)),
			streams.length >= 2 && (() => {
				const ranked = [...streams].sort((a, b) => b.forward - a.forward);
				const a = vertex(ranked[0].site.vertex - 1, ring);
				const b = vertex(ranked[1].site.vertex - 1, ring);
				const mx = (a.x + b.x) / 2 + (CY - (a.y + b.y) / 2) * .18;
				const my = (a.y + b.y) / 2 + (CX - (a.x + b.x) / 2) * .08;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: `M${a.x} ${a.y} Q${mx} ${my} ${b.x} ${b.y}`,
					fill: "none",
					stroke: "#c96b4a",
					strokeWidth: 1 + tunnel * 2.2,
					strokeOpacity: .35 + tunnel * .5,
					strokeDasharray: "4 3"
				});
			})(),
			streams.map((st) => {
				const p = vertex(st.site.vertex - 1, ring);
				const inner = vertex(st.site.vertex - 1, 46);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
						x1: inner.x,
						y1: inner.y,
						x2: p.x,
						y2: p.y,
						stroke: st.site.hue,
						strokeOpacity: .25 + st.weight * .6,
						strokeWidth: 1 + st.forward * 3
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						cx: p.x,
						cy: p.y,
						r: 7 + st.weight * 9,
						fill: "#12141a",
						stroke: st.site.hue,
						strokeWidth: st.phaseLocked ? 2.4 : 1.2
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("text", {
						x: p.x,
						y: p.y + 28,
						textAnchor: "middle",
						fill: "#a39a8c",
						fontSize: "9",
						fontFamily: "IBM Plex Mono, ui-monospace, monospace",
						children: [
							st.site.vertex,
							" · ",
							st.site.id.split(".")[0]
						]
					})
				] }, st.site.id);
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: CX,
				cy: CY,
				r: phaseLock ? 16 : 11,
				fill: "#d6b26a",
				fillOpacity: phaseLock ? .9 : .45,
				className: live && phaseLock ? "daat-pulse" : void 0
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: CX,
				y: 214,
				textAnchor: "middle",
				fill: "#14120c",
				fontSize: "9",
				fontFamily: "IBM Plex Sans, sans-serif",
				fontWeight: "600",
				children: "Da'at"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("text", {
				x: CX,
				y: 392,
				textAnchor: "middle",
				fill: "#a39a8c",
				fontSize: "11",
				fontFamily: "IBM Plex Mono, ui-monospace, monospace",
				children: [
					"α ",
					ALPHA.toFixed(3),
					" · coherence ",
					coherence.toFixed(3),
					phaseLock ? " · locked" : " · open"
				]
			})
		]
	});
}
function fmt(n, d = 3) {
	return n.toFixed(d);
}
function SparkApp() {
	const s = useSpark();
	const top = [...s.spark.streams].sort((a, b) => b.forward - a.forward);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-6 px-4 py-5 sm:px-6 sm:py-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-col gap-4 border-b border-line pb-5 sm:flex-row sm:items-end sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-xs tracking-[0.22em] text-brass uppercase",
						children: "Möbii³us · 1-in-8"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-1 font-display text-4xl text-paper text-balance sm:text-5xl",
						children: "Da'at Spark"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 max-w-xl text-pretty text-sm text-muted sm:text-base",
						children: "A spoken line is fractionated across eight sites, sorted by golden-ratio weight, and sealed only when you ask. Nothing leaves this browser."
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "grid grid-cols-3 gap-3 font-mono text-xs text-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "tracking-wide uppercase",
							children: "Lock"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "mt-1 text-base text-brass tabular-nums",
							children: ALPHA
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "tracking-wide uppercase",
							children: "φ"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "mt-1 text-base text-paper tabular-nums",
							children: PHI.toFixed(3)
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "tracking-wide uppercase",
							children: "Floor"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "mt-1 text-base text-teal tabular-nums",
							children: COHERENCE_FLOOR
						})] })
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-4 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-3 rounded-2xl border border-line bg-surface p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-xl text-paper",
								children: "Whisper++"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-mono text-xs text-muted",
								children: [
									s.whisper.listening ? "hearing" : "idle",
									" · conf ",
									fmt(s.whisper.confidence, 2)
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "sr-only",
							htmlFor: "phrase",
							children: "Intent phrase"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							id: "phrase",
							value: s.phrase,
							onChange: (e) => s.setPhrase(e.target.value),
							rows: 3,
							className: "w-full resize-none rounded-xl border border-line bg-ink px-3 py-3 text-base text-paper outline-none focus:border-brass",
							placeholder: "Say what should move."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-1.5",
							"aria-label": "Token confidence",
							children: s.whisper.tokens.map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded-md border border-line px-2 py-1 font-mono text-xs",
								style: {
									color: t.confidence > .72 ? "var(--color-paper)" : "var(--color-muted)",
									opacity: .45 + t.confidence * .55,
									borderColor: t.confidence < .6 ? "var(--color-ember)" : "var(--color-line)"
								},
								children: t.text
							}, `${t.text}-${i}`))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-pretty text-muted",
							children: ["Meaning held: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-paper",
								children: s.whisper.meaning
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => s.speak(),
									className: "rounded-full bg-brass px-4 py-2.5 text-sm font-medium text-ink transition-transform duration-150 ease-out active:scale-[0.96]",
									children: "Fractionate"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: s.seal,
									className: "rounded-full border border-brass px-4 py-2.5 text-sm text-brass transition-transform duration-150 ease-out active:scale-[0.96]",
									children: "Seal receipt"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => s.setLive(!s.live),
									className: "rounded-full border border-line px-4 py-2.5 text-sm text-paper transition-transform duration-150 ease-out active:scale-[0.96]",
									"aria-pressed": s.live,
									children: s.live ? "Pulse on" : "Arm 770ms pulse"
								})
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative min-h-80 overflow-hidden rounded-2xl border border-line bg-surface",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LatticeView, {
						streams: s.spark.streams,
						coherence: s.spark.coherence,
						phaseLock: s.alphaLock && s.spark.phaseLock,
						tunnel: s.spark.bridge?.tunnel ?? 0,
						live: s.live
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-3 sm:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Whole",
						value: fmt(s.spark.whole),
						hint: "recombined forward"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Coherence",
						value: fmt(s.spark.coherence),
						hint: s.spark.phaseLock ? "phase-lock held" : "below lock"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Bandwidth",
						value: `${fmt(s.spark.bandwidth, 2)}×`,
						hint: "streams × density"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Bridge",
						value: s.spark.bridge ? fmt(s.spark.bridge.tunnel, 2) : "—",
						hint: s.spark.bridge ? `${s.spark.bridge.from.split(".")[0]} → ${s.spark.bridge.to.split(".")[0]}` : "no pair"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border border-line bg-surface p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-3 flex flex-wrap items-center justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-xl",
								children: "Sieve-shift-sort"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
									on: s.teachMode,
									label: "Teach deck",
									pressed: s.teachMode,
									onClick: () => s.setTeachMode(!s.teachMode)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
									on: s.alphaLock,
									label: "α lock",
									pressed: s.alphaLock,
									onClick: () => s.setAlphaLock(!s.alphaLock)
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
							className: "flex flex-col gap-2",
							children: s.scored.map((row, i) => {
								const active = row.vector.id === s.selectedId;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => s.select(row.vector.id),
									className: `grid w-full grid-cols-[auto_1fr_auto] items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition-colors ${active ? "border-brass bg-ink" : "border-line bg-transparent hover:border-muted"}`,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono text-xs text-muted tabular-nums",
											children: String(i + 1).padStart(2, "0")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "min-w-0",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "block truncate text-sm text-paper",
												children: row.vector.phrase
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "font-mono text-[11px] text-muted",
												children: [
													row.dominant,
													" · ",
													row.gate,
													" · u ",
													fmt(row.vector.uncertainty, 2),
													row.vector.teach ? " · teach" : ""
												]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono text-sm text-brass tabular-nums",
											children: fmt(row.priority, 2)
										})
									]
								}) }, row.vector.id);
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 flex flex-wrap gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: s.refreshSelectedEdge,
								className: "rounded-full border border-line px-4 py-2 text-sm text-paper active:scale-[0.96]",
								children: "Refresh this edge"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: s.resetDeck,
								className: "rounded-full border border-line px-4 py-2 text-sm text-muted active:scale-[0.96]",
								children: "Restore samples"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm text-muted",
							children: s.edgeNote
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border border-line bg-surface p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-xl",
								children: "Eight streams"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mb-3 text-xs text-muted",
								children: "Forward value and backward provenance, same moment."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "flex flex-col gap-2.5",
								children: top.map((st) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "grid grid-cols-[7.5rem_1fr_auto] items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "truncate font-mono text-[11px] text-muted",
											children: st.site.id
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "relative h-2 overflow-hidden rounded-full bg-ink",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "absolute inset-y-0 left-0 rounded-full",
												style: {
													width: `${Math.round(st.forward * 100)}%`,
													background: st.site.hue
												}
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "absolute inset-y-0 rounded-full opacity-50",
												style: {
													left: `${Math.round(st.forward * 100)}%`,
													width: `${Math.round(st.provenance * 28)}%`,
													background: "var(--color-paper)"
												}
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "w-10 text-right font-mono text-[11px] text-paper tabular-nums",
											children: fmt(st.forward, 2)
										})
									]
								}, st.site.id))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-3 font-mono text-[11px] text-muted",
								children: [
									"Julia edge ",
									fmt(s.spark.juliaEdge, 3),
									" · dihedral 70.53° · bond 109.47°"
								]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border border-line bg-surface p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-xl",
								children: "Receipts"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
								className: "mt-2 flex gap-1",
								"aria-label": "Promotion rail",
								children: GATES.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
									className: "h-1 flex-1 rounded-full bg-line",
									title: g
								}, g))
							}),
							s.receipts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm text-muted",
								children: "No seal yet. Fractionate, then seal when the whole is the one you mean."
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-3 flex max-h-64 flex-col gap-2 overflow-auto",
								children: s.receipts.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "rounded-xl border border-line px-3 py-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-baseline justify-between gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-mono text-xs text-brass",
												children: r.id
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-mono text-[11px] text-muted",
												children: r.gate
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 truncate text-sm text-paper",
											children: r.phrase
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "font-mono text-[11px] text-muted",
											children: [
												r.topSite,
												" · coh ",
												fmt(r.coherence, 3),
												" · ",
												r.phaseLock ? "locked" : "open",
												" · ",
												r.bridge
											]
										})
									]
								}, r.id + r.at))
							})
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "pb-6 font-mono text-[11px] text-muted",
				children: "Local sieve. Sample vectors are from the mounted field notes. Receipts stay on this device."
			})
		]
	});
}
function Stat({ label, value, hint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border border-line bg-surface px-4 py-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-[11px] tracking-wide text-muted uppercase",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 font-display text-3xl text-paper tabular-nums",
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted",
				children: hint
			})
		]
	});
}
function Toggle({ on, label, pressed, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		"aria-pressed": pressed,
		onClick,
		className: `rounded-full border px-3 py-2 text-xs active:scale-[0.96] ${on ? "border-brass text-brass" : "border-line text-muted"}`,
		children: label
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SparkApp, {}) });
}
//#endregion
export { Home as component };
