import { ALPHA, PHI } from "@/lib/daat/lattice";
import type { Stream } from "@/lib/daat/sieve";

const CX = 210;
const CY = 210;

function vertex(i: number, r: number) {
  const a = -Math.PI / 2 + (i * Math.PI) / 4;
  return { x: CX + Math.cos(a) * r, y: CY + Math.sin(a) * r };
}

/** A quiet Julia-like boundary: c sits near the lock, not a textbook postcard. */
function juliaPath(): string {
  const cRe = -0.12;
  const cIm = 0.74;
  const pts: string[] = [];
  const steps = 96;
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * Math.PI * 2;
    let re = 0.62 * Math.cos(t);
    let im = 0.62 * Math.sin(t);
    let escaped = false;
    for (let n = 0; n < 18; n++) {
      const nr = re * re - im * im + cRe;
      const ni = 2 * re * im + cIm * 0.35;
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
    const y = CY + Math.sin(t) * rad * 0.92;
    pts.push(`${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`);
  }
  return `${pts.join(" ")} Z`;
}

const BOUNDARY = juliaPath();

export function LatticeView({
  streams,
  coherence,
  phaseLock,
  tunnel,
  live,
}: {
  streams: Stream[];
  coherence: number;
  phaseLock: boolean;
  tunnel: number;
  live: boolean;
}) {
  const ring = 168;
  return (
    <svg viewBox="0 0 420 420" className="h-full w-full" role="img" aria-label="Eight-site star lattice">
      <defs>
        <radialGradient id="coreglow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#d6b26a" stopOpacity="0.55" />
          <stop offset="55%" stopColor="#d6b26a" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#d6b26a" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx={CX} cy={CY} r="150" fill="url(#coreglow)" />
      <path d={BOUNDARY} fill="none" stroke="#8ec8c4" strokeOpacity="0.45" strokeWidth="1.25" />
      {/* Fibonacci spacing marks */}
      {[1, 1, 2, 3, 5, 8].map((f, i) => (
        <circle
          key={f + "-" + i}
          cx={CX}
          cy={CY}
          r={18 + f * 11}
          fill="none"
          stroke="#d6b26a"
          strokeOpacity={0.08 + i * 0.03}
        />
      ))}
      {/* ER bridge between the two strongest forward streams */}
      {streams.length >= 2 &&
        (() => {
          const ranked = [...streams].sort((a, b) => b.forward - a.forward);
          const a = vertex(ranked[0].site.vertex - 1, ring);
          const b = vertex(ranked[1].site.vertex - 1, ring);
          const mx = (a.x + b.x) / 2 + (CY - (a.y + b.y) / 2) * 0.18;
          const my = (a.y + b.y) / 2 + (CX - (a.x + b.x) / 2) * 0.08;
          return (
            <path
              d={`M${a.x} ${a.y} Q${mx} ${my} ${b.x} ${b.y}`}
              fill="none"
              stroke="#c96b4a"
              strokeWidth={1 + tunnel * 2.2}
              strokeOpacity={0.35 + tunnel * 0.5}
              strokeDasharray="4 3"
            />
          );
        })()}
      {streams.map((st) => {
        const p = vertex(st.site.vertex - 1, ring);
        const inner = vertex(st.site.vertex - 1, 46);
        return (
          <g key={st.site.id}>
            <line
              x1={inner.x}
              y1={inner.y}
              x2={p.x}
              y2={p.y}
              stroke={st.site.hue}
              strokeOpacity={0.25 + st.weight * 0.6}
              strokeWidth={1 + st.forward * 3}
            />
            <circle
              cx={p.x}
              cy={p.y}
              r={7 + st.weight * 9}
              fill="#12141a"
              stroke={st.site.hue}
              strokeWidth={st.phaseLocked ? 2.4 : 1.2}
            />
            <text
              x={p.x}
              y={p.y + 28}
              textAnchor="middle"
              fill="#a39a8c"
              fontSize="9"
              fontFamily="IBM Plex Mono, ui-monospace, monospace"
            >
              {st.site.vertex} · {st.site.id.split(".")[0]}
            </text>
          </g>
        );
      })}
      <circle
        cx={CX}
        cy={CY}
        r={phaseLock ? 16 : 11}
        fill="#d6b26a"
        fillOpacity={phaseLock ? 0.9 : 0.45}
        className={live && phaseLock ? "daat-pulse" : undefined}
      />
      <text
        x={CX}
        y={CY + 4}
        textAnchor="middle"
        fill="#14120c"
        fontSize="9"
        fontFamily="IBM Plex Sans, sans-serif"
        fontWeight="600"
      >
        Da'at
      </text>
      <text
        x={CX}
        y={392}
        textAnchor="middle"
        fill="#a39a8c"
        fontSize="11"
        fontFamily="IBM Plex Mono, ui-monospace, monospace"
      >
        α {ALPHA.toFixed(3)} · coherence {coherence.toFixed(3)}
        {phaseLock ? " · locked" : " · open"}
      </text>
    </svg>
  );
}
