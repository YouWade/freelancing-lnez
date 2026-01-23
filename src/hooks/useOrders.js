import { useState, useEffect } from 'react';
import { ordersApi } from '@services/api/orders.api';

/**
 * useOrders Hook
 * 獲取使用者訂單列表
 */
export const useOrders = (params = {}) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await ordersApi.getOrders(params);
      setOrders(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(params)]);

  return { orders, loading, error, refetch: fetchOrders };
};

/**
 * useOrderDetail Hook
 * 獲取訂單詳情
 */
export const useOrderDetail = (orderId) => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!orderId) return;

    const fetchOrderDetail = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await ordersApi.getOrderDetail(orderId);
        setOrder(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetail();
  }, [orderId]);

  return { order, loading, error };
};

/**
 * useCreateOrder Hook
 * 建立訂單
 */
export const useCreateOrder = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createOrder = async (orderData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await ordersApi.createOrder(orderData);
      return { success: true, data: response.data };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  return { createOrder, loading, error };
};
