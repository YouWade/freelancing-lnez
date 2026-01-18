import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Images } from '@assets';
import CartItem from '@components/Cart/CartItem';
import './CartPage.scss';

const CartPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      image: 'http://localhost:3845/assets/71641cfaf69b921d1c39cabaf7c005fa39d94ecf.png',
      name: '女士短版襯衫',
      price: 590,
      quantity: 1,
      color: '#77d8d8',
      size: 'S',
      totalPrice: 590,
    },
    {
      id: 2,
      image: 'http://localhost:3845/assets/cc84cb1ab4c7c9fb9bb5f1c5ca6061caf531e91f.png',
      name: '女士短版襯衫',
      price: 590,
      quantity: 1,
      color: '#6877fd',
      size: 'M',
      totalPrice: 590,
    },
    {
      id: 3,
      image: 'http://localhost:3845/assets/c3d6aed7d73fab26a5f8ffb3b08c3b05ef01aa6d.png',
      name: '女士短版襯衫',
      price: 590,
      quantity: 1,
      color: '#a73e3e',
      size: 'L',
      totalPrice: 590,
    },
    {
      id: 4,
      image: 'http://localhost:3845/assets/59dc5a81c8db7fce708ee699fb608fb86daa26e9.png',
      name: '女士短版襯衫',
      price: 590,
      quantity: 1,
      color: '#49adad',
      size: 'XL',
      totalPrice: 590,
    },
  ]);

  const [checkedItems, setCheckedItems] = useState({});

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
  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) return;
    setCartItems(
      cartItems.map((item) =>
        item.id === id
          ? { ...item, quantity, totalPrice: item.price * quantity }
          : item
      )
    );
  };

  // 移除商品
  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
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
    if (checked) {
      const newCheckedItems = {};
      cartItems.forEach(item => {
        newCheckedItems[item.id] = true;
      });
      setCheckedItems(newCheckedItems);
    } else {
      setCheckedItems({});
    }
  };

  // 下一步 - 檢查登入狀態
  const handleNextStep = () => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const user = localStorage.getItem('user') || sessionStorage.getItem('user');
    
    if (!token && !user) {
      navigate('/login');
    } else {
      navigate('/user');
    }
  };

  return (
    <>
      {/* 手機版 Header */}
      <div className="cart-page-mobile__header-bar">
        <button
          className="cart-page-mobile__header-btn cart-page-mobile__header-btn--left"
          onClick={() => navigate(-1)}
          aria-label="返回"
        >
          <img src={Images.chevronLeftIcon} alt="" />
        </button>

        <h1 className="cart-page-mobile__header-title">購物車</h1>

        <div className="cart-page-mobile__header-actions">
          <button
            className="cart-page-mobile__header-action-btn"
            aria-label="幫助"
          >
            <img src={Images.circleHelpIcon} alt="" />
          </button>
          <button
            className="cart-page-mobile__header-action-btn"
            aria-label="用户"
          >
            <img src={Images.userIcon} alt="" />
          </button>
        </div>
      </div>

      <div className="cart-page">
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
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onQuantityChange={handleQuantityChange}
                  onRemove={handleRemoveItem}
                  isChecked={checkedItems[item.id]}
                  onCheckChange={handleCheckChange}
                />
              ))}
            </div>

            {/* 手機版摘要 - 平板版使用 */}
            <div className="cart-page__mobile-summary">
              <div className="cart-page__mobile-summary-item">
                <div className="cart-page__mobile-summary-radio">
                  <input 
                    type="radio" 
                    checked={allChecked}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                  />
                </div>
                <span className="cart-page__mobile-summary-label">全部</span>
                <span className="cart-page__mobile-summary-value">${Math.max(0, selectedTotal)}</span>
              </div>
              <button className="cart-page__mobile-button" onClick={handleNextStep}>
                下一步
              </button>
            </div>

            {/* 手機版底部摘要 */}
            <div className="cart-page__mobile-footer-summary">
              <div className="cart-page__mobile-footer-item">
                <div className="cart-page__mobile-footer-radio">
                  <input 
                    type="radio" 
                    checked={allChecked}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                  />
                </div>
                <span className="cart-page__mobile-footer-label">全部</span>
                <span className="cart-page__mobile-footer-value">${Math.max(0, selectedTotal)}</span>
              </div>
              <button className="cart-page__mobile-footer-button" onClick={handleNextStep}>
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

            <button className="cart-page__button" onClick={handleNextStep}>
              下一步
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;
