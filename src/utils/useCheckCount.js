import { useContext, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { UserContext } from "../context/UserContext";

const useCheckCount = () => {
  const { setCartItemCount } = useContext(CartContext);
  const { user } = useContext(UserContext);

  const fetchCartLength = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URI}/cart/${user._id}/length`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch cart length");
      }

      const data = await response.json();
      setCartItemCount(data.cartLength);
      console.log("Cart length: ", data.cartLength);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (user && user._id) {
      fetchCartLength();
    }
  }, []);

  return { fetchCartLength };
};

export default useCheckCount;
