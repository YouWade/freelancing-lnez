import { useState, useEffect } from 'react';
import { productsApi } from '@services/api/products.api';

/**
 * useProducts Hook
 * 獲取所有產品資料
 */
export const useProducts = (params = {}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await productsApi.getAll(params);
      setProducts(response.data);
      setHasMore(response.hasMore);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(params)]);

  return { products, loading, error, hasMore, refetch: fetchProducts };
};

/**
 * useProductSearch Hook
 * 搜尋產品（支援篩選）
 */
export const useProductSearch = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const search = async (searchParams) => {
    try {
      setLoading(true);
      setError(null);
      const response = await productsApi.search(searchParams);
      setResults(response.data);
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { results, loading, error, search };
};

/**
 * useBestSellers Hook
 * 獲取暢銷產品
 */
export const useBestSellers = (limit = 10) => {
  const [bestSellers, setBestSellers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await productsApi.getBestSellers(limit);
        setBestSellers(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBestSellers();
  }, [limit]);

  return { bestSellers, loading, error };
};

/**
 * useNewArrivals Hook
 * 獲取新品上架
 */
export const useNewArrivals = (limit = 10) => {
  const [newArrivals, setNewArrivals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await productsApi.getNewArrivals(limit);
        setNewArrivals(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNewArrivals();
  }, [limit]);

  return { newArrivals, loading, error };
};

/**
 * useProductDetail Hook
 * 獲取產品詳情
 */
export const useProductDetail = (productId) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!productId) return;

    const fetchProductDetail = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await productsApi.getDetail(productId);
        setProduct(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetail();
  }, [productId]);

  return { product, loading, error };
};
