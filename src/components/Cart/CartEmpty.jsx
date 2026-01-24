import './CartEmpty.scss';

/**
 * CartEmpty 組件
 * 顯示空購物車狀態
 * 保持原有 DOM 結構和 class 名稱
 */
const CartEmpty = ({ onGoShopping }) => {
    return (
        <div className="cart-page__empty">
            <p>購物車目前沒有商品</p>
            <button
                className="cart-page__empty-button"
                onClick={onGoShopping}
            >
                前往購物
            </button>
        </div>
    );
};

export default CartEmpty;
