import { AxiosResponse } from "axios";
import { useCallback, useState } from "react";

export function useFetch<T>(cb: () => Promise<AxiosResponse<T, any>>) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState<T | null>(null);

  const fetch = useCallback(async () => {
    if (loading) {
      return;
    }

    try {
      setLoading(true);
      const res = await cb();
      setData(res.data);
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [cb, loading]);

  return {
    loading,
    error,
    data,
    fetch,
  };
}