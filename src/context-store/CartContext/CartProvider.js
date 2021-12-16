import React, { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      const updatedTotalAmount =
        state.totalAmount + action.item.price * action.item.amount;

      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.item.id
      );

      const existingCartItem = state.items[existingCartItemIndex];

      let updatedItems;

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          amount: existingCartItem.amount + action.item.amount,
        };

        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        updatedItems = state.items.concat(action.item);
      }

      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };
    case "REMOVE":
      const indexOfSelectedCartItem = state.items.findIndex(
        (item) => item.id === action.itemId
      );

      const selectedCartItem = state.items[indexOfSelectedCartItem];

      const updatedCartItemTotalAmount =
        state.totalAmount - selectedCartItem.price;

      let updatedCartItems;

      if (selectedCartItem.amount === 1) {
        updatedCartItems = state.items.filter(
          (item) => item.id !== action.itemId
        );
      } else {
        const updatedItem = {
          ...selectedCartItem,
          amount: selectedCartItem.amount - 1,
        };
        updatedCartItems = [...state.items];
        updatedCartItems[indexOfSelectedCartItem] = updatedItem;
      }

      console.log(selectedCartItem);

      return {
        items: updatedCartItems,
        totalAmount: updatedCartItemTotalAmount,
      };

    case "CLEAR":
      return defaultCartState;

    default:
      return defaultCartState;
  }
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemFromCartHandler = (itemId) => {
    dispatchCartAction({ type: "REMOVE", itemId: itemId });
  };

  const clearCartHandler = () => {
    dispatchCartAction({ type: "CLEAR" });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItemFunc: addItemToCartHandler,
    removeItemFunc: removeItemFromCartHandler,
    clearCartFunc: clearCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
