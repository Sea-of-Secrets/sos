import { useEffect, useState } from "react";

export function useFetch<T>(fetchPromise: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchPromise();
        setData(result);
        setLoading(false);
      } catch (e) {
        setError(true);
        setLoading(false);
      }
    };

    fetchData();

    // Cleanup 함수를 반환하여 컴포넌트가 언마운트될 때 실행되도록 합니다.
    return () => {
      // Cleanup 코드
    };
  }, [fetchPromise]); // fetchPromise가 변경될 때마다 useEffect가 실행됩니다.

  return { loading, error, data };
}
