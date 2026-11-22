import React, { useMemo, useRef, useState } from "react";
import { MasterSelector } from "../src";
import { createMockSearch } from "./mock";
import type { Account, CostCenter, MockConfig, Party } from "./mock";

export function App() {
  const [account, setAccount] = useState<Account | null>(null);
  const [party, setParty] = useState<Party | null>(null);
  const [center, setCenter] = useState<CostCenter | null>(null);
  const [saved, setSaved] = useState<string | null>(null);

  const [latencyMs, setLatencyMs] = useState(350);
  const [failRate, setFailRate] = useState(false);
  const [allowInactive, setAllowInactive] = useState(false);
  const [minSearchLength, setMinSearchLength] = useState(0);

  // El mock lee la configuración más reciente sin recrear la función de búsqueda.
  const config = useRef<MockConfig>({ latencyMs, failRate });
  config.current = { latencyMs, failRate };
  const search = useMemo(() => createMockSearch<never>(() => config.current), []);

  const reset = () => { setAccount(null); setParty(null); setCenter(null); setSaved(null); };

  return (
    <main className="page">
      <header className="page-head">
        <div>
          <h1>Nueva línea de asiento</h1>
          <p>Prototipo de <code>MasterSelector</code>: busca, navega con teclado y elige un maestro.</p>
        </div>
      </header>

      <div className="layout">
        <form
          className="card"
          onSubmit={(event) => {
            event.preventDefault();
            setSaved(account && party && center
              ? `Guardado: ${account.code} · ${party.name} · ${center.code}`
              : "Completa los tres campos antes de guardar.");
          }}
        >
          <div className="field">
            <label htmlFor="account">Cuenta contable</label>
            <MasterSelector<Account>
              id="account"
              entity="cuentas"
              value={account}
              onChange={setAccount}
              search={search as never}
              getOptionLabel={(a) => `${a.code} - ${a.name}`}
              getOptionValue={(a) => a.id}
              getOptionDescription={(a) => a.kind}
              placeholder="Busca por código o nombre"
              allowInactive={allowInactive}
              minSearchLength={minSearchLength}
              pageSize={20}
            />
          </div>

          <div className="field">
            <label htmlFor="party">Tercero</label>
            <MasterSelector<Party>
              id="party"
              entity="terceros"
              value={party}
              onChange={setParty}
              search={search as never}
              getOptionLabel={(p) => p.name}
              getOptionValue={(p) => p.id}
              getOptionDescription={(p) => `NIT ${p.nit}`}
              placeholder="Cliente o proveedor"
              allowInactive={allowInactive}
              minSearchLength={minSearchLength}
              pageSize={15}
            />
          </div>

          <div className="field">
            <label htmlFor="center">Centro de costo</label>
            <MasterSelector<CostCenter>
              id="center"
              entity="centros"
              value={center}
              onChange={setCenter}
              search={search as never}
              getOptionLabel={(c) => `${c.code} - ${c.name}`}
              getOptionValue={(c) => c.id}
              getOptionDescription={(c) => c.area}
              placeholder="Selecciona un centro"
              allowInactive={allowInactive}
              minSearchLength={minSearchLength}
            />
          </div>

          <div className="actions">
            <button type="button" className="btn" onClick={reset}>Limpiar</button>
            <button type="submit" className="btn btn-primary">Guardar línea</button>
          </div>
          {saved && <p className="notice" role="status">{saved}</p>}
        </form>

        <aside className="side">
          <section className="card">
            <h2>Escenarios</h2>
            <label className="row">
              <span>Latencia de red</span>
              <select value={latencyMs} onChange={(e) => setLatencyMs(Number(e.target.value))}>
                <option value={0}>Inmediata</option>
                <option value={350}>350 ms</option>
                <option value={1500}>1,5 s (lenta)</option>
              </select>
            </label>
            <label className="row">
              <span>Mínimo de caracteres</span>
              <select value={minSearchLength} onChange={(e) => setMinSearchLength(Number(e.target.value))}>
                <option value={0}>Sin mínimo</option>
                <option value={2}>2 caracteres</option>
                <option value={3}>3 caracteres</option>
              </select>
            </label>
            <label className="row check">
              <input type="checkbox" checked={allowInactive} onChange={(e) => setAllowInactive(e.target.checked)} />
              <span>Incluir registros inactivos</span>
            </label>
            <label className="row check">
              <input type="checkbox" checked={failRate} onChange={(e) => setFailRate(e.target.checked)} />
              <span>Simular error del servidor</span>
            </label>
          </section>

          <section className="card">
            <h2>Valor seleccionado</h2>
            <pre className="json">{JSON.stringify({ account, party, center }, null, 2)}</pre>
          </section>

          <section className="card">
            <h2>Atajos</h2>
            <dl className="keys">
              <dt><kbd>↑</kbd> <kbd>↓</kbd></dt><dd>Mover la selección; al final carga más resultados</dd>
              <dt><kbd>Re Pág</kbd> <kbd>Av Pág</kbd></dt><dd>Saltar 8 opciones</dd>
              <dt><kbd>Ctrl</kbd>+<kbd>Inicio</kbd>/<kbd>Fin</kbd></dt><dd>Primera / última opción</dd>
              <dt><kbd>Enter</kbd></dt><dd>Elegir la opción resaltada</dd>
              <dt><kbd>Esc</kbd></dt><dd>Cerrar y descartar lo escrito</dd>
            </dl>
          </section>
        </aside>
      </div>
    </main>
  );
}
