import { AuthProvider } from './AuthContext';
import { CartProvider } from './CartContext';

/**
 * AppProvider - 整合所有 Context Provider
 * 統一管理應用程式的全局狀態
 */
export const AppProvider = ({ children }) => {
  return (
    <AuthProvider>
      <CartProvider>
        {children}
      </CartProvider>
    </AuthProvider>
  );
};
