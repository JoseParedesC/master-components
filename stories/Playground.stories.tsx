import React, { useRef, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { MasterSelector } from "../src";
import type { MasterSearchFn } from "../src";
import type { Account, CostCenter, MockConfig, Party } from "../demo/mock";
import { useInstrumentedSearch } from "./helpers";
import type { RequestEntry } from "./helpers";
import "./playground.css";

interface EventLine { id: number; at: string; text: string }

const clock = () => new Date().toLocaleTimeString("es-CO", { hour12: false });

const statusText: Record<RequestEntry["status"], string> = {
  pending: "en curso",
  ok: "completada",
  aborted: "cancelada",
  error: "error"
};

function Playground() {
  const [account, setAccount] = useState<Account | null>(null);
  const [party, setParty] = useState<Party | null>(null);
  const [center, setCenter] = useState<CostCenter | null>(null);
  const [events, setEvents] = useState<EventLine[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const eventId = useRef(0);

  const [latencyMs, setLatencyMs] = useState(400);
  const [debounceMs, setDebounceMs] = useState(250);
  const [pageSize, setPageSize] = useState(10);
  const [minSearchLength, setMin] = useState(0);
  const [fail, setFail] = useState(false);
  const [allowInactive, setAllowInactive] = useState(false);

  const config = useRef<MockConfig>({ latencyMs, failRate: fail });
  config.current = { latencyMs, failRate: fail };
  const { search, log, clear } = useInstrumentedSearch(() => config.current);
  const typed = search as unknown as MasterSearchFn<never>;

  const record = (text: string) =>
    setEvents((list) => [{ id: ++eventId.current, at: clock(), text }, ...list].slice(0, 30));

  const common = { debounceMs, pageSize, minSearchLength, allowInactive } as const;
  const totals = {
    all: log.length,
    aborted: log.filter((r) => r.status === "aborted").length,
    ok: log.filter((r) => r.status === "ok").length
  };

  return (
    <div className="pg">
      <div className="pg-col">
        <form
          className="pg-card"
          onSubmit={(event) => {
            event.preventDefault();
            setMessage(
              account && party && center
                ? `Guardado: ${account.code} · ${party.name} · ${center.code}`
                : "Completa los tres campos antes de guardar."
            );
          }}
        >
          <h2>Nueva línea de asiento</h2>
          <p className="pg-sub">Prueba el selector como lo haría un usuario: escribe, navega con el teclado y mira el inspector.</p>

          <div className="pg-field">
            <label htmlFor="pg-account">Cuenta contable</label>
            <MasterSelector<Account>
              id="pg-account"
              entity="cuentas"
              value={account}
              onChange={(v) => { setAccount(v); record(`Cuenta → ${v ? `${v.code} ${v.name}` : "(limpiada)"}`); }}
              search={typed as never}
              getOptionLabel={(a) => `${a.code} - ${a.name}`}
              getOptionValue={(a) => a.id}
              getOptionDescription={(a) => a.kind}
              placeholder="Busca por código o nombre"
              {...common}
            />
          </div>

          <div className="pg-field">
            <label htmlFor="pg-party">Tercero</label>
            <MasterSelector<Party>
              id="pg-party"
              entity="terceros"
              value={party}
              onChange={(v) => { setParty(v); record(`Tercero → ${v ? v.name : "(limpiado)"}`); }}
              search={typed as never}
              getOptionLabel={(p) => p.name}
              getOptionValue={(p) => p.id}
              getOptionDescription={(p) => `NIT ${p.nit}`}
              placeholder="Cliente o proveedor"
              {...common}
            />
          </div>

          <div className="pg-field">
            <label htmlFor="pg-center">Centro de costo</label>
            <MasterSelector<CostCenter>
              id="pg-center"
              entity="centros"
              value={center}
              onChange={(v) => { setCenter(v); record(`Centro → ${v ? `${v.code} ${v.name}` : "(limpiado)"}`); }}
              search={typed as never}
              getOptionLabel={(c) => `${c.code} - ${c.name}`}
              getOptionValue={(c) => c.id}
              getOptionDescription={(c) => c.area}
              placeholder="Selecciona un centro"
              {...common}
            />
          </div>

          <div className="pg-actions">
            <button type="button" className="pg-btn" onClick={() => { setAccount(null); setParty(null); setCenter(null); setMessage(null); }}>
              Limpiar
            </button>
            <button type="submit" className="pg-btn" data-primary="true">Guardar línea</button>
          </div>
          {message && <p className="pg-notice" role="status">{message}</p>}
        </form>

        <section className="pg-card" aria-label="Escenarios">
          <h2>Escenarios</h2>
          <p className="pg-sub">Cambian en caliente, sin recargar.</p>
          <label className="pg-ctl">
            <span>Latencia de red</span>
            <span><input type="range" min={0} max={3000} step={50} value={latencyMs} onChange={(e) => setLatencyMs(+e.target.value)} /> <output>{latencyMs} ms</output></span>
          </label>
          <label className="pg-ctl">
            <span>Debounce</span>
            <span><input type="range" min={0} max={1000} step={50} value={debounceMs} onChange={(e) => setDebounceMs(+e.target.value)} /> <output>{debounceMs} ms</output></span>
          </label>
          <label className="pg-ctl">
            <span>Resultados por página</span>
            <select value={pageSize} onChange={(e) => setPageSize(+e.target.value)}>
              {[3, 5, 10, 20].map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
          </label>
          <label className="pg-ctl">
            <span>Mínimo de caracteres</span>
            <select value={minSearchLength} onChange={(e) => setMin(+e.target.value)}>
              {[0, 2, 3].map((n) => <option key={n} value={n}>{n === 0 ? "Sin mínimo" : `${n} caracteres`}</option>)}
            </select>
          </label>
          <label className="pg-ctl">
            <span>Incluir inactivos</span>
            <input type="checkbox" checked={allowInactive} onChange={(e) => setAllowInactive(e.target.checked)} />
          </label>
          <label className="pg-ctl">
            <span>Simular error del servidor</span>
            <input type="checkbox" checked={fail} onChange={(e) => setFail(e.target.checked)} />
          </label>
        </section>
      </div>

      <div className="pg-col">
        <section className="pg-card" aria-label="Solicitudes">
          <div className="pg-head">
            <h2>Solicitudes al servidor</h2>
            <button type="button" className="pg-link" onClick={clear}>Vaciar</button>
          </div>
          <div className="pg-metrics">
            <div className="pg-metric"><b>{totals.all}</b><span>Total</span></div>
            <div className="pg-metric"><b>{totals.ok}</b><span>Completadas</span></div>
            <div className="pg-metric"><b>{totals.aborted}</b><span>Canceladas</span></div>
          </div>
          <div className="pg-scroll">
            {log.length === 0 ? (
              <p className="pg-empty">Aún no hay solicitudes. Abre un campo para empezar.</p>
            ) : (
              <table className="pg-table">
                <thead>
                  <tr><th>Origen</th><th>Texto</th><th>Pág.</th><th>Estado</th><th>Tiempo</th></tr>
                </thead>
                <tbody>
                  {log.map((r) => (
                    <tr key={r.id}>
                      <td>{r.entity}</td>
                      <td><span className="pg-q">{r.query || "∅"}</span></td>
                      <td className="num">{r.page}</td>
                      <td>
                        <span className="pg-chip" data-s={r.status}>
                          {statusText[r.status]}{r.status === "ok" ? ` · ${r.count}` : ""}
                        </span>
                      </td>
                      <td className="num">{r.ms !== undefined ? `${r.ms} ms` : "…"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>

        <section className="pg-card" aria-label="Eventos">
          <h2>Eventos <code>onChange</code></h2>
          {events.length === 0 ? (
            <p className="pg-empty">Elige o limpia un valor para ver el evento.</p>
          ) : (
            <ul className="pg-events">
              {events.map((e) => (<li key={e.id}><time>{e.at}</time><span>{e.text}</span></li>))}
            </ul>
          )}
        </section>

        <section className="pg-card" aria-label="Valor">
          <h2>Valor del formulario</h2>
          <pre className="pg-json">{JSON.stringify({ account, party, center }, null, 2)}</pre>
        </section>
      </div>
    </div>
  );
}

const meta = {
  title: "Laboratorio/Playground",
  component: Playground,
  tags: ["!autodocs"],
  parameters: {
    layout: "fullscreen",
    stage: "fill",
    docs: { description: { component: "Entorno completo para probar a mano." } }
  }
} satisfies Meta<typeof Playground>;

export default meta;

/** Formulario con tres selectores e inspector de solicitudes, eventos y valor en vivo. */
export const Laboratorio: StoryObj<typeof meta> = {};
