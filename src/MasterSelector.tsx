import React, {
  useCallback,
  useEffect,
  useRef,
  useState
} from "react";
import type { MasterSelectorProps } from "./types";

const EMPTY_OPTIONS: never[] = [];

export function MasterSelector<T>({
  value,
  entity,
  onChange,
  search,
  getOptionLabel,
  getOptionValue,
  placeholder = "Buscar...",
  disabled = false,
  minSearchLength = 0,
  pageSize = 20,
  allowInactive = false,
  initialOptions = EMPTY_OPTIONS,
  noResultsText = "No se encontraron resultados",
  loadingText = "Buscando...",
  errorText = "No fue posible realizar la búsqueda",
  className
}: MasterSelectorProps<T>) {
  const [query, setQuery] = useState("");
  const [options, setOptions] = useState<T[]>(initialOptions);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);

  const requestId = useRef(0);
  const abortRef = useRef<AbortController | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedLabel = value ? getOptionLabel(value) : "";

  const executeSearch = useCallback(async (term: string, pageNumber: number) => {
    if (term.trim().length < minSearchLength) {
      setOptions(initialOptions);
      setHasNextPage(false);
      return;
    }

    // Cancela la petición anterior (si sigue en curso) antes de lanzar una nueva.
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    const currentRequest = ++requestId.current;
    setLoading(true);
    setError(false);

    try {
      const result = await search({
        entity,
        query: term.trim(),
        page: pageNumber,
        pageSize,
        signal: controller.signal
      });

      if (currentRequest !== requestId.current) return;

      const filtered = allowInactive
        ? result.items
        : result.items.filter((item) => {
            const candidate = item as T & { active?: boolean };
            return candidate.active !== false;
          });

      setOptions((previous) =>
        pageNumber === 1 ? filtered : [...previous, ...filtered]
      );
      setHasNextPage(result.hasNextPage ?? false);
      setPage(pageNumber);
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") {
        return; // petición cancelada intencionalmente, no es un error real
      }
      if (currentRequest === requestId.current) {
        console.error("MasterSelector search failed:", err);
        setError(true);
      }
    } finally {
      if (currentRequest === requestId.current) {
        setLoading(false);
      }
    }
  }, [
    allowInactive,
    initialOptions,
    minSearchLength,
    pageSize,
    search
  ]);

  useEffect(() => {
    if (!open) return;

    const timer = window.setTimeout(() => {
      void executeSearch(query, 1);
    });

    return () => window.clearTimeout(timer);
  }, [query, executeSearch, open]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const selectOption = (item: T) => {
    onChange(item);
    setQuery(getOptionLabel(item));
    setOpen(false);
  };

  const clear = () => {
    onChange(null);
    setQuery("");
    setOptions(initialOptions);
  };

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ position: "relative", width: "100%" }}
    >
      <div style={{ display: "flex", gap: 4 }}>
        <input
          type="text"
          value={query || selectedLabel}
          disabled={disabled}
          placeholder={placeholder}
          onFocus={() => setOpen(true)}
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
          }}
          onKeyDown={(event) => {
            if (event.key === "Escape") setOpen(false);
          }}
          style={{
            width: "100%",
            padding: "8px 10px",
            border: "1px solid #ccc",
            borderRadius: 6
          }}
        />

        {value && (
          <button
            type="button"
            disabled={disabled}
            onClick={clear}
            aria-label="Limpiar selección"
          >
            ×
          </button>
        )}
      </div>

      {open && (
        <div
          role="listbox"
          style={{
            position: "absolute",
            zIndex: 1000,
            width: "100%",
            marginTop: 4,
            background: "#fff",
            border: "1px solid #ddd",
            borderRadius: 6,
            maxHeight: 280,
            overflowY: "auto",
            boxShadow: "0 4px 12px rgba(0,0,0,.12)"
          }}
        >
          {loading && (
            <div style={{ padding: 10 }}>{loadingText}</div>
          )}

          {!loading && error && (
            <div style={{ padding: 10 }}>{errorText}</div>
          )}

          {!loading && !error && options.length === 0 && (
            <div style={{ padding: 10 }}>{noResultsText}</div>
          )}

          {!loading && !error && options.map((item) => (
            <button
              type="button"
              role="option"
              key={getOptionValue(item)}
              onClick={() => selectOption(item)}
              style={{
                display: "block",
                width: "100%",
                padding: "10px",
                textAlign: "left",
                border: 0,
                background: "transparent",
                cursor: "pointer"
              }}
            >
              {getOptionLabel(item)}
            </button>
          ))}

          {!loading && !error && hasNextPage && (
            <button
              type="button"
              onClick={() => void executeSearch(query, page + 1)}
              style={{
                width: "100%",
                padding: 10,
                border: 0,
                cursor: "pointer"
              }}
            >
              Cargar más
            </button>
          )}
        </div>
      )}
    </div>
  );
}