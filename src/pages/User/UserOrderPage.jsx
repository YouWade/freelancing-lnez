import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Images } from '@assets';
import { ORDERS_MOCK_DATA } from '@data';
import Carousel from '@components/Carousel/Carousel';
import './UserOrderPage.scss';

const ACTION_BUTTON_MAP = {
  confirm: { label: '確認收貨', type: 'primary' },
  refund: { label: '申請退貨', type: 'secondary' },
  review: { label: '評價', type: 'secondary' },
  cancel: { label: '取消訂單', type: 'primary' },
  edit: { label: '修改資料', type: 'secondary' },
  buyAgain: { label: '再買一次', type: 'primary' },
  viewReview: { label: '查看評價', type: 'secondary' },
};

const UserOrderPage = () => {
  const navigate = useNavigate();
  const [activeStatus, setActiveStatus] = useState('all');
  const [displayedOrders, setDisplayedOrders] = useState(ORDERS_MOCK_DATA);

  useEffect(() => {
    if (activeStatus === 'all') {
      setDisplayedOrders(ORDERS_MOCK_DATA);
    } else {
      setDisplayedOrders(ORDERS_MOCK_DATA.filter((order) => order.status === activeStatus));
    }
  }, [activeStatus]);

  const handleStatusClick = useCallback((statusKey) => {
    setActiveStatus(statusKey);
  }, []);

  const handleActionClick = useCallback((action, orderId) => {
    console.log(`Action: ${action}, Order: ${orderId}`);
  }, []);

  return (
    <div className="user-order-page">
      {/* Header Bar - Mobile */}
      <div className="user-order-page__header-bar">
        <button
          className="user-order-page__back-btn"
          onClick={() => navigate('/user')}
          aria-label="返回"
        >
          <img src={Images.chevronLeftIcon} alt="" />
        </button>
        <h1 className="user-order-page__header-title">訂單</h1>
        <div className="user-order-page__header-icons">
          <button className="user-order-page__header-icon-btn" aria-label="搜尋">
            <img src={Images.searchWhite} alt="" />
          </button>
          <button className="user-order-page__header-icon-btn" aria-label="幫助">
            <img src={Images.circleHelpIcon} alt="" />
          </button>
        </div>
      </div>

      {/* Status Filter Tabs - Mobile */}
      <div className="user-order-page__filter-bar">
        <button
          className={`user-order-page__filter-tab ${activeStatus === 'all' ? 'user-order-page__filter-tab--active' : ''}`}
          onClick={() => handleStatusClick('all')}
        >
          全部訂單
        </button>
        <button
          className={`user-order-page__filter-tab ${activeStatus === 'pending_payment' ? 'user-order-page__filter-tab--active' : ''}`}
          onClick={() => handleStatusClick('pending_payment')}
        >
          待付款
        </button>
        <button
          className={`user-order-page__filter-tab ${activeStatus === 'pending_shipment' ? 'user-order-page__filter-tab--active' : ''}`}
          onClick={() => handleStatusClick('pending_shipment')}
        >
          待出貨
        </button>
        <button
          className={`user-order-page__filter-tab ${activeStatus === 'pending_receipt' ? 'user-order-page__filter-tab--active' : ''}`}
          onClick={() => handleStatusClick('pending_receipt')}
        >
          待收貨
        </button>
        <button
          className={`user-order-page__filter-tab ${activeStatus === 'return_refund' ? 'user-order-page__filter-tab--active' : ''}`}
          onClick={() => handleStatusClick('return_refund')}
        >
          退貨/退款
        </button>
      </div>

      {/* Orders List */}
      <div className="user-order-page__orders-list">
        {displayedOrders.length === 0 ? (
          <div className="user-order-page__empty">
            <p>暫無訂單</p>
          </div>
        ) : (
          displayedOrders.map((order) => (
            <div key={order.id} className="user-order-page__order-card">
              {/* Order Header */}
              <div className="user-order-page__order-header">
                <div className="user-order-page__order-id">訂單編號：{order.id}</div>
                <div className="user-order-page__order-status">{order.statusText}</div>
              </div>

              {/* Product Images */}
              <div className="user-order-page__order-products">
                <Carousel
                  items={order.products}
                  spaceBetween={3}
                  className="user-order-page__carousel"
                >
                  {(product, idx) => (
                    <div className="user-order-page__product-image-wrapper">
                      <img
                        src={product.image}
                        alt={`Product ${idx + 1}`}
                        className="user-order-page__product-image"
                      />
                    </div>
                  )}
                </Carousel>
              </div>

              {/* Order Actions */}
              <div className="user-order-page__order-actions">
                {order.actions.map((action) => {
                  const btnConfig = ACTION_BUTTON_MAP[action];
                  if (!btnConfig) return null;
                  return (
                    <button
                      key={action}
                      className={`user-order-page__action-btn user-order-page__action-btn--${btnConfig.type}`}
                      onClick={() => handleActionClick(action, order.id)}
                    >
                      {btnConfig.label}
                    </button>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserOrderPage;
