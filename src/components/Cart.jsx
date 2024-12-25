import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import Modal from "./ConfirmModal";
import Loader from "./Loading";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);
  const { cartItemCount, setCartItemCount } = useContext(CartContext);
  const navigate = useNavigate();

  const getLocalStorageCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || { items: [], totalPrice: 0 };
    return cart;
  };

  const setLocalStorageCart = (newCart) => {
    const totalQuantity = newCart.items.reduce((sum, item) => sum + item.quantity, 0);
    localStorage.setItem("cart", JSON.stringify(newCart));
    localStorage.setItem("cartItemCount", totalQuantity.toString());
    setCartItemCount(totalQuantity)
    console.log(JSON.stringify(newCart.items.length));
    
  };

  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      if (user && user._id) {
        try {
          const response = await fetch(`${process.env.REACT_APP_BACKEND_URI}/cart/${user._id}`);
          if (!response.ok) throw new Error("Failed to fetch cart items");
          const data = await response.json();
          setCartItems(data.cart.items);
          setTotalPrice(data.cart.totalPrice);
        } catch (error) {
          console.log(error.message);
        }
      } else {
        const cart = getLocalStorageCart();
        setCartItems(cart.items);
        setTotalPrice(cart.totalPrice);
      }
      setLoading(false);
      
    };
    fetchCart();
  }, [user]);


  useEffect(() => {
    const total = cartItems.reduce(
      (sum, item) => {
        return item.productId.offers[item.selectedSizeIndex]
          ? sum + item.productId.offers[item.selectedSizeIndex] * item.quantity
          : sum + item.productId.prices[item.selectedSizeIndex] * item.quantity;
      },
      0
    );
    
    setTotalPrice(total);
    if(!user)
    {
      const cart = getLocalStorageCart();
    cart.totalPrice = total;
    setLocalStorageCart(cart);
    }
    
  }, [cartItems]);

  const handleQuantityChange = async (index, newQuantity, oldQuantity) => {
    const updatedCartItems = [...cartItems];
      updatedCartItems[index].quantity = newQuantity;

      const newTotalPrice = updatedCartItems.reduce((sum, item) => {
        return item.productId.offers[item.selectedSizeIndex]
          ? sum + item.productId.offers[item.selectedSizeIndex] * item.quantity
          : sum + item.productId.prices[item.selectedSizeIndex] * item.quantity;
      }, 0);
      
    setTotalPrice(newTotalPrice);

    
    
    

    if (user && user._id) {
      try {
        await fetch(`${process.env.REACT_APP_BACKEND_URI}/cart`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user._id,
            productId: updatedCartItems[index].productId._id,
            quantity: newQuantity,
            selectedSizeIndex: updatedCartItems[index].selectedSizeIndex,
          }),
        });
        setCartItemCount((cartItemCount)=>cartItemCount+newQuantity-oldQuantity)
      } catch (error) {
        console.error(error.message);
      }
    } else {
      setLocalStorageCart({ ...getLocalStorageCart(), items: updatedCartItems });
      const cart = getLocalStorageCart();
      cart.totalPrice = newTotalPrice;
      setCartItems(updatedCartItems);
      setLocalStorageCart(cart);
    }
  };

  const handleDeleteItem = (index) => {
    setItemToDelete(index);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    const updatedCartItems = cartItems.filter((_, i) => i !== itemToDelete);
    setCartItems(updatedCartItems);

    const newTotalPrice = updatedCartItems.reduce((sum, item) => {
      return item.productId.offers[item.selectedSizeIndex]
        ? sum + item.productId.offers[item.selectedSizeIndex] * item.quantity
        : sum + item.productId.prices[item.selectedSizeIndex] * item.quantity;
    }, 0);
    setTotalPrice(newTotalPrice);

    const cart = getLocalStorageCart();
    cart.items = updatedCartItems;
    cart.totalPrice = newTotalPrice;
    setLocalStorageCart(cart);


    if (user && user._id) {
      try {
        await fetch(`${process.env.REACT_APP_BACKEND_URI}/cart`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user._id,
            productId: cartItems[itemToDelete].productId._id,
          }),
        });
        setCartItemCount(cartItemCount - cartItems[itemToDelete].quantity);
      } catch (error) {
        console.error(error.message);
      }
    }
    setShowModal(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleProceedToPayment = () => {
    navigate("/order");
  };

  const handleOrderPage = () =>{
    navigate("/orders");
  };

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/explore");
    }
  };

  const handleClick = (item) => {
    navigate(`/product/${item.productId._id}/${item.selectedSizeIndex}`);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto px-8 md:px-16 py-32">
      <div
        className="flex justify-between items-center mb-8"
        onClick={handleBack}
      >
        {/* Back Button */}
        <a className="text-gray-600 hover:text-blue-800 font-semibold text-lg flex items-center space-x-2 hover:cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span>Back</span>
        </a>
        <h1 className="text-4xl font-semibold text-gray-900">Your Cart</h1>
      </div>

      {/* Cart Items List */}
      <div className="space-y-6">
        {cartItems.length === 0 ? (
          <div className="text-center h-4/6 p-8 w-full">
            <img
              src="/empty.JPG"
              className="h-80 md:h-96 mx-auto justify-center"
            />
            <p className="text-2xl text-gray-600 mb-10">Your cart is empty!</p>
            <a
              href="/explore"
              className="text-lg text-white bg-green-500 px-6 py-4 rounded-full cursor-pointer hover:underline"
            >
              Go explore some products
            </a>
          </div>
        ) : (
          cartItems.map((item, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row justify-between items-center p-4 bg-white border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out"
            >
              <div className="flex flex-col md:flex-row items-center space-x-6 w-full">
                <img
                  src={item.productId.images[item.selectedSizeIndex][0]} // Assuming you want the first image
                  alt={item.productId.name}
                  className="w-32 h-42 object-fit rounded-lg shadow-md"
                />
                <div
                  className="flex flex-col space-y-2 w-full md:w-2/3 mt-5 md:mt-0 hover:cursor-pointer"
                  onClick={() => handleClick(item)}
                >
                  <p className="text-xl font-semibold text-gray-800">
                    {item.productId.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    Size: {item.productId.sizes[item.selectedSizeIndex]}
                  </p>
                  <p className="text-sm text-gray-600">
                    Price: ₹ {item.productId.prices[item.selectedSizeIndex]}
                  </p>
                  <p className="text-sm text-gray-500">
                    {item.productId.description}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-10 mt-4 md:mt-0">
                {/* Quantity Control with + and - */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() =>
                      handleQuantityChange(index, item.quantity - 1, item.quantity)
                    }
                    className="w-8 h-8 flex justify-center items-center text-lg text-gray-700 bg-gray-200 rounded-full hover:bg-gray-300"
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <p className="text-lg font-semibold text-gray-800">
                    {item.quantity}
                  </p>
                  <button
                    onClick={() =>
                      handleQuantityChange(index, item.quantity + 1, item.quantity)
                    }
                    className="w-8 h-8 flex justify-center items-center text-lg text-gray-700 bg-gray-200 rounded-full hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>

                {/* Price with currency */}
                <div className="flex flex-col justify-between text-xl">
                {item.productId.offers[item.selectedSizeIndex] ? (
              <div className="flex items-center space-x-4">
                
                <span className="text-green-600 font-semibold">
                  Offer: ₹ {item.productId.offers[item.selectedSizeIndex]}
                </span>
              </div>
            ) : (
              <span>Price: ₹{item.productId.prices[item.productId.selectedSizeIndex]}</span>
            )}
                  
                </div>

                {/* Delete Button */}
                <button
                  onClick={() => handleDeleteItem(index)}
                  className="text-red-500 hover:text-red-700 focus:outline-none pr-4"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Total Price */}
      {cartItems.length > 0 && (
        <div className="mt-8 text-right">
          <p className="text-2xl font-semibold text-gray-800">
            Total Price: ₹ {totalPrice}
          </p>
        </div>
      )}

      {/* Proceed to Payment Button */}
      <div className="md:flex md:justify-end gap-10">
      <div className="mt-8 text-center">
          <button
            className="bg-green-600 text-white py-3 px-8 rounded-lg shadow-lg hover:bg-green-700 transition duration-300 ease-in-out"
            onClick={handleOrderPage}
          >
            View Previous orders
          </button>
        </div>
      {cartItems.length > 0 && (
        <div className="mt-8 text-center">
          <button
            className="bg-green-600 text-white py-3 px-8 rounded-lg shadow-lg hover:bg-green-700 transition duration-300 ease-in-out"
            onClick={handleProceedToPayment}
          >
            Proceed to Payment
          </button>
        </div>
      )}

      
      </div>

      {/* Modal for deletion confirmation */}
      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        onConfirm={confirmDelete}
        message="Are you sure you want to remove this item from your cart?"
      />
    </div>
  );
};

export default CartPage;
