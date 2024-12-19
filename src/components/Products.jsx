import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Products = ({ setLoading }) => {
  const visibleProductsCount = 3;
  const [ProductData, setProducts] = useState([]);

  const navigate = useNavigate();

  const handleClick = (item) => {
    navigate(`/product/${item._id}`);
  };

  useEffect(() => {
    // setLoading(true);
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URI}/products`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
        console.log(data);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="py-16 bg-gray-100" id="products">
      <div className="container mx-auto px-4 md:px-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Our Products
        </h2>

        <div className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
            {/* Display the first 3 real products */}
            {ProductData.slice(0, visibleProductsCount).map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-lg p-6 hover:cursor-pointer"
              >
                <div>
                  <img
                    src={product.images[0][0]}
                    alt={product.name}
                    className="w-full h-48 md:h-64 object-contain rounded-lg mb-4"
                  />
                  <h3 className="text-xl md:text-2xl font-semibold mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mb-4 text-base md:text-lg">
                    {product.description.slice(0, 120)}...
                  </p>

                  {/* Pricing Section */}
                  <div className="mb-4 font-sans">
                    {product.offers &&
                    product.offers.length > 0 &&
                    product.prices.length > 0 ? (
                      <div className="flex items-center space-x-2 text-lg font-bold">
                        <span className="text-gray-800">Starting from: </span>
                        <span className="line-through text-black">
                          ₹{product.prices[0]}
                        </span>
                        <span className="text-green-600 font-semibold">
                          Offer: ₹{product.offers[0]}
                        </span>
                      </div>
                    ) : (
                      <span className="text-gray-700 font-semibold">
                        Starting from: ₹{product.prices[0]}
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => handleClick(product)}
                  className="px-2 py-3 bg-green-500 text-white font-semibold rounded-full w-full
                                    hover:bg-green-600 transition duration-300 ease-in-out transform hover:-translate-y-1 
                                    shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 block text-center"
                >
                  View More
                </button>
              </div>
            ))}

            {/* Empty product "ghosts" with fade effect */}
            {/* Empty product "ghosts" with fade effect */}
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className={`bg-white rounded-lg shadow-lg p-6 relative overflow-hidden ${
                  index === 0 ? "" : "hidden sm:block" // Show only the first ghost in phone view
                }`}
              >
                {/* Apply gradient fade effect */}
                <div
                  className="w-full h-36 bg-gradient-to-b from-gray-200 to-transparent rounded-lg"
                  style={{ opacity: 1 - index * 0.2 }} // Gradual fade for each ghost
                />
              </div>
            ))}
          </div>

          {/* View More Button */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 p-6">
            <Link to="/explore">
              <button
                className="px-10 py-3 bg-green-500 text-white font-semibold rounded-full 
            hover:bg-green-600 transition duration-300 ease-in-out transform hover:-translate-y-1 
            shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
              >
                Explore More
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
