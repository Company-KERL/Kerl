import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [cartItemCount, setCartItemCount] = useState(0);

  return (
    <CartContext.Provider value={{ cartItemCount, setCartItemCount }}>
      {children}
    </CartContext.Provider>
  );
};
