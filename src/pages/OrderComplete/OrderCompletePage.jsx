import { useNavigate } from 'react-router-dom';
import { Images } from '@assets';
import './OrderCompletePage.scss';

const OrderCompletePage = () => {
  const navigate = useNavigate();

  const handleBrowseProducts = () => {
    navigate('/');
  };

  return (
    <>
      {/* 手機版 Header */}
      <div className="order-complete-mobile__header-bar">
        <button
          className="order-complete-mobile__header-btn order-complete-mobile__header-btn--left"
          onClick={() => navigate(-1)}
          aria-label="返回"
        >
          <img src={Images.chevronLeftIcon} alt="" />
        </button>

        <h1 className="order-complete-mobile__header-title">訂單完成</h1>

        <div className="order-complete-mobile__header-actions">
          <button
            className="order-complete-mobile__header-action-btn"
            aria-label="幫助"
          >
            <img src={Images.circleHelpIcon} alt="" />
          </button>
          <button
            className="order-complete-mobile__header-action-btn"
            aria-label="用户"
          >
            <img src={Images.userIcon} alt="" />
          </button>
        </div>
      </div>

      <div className="order-complete">
        <div className="order-complete__content">
          {/* 成功圖示 */}
          <div className="order-complete__icon">
            <img src={Images.circleCheckGreen} alt="成功" />
          </div>

          {/* 成功訊息 */}
          <h1 className="order-complete__title">付款成功</h1>

          {/* 按鈕 */}
          <button className="order-complete__button" onClick={handleBrowseProducts}>
            逛逛其他商品
          </button>
        </div>
      </div>
    </>
  );
};

export default OrderCompletePage;
