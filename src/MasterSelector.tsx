import React, {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState
} from "react";
import { highlightMatch } from "./highlight";
import { injectMasterStyles } from "./styles";
import type { MasterSelectorProps } from "./types";

const EMPTY_OPTIONS: never[] = [];
const PAGE_JUMP = 8;

// useLayoutEffect avisa en SSR; en servidor no hay layout, así que se degrada a useEffect.
const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

type Status = "idle" | "loading" | "success" | "error";

const isAbort = (err: unknown) =>
  typeof err === "object" && err !== null && (err as { name?: string }).name === "AbortError";

const ChevronIcon = () => (
  <svg className="ms-chevron" width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M5 7.5l5 5 5-5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ClearIcon = () => (
  <svg width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);
const CheckIcon = () => (
  <svg className="ms-check" width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M4.5 10.5l3.5 3.5 7.5-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export function MasterSelector<T>(props: MasterSelectorProps<T>) {
  const {
    value,
    entity,
    onChange,
    getOptionLabel,
    getOptionValue,
    getOptionDescription,
    renderOption,
    placeholder = "Buscar...",
    disabled = false,
    clearable = true,
    invalid = false,
    minSearchLength = 0,
    pageSize = 20,
    debounceMs = 250,
    allowInactive = false,
    initialOptions = EMPTY_OPTIONS,
    noResultsText = "No se encontraron resultados",
    loadingText = "Buscando...",
    errorText = "No fue posible realizar la búsqueda",
    minLengthText = "Escribe al menos {min} caracteres para buscar",
    loadMoreText = "Cargar más",
    retryText = "Reintentar",
    clearLabel = "Limpiar selección",
    className,
    id,
    name,
    autoFocus,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy
  } = props;

  // Siempre la última versión de las props, sin volver a disparar búsquedas
  // cuando el padre pasa funciones inline (search, getOptionLabel...).
  const latest = useRef(props);
  latest.current = props;

  const uid = useId();
  const listId = `${uid}-list`;
  const optionId = (index: number) => `${uid}-opt-${index}`;

  const [internalValue, setInternalValue] = useState<T | null>(null);
  const isControlled = value !== undefined;
  const current = isControlled ? value : internalValue;
  const selectedKey = current ? getOptionValue(current) : null;
  const selectedLabel = current ? getOptionLabel(current) : "";

  const [query, setQuery] = useState("");
  const [dirty, setDirty] = useState(false); // la persona está escribiendo
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<T[]>(initialOptions);
  const [status, setStatus] = useState<Status>("idle");
  const [loadingMore, setLoadingMore] = useState(false);
  const [failedPage, setFailedPage] = useState(1);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [total, setTotal] = useState<number | undefined>();
  const [activeIndex, setActiveIndex] = useState(-1);
  const [placement, setPlacement] = useState<"bottom" | "top">("bottom");
  const [listMax, setListMax] = useState(300);

  const requestId = useRef(0);
  const abortRef = useRef<AbortController | null>(null);
  const searchedTermRef = useRef<string | null>(null);
  const inputMode = useRef<"keyboard" | "mouse">("keyboard");
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // Al abrir sin escribir se listan todos los registros; el texto de la
  // selección actual NO se usa como filtro.
  const searchTerm = dirty ? query : "";
  const belowMin = searchTerm.trim().length < minSearchLength;

  useIsoLayoutEffect(() => injectMasterStyles(), []);

  const runSearch = useCallback(async (term: string, pageNumber: number) => {
    const p = latest.current;
    const min = p.minSearchLength ?? 0;
    const size = p.pageSize ?? 20;
    searchedTermRef.current = term;

    abortRef.current?.abort();

    if (term.trim().length < min) {
      requestId.current++;
      setOptions(p.initialOptions ?? EMPTY_OPTIONS);
      setHasNextPage(false);
      setTotal(undefined);
      setLoadingMore(false);
      setStatus("idle");
      setActiveIndex(-1);
      return;
    }

    const controller = new AbortController();
    abortRef.current = controller;
    const myRequest = ++requestId.current;
    setStatus("loading");
    setLoadingMore(pageNumber > 1);

    try {
      const result = await p.search({
        entity: p.entity,
        query: term.trim(),
        page: pageNumber,
        pageSize: size,
        signal: controller.signal
      });
      if (myRequest !== requestId.current) return;

      const visible = p.allowInactive
        ? result.items
        : result.items.filter((item) => (item as { active?: boolean }).active !== false);

      const merge = (previous: T[]) => {
        const base = pageNumber === 1 ? [] : previous;
        const seen = new Set(base.map((item) => p.getOptionValue(item)));
        const next = [...base];
        for (const item of visible) {
          const key = p.getOptionValue(item);
          if (!seen.has(key)) { seen.add(key); next.push(item); }
        }
        return next;
      };

      setOptions(merge);
      setTotal(result.total);
      setHasNextPage(
        result.hasNextPage ??
          (result.total !== undefined ? pageNumber * size < result.total : false)
      );
      setPage(pageNumber);
      setStatus("success");
      setLoadingMore(false);

      if (pageNumber === 1) {
        const selected = p.value ? p.getOptionValue(p.value) : null;
        const at = selected ? visible.findIndex((i) => p.getOptionValue(i) === selected) : -1;
        inputMode.current = "keyboard";
        setActiveIndex(at >= 0 ? at : visible.length ? 0 : -1);
      }
    } catch (err) {
      if (isAbort(err) || myRequest !== requestId.current) return;
      console.error("MasterSelector search failed:", err);
      setFailedPage(pageNumber);
      setStatus("error");
      setLoadingMore(false);
    }
  }, []);

  // Búsqueda con debounce. La primera al abrir es inmediata.
  useEffect(() => {
    if (!open) return;
    const delay = searchedTermRef.current === null ? 0 : debounceMs;
    const timer = window.setTimeout(() => void runSearch(searchTerm, 1), delay);
    return () => window.clearTimeout(timer);
  }, [open, searchTerm, entity, pageSize, allowInactive, minSearchLength, debounceMs, runSearch]);

  const closePopup = useCallback(() => {
    abortRef.current?.abort();
    requestId.current++;
    searchedTermRef.current = null;
    setOpen(false);
    setDirty(false);
    setQuery("");
    setStatus("idle");
    setLoadingMore(false);
    setActiveIndex(-1);
    setOptions(latest.current.initialOptions ?? EMPTY_OPTIONS);
  }, []);

  useEffect(() => () => abortRef.current?.abort(), []);
  useEffect(() => { if (disabled && open) closePopup(); }, [disabled, open, closePopup]);

  // Abre hacia arriba si abajo no hay espacio suficiente.
  useIsoLayoutEffect(() => {
    if (!open || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const below = window.innerHeight - rect.bottom - 70;
    const above = rect.top - 70;
    const flip = below < 220 && above > below;
    setPlacement(flip ? "top" : "bottom");
    setListMax(Math.max(160, Math.min(320, flip ? above : below)));
  }, [open]);

  // Mantiene visible la opción activa al navegar con teclado.
  useEffect(() => {
    if (!open || activeIndex < 0 || inputMode.current !== "keyboard") return;
    document.getElementById(optionId(activeIndex))?.scrollIntoView?.({ block: "nearest" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, open, options.length]);

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);

  const openPopup = () => {
    if (disabled) return;
    setOpen(true);
  };

  const selectOption = (item: T) => {
    if (!isControlled) setInternalValue(item);
    onChange(item);
    closePopup();
    inputRef.current?.focus();
  };

  const clear = () => {
    if (!isControlled) setInternalValue(null);
    onChange(null);
    setQuery("");
    setDirty(false);
    inputRef.current?.focus();
  };

  const loadMore = () => {
    if (status === "loading" || !hasNextPage) return;
    void runSearch(searchTerm, page + 1);
  };

  const move = (delta: number) => {
    inputMode.current = "keyboard";
    if (options.length === 0) return;
    const last = options.length - 1;
    const next = Math.min(last, Math.max(0, (activeIndex < 0 ? (delta > 0 ? -1 : 1) : activeIndex) + delta));
    setActiveIndex(next);
    if (next === last && delta > 0 && hasNextPage) loadMore();
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.nativeEvent.isComposing) return;

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        if (!open) openPopup();
        else move(1);
        break;
      case "ArrowUp":
        event.preventDefault();
        if (!open) openPopup();
        else move(-1);
        break;
      case "PageDown":
        if (open) { event.preventDefault(); move(PAGE_JUMP); }
        break;
      case "PageUp":
        if (open) { event.preventDefault(); move(-PAGE_JUMP); }
        break;
      case "Home":
      case "End":
        // Con Ctrl se navega la lista; sin Ctrl se mueve el cursor del texto.
        if (open && event.ctrlKey) {
          event.preventDefault();
          inputMode.current = "keyboard";
          setActiveIndex(event.key === "Home" ? 0 : options.length - 1);
        }
        break;
      case "Enter":
        if (open && activeIndex >= 0 && options[activeIndex] !== undefined) {
          event.preventDefault(); // no enviar el formulario padre
          selectOption(options[activeIndex]);
        }
        break;
      case "Escape":
        if (open) {
          event.preventDefault();
          event.stopPropagation(); // no cerrar un modal contenedor
          closePopup();
        }
        break;
      case "Tab":
        if (open) closePopup();
        break;
    }
  };

  const onBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    if (!containerRef.current?.contains(event.relatedTarget as Node | null)) {
      if (open) closePopup();
    }
  };

  const onListScroll = (event: React.UIEvent<HTMLUListElement>) => {
    const el = event.currentTarget;
    if (hasNextPage && el.scrollTop + el.clientHeight >= el.scrollHeight - 32) loadMore();
  };

  // Estados visibles del panel
  const hasOptions = options.length > 0;
  const showSkeleton = !belowMin && !hasOptions && status !== "success" && status !== "error";
  const showEmpty = !belowMin && !hasOptions && status === "success";
  const showFatalError = status === "error" && !hasOptions;
  const showInlineError = status === "error" && hasOptions;
  const busy = status === "loading" && !loadingMore && hasOptions;

  const liveMessage =
    status === "loading" ? loadingText
    : status === "error" ? errorText
    : status === "success" ? (hasOptions ? `${options.length}` : noResultsText)
    : "";

  const inputValue = open && dirty ? query : selectedLabel;

  return (
    <div
      ref={containerRef}
      className={className ? `ms-root ${className}` : "ms-root"}
      data-open={open}
      data-invalid={invalid || undefined}
      onBlur={onBlur}
    >
      <div className="ms-control">
        <input
          ref={inputRef}
          id={id}
          type="text"
          role="combobox"
          className="ms-input"
          autoComplete="off"
          spellCheck={false}
          aria-expanded={open}
          aria-controls={open ? listId : undefined}
          aria-haspopup="listbox"
          aria-autocomplete="list"
          aria-activedescendant={open && activeIndex >= 0 ? optionId(activeIndex) : undefined}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          aria-invalid={invalid || undefined}
          value={inputValue}
          disabled={disabled}
          placeholder={placeholder}
          onFocus={(event) => {
            openPopup();
            if (selectedLabel) {
              const input = event.currentTarget;
              window.requestAnimationFrame(() => input.select());
            }
          }}
          onClick={openPopup}
          onChange={(event) => {
            setQuery(event.target.value);
            setDirty(true);
            setOpen(true);
          }}
          onKeyDown={onKeyDown}
        />

        <div className="ms-adorn">
          {status === "loading" && open && <span className="ms-spin" role="presentation" />}
          {clearable && current && !disabled && (
            <button
              type="button"
              className="ms-icon-btn"
              tabIndex={-1}
              aria-label={clearLabel}
              onMouseDown={(event) => event.preventDefault()}
              onClick={clear}
            >
              <ClearIcon />
            </button>
          )}
          <button
            type="button"
            className="ms-icon-btn"
            tabIndex={-1}
            aria-hidden="true"
            disabled={disabled}
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => (open ? closePopup() : (inputRef.current?.focus(), openPopup()))}
          >
            <ChevronIcon />
          </button>
        </div>

        {name && <input type="hidden" name={name} value={selectedKey ?? ""} />}
      </div>

      <div className="ms-sr" role="status" aria-live="polite">{open ? liveMessage : ""}</div>

      {open && (
        <div
          className="ms-popup"
          data-placement={placement}
          style={{ "--ms-list-max": `${listMax}px` } as React.CSSProperties}
          // Evita que el input pierda el foco al hacer clic en el panel o su scrollbar.
          onMouseDown={(event) => event.preventDefault()}
        >
          {belowMin && (
            <div className="ms-state">
              <div className="ms-state-title">
                {minLengthText.replace("{min}", String(minSearchLength))}
              </div>
            </div>
          )}

          {showSkeleton && (
            <div aria-hidden="true">
              {[62, 78, 54].map((width) => (
                <div className="ms-skel-row" key={width}>
                  <div className="ms-skel" style={{ width: `${width}%` }} />
                </div>
              ))}
            </div>
          )}

          {showEmpty && (
            <div className="ms-state">
              <div className="ms-state-title">{noResultsText}</div>
              {searchTerm.trim() && (
                <div className="ms-state-sub">Prueba con otro término o revisa la ortografía.</div>
              )}
            </div>
          )}

          {showFatalError && (
            <div className="ms-state" data-tone="error">
              <div className="ms-state-title">{errorText}</div>
              <button type="button" className="ms-link-btn" onClick={() => void runSearch(searchTerm, failedPage)}>
                {retryText}
              </button>
            </div>
          )}

          {hasOptions && (
            <ul
              ref={listRef}
              id={listId}
              role="listbox"
              className="ms-list"
              data-busy={busy || undefined}
              aria-busy={status === "loading"}
              onScroll={onListScroll}
            >
              {options.map((item, index) => {
                const key = getOptionValue(item);
                const selected = key === selectedKey;
                const active = index === activeIndex;
                const label = getOptionLabel(item);
                const description = getOptionDescription?.(item);
                return (
                  <li
                    key={key}
                    id={optionId(index)}
                    role="option"
                    className="ms-option"
                    aria-selected={selected}
                    data-active={active}
                    onMouseMove={() => {
                      if (activeIndex !== index || inputMode.current !== "mouse") {
                        inputMode.current = "mouse";
                        setActiveIndex(index);
                      }
                    }}
                    onClick={() => selectOption(item)}
                  >
                    {renderOption ? (
                      <div className="ms-option-main">
                        {renderOption(item, { active, selected, query: searchTerm })}
                      </div>
                    ) : (
                      <div className="ms-option-main">
                        <div className="ms-option-label">{highlightMatch(label, searchTerm)}</div>
                        {description && <div className="ms-option-desc">{description}</div>}
                      </div>
                    )}
                    {selected && <CheckIcon />}
                  </li>
                );
              })}
            </ul>
          )}

          {loadingMore && (
            <div className="ms-inline-row" aria-hidden="true">
              <span className="ms-spin" /> {loadingText}
            </div>
          )}

          {showInlineError && (
            <div className="ms-inline-row" data-tone="error">
              {errorText}
              <button type="button" className="ms-link-btn" onClick={() => void runSearch(searchTerm, failedPage)}>
                {retryText}
              </button>
            </div>
          )}

          {hasNextPage && !loadingMore && status !== "error" && (
            <button type="button" className="ms-more" onClick={loadMore}>
              {loadMoreText}
            </button>
          )}

          {hasOptions && (
            <div className="ms-footer">
              <span>
                {total !== undefined ? `${options.length} de ${total}` : `${options.length} resultados`}
              </span>
              <span className="ms-hints" aria-hidden="true">
                <span className="ms-hint"><kbd className="ms-kbd">↑</kbd><kbd className="ms-kbd">↓</kbd> navegar</span>
                <span className="ms-hint"><kbd className="ms-kbd">Enter</kbd> elegir</span>
                <span className="ms-hint"><kbd className="ms-kbd">Esc</kbd> cerrar</span>
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
