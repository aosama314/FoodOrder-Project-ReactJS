import React from "react";
import { useContext } from "react/cjs/react.development";
import CartContext from "../../context-store/CartContext/cart-context";
import Modal from "../UI/Modal/Modal";

import classes from "./Cart.module.css";
import CartItem from "./CartItem/CartItem";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItem = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (itemId) => {
    cartCtx.removeItemFunc(itemId);
  };
  const cartItemAddHandler = (item) => {
    cartCtx.addItemFunc({ ...item, amount: 1 });
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  return (
    <Modal onCloseCart={props.onCloseCartButton}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button
          className={classes["button--alt"]}
          onClick={props.onCloseCartButton}
        >
          Close
        </button>
        {hasItem && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
