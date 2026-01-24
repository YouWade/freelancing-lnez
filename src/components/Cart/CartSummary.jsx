import './CartSummary.scss';

/**
 * CartSummary 組件
 * 桌面版購物車總計區域
 * 保持原有 DOM 結構和 class 名稱
 */
const CartSummary = ({ subtotal, discount, total, onNextStep }) => {
    return (
        <div className="cart-page__summary">
            <h3 className="cart-page__summary-title">小計</h3>

            <div className="cart-page__summary-items">
                <div className="cart-page__summary-item">
                    <span className="cart-page__summary-label">總計</span>
                    <span className="cart-page__summary-value">${subtotal}</span>
                </div>

                <div className="cart-page__summary-item">
                    <span className="cart-page__summary-label">折扣</span>
                    <span className="cart-page__summary-value">${discount}</span>
                </div>
            </div>

            <div className="cart-page__summary-divider"></div>

            <div className="cart-page__summary-item cart-page__summary-total">
                <span className="cart-page__summary-label">總結</span>
                <span className="cart-page__summary-value">${total}</span>
            </div>

            <button className="cart-page__button" onClick={onNextStep}>
                下一步
            </button>
        </div>
    );
};

export default CartSummary;
