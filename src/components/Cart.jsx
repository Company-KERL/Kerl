import React, { useState, useEffect } from 'react';
import cartData from './CartData'; // Import the dummy data

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // Set cart items to the imported dummy data
    setCartItems(cartData);

    // Calculate the total price
    const total = cartData.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotalPrice(total);
  }, []);

  const handleQuantityChange = (index, newQuantity) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems[index].quantity = newQuantity;
    setCartItems(updatedCartItems);

    // Recalculate total price
    const newTotalPrice = updatedCartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotalPrice(newTotalPrice);
  };

  const handleDeleteItem = (index) => {
    // Ask for confirmation before removing an item
    const confirmed = window.confirm('Are you sure you want to remove this item from your cart?');
    if (confirmed) {
      const updatedCartItems = cartItems.filter((_, i) => i !== index);
      setCartItems(updatedCartItems);

      // Recalculate total price after deletion
      const newTotalPrice = updatedCartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      setTotalPrice(newTotalPrice);
    }
  };

  const handleProceedToPayment = () => {
    // Logic to proceed to payment (this could be a redirect to a payment gateway or modal)
    alert('Proceeding to payment...');
  };

  return (
    <div className="container mx-auto px-8 md:px-16 py-32 ">
      <div className="flex justify-between items-center mb-8">
        {/* Back Button */}
        <a
          href="/"
          className="text-gray-600 hover:text-blue-800 font-semibold text-lg flex items-center space-x-2"
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
            <img src='/empty.JPG' className='h-80 md:h-96 mx-auto justify-center'/>
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
                  src={item.image}
                  alt={item.name}
                  className="w-32 h-42 object-fit rounded-lg shadow-md"
                />
                <div className="flex flex-col space-y-2 w-full md:w-2/3 mt-5 md:mt-0">
                  <p className="text-xl font-semibold text-gray-800">{item.name}</p>
                  <p className="text-sm text-gray-600">Size: {item.size}</p>
                  <p className="text-sm text-gray-600">Price: ₹ {item.price}</p>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </div>
              </div>
              <div className="flex items-center space-x-10 mt-4 md:mt-0">
                {/* Quantity Control with + and - */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleQuantityChange(index, item.quantity - 1)}
                    className="w-8 h-8 flex justify-center items-center text-lg text-gray-700 bg-gray-200 rounded-full hover:bg-gray-300"
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <p className="text-lg font-semibold text-gray-800">{item.quantity}</p>
                  <button
                    onClick={() => handleQuantityChange(index, item.quantity + 1)}
                    className="w-8 h-8 flex justify-center items-center text-lg text-gray-700 bg-gray-200 rounded-full hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>

                {/* Price with currency */}
                <div className="flex flex-col justify-between">
                  <p className="text-xl font-semibold text-gray-800">
                    ₹{item.price * item.quantity}
                  </p>
                </div>

                {/* Delete Button */}
                <button
                  onClick={() => handleDeleteItem(index)}
                  className="text-red-500 hover:text-red-700 focus:outline-none pr-4"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
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
          <p className="text-2xl font-semibold text-gray-800">Total Price: ₹ {totalPrice}</p>
        </div>
      )}

      {/* Proceed to Payment Button */}
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
  );
};

export default CartPage;
