import { createContext, useState, useEffect } from 'react';
import { cartApi } from '@services/api/cart.api';
import { STORAGE_KEYS } from '@constants/storageKeys';
import { CART_MOCK_DATA } from '@data';

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // 初始化：從 localStorage 讀取購物車
  useEffect(() => {
    const savedCart = localStorage.getItem(STORAGE_KEYS.CART);
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCartItems(parsedCart);
      } catch (error) {
        console.error('Failed to parse cart from localStorage:', error);
      }
    } else {
      // TODO: 當 API 準備好時，從 API 獲取購物車資料
      // const response = await cartApi.getCart();
      // setCartItems(response.data);

      // 開發階段：使用 mock data
      setCartItems(CART_MOCK_DATA);
    }
  }, []);

  // 購物車變更時儲存到 localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cartItems));
  }, [cartItems]);

  // 新增商品到購物車
  const addToCart = async (item) => {
    try {
      setLoading(true);

      // TODO: 當 API 準備好時，使用 cartApi.addToCart(item)
      // const response = await cartApi.addToCart(item);

      // 檢查購物車中是否已有相同商品（相同 id, color, size）
      const existingItemIndex = cartItems.findIndex(
        (cartItem) =>
          cartItem.id === item.id &&
          cartItem.color === item.color &&
          cartItem.size === item.size
      );

      if (existingItemIndex > -1) {
        // 更新數量
        const updatedCart = [...cartItems];
        updatedCart[existingItemIndex].quantity += item.quantity || 1;
        setCartItems(updatedCart);
      } else {
        // 新增商品
        setCartItems([...cartItems, { ...item, quantity: item.quantity || 1 }]);
      }

      return { success: true };
    } catch (error) {
      console.error('Add to cart failed:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // 更新購物車商品數量
  const updateCartItem = async (itemId, updates) => {
    try {
      setLoading(true);

      // TODO: 當 API 準備好時，使用 cartApi.updateCartItem(itemId, updates)
      // const response = await cartApi.updateCartItem(itemId, updates);

      const updatedCart = cartItems.map((item) =>
        item.id === itemId ? { ...item, ...updates } : item
      );

      setCartItems(updatedCart);
      return { success: true };
    } catch (error) {
      console.error('Update cart item failed:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // 刪除購物車商品
  const removeCartItem = async (itemId) => {
    try {
      setLoading(true);

      // TODO: 當 API 準備好時，使用 cartApi.removeCartItem(itemId)
      // const response = await cartApi.removeCartItem(itemId);

      const updatedCart = cartItems.filter((item) => item.id !== itemId);
      setCartItems(updatedCart);
      return { success: true };
    } catch (error) {
      console.error('Remove cart item failed:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // 清空購物車
  const clearCart = async () => {
    try {
      setLoading(true);

      // TODO: 當 API 準備好時，使用 cartApi.clearCart()
      // const response = await cartApi.clearCart();

      setCartItems([]);
      return { success: true };
    } catch (error) {
      console.error('Clear cart failed:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // 計算購物車總數量
  const getTotalQuantity = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // 計算購物車總價
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const value = {
    cartItems,
    loading,
    addToCart,
    updateCartItem,
    removeCartItem,
    clearCart,
    getTotalQuantity,
    getTotalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
