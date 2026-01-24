import { Component } from 'react';
import './ErrorBoundary.scss';

/**
 * ErrorBoundary 組件
 * 捕獲子組件中的 JavaScript 錯誤,記錄錯誤並顯示備用 UI
 */
class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null,
        };
    }

    static getDerivedStateFromError(error) {
        // 更新 state 以便下次渲染顯示備用 UI
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        // 記錄錯誤到控制台
        console.error('Error caught by ErrorBoundary:', error, errorInfo);

        // 可以在這裡將錯誤發送到錯誤追蹤服務
        // 例如: logErrorToService(error, errorInfo);

        this.setState({
            error,
            errorInfo,
        });
    }

    handleReset = () => {
        this.setState({
            hasError: false,
            error: null,
            errorInfo: null,
        });
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="error-boundary">
                    <div className="error-boundary__container">
                        <h1 className="error-boundary__title">糟糕!發生了一些問題</h1>
                        <p className="error-boundary__message">
                            我們遇到了一個意外錯誤。請嘗試重新整理頁面。
                        </p>
                        {process.env.NODE_ENV === 'development' && this.state.error && (
                            <details className="error-boundary__details">
                                <summary className="error-boundary__summary">錯誤詳情</summary>
                                <pre className="error-boundary__stack">
                                    {this.state.error.toString()}
                                    {this.state.errorInfo?.componentStack}
                                </pre>
                            </details>
                        )}
                        <div className="error-boundary__actions">
                            <button
                                className="error-boundary__button"
                                onClick={() => window.location.reload()}
                            >
                                重新整理頁面
                            </button>
                            <button
                                className="error-boundary__button error-boundary__button--secondary"
                                onClick={() => window.location.href = '/'}
                            >
                                返回首頁
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
