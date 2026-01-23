import { useState, useCallback } from 'react';

/**
 * useApi Hook
 * 通用的 API 請求 Hook
 */
export const useApi = (apiFunc) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(
    async (...args) => {
      try {
        setLoading(true);
        setError(null);
        const response = await apiFunc(...args);
        setData(response.data);
        return { success: true, data: response.data };
      } catch (err) {
        setError(err.message);
        return { success: false, error: err.message };
      } finally {
        setLoading(false);
      }
    },
    [apiFunc]
  );

  return { data, loading, error, execute };
};

/**
 * useApiCallback Hook
 * 用於不需要自動執行的 API 請求
 */
export const useApiCallback = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async (apiFunc, ...args) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiFunc(...args);
      return { success: true, data: response.data };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, execute };
};
