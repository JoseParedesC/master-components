import { useCallback, useEffect, useRef, useState } from "react";
import type { MasterSearchFn, MasterSearchResult } from "./types";

const isAbort = (err: unknown) =>
  typeof err === "object" && err !== null && (err as { name?: string }).name === "AbortError";

/**
 * Hook para búsquedas de maestros fuera del selector.
 * Cancela la petición anterior, ignora respuestas obsoletas y
 * permite paginar con `loadMore`.
 */
export function useMasterSearch<T>(searchFn: MasterSearchFn<T>) {
  const [data, setData] = useState<MasterSearchResult<T>>({ items: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const fnRef = useRef(searchFn);
  fnRef.current = searchFn;
  const requestId = useRef(0);
  const abortRef = useRef<AbortController | null>(null);
  const lastArgs = useRef<{ entity: string; query: string; pageSize: number; page: number } | null>(null);

  const search = useCallback(async (entity: string, query: string, page = 1, pageSize = 20) => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    const myRequest = ++requestId.current;
    lastArgs.current = { entity, query, pageSize, page };

    setLoading(true);
    setError(null);

    try {
      const result = await fnRef.current({ entity, query, page, pageSize, signal: controller.signal });
      if (myRequest !== requestId.current) return result;

      setData((previous) => ({
        ...result,
        items: page === 1 ? result.items : [...previous.items, ...result.items]
      }));
      return result;
    } catch (err) {
      if (isAbort(err) || myRequest !== requestId.current) return undefined;
      setError(err);
      throw err;
    } finally {
      if (myRequest === requestId.current) setLoading(false);
    }
  }, []);

  /** Carga la siguiente página de la última búsqueda. */
  const loadMore = useCallback(async () => {
    const last = lastArgs.current;
    if (!last) return undefined;
    return search(last.entity, last.query, last.page + 1, last.pageSize);
  }, [search]);

  const reset = useCallback(() => {
    abortRef.current?.abort();
    requestId.current++;
    lastArgs.current = null;
    setData({ items: [] });
    setLoading(false);
    setError(null);
  }, []);

  useEffect(() => () => abortRef.current?.abort(), []);

  return { data, loading, error, search, loadMore, reset };
}
