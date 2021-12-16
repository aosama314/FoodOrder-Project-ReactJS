import React from "react";

const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  addItemFunc: (item) => {},
  removeItemFunc: (itemId) => {},
  clearCartFunc: () => {},
});

export default CartContext;
