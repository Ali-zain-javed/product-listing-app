import React, { memo } from "react";
import "../styles/ProductList.css";

export interface Product {
  id: number;
  name: string;
  img: string;
  price: number;
  colour: string;
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  qty: number;
}

interface Props {
  products: Product[];
  onIncrement: (productId: number) => void;
  onDecrement: (productId: number) => void;
  onRemove: (productId: number) => void;
  cartItems: CartItem[];
}

const ProductList: React.FC<Props> = ({
  products,
  onIncrement,
  onDecrement,
  cartItems,
  onRemove,
}) => {
  let totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );
  totalAmount = Number(totalAmount.toFixed(1));

  return (
    <div className="product-list" role="list">
      {products.map((product) => {
        const cartItem: CartItem | undefined = cartItems.find(
          (item) => item.id === product.id
        );

        return (
          <div className="product-item" key={product.id} role="listitem">
            <img src={product.img} alt={product.name} />
            <div className="product-details">
              <div className="product-name">{product.name}</div>
              <div className="product-price">Price: £{product.price}</div>
            </div>
            <div className="product-controls">
              <button
                data-testid={`product-1-decrement-button_` + product.id}
                className="product-btn"
                onClick={() => onDecrement(product.id)}>
                -
              </button>
              <div className="product-qty">
                Qty: {cartItem ? cartItem.qty : 0}
                {cartItem && cartItem.qty && (
                  <p
                    className="remove"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemove(product.id);
                    }}>
                    Remove
                  </p>
                )}
              </div>
              <button
                data-testid={`product-1-increment-button_` + product.id}
                className="product-btn"
                onClick={(e) => {
                  onIncrement(product.id);
                  e.stopPropagation();
                  e.preventDefault();
                }}>
                +
              </button>
            </div>
          </div>
        );
      })}
      <div className="total-amount">Total Amount: £{totalAmount}</div>
    </div>
  );
};

export default memo(ProductList);
