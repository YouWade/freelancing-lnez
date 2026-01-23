import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@hooks/useCart';
import { Images } from '@assets';
import CartItem from '@components/Cart/CartItem';
import MobileHeaderBar from '@components/common/MobileHeaderBar';
import './CartPage.scss';

const CartPage = () => {
  const navigate = useNavigate();

  // 使用 CartContext
  const { cartItems, updateCartItem, removeCartItem, getTotalPrice, loading } = useCart();

  const [checkedItems, setCheckedItems] = useState({});

  // 初始化所有商品為選中狀態
  useEffect(() => {
    if (cartItems.length > 0 && Object.keys(checkedItems).length === 0) {
      const initialChecked = {};
      cartItems.forEach(item => {
        initialChecked[item.id] = item.selected !== false; // 預設全選
      });
      setCheckedItems(initialChecked);
    }
  }, [cartItems, checkedItems]);

  // 計算小計（所有商品）
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  // 計算折扣 (假設固定折扣)
  const discount = 190;
  // 計算總額（所有商品）
  const total = subtotal - discount;

  // 計算選中商品的總額
  const selectedTotal = useMemo(() => {
    const selectedSubtotal = cartItems.reduce((sum, item) => {
      return checkedItems[item.id] ? sum + item.price * item.quantity : sum;
    }, 0);
    return selectedSubtotal - discount;
  }, [cartItems, checkedItems, discount]);

  // 檢查是否全選
  const allChecked = cartItems.length > 0 && cartItems.every(item => checkedItems[item.id]);

  // 更新數量
  const handleQuantityChange = async (id, quantity) => {
    if (quantity < 1) return;
    await updateCartItem(id, { quantity });
  };

  // 移除商品
  const handleRemoveItem = async (id) => {
    await removeCartItem(id);
    const newCheckedItems = { ...checkedItems };
    delete newCheckedItems[id];
    setCheckedItems(newCheckedItems);
  };

  // 更新 checkbox 状态
  const handleCheckChange = (id, checked) => {
    setCheckedItems({
      ...checkedItems,
      [id]: checked,
    });
  };

  // 全選/取消全選
  const handleSelectAll = (checked) => {
    if (allChecked) {
      // 如果已全選，點擊時取消全選
      setCheckedItems({});
    } else {
      // 如果未全選，點擊時全選
      const newCheckedItems = {};
      cartItems.forEach(item => {
        newCheckedItems[item.id] = true;
      });
      setCheckedItems(newCheckedItems);
    }
  };

  // 处理摘要区域的 radio 切换
  const handleSummaryRadioChange = () => {
    if (allChecked) {
      // 如果已经全选，点击则取消全选
      setCheckedItems({});
    } else {
      // 否则全选
      const newCheckedItems = {};
      cartItems.forEach(item => {
        newCheckedItems[item.id] = true;
      });
      setCheckedItems(newCheckedItems);
    }
  };

  // 下一步 - 導向付款頁面
  // TODO: 之後可以加入登入檢查
  const handleNextStep = (isMobile = false) => {
    // 根據裝置類型決定要傳遞的商品
    // Desktop: 傳遞所有商品
    // Mobile: 傳遞已選取的商品
    let selectedItems;
    if (isMobile) {
      // 手機版：只傳遞已選取的商品
      selectedItems = cartItems.filter(item => checkedItems[item.id]);
    } else {
      // 桌面版：傳遞所有商品
      selectedItems = cartItems;
    }

    // 開發階段：直接導向付款頁面，並傳遞購物車資料
    navigate('/payment', {
      state: {
        cartItems: selectedItems,
        isMobile,
        discount,
      }
    });

    // 正式版本：檢查登入狀態
    // const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    // const user = localStorage.getItem('user') || sessionStorage.getItem('user');
    // if (!token && !user) {
    //   navigate('/login');
    // } else {
    //   navigate('/payment', { state: { cartItems: selectedItems, isMobile, discount } });
    // }
  };

  return (
    <>
      {/* 手機版 Header */}
      <MobileHeaderBar title="購物車" />

      <div className="cart-page">
        {loading && (
          <div className="cart-page__loading">
            <div className="cart-page__loading-spinner"></div>
            <p>載入中...</p>
          </div>
        )}

        <div className="cart-page__wrapper">
          {/* 購物車商品列表 */}
          <div className="cart-page__content">
            {/* 表頭 */}
            <div className="cart-page__header">
              <div className="cart-page__header-item cart-page__header-product">商品</div>
              <div className="cart-page__header-item cart-page__header-price">價錢</div>
              <div className="cart-page__header-item cart-page__header-quantity">數量</div>
              <div className="cart-page__header-item cart-page__header-total">總價</div>
            </div>

            {/* 商品列表 */}
            <div className="cart-page__list">
              {cartItems.length === 0 ? (
                <div className="cart-page__empty">
                  <p>購物車目前沒有商品</p>
                  <button
                    className="cart-page__empty-button"
                    onClick={() => navigate('/')}
                  >
                    前往購物
                  </button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onQuantityChange={handleQuantityChange}
                    onRemove={handleRemoveItem}
                    isChecked={checkedItems[item.id]}
                    onCheckChange={handleCheckChange}
                  />
                ))
              )}
            </div>

            {/* 手機版摘要 - 平板版使用 */}
            <div className="cart-page__mobile-summary">
              <div className="cart-page__mobile-summary-item">
                <div className="cart-page__mobile-summary-radio">
                  <input 
                    type="radio" 
                    checked={allChecked}
                    onChange={() => handleSelectAll()}
                    onClick={() => handleSelectAll()}
                  />
                </div>
                <span className="cart-page__mobile-summary-label">全部</span>
                <span className="cart-page__mobile-summary-value">${Math.max(0, selectedTotal)}</span>
              </div>
              <button className="cart-page__mobile-button" onClick={() => handleNextStep(true)}>
                下一步
              </button>
            </div>

            {/* 手機版底部摘要 */}
            <div className="cart-page__mobile-footer-summary">
              <div className="cart-page__mobile-footer-item">
                <div className="cart-page__mobile-footer-radio">
                  <input
                    type="radio"
                    id="footer-select-all"
                    className="cart-page__mobile-footer-radio-input"
                    checked={allChecked}
                    onChange={() => handleSelectAll()}
                    onClick={() => handleSelectAll()}
                  />
                  <label htmlFor="footer-select-all" className="cart-page__mobile-footer-radio-label">
                    <span className="cart-page__mobile-footer-radio-button"></span>
                  </label>
                </div>
                <span className="cart-page__mobile-footer-label">全部</span>
                <span className="cart-page__mobile-footer-value">${Math.max(0, selectedTotal)}</span>
              </div>
              <button className="cart-page__mobile-footer-button" onClick={() => handleNextStep(true)}>
                下一步
              </button>
            </div>
          </div>

          {/* 總計區域 - 桌面版 */}
          <div className="cart-page__summary">
            <h3 className="cart-page__summary-title">小計</h3>
            
            <div className="cart-page__summary-items">
              <div className="cart-page__summary-item">
                <span className="cart-page__summary-label">總計</span>
                <span className="cart-page__summary-value">${subtotal}</span>
              </div>

              <div className="cart-page__summary-item">
                <span className="cart-page__summary-label">折扣</span>
                <span className="cart-page__summary-value">${discount}</span>
              </div>
            </div>

            <div className="cart-page__summary-divider"></div>

            <div className="cart-page__summary-item cart-page__summary-total">
              <span className="cart-page__summary-label">總結</span>
              <span className="cart-page__summary-value">${total}</span>
            </div>

            <button className="cart-page__button" onClick={() => handleNextStep(false)}>
              下一步
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;
