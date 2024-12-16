import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const sampleOrders = [
  {
    _id: "1",
    status: "Shipped",
    totalPrice: 150,
    address: "123 Main St, City, Country",
    items: [
      { productId: { name: "Product 1" }, quantity: 2 },
      { productId: { name: "Product 2" }, quantity: 1 },
    ],
  },
  {
    _id: "2",
    status: "Processing",
    totalPrice: 200,
    address: "456 Maple Ave, City, Country",
    items: [
      { productId: { name: "Product 3" }, quantity: 3 },
      { productId: { name: "Product 4" }, quantity: 1 },
    ],
  },
];

const OrderStatusProgress = ({ status }) => {
  const stages = ["Order Received", "Processing", "Shipped", "Delivered"];
  const currentStageIndex = stages.indexOf(status);

  return (
    <div className="relative pt-1">
  <div className="flex justify-between mb-2">
    {stages.map((stage, index) => (
      <div
        key={stage}
        className="text-sm font-medium text-gray-600 text-center w-full"
      >
        {stage}
      </div>
    ))}
  </div>
  <div className="flex items-center justify-between mb-2">
    {stages.map((stage, index) => (
      <div
        key={stage}
        className={`h-4 w-full rounded-lg ${
          index <= currentStageIndex ? "bg-blue-500" : "bg-gray-300"
        }`}
      />
    ))}
  </div>
</div>
  );
};

const OrderPage = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const navigate = useNavigate(); // Move this inside the component

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
  };

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1); // Navigate to the previous page
    } else {
      navigate("/"); // Fallback route if no history is available
    }
  };

  return (
    <div className="container mx-auto mt-36 p-4 px-16 pb-36">
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
        <h1 className="text-4xl font-semibold text-gray-900">Your Orders</h1>
      </div>

      {/* Order List */}
      <ul>
        {sampleOrders.map((order) => (
          <li
            key={order._id}
            className="border p-4 mb-4 rounded-md shadow cursor-pointer"
            onClick={() => handleOrderClick(order)}
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-semibold">Order ID: {order._id}</h3>
                <p>Status: {order.status}</p>
                <p>Total Price: ${order.totalPrice}</p>
                <p>Address: {order.address}</p>
              </div>
              <div className="text-blue-500">View Details</div>
            </div>
          </li>
        ))}
      </ul>

      {/* Order Summary Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-1/2">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Order ID: {selectedOrder._id}</h2>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                X
              </button>
            </div>
            <p className="mt-4">Address: {selectedOrder.address}</p>
            <h3 className="font-semibold mt-4">Items:</h3>
            <ul>
              {selectedOrder.items.map((item, index) => (
                <li key={index}>
                  {item.productId.name} - Quantity: {item.quantity}
                </li>
              ))}
            </ul>
            <h3 className="font-semibold mt-4">Total Price: ${selectedOrder.totalPrice}</h3>

            {/* Progress Bar */}
            <OrderStatusProgress status={selectedOrder.status} />
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderPage;
