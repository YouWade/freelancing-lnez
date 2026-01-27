import { useNavigate } from 'react-router-dom';
import { Images } from '@assets';
import './MobileHeaderBar.scss';

/**
 * MobileHeaderBar - 手機版頁面頂部導航列
 *
 * @param {string} title - 中央標題文字
 * @param {string} backTo - 返回目標路徑 (如 '/', '/user')，若不提供則使用 navigate(-1)
 * @param {boolean} isUserPage - 是否為會員頁面（會顯示幫助、通知、設定三個圖標）
 * @param {function} onBack - 自訂返回行為（優先於 backTo）
 */
const MobileHeaderBar = ({
  title,
  backTo,
  isUserPage = false,
  onBack,
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (backTo) {
      navigate(backTo);
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="mobile-header-bar">
      <button
        className="mobile-header-bar__back-btn"
        onClick={handleBack}
        aria-label="返回"
      >
        <img src={Images.chevronLeftIcon} alt="" />
      </button>

      <h1 className="mobile-header-bar__title">{title}</h1>

      <div className="mobile-header-bar__actions">
        {isUserPage ? (
          // 會員頁面：幫助、通知、設定
          <>
            <button
              className="mobile-header-bar__action-btn"
              aria-label="幫助"
            >
              <img src={Images.circleHelpIcon} alt="" />
            </button>
            <button
              className="mobile-header-bar__action-btn"
              aria-label="通知"
            >
              <img src={Images.bellIcon} alt="" />
            </button>
            <button
              className="mobile-header-bar__action-btn"
              aria-label="設定"
            >
              <img src={Images.settingsIcon} alt="" />
            </button>
          </>
        ) : (
          // 一般頁面：幫助、用戶
          <>
            <button
              className="mobile-header-bar__action-btn"
              aria-label="幫助"
            >
              <img src={Images.circleHelpIcon} alt="" />
            </button>
            <button
              className="mobile-header-bar__action-btn"
              onClick={() => navigate('/user')}
              aria-label="用户"
            >
              <img src={Images.userIcon} alt="" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default MobileHeaderBar;
