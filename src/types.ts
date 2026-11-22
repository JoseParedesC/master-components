import type { ReactNode } from "react";

export interface MasterBase {
  id: string;
  code: string;
  name: string;
  active?: boolean;
  [key: string]: unknown;
}

export interface MasterSearchResult<T> {
  items: T[];
  total?: number;
  page?: number;
  pageSize?: number;
  hasNextPage?: boolean;
}

export interface MasterSearchParams {
  entity: string;
  query: string;
  page: number;
  pageSize: number;
  signal?: AbortSignal;
}

export type MasterSearchFn<T> = (
  params: MasterSearchParams
) => Promise<MasterSearchResult<T>>;

export interface MasterOptionState {
  /** La opción tiene el foco del teclado / mouse. */
  active: boolean;
  /** La opción es el valor actualmente seleccionado. */
  selected: boolean;
  /** Texto que la persona ha escrito (para resaltar coincidencias). */
  query: string;
}

export interface MasterSelectorProps<T> {
  entity: string;
  value?: T | null;
  onChange: (value: T | null) => void;
  search: MasterSearchFn<T>;
  getOptionLabel: (item: T) => string;
  getOptionValue: (item: T) => string;

  /** Segunda línea opcional bajo la etiqueta (p. ej. tipo de cuenta). */
  getOptionDescription?: (item: T) => string | undefined;
  /** Render personalizado del contenido de cada opción. */
  renderOption?: (item: T, state: MasterOptionState) => ReactNode;

  placeholder?: string;
  disabled?: boolean;
  /** Muestra el botón para limpiar la selección. Default: true. */
  clearable?: boolean;
  /** Marca el campo con estilo de error. */
  invalid?: boolean;
  minSearchLength?: number;
  pageSize?: number;
  /** Espera (ms) tras la última tecla antes de buscar. Default: 250. */
  debounceMs?: number;
  allowInactive?: boolean;
  initialOptions?: T[];

  noResultsText?: string;
  loadingText?: string;
  errorText?: string;
  /** Usa `{min}` como marcador del mínimo de caracteres. */
  minLengthText?: string;
  loadMoreText?: string;
  retryText?: string;
  clearLabel?: string;

  className?: string;
  id?: string;
  /** Si se define, se renderiza un input oculto con el valor seleccionado (formularios nativos). */
  name?: string;
  autoFocus?: boolean;
  "aria-label"?: string;
  "aria-labelledby"?: string;
}
