import { useNavigate } from 'react-router-dom';
import { Images } from '@assets';
import MobileHeaderBar from '@components/common/MobileHeaderBar';
import './OrderCompletePage.scss';

const OrderCompletePage = () => {
  const navigate = useNavigate();

  const handleBrowseProducts = () => {
    navigate('/');
  };

  return (
    <>
      {/* 手機版 Header */}
      <MobileHeaderBar title="訂單完成" />

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
