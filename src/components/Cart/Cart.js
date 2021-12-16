import React, { useState } from "react";
import { useContext } from "react/cjs/react.development";
import CartContext from "../../context-store/CartContext/cart-context";
import Modal from "../UI/Modal/Modal";

import classes from "./Cart.module.css";
import CartItem from "./CartItem/CartItem";
import Checkout from "./Checkout/Checkout";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmitting, setDidSubmitting] = useState(false);
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItem = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (itemId) => {
    cartCtx.removeItemFunc(itemId);
  };
  const cartItemAddHandler = (item) => {
    cartCtx.addItemFunc({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = async (userData) => {
    console.log(userData);
    console.log(cartCtx.items);
    setIsSubmitting(true);
    await fetch(
      "https://react-http-cc45c-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderItems: cartCtx.items,
        }),
      }
    );
    setIsSubmitting(false);
    setDidSubmitting(true);
    cartCtx.clearCartFunc();
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

  const modelActions = (
    <div className={classes.actions}>
      <button
        className={classes["button--alt"]}
        onClick={props.onCloseCartButton}
      >
        Close
      </button>
      {hasItem && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout
          onCancel={props.onCloseCartButton}
          onConfirmOrder={submitOrderHandler}
        />
      )}
      {!isCheckout && modelActions}
    </React.Fragment>
  );

  const isSubmittingModalContent = <p>Sending order data</p>;

  const didSubmittingModalContent = (
    <React.Fragment>
      <p>Successfully sent the order!</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onCloseCartButton}>
          Close
        </button>
      </div>
    </React.Fragment>
  );

  return (
    <Modal onCloseCart={props.onCloseCartButton}>
      {!isSubmitting && !didSubmitting && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {didSubmitting && didSubmittingModalContent}
    </Modal>
  );
};

export default Cart;
