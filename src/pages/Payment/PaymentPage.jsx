import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Images } from '@assets';
import Carousel from '@components/Carousel/Carousel';
import './PaymentPage.scss';

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 從 CartPage 傳遞的資料
  const { cartItems: passedCartItems, discount: passedDiscount } = location.state || {};

  // 如果沒有傳遞資料，使用預設資料（防止直接訪問此頁面）
  const cartItems = passedCartItems || [
    {
      id: 1,
      image: Images.productImage1,
      name: '女士短版襯衫',
      price: 590,
      quantity: 1,
    },
    {
      id: 2,
      image: Images.productImage2,
      name: '女士短版襯衫',
      price: 590,
      quantity: 1,
    },
    {
      id: 3,
      image: Images.productImage3,
      name: '女士短版襯衫',
      price: 590,
      quantity: 1,
    },
  ];

  const discount = passedDiscount || 590;

  // 付款方式狀態
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  // 運送方式狀態
  const [shippingMethod, setShippingMethod] = useState('home-delivery');

  // 信用卡表單狀態
  const [creditCardForm, setCreditCardForm] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    billingAddress: '',
    postalCode: '',
  });

  // 宅配表單狀態
  const [shippingForm, setShippingForm] = useState({
    recipientName: '',
    phoneCountryCode: '+886',
    phoneNumber: '',
    address: '',
  });

  // 計算總額
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 590;
  const total = subtotal + shipping - discount;

  // 處理信用卡表單輸入
  const handleCreditCardChange = (field, value) => {
    setCreditCardForm(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  // 處理運送表單輸入
  const handleShippingChange = (field, value) => {
    setShippingForm(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  // 移除商品（手機版用）
  const handleRemoveItem = (id) => {
    // 這裡只是前端移除，實際應該更新 state 或 context
    console.log('Remove item:', id);
  };

  // 下一步處理
  const handleNextStep = () => {
    // TODO: 驗證表單並提交訂單
    console.log('Payment Method:', paymentMethod);
    console.log('Credit Card Form:', creditCardForm);
    console.log('Shipping Method:', shippingMethod);
    console.log('Shipping Form:', shippingForm);
    console.log('Cart Items:', cartItems);
    // navigate('/order-confirmation');
  };

  return (
    <>
      {/* 手機版 Header */}
      <div className="payment-page-mobile__header-bar">
        <button
          className="payment-page-mobile__header-btn payment-page-mobile__header-btn--left"
          onClick={() => navigate(-1)}
          aria-label="返回"
        >
          <img src={Images.chevronLeftIcon} alt="" />
        </button>

        <h1 className="payment-page-mobile__header-title">付款與運送</h1>

        <div className="payment-page-mobile__header-actions">
          <button
            className="payment-page-mobile__header-action-btn"
            aria-label="幫助"
          >
            <img src={Images.circleHelpIcon} alt="" />
          </button>
          <button
            className="payment-page-mobile__header-action-btn"
            aria-label="用户"
          >
            <img src={Images.userIcon} alt="" />
          </button>
        </div>
      </div>

      <div className="payment-page">
        <div className="payment-page__wrapper">
          {/* 左側表單區域 */}
          <div className="payment-page__form-section">
            {/* 付款方式 */}
            <div className="payment-page__section">
              <h2 className="payment-page__section-title">付款方式</h2>

              {/* 貨到付款 */}
              <div className="payment-page__option">
                <label className="payment-page__radio-wrapper">
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="payment-page__radio-input"
                  />
                  <span className="payment-page__radio-button"></span>
                  <span className="payment-page__option-label">貨到付款</span>
                </label>
                {paymentMethod === 'cod' && (
                  <span className="payment-page__option-note">滿999免運</span>
                )}
              </div>

              {/* 轉帳付款 */}
              <div className="payment-page__option">
                <label className="payment-page__radio-wrapper">
                  <input
                    type="radio"
                    name="payment"
                    value="transfer"
                    checked={paymentMethod === 'transfer'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="payment-page__radio-input"
                  />
                  <span className="payment-page__radio-button"></span>
                  <span className="payment-page__option-label">轉帳付款</span>
                </label>
              </div>

              {/* 信用卡付款 */}
              <div className="payment-page__option payment-page__option--expandable">
                <label className="payment-page__radio-wrapper">
                  <input
                    type="radio"
                    name="payment"
                    value="credit-card"
                    checked={paymentMethod === 'credit-card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="payment-page__radio-input"
                  />
                  <span className="payment-page__radio-button"></span>
                  <span className="payment-page__option-label">信用卡付款</span>
                </label>

                {paymentMethod === 'credit-card' && (
                  <div className="payment-page__form-fields">
                    {/* 第一行：卡片詳情 + 帳單地址（桌面版左右並排） */}
                    <div className="payment-page__form-row payment-page__form-row--credit-card">
                      <div className="payment-page__form-group payment-page__form-group--card-half">
                        <label className="payment-page__form-label">卡片詳情</label>
                        <div className="payment-page__input-wrapper payment-page__input-wrapper--with-icon">
                          <input
                            type="text"
                            className="payment-page__input"
                            placeholder="卡片詳情"
                            value={creditCardForm.cardNumber}
                            onChange={(e) => handleCreditCardChange('cardNumber', e.target.value)}
                          />
                          <img src={Images.cameraSmIcon} alt="" className="payment-page__input-icon" />
                        </div>
                      </div>
                      <div className="payment-page__form-group payment-page__form-group--card-half">
                        <label className="payment-page__form-label">帳單地址</label>
                        <input
                          type="text"
                          className="payment-page__input"
                          placeholder="地址"
                          value={creditCardForm.billingAddress}
                          onChange={(e) => handleCreditCardChange('billingAddress', e.target.value)}
                        />
                      </div>
                    </div>

                    {/* 第二行：到期日 + 安全驗證碼 + 郵遞區號（桌面版三欄） */}
                    <div className="payment-page__form-row payment-page__form-row--credit-card-second">
                      <div className="payment-page__form-group payment-page__form-group--quarter">
                        <input
                          type="text"
                          className="payment-page__input"
                          placeholder="到期日(MM/YY)"
                          value={creditCardForm.expiryDate}
                          onChange={(e) => handleCreditCardChange('expiryDate', e.target.value)}
                        />
                      </div>
                      <div className="payment-page__form-group payment-page__form-group--quarter">
                        <input
                          type="text"
                          className="payment-page__input"
                          placeholder="安全驗證碼"
                          value={creditCardForm.cvv}
                          onChange={(e) => handleCreditCardChange('cvv', e.target.value)}
                        />
                      </div>
                      <div className="payment-page__form-group payment-page__form-group--card-half">
                        <input
                          type="text"
                          className="payment-page__input"
                          placeholder="郵遞區號"
                          value={creditCardForm.postalCode}
                          onChange={(e) => handleCreditCardChange('postalCode', e.target.value)}
                        />
                      </div>
                    </div>

                    {/* 第三行：持卡人名字 */}
                    <div className="payment-page__form-row">
                      <div className="payment-page__form-group payment-page__form-group--card-half">
                        <input
                          type="text"
                          className="payment-page__input"
                          placeholder="持卡人名字"
                          value={creditCardForm.cardholderName}
                          onChange={(e) => handleCreditCardChange('cardholderName', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 分隔線 */}
            <div className="payment-page__divider"></div>

            {/* 運送方式 */}
            <div className="payment-page__section">
              <h2 className="payment-page__section-title">運送方式</h2>

              {/* 7-11取貨 */}
              <div className="payment-page__option">
                <label className="payment-page__radio-wrapper">
                  <input
                    type="radio"
                    name="shipping"
                    value="7-eleven"
                    checked={shippingMethod === '7-eleven'}
                    onChange={(e) => setShippingMethod(e.target.value)}
                    className="payment-page__radio-input"
                  />
                  <span className="payment-page__radio-button"></span>
                  <span className="payment-page__option-label">7-11取貨</span>
                </label>
                {shippingMethod === '7-eleven' && (
                  <span className="payment-page__option-note">滿999免運</span>
                )}
              </div>

              {/* 全家取貨 */}
              <div className="payment-page__option">
                <label className="payment-page__radio-wrapper">
                  <input
                    type="radio"
                    name="shipping"
                    value="family-mart"
                    checked={shippingMethod === 'family-mart'}
                    onChange={(e) => setShippingMethod(e.target.value)}
                    className="payment-page__radio-input"
                  />
                  <span className="payment-page__radio-button"></span>
                  <span className="payment-page__option-label">全家取貨</span>
                </label>
                {shippingMethod === 'family-mart' && (
                  <span className="payment-page__option-note">滿999免運</span>
                )}
              </div>

              {/* 宅配到府 */}
              <div className="payment-page__option payment-page__option--expandable">
                <label className="payment-page__radio-wrapper">
                  <input
                    type="radio"
                    name="shipping"
                    value="home-delivery"
                    checked={shippingMethod === 'home-delivery'}
                    onChange={(e) => setShippingMethod(e.target.value)}
                    className="payment-page__radio-input"
                  />
                  <span className="payment-page__radio-button"></span>
                  <span className="payment-page__option-label">宅配到府</span>
                </label>

                {shippingMethod === 'home-delivery' && (
                  <div className="payment-page__form-fields">
                    {/* 桌面版：收件人姓名 + 手機號碼 同一行 */}
                    <div className="payment-page__form-row payment-page__form-row--shipping">
                      <div className="payment-page__form-group payment-page__form-group--shipping-name">
                        <label className="payment-page__form-label">收件人姓名</label>
                        <input
                          type="text"
                          className="payment-page__input"
                          placeholder="請輸入真實姓名"
                          value={shippingForm.recipientName}
                          onChange={(e) => handleShippingChange('recipientName', e.target.value)}
                        />
                      </div>

                      <div className="payment-page__form-group payment-page__form-group--shipping-phone">
                        <label className="payment-page__form-label">手機號碼</label>
                        <div className="payment-page__phone-input">
                          <div className="payment-page__phone-country">
                            <select
                              className="payment-page__select"
                              value={shippingForm.phoneCountryCode}
                              onChange={(e) => handleShippingChange('phoneCountryCode', e.target.value)}
                            >
                              <option value="+886">+886</option>
                              <option value="+1">+1</option>
                              <option value="+86">+86</option>
                            </select>
                            <img src={Images.caretDownMdIcon} alt="" className="payment-page__select-icon" />
                          </div>
                          <input
                            type="tel"
                            className="payment-page__input payment-page__input--phone"
                            placeholder="912345678"
                            value={shippingForm.phoneNumber}
                            onChange={(e) => handleShippingChange('phoneNumber', e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="payment-page__form-row">
                      <div className="payment-page__form-group payment-page__form-group--full">
                        <label className="payment-page__form-label">地址</label>
                        <input
                          type="text"
                          className="payment-page__input"
                          placeholder="請輸入真實地址"
                          value={shippingForm.address}
                          onChange={(e) => handleShippingChange('address', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 手機版: 訂單資訊區塊 */}
            <div className="payment-page__mobile-order-section">
              <div className="payment-page__mobile-divider"></div>

              <div className="payment-page__mobile-order">
                <h2 className="payment-page__section-title">訂單資訊</h2>

                {/* 商品列表 - Carousel */}
                <div className="payment-page__mobile-products">
                  <Carousel
                    items={cartItems}
                    spaceBetween={7}
                    slidesPerView="auto"
                    freeMode={true}
                    className="payment-page__mobile-carousel"
                  >
                    {(item) => (
                      <div className="payment-page__mobile-product">
                        <div className="payment-page__mobile-product-image">
                          <img src={item.image} alt="" />
                        </div>
                        <div className="payment-page__mobile-product-info">
                          <span className="payment-page__mobile-product-price">
                            ${item.price} ( {item.quantity} )
                          </span>
                          <button
                            className="payment-page__mobile-product-remove"
                            onClick={() => handleRemoveItem(item.id)}
                            aria-label="移除商品"
                          >
                            <img src={Images.trashFullIcon} alt="" />
                          </button>
                        </div>
                      </div>
                    )}
                  </Carousel>
                </div>

                {/* 費用明細 */}
                <div className="payment-page__mobile-summary-details">
                  <div className="payment-page__mobile-summary-item">
                    <span className="payment-page__mobile-summary-label">小計</span>
                    <span className="payment-page__mobile-summary-value">${subtotal}</span>
                  </div>
                  <div className="payment-page__mobile-summary-item">
                    <span className="payment-page__mobile-summary-label">運費</span>
                    <span className="payment-page__mobile-summary-value">${shipping}</span>
                  </div>
                  <div className="payment-page__mobile-summary-item">
                    <span className="payment-page__mobile-summary-label">折扣</span>
                    <span className="payment-page__mobile-summary-value">${discount}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 右側總計區域 - 桌面版 */}
          <div className="payment-page__summary">
            <h3 className="payment-page__summary-title">小計</h3>

            {/* 商品列表 */}
            <div className="payment-page__summary-products">
              {cartItems.map((item) => (
                <div key={item.id} className="payment-page__summary-product">
                  <div className="payment-page__summary-product-image">
                    <img src={item.image} alt="" />
                  </div>
                  <span className="payment-page__summary-product-price">
                    ${item.price} ({item.quantity})
                  </span>
                </div>
              ))}
            </div>

            {/* 費用明細 */}
            <div className="payment-page__summary-details">
              <div className="payment-page__summary-item">
                <span className="payment-page__summary-label">總計</span>
                <span className="payment-page__summary-value">${subtotal}</span>
              </div>
              <div className="payment-page__summary-item">
                <span className="payment-page__summary-label">運費</span>
                <span className="payment-page__summary-value">${shipping}</span>
              </div>
              <div className="payment-page__summary-item">
                <span className="payment-page__summary-label">折扣</span>
                <span className="payment-page__summary-value">${discount}</span>
              </div>
            </div>

            <div className="payment-page__summary-divider"></div>

            <div className="payment-page__summary-item payment-page__summary-total">
              <span className="payment-page__summary-label">總結</span>
              <span className="payment-page__summary-value">${total}</span>
            </div>

            <button className="payment-page__button" onClick={handleNextStep}>
              下一步
            </button>
          </div>
        </div>

        {/* 手機版底部按鈕 */}
        <div className="payment-page__mobile-footer">
          <span className="payment-page__mobile-footer-label">總結</span>
          <span className="payment-page__mobile-footer-value">${total}</span>
          <button className="payment-page__mobile-footer-button" onClick={handleNextStep}>
            結帳
          </button>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
