import { useContext, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { UserContext } from "../context/UserContext";

const useCheckCount = () => {
  const { setCartItemCount } = useContext(CartContext);
  const { user,isLoggedIn } = useContext(UserContext);

  const fetchCartLength = async () => {
    try {
      if (isLoggedIn) {
        // Fetch cart length from backend for logged-in user
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URI}/cart/${user._id}/length`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch cart length");
        }

        const data = await response.json();
        setCartItemCount(data.cartLength);
        console.log("Cart length (backend): ", data.cartLength);
      } else {
        // For logged-out user, fetch cart length from localStorage
        const cartLength = JSON.parse(localStorage.getItem("cartItemCount")) || '';
        setCartItemCount(cartLength);
        console.log("Cart length (localStorage): ", cartLength);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchCartLength();
  }, [user]);

  return { fetchCartLength };
};

export default useCheckCount;
