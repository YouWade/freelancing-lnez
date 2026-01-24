import './CartMobileSummary.scss';

/**
 * CartMobileSummary 組件
 * 手機版購物車摘要區域
 * 保持原有 DOM 結構和 class 名稱
 */
const CartMobileSummary = ({
    allChecked,
    selectedTotal,
    onSelectAll,
    onNextStep
}) => {
    return (
        <>
            {/* 手機版摘要 - 平板版使用 */}
            <div className="cart-page__mobile-summary">
                <div className="cart-page__mobile-summary-item">
                    <div className="cart-page__mobile-summary-radio">
                        <input
                            type="radio"
                            checked={allChecked}
                            onChange={onSelectAll}
                            onClick={onSelectAll}
                        />
                    </div>
                    <span className="cart-page__mobile-summary-label">全部</span>
                    <span className="cart-page__mobile-summary-value">${Math.max(0, selectedTotal)}</span>
                </div>
                <button className="cart-page__mobile-button" onClick={onNextStep}>
                    下一步
                </button>
            </div>

            {/* 手機版底部摘要 */}
            <div className="cart-page__mobile-footer-summary">
                <div className="cart-page__mobile-footer-item">
                    <div className="cart-page__mobile-footer-radio">
                        <input
                            type="radio"
                            id="footer-select-all"
                            className="cart-page__mobile-footer-radio-input"
                            checked={allChecked}
                            onChange={onSelectAll}
                            onClick={onSelectAll}
                        />
                        <label htmlFor="footer-select-all" className="cart-page__mobile-footer-radio-label">
                            <span className="cart-page__mobile-footer-radio-button"></span>
                        </label>
                    </div>
                    <span className="cart-page__mobile-footer-label">全部</span>
                    <span className="cart-page__mobile-footer-value">${Math.max(0, selectedTotal)}</span>
                </div>
                <button className="cart-page__mobile-footer-button" onClick={onNextStep}>
                    下一步
                </button>
            </div>
        </>
    );
};

export default CartMobileSummary;
