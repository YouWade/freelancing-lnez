import { useState, useCallback, useMemo } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import './AuthPage.scss';
import { Images } from '@assets';

const PAGE_CONTENT = {
  '/login': {
    title: '登入',
    subtitle: null,
    fields: ['account', 'password'],
    submitBtn: '登入',
    showRememberMe: true,
    showForgotPassword: true,
    forgotPasswordPosition: 'bottom',
    showSocialLogin: true,
    socialText: null,
    footerLink: { text: '忘記密碼？', path: '/forgot-password' },
    class: 'login'
  },
  '/register': {
    title: '建立新帳戶',
    subtitle: '請輸入真實資料',
    fields: ['name', 'account', 'password'],
    submitBtn: '註冊',
    showRememberMe: true,
    showForgotPassword: false,
    forgotPasswordPosition: null,
    showSocialLogin: true,
    socialText: null,
    footerLink: { text: '忘記密碼？', path: '/forgot-password' },
    class: 'register'
  },
  '/sso-login': {
    title: '歡迎回來！',
    subtitle: null,
    fields: ['account', 'password'],
    submitBtn: '登入',
    showRememberMe: true,
    showForgotPassword: true,
    forgotPasswordPosition: 'inline',
    showSocialLogin: true,
    socialText: '使用以下方式快速登入',
    footerLink: { text: '建立帳戶', path: '/register' },
    class: 'sso-login'
  }
};

const FIELD_CONFIG = {
  name: {
    label: '姓名',
    type: 'text',
    placeholder: ' ',
    hasToggle: false
  },
  account: {
    label: '帳號',
    type: 'text',
    placeholder: ' ',
    hasToggle: false
  },
  password: {
    label: '密碼',
    type: 'password',
    placeholder: ' ',
    hasToggle: true
  }
};

const INITIAL_FORM_STATE = {
  name: '',
  account: '',
  password: '',
  rememberMe: false
};

// ========================================
// API Functions (待串接 - 移到組件外)
// ========================================

/**
 * 登入 API
 * @param {Object} data - { account, password, rememberMe }
 */
const loginApi = async (data) => {
  // TODO: 串接登入 API
  console.log('Login API called:', data);
  // Example:
  // const response = await authService.login(data);
  // return response;
};

/**
 * 註冊 API
 * @param {Object} data - { name, account, password }
 */
const registerApi = async (data) => {
  // TODO: 串接註冊 API
  console.log('Register API called:', data);
  // Example:
  // const response = await authService.register(data);
  // return response;
};

/**
 * Google SSO 登入
 */
const googleLoginApi = async () => {
  // TODO: 串接 Google OAuth
  console.log('Google SSO login initiated');
  // Example:
  // window.location.href = authService.getGoogleAuthUrl();
};

/**
 * Apple SSO 登入
 */
const appleLoginApi = async () => {
  // TODO: 串接 Apple Sign In
  console.log('Apple SSO login initiated');
  // Example:
  // window.location.href = authService.getAppleAuthUrl();
};

// ========================================
// Component
// ========================================

const AuthPage = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [showPassword, setShowPassword] = useState(false);

  // 使用 useMemo 避免每次 render 重新計算
  const currentPage = useMemo(
    () => PAGE_CONTENT[pathname] || PAGE_CONTENT['/login'],
    [pathname]
  );

  // 使用 useCallback 避免子組件不必要的 re-render
  const handleInputChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  }, []);

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  const handleGoBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    const pageClass = currentPage.class;

    if (pageClass === 'login' || pageClass === 'sso-login') {
      await loginApi({
        account: formData.account,
        password: formData.password,
        rememberMe: formData.rememberMe
      });
    } else if (pageClass === 'register') {
      await registerApi({
        name: formData.name,
        account: formData.account,
        password: formData.password
      });
    }
  }, [currentPage.class, formData]);

  // 渲染單一欄位
  const renderField = useCallback((fieldName) => {
    const config = FIELD_CONFIG[fieldName];
    if (!config) return null;

    const inputType = config.hasToggle
      ? (showPassword ? 'text' : 'password')
      : config.type;

    return (
      <div key={fieldName} className="auth-page__field">
        <label className="auth-page__label">{config.label}</label>
        <div className="auth-page__input-wrapper">
          <input
            type={inputType}
            name={fieldName}
            value={formData[fieldName]}
            onChange={handleInputChange}
            placeholder={config.placeholder}
            className="auth-page__input"
          />
          {config.hasToggle && (
            <button
              type="button"
              className="auth-page__password-toggle"
              onClick={togglePasswordVisibility}
              aria-label={showPassword ? '隱藏密碼' : '顯示密碼'}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                {showPassword ? (
                  <>
                    <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/>
                  </>
                ) : (
                  <>
                    <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M1 12C1 12 5 20 12 20C19 20 23 12 23 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M3 21L21 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </>
                )}
              </svg>
            </button>
          )}
        </div>
      </div>
    );
  }, [formData, showPassword, handleInputChange, togglePasswordVisibility]);

  return (
    <div className={`auth-page auth-page--${currentPage.class}`}>
      {/* 返回按鈕 - 手機版 */}
      <button
        type="button"
        className="auth-page__back-btn"
        onClick={handleGoBack}
        aria-label="返回首頁"
      >
        <img src={Images.caretCircleLeft} alt='back home' />
      </button>

      <div className="auth-page__container">
        {/* 左側/上方：標題區 */}
        <div className="auth-page__header">
          <h1 className="auth-page__title">{currentPage.title}</h1>
          {currentPage.subtitle && (
            <p className="auth-page__subtitle">{currentPage.subtitle}</p>
          )}
        </div>

        {/* 右側：表單區 */}
        <div className="auth-page__content">
          <form className="auth-page__form" onSubmit={handleSubmit}>
            {/* 動態渲染欄位 */}
            {currentPage.fields.map(renderField)}

            {/* 記住我 & 忘記密碼 (inline) */}
            {(currentPage.showRememberMe || (currentPage.showForgotPassword && currentPage.forgotPasswordPosition === 'inline')) && (
              <div className="auth-page__options">
                {currentPage.showRememberMe && (
                  <label className="auth-page__checkbox">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleInputChange}
                    />
                    <span className="auth-page__checkbox-mark"></span>
                    <span className="auth-page__checkbox-text">記住我</span>
                  </label>
                )}
                {currentPage.showForgotPassword && currentPage.forgotPasswordPosition === 'inline' && (
                  <Link to="/forgot-password" className="auth-page__forgot-link">
                    忘記密碼？
                  </Link>
                )}
              </div>
            )}

            {/* 提交按鈕 */}
            <button type="submit" className="auth-page__submit-btn">
              {currentPage.submitBtn}
            </button>

            {/* 社交登入區 */}
            {currentPage.showSocialLogin && (
              <div className="auth-page__social">
                {currentPage.socialText && (
                  <>
                    <div className="auth-page__divider--social"></div>
                    <p className="auth-page__social-text">{currentPage.socialText}</p>
                  </>
                )}
                <div className="auth-page__social-buttons">
                  <button
                    type="button"
                    className="auth-page__social-btn auth-page__social-btn--google"
                    onClick={googleLoginApi}
                  >
                    使用Google帳號登入
                  </button>
                  <button
                    type="button"
                    className="auth-page__social-btn auth-page__social-btn--apple"
                    onClick={appleLoginApi}
                  >
                    使用Apple帳號登入
                  </button>
                </div>
              </div>
            )}

            {/* 分隔線 */}
            <div className="auth-page__divider"></div>

            {/* 底部連結 */}
            <div className={`auth-page__footer--${currentPage.class}`}>
              {currentPage.showForgotPassword && currentPage.forgotPasswordPosition === 'bottom' && (
                <Link to="/forgot-password" className="auth-page__footer-link">
                  忘記密碼？
                </Link>
              )}
              {currentPage.footerLink && (
                <Link to={currentPage.footerLink.path} className="auth-page__footer-link">
                  {currentPage.footerLink.text}
                </Link>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
