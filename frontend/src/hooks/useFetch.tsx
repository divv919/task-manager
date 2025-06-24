import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";
export const useFetch = (url: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState<
    { status: string; title: string; id: number }[] | null
  >(null);
  const { token } = useAuth();
  async function fetchData(url: string) {
    try {
      setLoading(true);
      const response = await fetch(url, {
        headers: {
          ...(token ? { Authorization: token } : {}),
        },
      });
      if (!response.ok) {
        throw new Error("Error fetching");
      }
      const json = await response.json();
      setData(json);
    } catch (err) {
      console.log("error fethign : ", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchData(url);
  }, [url]);
  const reFetch = async () => {
    await fetchData(url);
  };
  return { reFetch, data, loading, error };
};
