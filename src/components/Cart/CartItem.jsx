import './CartItem.scss';
import { Images } from '@assets/index';

const CartItem = ({ item, onQuantityChange, onRemove, isChecked, onCheckChange }) => {
  const handleQuantityIncrease = () => {
    onQuantityChange(item.id, item.quantity + 1);
  };

  const handleQuantityDecrease = () => {
    if (item.quantity > 1) {
      onQuantityChange(item.id, item.quantity - 1);
    }
  };

  const handleQuantityInput = (e) => {
    const value = parseInt(e.target.value) || 0;
    if (value > 0) {
      onQuantityChange(item.id, value);
    }
  };

  const handleCheckChange = (e) => {
    // 如果已选中，点击时取消选择；否则选中
    onCheckChange(item.id, !isChecked);
  };

  return (
    <div className="cart-item">
      <div className="cart-item__radio">
        <input 
          type="radio" 
          className="cart-item__radio-input" 
          checked={isChecked || false}
          onChange={handleCheckChange}
          name={`cart-item-${item.id}`}
        />
      </div>

      <div className="cart-item__image">
        <img src={item.image} alt={item.name} />
      </div>

      <div className="cart-item__info">
        <div className="cart-item__name">{item.name}</div>
        <div className="cart-item__specs">
          <div className="cart-item__spec">
            <span className="cart-item__spec-label">顏色</span>
            <div
              className="cart-item__color-block"
              style={{ backgroundColor: item.color }}
            ></div>
          </div>
          <div className="cart-item__spec">
            <span className="cart-item__spec-label">尺寸</span>
            <span className="cart-item__size-badge">{item.size}</span>
          </div>
        </div>
      </div>

      <div className="cart-item__price">${item.price}</div>

      <div className="cart-item__quantity">
        <button
          className="cart-item__quantity-btn cart-item__quantity-btn--minus"
          onClick={handleQuantityDecrease}
          aria-label="Decrease quantity"
        >
          <img src={Images.removeMminusCircleIcon} alt="Minus" />
        </button>
        <input
          type="number"
          className="cart-item__quantity-input"
          value={item.quantity}
          onChange={handleQuantityInput}
          min="1"
        />
        <button
          className="cart-item__quantity-btn cart-item__quantity-btn--plus"
          onClick={handleQuantityIncrease}
          aria-label="Increase quantity"
        >
          <img src={Images.addPlusCircleIcon} alt="Plus" />
        </button>
      </div>

      <div className="cart-item__total">${item.totalPrice}</div>

      <button
        className="cart-item__remove"
        onClick={() => onRemove(item.id)}
        aria-label="Remove item"
      >
        <img src={Images.closeSmIcon} alt="Remove" />
      </button>
    </div>
  );
};

export default CartItem;
