import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { formatAddress } from "../utils/formatAddress";

const Order = () => {
  const { user } = useContext(UserContext);
  const { setCartItemCount } = useContext(CartContext);
  const [selectedAddress, setSelectedAddress] = useState(null); // Initialize as null
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [items, setItems] = useState([]);
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const navigate = useNavigate();

  // Fetch cart items
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

  // Fetch saved addresses
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URI}/orders/addresses/${user._id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch addresses");
        }
        const data = await response.json();
        setAddresses(data.addresses);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchAddresses();
  }, [user]);

  // Razorpay SDK loader
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = async () => {
    if (!selectedAddress) {
      alert("Please select or add an address.");
      return;
    }
    try {
      // Step 1: Create Order in Backend
      const orderResponse = await fetch(
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

      if (!orderResponse.ok) {
        throw new Error("Failed to create order on the backend");
      }

      const { order } = await orderResponse.json();

      // Step 2: Create Razorpay Order
      const razorpayOrderResponse = await fetch(
        `${process.env.REACT_APP_BACKEND_URI}/payment/order`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            orderId: order._id,
            totalPrice: order.totalPrice,
          }),
        }
      );

      if (!razorpayOrderResponse.ok) {
        throw new Error("Failed to create Razorpay order");
      }

      const { razorpayOrderId } = await razorpayOrderResponse.json();

      // Step 3: Configure Razorpay Options
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY,
        amount: order.totalPrice * 100, // Amount in paise
        currency: "INR",
        name: "Kerl",
        description: "Order Payment",
        image: "/Logo.png",
        order_id: razorpayOrderId, // Razorpay Order ID from backend
        handler: async function (response) {
          try {
            // Step 4: Update Payment Status in Backend
            const paymentUpdateResponse = await fetch(
              `${process.env.REACT_APP_BACKEND_URI}/payment/update`,
              {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  razorpayPaymentId: response.razorpay_payment_id,
                  razorpayOrderId: response.razorpay_order_id,
                  razorpaySignature: response.razorpay_signature,
                  orderId: order._id,
                  userId: user._id,
                }),
              }
            );

            if (!paymentUpdateResponse.ok) {
              throw new Error("Failed to update payment status on the backend");
            }
            setCartItemCount(0);
            alert("Payment successful!");
            navigate("/explore");
          } catch (error) {
            console.error("Error during payment update:", error.message);
            alert("Payment successful but backend update failed!");
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
          contact: user.contact || "",
        },
        theme: {
          color: "#3399cc",
        },
      };

      // Step 5: Open Razorpay Checkout
      const razorpay = new window.Razorpay(options);
      razorpay.on("payment.failed", async function (response) {
        try {
          const paymentUpdateResponse = await fetch(
            `${process.env.REACT_APP_BACKEND_URI}/payment/update`,
            {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature,
                orderId: order._id,
                userId: user._id,
              }),
            }
          );

          if (!paymentUpdateResponse.ok) {
            throw new Error("Failed to update payment status on the backend");
          }
        } catch (error) {
          console.error("Error during payment update:", error.message);
          alert("Payment failed but backend update failed!");
        }
        console.error("Payment failed:", response.error);
        alert(`Payment failed: ${response.error.reason}`);
      });
      razorpay.open();
    } catch (error) {
      console.error("Error in handlePayment:", error.message);
      alert("Something went wrong during payment!");
    }
  };

  const handleAddressChange = (event) => {
    const selected = event.target.value;
    if (selected === "add") {
      setShowAddAddress(true);
      return;
    }
    const addressObj = addresses.find(
      (addr) => formatAddress(addr) === selected
    );
    setSelectedAddress(addressObj || null);
  };

  const handleAddAddress = () => {
    if (street && city && state && zip) {
      const newAddress = { street, city, state, zip };
      setAddresses([...addresses, newAddress]);
      setSelectedAddress(newAddress);
      setShowAddAddress(false);
      setStreet("");
      setCity("");
      setState("");
      setZip("");
    } else {
      alert("Please fill in all address fields.");
    }
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

        <div>
          {showAddAddress ? (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Add a New Address
              </h2>

              {/* Address Input Fields */}
              <input
                type="text"
                placeholder="Street"
                className="w-full px-4 py-2 border rounded-lg shadow-md"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
              />
              <input
                type="text"
                placeholder="City"
                className="w-full px-4 py-2 border rounded-lg shadow-md"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <input
                type="text"
                placeholder="State"
                className="w-full px-4 py-2 border rounded-lg shadow-md"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
              <input
                type="text"
                placeholder="Zip"
                className="w-full px-4 py-2 border rounded-lg shadow-md"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
              />

              <div className="flex gap-5">
                <button
                  onClick={handleAddAddress}
                  className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg"
                >
                  Save Address
                </button>
                <button
                  onClick={() => setShowAddAddress(false)}
                  className="mt-4 px-4 py-2 bg-gray-600 text-white rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Select Address
              </h2>
              <select
                onChange={handleAddressChange}
                className="w-full px-4 py-2 border rounded-lg"
                value={selectedAddress ? formatAddress(selectedAddress) : ""}
              >
                <option value="" disabled>
                  Select an address
                </option>
                {addresses.map((address, idx) => (
                  <option key={idx} value={formatAddress(address)}>
                    {formatAddress(address)}
                  </option>
                ))}
                <option value="add">Add a new address</option>
              </select>
            </div>
          )}
        </div>

        <button
          onClick={handlePayment}
          disabled={!selectedAddress}
          className={`w-full py-2 px-4 text-white font-semibold rounded-lg ${
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
