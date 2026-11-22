import React, { useCallback, useMemo, useRef, useState } from "react";
import { MasterSelector } from "../src";
import type { MasterSearchFn, MasterSelectorProps } from "../src";
import { ACCOUNTS, createMockSearch } from "../demo/mock";
import type { Account, MockConfig } from "../demo/mock";

// ---------------------------------------------------------------------------
// Selector de cuentas con estado propio (reutilizado por casi todas las stories)
// ---------------------------------------------------------------------------
export interface AccountSelectorProps
  extends Partial<Omit<MasterSelectorProps<Account>, "value" | "onChange" | "search">> {
  latencyMs?: number;
  fail?: boolean;
  initial?: Account | null;
  search?: MasterSearchFn<Account>;
  onChange?: (value: Account | null) => void;
}

export function AccountSelector({
  latencyMs = 350,
  fail = false,
  initial = null,
  search: custom,
  onChange,
  ...rest
}: AccountSelectorProps) {
  const [value, setValue] = useState<Account | null>(initial);
  const config = useRef<MockConfig>({ latencyMs, failRate: fail });
  config.current = { latencyMs, failRate: fail };
  const mock = useMemo(() => createMockSearch<Account>(() => config.current), []);

  return (
    <MasterSelector<Account>
      entity="cuentas"
      aria-label="Cuenta contable"
      placeholder="Busca por código o nombre"
      getOptionLabel={(a) => `${a.code} - ${a.name}`}
      getOptionValue={(a) => a.id}
      getOptionDescription={(a) => a.kind}
      {...rest}
      value={value}
      search={custom ?? mock}
      onChange={(next) => {
        setValue(next);
        onChange?.(next);
      }}
    />
  );
}

export const sampleAccount = ACCOUNTS[3];

// ---------------------------------------------------------------------------
// Buscador instrumentado: registra cada solicitud (pendiente / ok / cancelada / error)
// ---------------------------------------------------------------------------
export interface RequestEntry {
  id: number;
  startedAt: number;
  entity: string;
  query: string;
  page: number;
  status: "pending" | "ok" | "aborted" | "error";
  count?: number;
  ms?: number;
}

export function useInstrumentedSearch(getConfig: () => MockConfig) {
  const [log, setLog] = useState<RequestEntry[]>([]);
  const counter = useRef(0);
  const getRef = useRef(getConfig);
  getRef.current = getConfig;
  const base = useMemo(() => createMockSearch<never>(() => getRef.current()), []);

  const update = useCallback((id: number, patch: Partial<RequestEntry>) => {
    setLog((entries) => entries.map((e) => (e.id === id ? { ...e, ...patch } : e)));
  }, []);

  const search = useCallback<MasterSearchFn<never>>(
    async (params) => {
      const id = ++counter.current;
      const startedAt = performance.now();
      setLog((entries) =>
        [{ id, startedAt, entity: params.entity, query: params.query, page: params.page, status: "pending" as const }, ...entries].slice(0, 40)
      );
      try {
        const result = await base(params);
        update(id, { status: "ok", count: result.items.length, ms: Math.round(performance.now() - startedAt) });
        return result;
      } catch (err) {
        const aborted = (err as { name?: string })?.name === "AbortError";
        update(id, { status: aborted ? "aborted" : "error", ms: Math.round(performance.now() - startedAt) });
        throw err;
      }
    },
    [base, update]
  );

  return { search, log, clear: () => setLog([]) };
}
