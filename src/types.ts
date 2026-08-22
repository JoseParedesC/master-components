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

export interface MasterSelectorProps<T> {
  value?: T | null;
  onChange: (value: T | null) => void;
  search: MasterSearchFn<T>;
  getOptionLabel: (item: T) => string;
  getOptionValue: (item: T) => string;

  placeholder?: string;
  disabled?: boolean;
  minSearchLength?: number;
  debounceMs?: number;
  pageSize?: number;
  allowInactive?: boolean;
  initialOptions?: T[];
  noResultsText?: string;
  loadingText?: string;
  errorText?: string;
  className?: string;
}