import { createContext, useEffect, useReducer } from "react";
import CartReducer from "./CartReducer";

const CART_STATE = {
  cart: JSON.parse(localStorage.getItem("cart")) || [],
};

export const CartContext = createContext(CART_STATE);

export const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CartReducer, CART_STATE);
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);
  return (
    <CartContext.Provider
      value={{
        cart: state.cart,
        dispatch,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
