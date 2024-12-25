import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { CartContext } from "../context/CartContext";

const ProductPage = ({ product, onBackClick, onAddToCart, index }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(index);
  const [quantity, setQuantity] = useState(1);
  const { user } = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false); // WhatsApp modal
  const [isImageModalOpen, setIsImageModalOpen] = useState(false); // Image modal
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false); // Informational modal for cart addition
  const [message, setMessage] = useState("");
  const { cartItemCount, setCartItemCount } = useContext(CartContext);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (user) {
      // If logged in, use the user's cart data
      const storedCartCount = localStorage.getItem("cartItemCount");
      if (storedCartCount) {
        
      }
    }
  }, [user, setCartItemCount]);

  const userId = user?._id;

  
  

  const addToCart = async () => {
    try {
      if (userId) {
        // If user is logged in, proceed with API request to add the item to the cart
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URI}/cart`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            productId: product._id,
            quantity,
            selectedSizeIndex,
          }),
        });
  
        if (!response.ok) {
          throw new Error("Failed to add item to cart");
        }
  
        const data = await response.json();
  
        // Update cart count and modal based on the response
        setMessage("Item added to cart!");
        setCartItemCount(data.cart.items.reduce((count, item) => count + item.quantity, 0)); // Update cart count with the total quantity
        setIsInfoModalOpen(true); // Correctly open the info modal
      } else {
        // If the user is not logged in, save to localStorage in the same format as the backend response
  
        const cart = JSON.parse(localStorage.getItem("cart")) || {
          userId: null,  // Set as null if the user is not logged in
          items: [],
          totalPrice: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        let updatedCartCount = cart.items.reduce((count, item) => count + item.quantity, 0);
        localStorage.setItem("cartItemCount", updatedCartCount); // Ensure count is 0 if the cart is empty
        setCartItemCount(updatedCartCount);
  
        // Create the cart item object
        const cartItem = {
          productId: {
            _id: product._id,  // Only store the productId and other relevant info
            name: product.name,
            images: product.images,  // Assuming the images are part of the product object
            sizes: product.sizes,  // Assuming sizes are part of the product object
            offers:product.offers,
            prices: product.prices,  // Assuming price is part of the product object
            description: product.description
          },
          quantity,
          
          selectedSizeIndex,
        };
  
        // Check if the product already exists in the cart
        
        const existingItemIndex = cart.items.findIndex(
          (item) =>
            item.productId._id === product._id && item.selectedSizeIndex === selectedSizeIndex
        );
        
        if (existingItemIndex !== -1) {
          cart.items[existingItemIndex].quantity += quantity;
        } else {
          cart.items.push(cartItem);
        }
        
        updatedCartCount = cart.items.reduce((count, item) => count + item.quantity, 0);
        localStorage.setItem("cartItemCount", updatedCartCount);
        setCartItemCount(updatedCartCount);
        
  
        // Calculate the total price of the cart
        cart.totalPrice = cart.items.reduce((total, item) => total + item.price * item.quantity, 0);
  
        // Update timestamps
        cart.updatedAt = new Date();
  
        // Store the updated cart back to localStorage
        localStorage.setItem("cart", JSON.stringify(cart));
  
        // Update cart item count
        updatedCartCount = cart.items.reduce((count, item) => count + item.quantity, 0);
        localStorage.setItem("cartItemCount", updatedCartCount);
        setCartItemCount(updatedCartCount); // Update cart count in context
  
        setMessage("Item added to cart!");
        setIsInfoModalOpen(true); // Correctly open the info modal
      }
    } catch (error) {
      alert("Error adding item to cart:", error);
      console.log(error);
    }
  };

  const currentImages = product.images[selectedSizeIndex];

  const handleQuantityChange = (amount) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + amount));
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? currentImages.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === currentImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleBuyNowClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      `Hello, I would like to buy the following product:\n\nProduct: ${product.name}\nSize: ${product.sizes[selectedSizeIndex]}\nQuantity: ${quantity}\n\nPlease provide me with further details.`
    );
    window.open(`https://wa.me/9567072475?text=${message}`, "_blank");
  };

  // Calculate total price
  const currentPrice =
    product.offers[selectedSizeIndex] || product.prices[selectedSizeIndex];
  const totalPrice = currentPrice * quantity;

  // Open and close image modal
  const openImageModal = (index) => {
    setCurrentImageIndex(index);
    setIsImageModalOpen(true);
  };

  const closeImageModal = () => {
    setIsImageModalOpen(false);
  };

  const handleOutsideClick = (event) => {
    if (event.target === event.currentTarget) {
      closeImageModal();
    }
  };

  return (
    <div className="container mx-auto px-6 md:px-16 py-10 md:py-28 mt-16">
      <button
        className="text-gray-500 hover:text-gray-700 text-lg md:text-2xl font-semibold mb-6"
        onClick={onBackClick}
      >
        ‹ Back
      </button>

      <div className="flex flex-col md:flex-row items-start gap-10">
        {/* Image Slider */}
        <div className="flex flex-col items-center w-full md:w-1/2">
          <div className="relative w-full p-10">
            <img
              src={currentImages[currentImageIndex]}
              alt={product.name}
              className="w-full h-64 md:h-96 object-contain rounded-lg shadow-md cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-110"
              onClick={() => openImageModal(currentImageIndex)} // Click to open image modal
            />
            <button
              className="absolute left-0 top-1/2 -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full"
              onClick={handlePreviousImage}
            >
              ‹
            </button>
            <button
              className="absolute right-0 top-1/2 -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full"
              onClick={handleNextImage}
            >
              ›
            </button>
          </div>
        </div>

        {/* Product Details */}
        <div className="w-full md:w-1/2 space-y-6">
          <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
          <p className="text-gray-600">{product.description}</p>

          {/* Size Selector */}
          <div className="flex items-center space-x-4">
            <label className="text-gray-700">Size:</label>
            <div className="flex space-x-2">
              {product.sizes.map((size, index) => (
                <button
                  key={index}
                  className={`py-2 px-4 border rounded-lg ${
                    selectedSizeIndex === index
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  } hover:bg-green-400 transition`}
                  onClick={() => {
                    setSelectedSizeIndex(index);
                    setCurrentImageIndex(0);
                    setQuantity(1);
                  }}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Pricing Section */}
          <div className="text-lg text-gray-700 font-sans">
            {product.offers[selectedSizeIndex] ? (
              <div className="flex items-center space-x-4">
                <span className="line-through text-gray-900 text-xl font-bold">
                  ₹ {product.prices[selectedSizeIndex]}
                </span>
                <span className="text-green-600 font-semibold">
                  Offer: ₹ {product.offers[selectedSizeIndex]}
                </span>
              </div>
            ) : (
              <span>Price: ₹{product.prices[selectedSizeIndex]}</span>
            )}
          </div>

          {/* Total Price */}
          <div className="text-xl font-semibold text-gray-800">
            Total: ₹ {totalPrice}
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center space-x-4">
            <label className="text-gray-700">Quantity:</label>
            <div className="flex items-center space-x-2">
              <button
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-1 px-3 rounded-lg"
                onClick={() => handleQuantityChange(-1)}
              >
                -
              </button>
              <span className="text-xl">{quantity}</span>
              <button
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-1 px-3 rounded-lg"
                onClick={() => handleQuantityChange(1)}
              >
                +
              </button>
            </div>
          </div>

          {/* Buttons Section */}
          <div className="flex space-x-4">
            <button
              className="bg-green-500 text-white py-3 px-6 rounded-lg shadow-md hover:bg-green-600"
              onClick={handleBuyNowClick}
            >
              Buy Now
            </button>
            <button
              className="bg-blue-500 text-white py-3 px-6 rounded-lg shadow-md hover:bg-blue-600"
              onClick={addToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* WhatsApp Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Confirm Your Purchase</h2>
            <p className="text-gray-700 mb-2">
              <strong>Product:</strong> {product.name}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Size:</strong> {product.sizes[selectedSizeIndex]}
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Quantity:</strong> {quantity}
            </p>
            <div className="flex space-x-4">
              <button
                className="bg-green-500 text-white py-2 px-4 rounded-lg"
                onClick={handleWhatsAppClick}
              >
                Confirm on WhatsApp
              </button>
              <button
                className="bg-gray-500 text-white py-2 px-4 rounded-lg"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Informational Modal */}
      {isInfoModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-10">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
            <h2 className="text-2xl font-bold mb-4">{message}</h2>
            <button
              className="bg-green-500 text-white py-2 px-4 rounded-lg"
              onClick={() => setIsInfoModalOpen(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* Image Modal */}
      {isImageModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
          onClick={handleOutsideClick}
        >
          <div className="relative">
            <img
              src={currentImages[currentImageIndex]}
              alt={product.name}
              className="w-full h-auto object-contain"
            />
            <button
              className="absolute top-4 right-4 text-white bg-black bg-opacity-50 p-2 rounded-full"
              onClick={closeImageModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
