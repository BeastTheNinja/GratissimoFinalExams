import { useCallback, useEffect, useState } from "react";

import api from "../services/api";

function useFetch<T>(endpoint: string) {
  // Hooket samler den fælles logik for API-kald
  // hver især skal håndtere loading fejl og data
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // useCallback sørger for at fetchData ikke bliver oprettet på ny ved
  // hver render så useEffect ikke laver unødvendige API-kald
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await api<T>(endpoint);

      setData(result);
    } catch {
      setError("Could not fetch data.");
    } finally {
      setLoading(false);
    }
    // Endpoint er en dependency fordi et nyt endpoint skal starte et nyt fetch
  }, [endpoint]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
}

export default useFetch;