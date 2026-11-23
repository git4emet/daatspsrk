import { useSpark } from "@/lib/daat/store";
import { ALPHA, COHERENCE_FLOOR, GATES, PHI } from "@/lib/daat/lattice";
import { LatticeView } from "./lattice-view";

function fmt(n: number, d = 3) {
  return n.toFixed(d);
}

export function SparkApp() {
  const s = useSpark();
  const top = [...s.spark.streams].sort((a, b) => b.forward - a.forward);

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-6 px-4 py-5 sm:px-6 sm:py-8">
      <header className="flex flex-col gap-4 border-b border-line pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-xs tracking-[0.22em] text-brass uppercase">Möbii³us · 1-in-8</p>
          <h1 className="mt-1 font-display text-4xl text-paper text-balance sm:text-5xl">Da'at Spark</h1>
          <p className="mt-2 max-w-xl text-pretty text-sm text-muted sm:text-base">
            A spoken line is fractionated across eight sites, sorted by golden-ratio weight, and sealed
            only when you ask. Nothing leaves this browser.
          </p>
        </div>
        <dl className="grid grid-cols-3 gap-3 font-mono text-xs text-muted">
          <div>
            <dt className="tracking-wide uppercase">Lock</dt>
            <dd className="mt-1 text-base text-brass tabular-nums">{ALPHA}</dd>
          </div>
          <div>
            <dt className="tracking-wide uppercase">φ</dt>
            <dd className="mt-1 text-base text-paper tabular-nums">{PHI.toFixed(3)}</dd>
          </div>
          <div>
            <dt className="tracking-wide uppercase">Floor</dt>
            <dd className="mt-1 text-base text-teal tabular-nums">{COHERENCE_FLOOR}</dd>
          </div>
        </dl>
      </header>

      <section className="grid gap-4 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        <div className="flex flex-col gap-3 rounded-2xl border border-line bg-surface p-4">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-display text-xl text-paper">Whisper++</h2>
            <span className="font-mono text-xs text-muted">
              {s.whisper.listening ? "hearing" : "idle"} · conf {fmt(s.whisper.confidence, 2)}
            </span>
          </div>
          <label className="sr-only" htmlFor="phrase">
            Intent phrase
          </label>
          <textarea
            id="phrase"
            value={s.phrase}
            onChange={(e) => s.setPhrase(e.target.value)}
            rows={3}
            className="w-full resize-none rounded-xl border border-line bg-ink px-3 py-3 text-base text-paper outline-none focus:border-brass"
            placeholder="Say what should move."
          />
          <div className="flex flex-wrap gap-1.5" aria-label="Token confidence">
            {s.whisper.tokens.map((t, i) => (
              <span
                key={`${t.text}-${i}`}
                className="rounded-md border border-line px-2 py-1 font-mono text-xs"
                style={{
                  color: t.confidence > 0.72 ? "var(--color-paper)" : "var(--color-muted)",
                  opacity: 0.45 + t.confidence * 0.55,
                  borderColor: t.confidence < 0.6 ? "var(--color-ember)" : "var(--color-line)",
                }}
              >
                {t.text}
              </span>
            ))}
          </div>
          <p className="text-sm text-pretty text-muted">
            Meaning held: <span className="text-paper">{s.whisper.meaning}</span>
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => s.speak()}
              className="rounded-full bg-brass px-4 py-2.5 text-sm font-medium text-ink transition-transform duration-150 ease-out active:scale-[0.96]"
            >
              Fractionate
            </button>
            <button
              type="button"
              onClick={s.seal}
              className="rounded-full border border-brass px-4 py-2.5 text-sm text-brass transition-transform duration-150 ease-out active:scale-[0.96]"
            >
              Seal receipt
            </button>
            <button
              type="button"
              onClick={() => s.setLive(!s.live)}
              className="rounded-full border border-line px-4 py-2.5 text-sm text-paper transition-transform duration-150 ease-out active:scale-[0.96]"
              aria-pressed={s.live}
            >
              {s.live ? "Pulse on" : "Arm 770ms pulse"}
            </button>
          </div>
        </div>

        <div className="relative min-h-80 overflow-hidden rounded-2xl border border-line bg-surface">
          <LatticeView
            streams={s.spark.streams}
            coherence={s.spark.coherence}
            phaseLock={s.alphaLock && s.spark.phaseLock}
            tunnel={s.spark.bridge?.tunnel ?? 0}
            live={s.live}
          />
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-4">
        <Stat label="Whole" value={fmt(s.spark.whole)} hint="recombined forward" />
        <Stat label="Coherence" value={fmt(s.spark.coherence)} hint={s.spark.phaseLock ? "phase-lock held" : "below lock"} />
        <Stat label="Bandwidth" value={`${fmt(s.spark.bandwidth, 2)}×`} hint="streams × density" />
        <Stat
          label="Bridge"
          value={s.spark.bridge ? fmt(s.spark.bridge.tunnel, 2) : "—"}
          hint={s.spark.bridge ? `${s.spark.bridge.from.split(".")[0]} → ${s.spark.bridge.to.split(".")[0]}` : "no pair"}
        />
      </section>

      <section className="grid gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <div className="rounded-2xl border border-line bg-surface p-4">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-display text-xl">Sieve-shift-sort</h2>
            <div className="flex flex-wrap gap-2">
              <Toggle on={s.teachMode} label="Teach deck" pressed={s.teachMode} onClick={() => s.setTeachMode(!s.teachMode)} />
              <Toggle on={s.alphaLock} label="α lock" pressed={s.alphaLock} onClick={() => s.setAlphaLock(!s.alphaLock)} />
            </div>
          </div>
          <ol className="flex flex-col gap-2">
            {s.scored.map((row, i) => {
              const active = row.vector.id === s.selectedId;
              return (
                <li key={row.vector.id}>
                  <button
                    type="button"
                    onClick={() => s.select(row.vector.id)}
                    className={`grid w-full grid-cols-[auto_1fr_auto] items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition-colors ${
                      active ? "border-brass bg-ink" : "border-line bg-transparent hover:border-muted"
                    }`}
                  >
                    <span className="font-mono text-xs text-muted tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                    <span className="min-w-0">
                      <span className="block truncate text-sm text-paper">{row.vector.phrase}</span>
                      <span className="font-mono text-[11px] text-muted">
                        {row.dominant} · {row.gate} · u {fmt(row.vector.uncertainty, 2)}
                        {row.vector.teach ? " · teach" : ""}
                      </span>
                    </span>
                    <span className="font-mono text-sm text-brass tabular-nums">{fmt(row.priority, 2)}</span>
                  </button>
                </li>
              );
            })}
          </ol>
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={s.refreshSelectedEdge}
              className="rounded-full border border-line px-4 py-2 text-sm text-paper active:scale-[0.96]"
            >
              Refresh this edge
            </button>
            <button
              type="button"
              onClick={s.resetDeck}
              className="rounded-full border border-line px-4 py-2 text-sm text-muted active:scale-[0.96]"
            >
              Restore samples
            </button>
          </div>
          <p className="mt-3 text-sm text-muted">{s.edgeNote}</p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="rounded-2xl border border-line bg-surface p-4">
            <h2 className="font-display text-xl">Eight streams</h2>
            <p className="mb-3 text-xs text-muted">Forward value and backward provenance, same moment.</p>
            <ul className="flex flex-col gap-2.5">
              {top.map((st) => (
                <li key={st.site.id} className="grid grid-cols-[7.5rem_1fr_auto] items-center gap-2">
                  <span className="truncate font-mono text-[11px] text-muted">{st.site.id}</span>
                  <span className="relative h-2 overflow-hidden rounded-full bg-ink">
                    <span
                      className="absolute inset-y-0 left-0 rounded-full"
                      style={{ width: `${Math.round(st.forward * 100)}%`, background: st.site.hue }}
                    />
                    <span
                      className="absolute inset-y-0 rounded-full opacity-50"
                      style={{
                        left: `${Math.round(st.forward * 100)}%`,
                        width: `${Math.round(st.provenance * 28)}%`,
                        background: "var(--color-paper)",
                      }}
                    />
                  </span>
                  <span className="w-10 text-right font-mono text-[11px] text-paper tabular-nums">
                    {fmt(st.forward, 2)}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-3 font-mono text-[11px] text-muted">
              Julia edge {fmt(s.spark.juliaEdge, 3)} · dihedral 70.53° · bond 109.47°
            </p>
          </div>

          <div className="rounded-2xl border border-line bg-surface p-4">
            <h2 className="font-display text-xl">Receipts</h2>
            <ol className="mt-2 flex gap-1" aria-label="Promotion rail">
              {GATES.map((g) => (
                <li key={g} className="h-1 flex-1 rounded-full bg-line" title={g} />
              ))}
            </ol>
            {s.receipts.length === 0 ? (
              <p className="mt-3 text-sm text-muted">No seal yet. Fractionate, then seal when the whole is the one you mean.</p>
            ) : (
              <ul className="mt-3 flex max-h-64 flex-col gap-2 overflow-auto">
                {s.receipts.map((r) => (
                  <li key={r.id + r.at} className="rounded-xl border border-line px-3 py-2">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="font-mono text-xs text-brass">{r.id}</span>
                      <span className="font-mono text-[11px] text-muted">{r.gate}</span>
                    </div>
                    <p className="mt-1 truncate text-sm text-paper">{r.phrase}</p>
                    <p className="font-mono text-[11px] text-muted">
                      {r.topSite} · coh {fmt(r.coherence, 3)} · {r.phaseLock ? "locked" : "open"} · {r.bridge}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>

      <footer className="pb-6 font-mono text-[11px] text-muted">
        Local sieve. Sample vectors are from the mounted field notes. Receipts stay on this device.
      </footer>
    </div>
  );
}

function Stat({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div className="rounded-2xl border border-line bg-surface px-4 py-3">
      <p className="font-mono text-[11px] tracking-wide text-muted uppercase">{label}</p>
      <p className="mt-1 font-display text-3xl text-paper tabular-nums">{value}</p>
      <p className="text-xs text-muted">{hint}</p>
    </div>
  );
}

function Toggle({
  on,
  label,
  pressed,
  onClick,
}: {
  on: boolean;
  label: string;
  pressed: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={`rounded-full border px-3 py-2 text-xs active:scale-[0.96] ${
        on ? "border-brass text-brass" : "border-line text-muted"
      }`}
    >
      {label}
    </button>
  );
}
