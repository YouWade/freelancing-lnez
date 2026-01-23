import { useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Images } from '@assets';
import { ORDERS_MOCK_DATA, ORDER_STATUS_FILTERS } from '@data';
import Carousel from '@components/Carousel/Carousel';
import MobileHeaderBar from '@components/common/MobileHeaderBar';
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
  const [searchParams, setSearchParams] = useSearchParams();
  const activeStatus = searchParams.get('status') || 'all';

  const handleStatusClick = useCallback((statusKey) => {
    setSearchParams({ status: statusKey });
  }, [setSearchParams]);

  const displayedOrders = activeStatus === 'all'
    ? ORDERS_MOCK_DATA
    : ORDERS_MOCK_DATA.filter((order) => order.status === activeStatus);



  const handleActionClick = useCallback((action, orderId) => {
    // TODO: 處理訂單操作（付款、取消、評價、退款、確認收貨等）
  }, []);

  return (
    <>
      {/* ==================== 手機版 ==================== */}
      <div className="user-order-page">
        {/* Header Bar - Mobile */}
        <MobileHeaderBar title="訂單" backTo="/user" />

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
                    spaceBetween={5}
                    className="user-order-page__carousel"
                  >
                    {(product, idx) => (
                      <div className="user-order-page__product-image-wrapper">
                        <img
                          src={product.image}
                          alt={`Product ${idx + 1}`}
                          className="user-order-page__product-image"
                        />
                        <div className="user-order-page__product-price">
                          ${product.price} ({product.quantity || 1})
                        </div>
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

      {/* ==================== 桌面版 ==================== */}
      <div className="user-order-page-desktop">
        {/* 主內容區 */}
        <div className="user-order-page-desktop__container">
          {/* 左側邊欄 - 我的訂單 */}
          <aside className="user-order-page-desktop__sidebar">
            <h2 className="user-order-page-desktop__sidebar-title">我的訂單</h2>
            <nav className="user-order-page-desktop__sidebar-nav">
              {ORDER_STATUS_FILTERS.map((filter) => (
                <button
                  key={filter.key}
                  className={`user-order-page-desktop__sidebar-item ${
                    activeStatus === filter.key ? 'user-order-page-desktop__sidebar-item--active' : ''
                  }`}
                  onClick={() => handleStatusClick(filter.key)}
                >
                  {filter.label}
                </button>
              ))}
            </nav>
          </aside>

          {/* 右側訂單列表區 */}
          <section className="user-order-page-desktop__main">
            {/* 表頭 */}
            <div className="user-order-page-desktop__table-header">
              <span className="user-order-page-desktop__table-col user-order-page-desktop__table-col--id">訂單編號</span>
              <span className="user-order-page-desktop__table-col user-order-page-desktop__table-col--products">商品</span>
              <span className="user-order-page-desktop__table-col user-order-page-desktop__table-col--total">總價</span>
              <span className="user-order-page-desktop__table-col user-order-page-desktop__table-col--status">狀態</span>
            </div>

            {/* 訂單列表 */}
            <div className="user-order-page-desktop__orders-list">
              {displayedOrders.length === 0 ? (
                <div className="user-order-page-desktop__empty">
                  <p>暫無訂單</p>
                </div>
              ) : (
                displayedOrders.map((order) => (
                  <div key={order.id} className="user-order-page-desktop__order-item">
                    {/* 訂單資訊行 */}
                    <div className="user-order-page-desktop__order-row">
                      {/* 訂單編號 */}
                      <div className="user-order-page-desktop__order-id">{order.id}</div>

                      {/* 商品圖片序列 */}
                      <div className="user-order-page-desktop__order-products">
                        <Carousel
                          items={order.products}
                          spaceBetween={5}
                          slidesPerView="auto"
                          className="user-order-page-desktop__carousel"
                        >
                          {(product, idx) => (
                            <div className="user-order-page-desktop__product-thumb">
                              <img src={product.image} alt={`Product ${idx + 1}`} />
                            </div>
                          )}
                        </Carousel>
                        {/* 漸層遮罩 */}
                        <div className="user-order-page-desktop__products-fade" />
                      </div>

                      {/* 總價 */}
                      <div className="user-order-page-desktop__order-total">${order.totalPrice}</div>

                      {/* 狀態 */}
                      <div className="user-order-page-desktop__order-status">{order.statusText}</div>
                    </div>

                    {/* 操作按鈕 */}
                    <div className="user-order-page-desktop__order-actions">
                      {order.actions.map((action) => {
                        const btnConfig = ACTION_BUTTON_MAP[action];
                        if (!btnConfig) return null;
                        return (
                          <button
                            key={action}
                            className={`user-order-page-desktop__action-btn user-order-page-desktop__action-btn--${btnConfig.type}`}
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
          </section>
        </div>
      </div>
    </>
  );
};

export default UserOrderPage;
