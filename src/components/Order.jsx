import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Order = () => {
  const { user } = useContext(UserContext);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URI}/cart/${user._id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch items");
        }
        const data = await response.json();
        setItems(data.cart.items);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchItems();
  }, [user]);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URI}/order/addresses/${user._id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch addresses");
        }
        const data = await response.json();
        setAddresses(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchAddresses();
  }, [user]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => {
      console.log("Razorpay SDK loaded successfully.");
    };
    script.onerror = () => {
      console.error("Failed to load Razorpay SDK.");
    };
    document.body.appendChild(script);
  }, []);

  const handlePayment = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URI}/orders`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user._id,
            items,
            address: selectedAddress,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create order");
      }

      const { order, razorpayOrderId } = await response.json();

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY,
        amount: order.totalPrice * 100, // Amount in paise
        currency: "INR",
        name: "Kerl",
        description: "Order Payment",
        image: "/Logo.png",
        order_id: razorpayOrderId,
        handler: function (response) {
          alert(
            `Payment successful! Payment ID: ${response.razorpay_payment_id}`
          );
          try {
            const response = fetch(
              `${process.env.REACT_APP_BACKEND_URI}/cart/${user._id}`,
              {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
              }
            );

            if (!response.ok) {
              throw new Error("Failed to clear cart");
            }
          } catch (error) {
            console.error(error.message);
          }

          navigate("/explore");
        },
        prefill: {
          name: user.name,
          email: user.email,
          contact: user.contact || "",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleAddressChange = (event) => {
    setSelectedAddress(event.target.value);
  };

  return (
    <section className="py-16 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto p-8 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h1>
        <ul className="mb-6">
          {items.length > 0 ? (
            items.map((item) => (
              <li
                key={item.id}
                className="flex justify-between py-2 border-b border-gray-200"
              >
                <span className="text-gray-700">{item.productId.name}</span>
                <span className="text-gray-700">x{item.quantity}</span>
                <span className="text-gray-900 font-semibold">
                  ${item.price}
                </span>
              </li>
            ))
          ) : (
            <p className="text-gray-500">No items in your cart.</p>
          )}
        </ul>

        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Select Address
        </h2>
        <select
          value={selectedAddress}
          onChange={handleAddressChange}
          className="w-full p-2 border border-gray-300 rounded-lg mb-6 focus:ring focus:ring-indigo-200"
        >
          <option value="" disabled>
            Select an address
          </option>
          {addresses.length > 0 ? (
            addresses.map((address, idx) => (
              <option key={idx} value={address}>
                {address.address}
              </option>
            ))
          ) : (
            <option value={user.address}>
              {user.address || "No addresses found"}
            </option>
          )}
        </select>
        <div>
          <label
            htmlFor="address"
            className="block text-gray-700 font-medium mb-2"
          >
            Add a new address
          </label>
          <input
            id="address"
            type="text"
            placeholder="Enter your Address"
            className="w-full px-4 py-2 mb-4 border rounded-lg shadow-md focus:ring-2 focus:ring-green-500 transition-all duration-300"
            value={selectedAddress}
            onChange={(e) => setSelectedAddress(e.target.value)}
            required
          />
        </div>

        <button
          onClick={handlePayment}
          disabled={!selectedAddress}
          className={`w-full py-2 px-4 text-white font-semibold rounded-lg shadow-md transition-colors 
            ${
              selectedAddress
                ? "bg-indigo-600 hover:bg-indigo-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
        >
          Proceed to Payment
        </button>
      </div>
    </section>
  );
};

export default Order;
