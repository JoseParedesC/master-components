import { useCallback, useState } from "react";
import type { MasterSearchFn, MasterSearchResult } from "./types";

export function useMasterSearch<T>(searchFn: MasterSearchFn<T>) {
  const [data, setData] = useState<MasterSearchResult<T>>({
    items: []
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const search = useCallback(async (
    query: string,
    page = 1,
    pageSize = 20
  ) => {
    setLoading(true);
    setError(null);

    try {
      const result = await searchFn({
        query,
        page,
        pageSize
      });

      setData((previous) => ({
        ...result,
        items: page === 1
          ? result.items
          : [...previous.items, ...result.items]
      }));

      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [searchFn]);

  return {
    data,
    loading,
    error,
    search
  };
}