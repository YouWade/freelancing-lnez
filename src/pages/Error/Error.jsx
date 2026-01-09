import { useRouteError, Link } from 'react-router-dom';
import './Error.scss';

const Error = () => {
  const error = useRouteError();

  if (error.status === 404) {
    return (
      <div className="error">
        <div className="error__container">
          <div className="error__content">
            <h1 className="error__code">404</h1>
            <h2 className="error__title">頁面不存在</h2>
            <p className="error__message">抱歉，您訪問的頁面不存在或已被移除。</p>
            <Link to="/" className="error__button">
              返回首頁
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="error">
      <div className="error__container">
        <div className="error__content">
          <h1 className="error__code">錯誤</h1>
          <h2 className="error__title">發生了一些問題</h2>
          <p className="error__message">
            {error?.message || '抱歉，系統發生錯誤，請稍後再試。'}
          </p>
          <Link to="/" className="error__button">
            返回首頁
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Error;
