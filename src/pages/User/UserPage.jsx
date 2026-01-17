import { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Images } from '@assets';
import {
  USER_MOCK_DATA,
  MY_ORDER_MENU,
  TOOLS_MENU,
} from '@data';
import './UserPage.scss';

const ICON_MAP = {
  creditCard: Images.creditCardIcon,
  shoppingBag: Images.shoppingBag01,
  folderDownload: Images.downloadPackage,
  circleCheck: Images.wavyCheck,
  heart02: Images.heart02Icon,
  bookOpen: Images.bookOpenIcon,
  ticketVoucher: Images.ticketVoucherIcon,
  puzzle: Images.puzzleIcon,
  star: Images.starIcon,
  chatDots: Images.chatDotsIcon,
  mapPin: Images.mapPinIcon,
};

// 桌面版訂單資料 - 完全對應 Figma 設計
const DESKTOP_ORDERS = [
  {
    id: '12345678',
    status: 'pending_receipt',
    statusText: '待收貨',
    totalPrice: 590,
    products: [
      { image: Images.productImage1 },
      { image: Images.productImage2 },
      { image: Images.productImage3 },
      { image: Images.productImage4 },
    ],
    actions: [
      { key: 'review', label: '評價', type: 'secondary' },
      { key: 'refund', label: '申請退貨', type: 'secondary' },
      { key: 'confirm', label: '確認收貨', type: 'primary' },
    ],
  },
  {
    id: '12345678',
    status: 'pending_payment',
    statusText: '待付款',
    totalPrice: 590,
    products: [
      { image: Images.productImage5 },
      { image: Images.productImage6 },
    ],
    actions: [
      { key: 'edit', label: '修改資料', type: 'secondary' },
      { key: 'cancel', label: '取消訂單', type: 'primary' },
    ],
  },
  {
    id: '12345678',
    status: 'completed',
    statusText: '已完成',
    totalPrice: 590,
    products: [
      { image: Images.productImage7 },
    ],
    actions: [
      { key: 'viewReview', label: '查看評價', type: 'secondary' },
      { key: 'buyAgain', label: '再買一次', type: 'primary' },
    ],
  },
];

const UserPage = () => {
  const user = USER_MOCK_DATA;
  const navigate = useNavigate();
  const [activeOrderStatus, setActiveOrderStatus] = useState('pending_receipt');
  const [activeTool, setActiveTool] = useState('history');

  const handleMenuItemClick = useCallback((key) => {
    console.log(`Clicked: ${key}`);
  }, []);

  const handleOrderStatusClick = useCallback((key) => {
    setActiveOrderStatus(key);
  }, []);

  const handleToolClick = useCallback((key) => {
    setActiveTool(key);
  }, []);

  const handleActionClick = useCallback((action, orderId) => {
    console.log(`Action: ${action}, Order: ${orderId}`);
  }, []);

  return (
    <>
      {/* ==================== 手機版 ==================== */}
      <div className="user-page-mobile">
        {/* 上方 Header Bar */}
        <div className="user-page-mobile__header-bar">
          <button
            className="user-page-mobile__header-btn user-page-mobile__header-btn--left"
            onClick={() => navigate('/')}
            aria-label="返回"
          >
            <img src={Images.chevronLeftIcon} alt="" />
          </button>

          <h1 className="user-page-mobile__header-title">會員</h1>

          <div className="user-page-mobile__header-actions">
            <button
              className="user-page-mobile__header-action-btn"
              aria-label="幫助"
            >
              <img src={Images.circleHelpIcon} alt="" />
            </button>
            <button
              className="user-page-mobile__header-action-btn"
              aria-label="通知"
            >
              <img src={Images.bellIcon} alt="" />
            </button>
            <button
              className="user-page-mobile__header-action-btn"
              aria-label="設定"
            >
              <img src={Images.settingsIcon} alt="" />
            </button>
          </div>
        </div>

        {/* 會員資訊區塊 */}
        <div className="user-page-mobile__member-section">
          <div className="user-page-mobile__avatar">
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} />
            ) : (
              <img src={Images.productImage1} alt="avatar" />
            )}
          </div>
          <h2 className="user-page-mobile__member-name">{user.name}</h2>
        </div>

        {/* 我的訂單區塊 */}
        <section className="user-page-mobile__section">
          <div className="user-page-mobile__section-header">
            <h3 className="user-page-mobile__section-title">我的訂單</h3>
            <Link to="/user/orders" className="user-page-mobile__view-all">
              全部訂單
              <img src={Images.chevronRightMd} alt="" />
            </Link>
          </div>

          <nav className="user-page-mobile__order-menu">
            {MY_ORDER_MENU.map((item) => (
              <Link
                key={item.key}
                to={`/user/orders?status=${item.key}`}
                className={`user-page-mobile__order-item ${activeOrderStatus === item.key ? 'user-page-mobile__order-item--active' : ''}`}
                onClick={() => handleMenuItemClick(item.key)}
              >
                <div className="user-page-mobile__order-icon">
                  <img src={ICON_MAP[item.icon]} alt="" />
                </div>
                <span className="user-page-mobile__order-label">{item.label}</span>
              </Link>
            ))}
          </nav>
        </section>

        {/* 分隔線 */}
        <div className="user-page-mobile__divider"></div>

        {/* 常用工具區塊 */}
        <section className="user-page-mobile__section">
          <h3 className="user-page-mobile__section-title">常用工具</h3>

          <nav className="user-page-mobile__tools-menu">
            {TOOLS_MENU.map((item) => (
              <Link
                key={item.key}
                to={`/user/${item.key}`}
                className={`user-page-mobile__tool-item ${activeTool === item.key ? 'user-page-mobile__tool-item--active' : ''}`}
                onClick={() => handleMenuItemClick(item.key)}
              >
                <div className="user-page-mobile__tool-icon">
                  <img src={ICON_MAP[item.icon]} alt="" />
                </div>
                <span className="user-page-mobile__tool-label">{item.label}</span>
              </Link>
            ))}
          </nav>
        </section>
      </div>

      {/* ==================== 桌面版 ==================== */}
      <div className="user-page-desktop">
        {/* Profile Section */}
        <section className="user-page-desktop__profile">
          <div className="user-page-desktop__profile-avatar">
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} />
            ) : (
              <img src={Images.productImage1} alt="avatar" />
            )}
          </div>
          <h2 className="user-page-desktop__profile-name">{user.name}</h2>
          <div className="user-page-desktop__profile-actions">
            <button className="user-page-desktop__profile-action-btn" aria-label="幫助">
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                <path d="M11.4331 11.342C11.6466 10.6842 12.0377 10.0987 12.5635 9.64936C13.0893 9.20001 13.7297 8.90472 14.4128 8.79635C15.0959 8.68797 15.7953 8.7705 16.4343 9.03503C17.0734 9.29957 17.6268 9.73593 18.0334 10.2954C18.4401 10.8549 18.6836 11.5157 18.738 12.2052C18.7923 12.8947 18.6548 13.586 18.3409 14.2023C18.0269 14.8186 17.5492 15.3356 16.9595 15.697C16.3698 16.0584 15.6916 16.2497 15 16.2497V17.5003M15 26.25C8.7868 26.25 3.75 21.2132 3.75 15C3.75 8.7868 8.7868 3.75 15 3.75C21.2132 3.75 26.25 8.7868 26.25 15C26.25 21.2132 21.2132 26.25 15 26.25ZM15.0623 21.25V21.375L14.9377 21.3752V21.25H15.0623Z" stroke="#2C2C2C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
        </section>

        {/* Main Container */}
        <div className="user-page-desktop__container">
          {/* Left Sidebar */}
          <aside className="user-page-desktop__sidebar">
            {/* 我的訂單 Card */}
            <div className="user-page-desktop__card user-page-desktop__card--orders">
              <div className="user-page-desktop__card-header">
                <h3 className="user-page-desktop__card-title">我的訂單</h3>
                <Link to="/user/orders" className="user-page-desktop__card-link">
                  全部訂單
                  <img src={Images.chevronRightMd} alt="" />
                </Link>
              </div>
              <nav className="user-page-desktop__menu">
                {MY_ORDER_MENU.map((item) => (
                  <button
                    key={item.key}
                    className={`user-page-desktop__menu-item ${activeOrderStatus === item.key ? 'user-page-desktop__menu-item--active' : ''}`}
                    onClick={() => handleOrderStatusClick(item.key)}
                  >
                    <div className="user-page-desktop__menu-icon">
                      <img src={ICON_MAP[item.icon]} alt="" />
                    </div>
                    <span className="user-page-desktop__menu-label">{item.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* 常用工具 Card */}
            <div className="user-page-desktop__card user-page-desktop__card--tools">
              <div className="user-page-desktop__card-header">
                <h3 className="user-page-desktop__card-title">常用工具</h3>
              </div>
              <nav className="user-page-desktop__menu">
                {TOOLS_MENU.map((item) => (
                  <Link
                    key={item.key}
                    to={`/user/${item.key}`}
                    className={`user-page-desktop__menu-item ${activeTool === item.key ? 'user-page-desktop__menu-item--active' : ''}`}
                    onClick={() => handleToolClick(item.key)}
                  >
                    <div className="user-page-desktop__menu-icon">
                      <img src={ICON_MAP[item.icon]} alt="" />
                    </div>
                    <span className="user-page-desktop__menu-label">{item.label}</span>
                  </Link>
                ))}
              </nav>
            </div>
          </aside>

          {/* Orders Content */}
          <div className="user-page-desktop__content">
            <h3 className="user-page-desktop__content-title">最近訂單</h3>

            {/* Table Header */}
            <div className="user-page-desktop__table-header">
              <div className="user-page-desktop__table-col user-page-desktop__table-col--id">訂單編號</div>
              <div className="user-page-desktop__table-col user-page-desktop__table-col--products">商品</div>
              <div className="user-page-desktop__table-col user-page-desktop__table-col--total">總價</div>
              <div className="user-page-desktop__table-col user-page-desktop__table-col--status">狀態</div>
            </div>

            {/* Orders List */}
            <div className="user-page-desktop__orders-list">
              {DESKTOP_ORDERS.map((order, index) => (
                <div key={index} className="user-page-desktop__order-item">
                  {/* Order Info Row */}
                  <div className="user-page-desktop__order-row">
                    <div className="user-page-desktop__order-id">{order.id}</div>
                    <div className="user-page-desktop__order-products">
                      <div className="user-page-desktop__products-wrapper">
                        {order.products.map((product, idx) => (
                          <div key={idx} className="user-page-desktop__product-thumb">
                            <img
                              src={product.image}
                              alt={`Product ${idx + 1}`}
                            />
                          </div>
                        ))}
                      </div>
                      <div className="user-page-desktop__products-fade"></div>
                    </div>
                    <div className="user-page-desktop__order-total">${order.totalPrice}</div>
                    <div className="user-page-desktop__order-status">{order.statusText}</div>
                  </div>

                  {/* Order Actions */}
                  <div className="user-page-desktop__order-actions">
                    {order.actions.map((action) => (
                      <button
                        key={action.key}
                        className={`user-page-desktop__action-btn user-page-desktop__action-btn--${action.type}`}
                        onClick={() => handleActionClick(action.key, order.id)}
                      >
                        {action.label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserPage;
