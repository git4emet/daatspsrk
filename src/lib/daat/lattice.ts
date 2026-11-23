/** Da'at Spark — constants, sites, gates, and sample intent vectors. */

export const ALPHA = 0.743;
export const PHI = 1.6180339887;
export const COHERENCE_FLOOR = 0.987;
export const DIHEDRAL = 70.53;
export const BOND = 109.47;

export type Aspect =
  | "structural"
  | "styling"
  | "intent"
  | "relational"
  | "fractal"
  | "ethics"
  | "voice";

export const ASPECTS: Aspect[] = [
  "structural",
  "styling",
  "intent",
  "relational",
  "fractal",
  "ethics",
  "voice",
];

export type Site = {
  id: string;
  name: string;
  vertex: number;
  forward: string;
  backward: string;
  /** Octave-relative Caputo alpha. The lock site stays at 0.743. */
  alpha: number;
  hue: string;
};

export const SITES: Site[] = [
  { id: "doinbetter.com", name: "Collective Core", vertex: 1, forward: "Commerce", backward: "Provenance", alpha: 0.743, hue: "#d6b26a" },
  { id: "doinbetter.org", name: "Boundary", vertex: 2, forward: "Ethics", backward: "Audit", alpha: 0.618, hue: "#c96b4a" },
  { id: "heymico.com", name: "Voice & Face", vertex: 3, forward: "Interface", backward: "Intent", alpha: 0.81, hue: "#8ec8c4" },
  { id: "timmyu.in", name: "Scholar & Vault", vertex: 4, forward: "Archive", backward: "Recall", alpha: 0.5, hue: "#b7a48a" },
  { id: "tailly.cc", name: "Identity Torus", vertex: 5, forward: "Identity", backward: "Alias", alpha: 0.9, hue: "#e8e2d4" },
  { id: "winxm.art", name: "Vibe Reader", vertex: 6, forward: "Projection", backward: "Source", alpha: 0.382, hue: "#7aa2c4" },
  { id: "catlabs.studio", name: "Studio Hub", vertex: 7, forward: "Creation", backward: "Receipt", alpha: 1.0, hue: "#d08a6a" },
  { id: "mobiius.net", name: "Stargate Port", vertex: 8, forward: "Entry", backward: "Return", alpha: 0.743, hue: "#9ad0a8" },
];

export const GATES = [
  "FOUND",
  "HASHED",
  "ATTRIBUTED",
  "CONTAMINATION-CHECKED",
  "INSPECTED",
  "TESTED",
  "PROMOTED",
] as const;

export type Gate = (typeof GATES)[number];

export type IntentVector = {
  id: string;
  phrase: string;
  source: string;
  aspects: Record<Aspect, number>;
  /** Edge uncertainty in [0, 1]. Lower is more certain. */
  uncertainty: number;
  teach: boolean;
};

/** Sample intent vectors drawn from mounted source, not invented users. */
export const SAMPLE_VECTORS: IntentVector[] = [
  {
    id: "v-daat",
    phrase: "Inject the Da'at spark path and phase-lock the hidden node",
    source: "AGENTS.project · next cycle",
    aspects: { structural: 0.82, styling: 0.2, intent: 0.96, relational: 0.74, fractal: 0.88, ethics: 0.55, voice: 0.3 },
    uncertainty: 0.18,
    teach: true,
  },
  {
    id: "v-whisper",
    phrase: "Whisper a line and mirror confidence before it becomes meaning",
    source: "Whisper++ STmmT",
    aspects: { structural: 0.4, styling: 0.35, intent: 0.9, relational: 0.5, fractal: 0.42, ethics: 0.7, voice: 0.98 },
    uncertainty: 0.31,
    teach: false,
  },
  {
    id: "v-symph",
    phrase: "Fuse the sieve into the Symphonizer and keep the receipt",
    source: "Symphonizer spec · fuse",
    aspects: { structural: 0.78, styling: 0.55, intent: 0.92, relational: 0.84, fractal: 0.6, ethics: 0.48, voice: 0.72 },
    uncertainty: 0.22,
    teach: true,
  },
  {
    id: "v-er",
    phrase: "Tunnel uncertainty across an Einstein-Rosen bridge between sites",
    source: "ER=EPR overlay",
    aspects: { structural: 0.7, styling: 0.15, intent: 0.66, relational: 0.95, fractal: 0.8, ethics: 0.4, voice: 0.2 },
    uncertainty: 0.44,
    teach: false,
  },
  {
    id: "v-julia",
    phrase: "Refresh the Julia boundary where the edge is still percolating",
    source: "Julia overlay",
    aspects: { structural: 0.5, styling: 0.72, intent: 0.58, relational: 0.4, fractal: 0.97, ethics: 0.22, voice: 0.18 },
    uncertainty: 0.57,
    teach: true,
  },
  {
    id: "v-fibo",
    phrase: "Weight the queue by golden-ratio resonance and shift the priority",
    source: "Fibonacci sieve",
    aspects: { structural: 0.88, styling: 0.3, intent: 0.74, relational: 0.45, fractal: 0.9, ethics: 0.28, voice: 0.15 },
    uncertainty: 0.12,
    teach: false,
  },
  {
    id: "v-consent",
    phrase: "Nothing public without permission — hold the boundary gate",
    source: "Foxy desk · guardian",
    aspects: { structural: 0.35, styling: 0.1, intent: 0.8, relational: 0.62, fractal: 0.2, ethics: 0.99, voice: 0.4 },
    uncertainty: 0.08,
    teach: true,
  },
  {
    id: "v-ledger",
    phrase: "Record the transition and make the repair traceable",
    source: "TOFAR ledger",
    aspects: { structural: 0.9, styling: 0.12, intent: 0.7, relational: 0.77, fractal: 0.33, ethics: 0.86, voice: 0.25 },
    uncertainty: 0.15,
    teach: false,
  },
];

export function aspectVector(aspects: Record<Aspect, number>): number[] {
  return ASPECTS.map((a) => aspects[a]);
}
