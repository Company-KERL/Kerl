import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductData from './ProductData';
import Filter from './Filter';

const ExplorePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState([0, 10000]);

  // Reset scroll to top when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Filter products based on search term and selected filters
  const filteredProducts = ProductData.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory ? product.category === selectedCategory : true;

    // Filter based on the minimum price of the product
    const matchesPrice =
      parseInt(product.Prices[0]) >= priceRange[0] &&
      parseInt(product.Prices[0]) <= priceRange[1];

    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <section className="mt-16 py-16 bg-gray-50" id="explore">
      <div className="container mx-auto px-4 md:px-16">
        {/* Back Button */}
        <Link
          to="/"
          className="text-gray-600 hover:text-gray-800 text-lg md:text-lg font-semibold mb-8 block"
        >
          ‹ Back to Home
        </Link>

        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          {/* Heading */}
          <h2 className="text-3xl md:text-3xl font-bold text-left mb-4 md:mb-0">
            Explore All Products
          </h2>

          {/* Search Bar */}
          <div className="relative w-full md:w-1/3 mb-4 md:mb-0">
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full px-4 py-2 border rounded-lg shadow-md focus:ring-2 focus:ring-green-500 transition-all duration-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
              <i className="fas fa-search"></i>
            </div>
          </div>
        </div>

        <p className="text-lg text-gray-600 mb-6">
          Discover a wide variety of products that fit your needs. Use filters to narrow down your search and find the perfect items for you!
        </p>

        <div className="flex flex-col md:flex-row">
          {/* Left Sidebar for Filters */}
          <div className="w-full md:w-1/4 bg-transparent p-6 rounded-lg shadow-md mr-5 mb-6 md:mb-0 md:bg-white">
            <Filter
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
            />
          </div>

          {/* Right Section for Displaying Products */}
          <div className="w-full md:w-3/4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl shadow-lg p-6 transition-transform transform hover:scale-105 hover:shadow-2xl"
                >
                  <img
                    src={product.images[0][0]}
                    alt={product.name}
                    className="w-full h-48 md:h-64 object-contain rounded-lg mb-4"
                  />
                  <h3 className="text-xl md:text-2xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4 text-base md:text-md">
                    {product.description.slice(0, 120)}...
                  </p>

                  {/* Pricing Section */}
                  <div className="mb-4 font-sans">
                    {product.Offers && product.Offers.length > 0 && product.Prices.length > 0 ? (
                      <div className="flex items-center space-x-2 text-lg font-bold">
                        <span className="text-gray-800">Starting from: </span>
                        <span className="line-through text-black">₹{product.Prices[0]}</span>
                        <span className="text-green-600 font-semibold">Offer: ₹{product.Offers[0]}</span>
                      </div>
                    ) : (
                      <span className="text-gray-700 font-semibold">Starting from: ₹{product.Prices[0]}</span>
                    )}
                  </div>

                  {/* View More Button */}
                  <Link
                    to={`/product/${product.id}`}
                    className="px-2 py-3 bg-green-500 text-white font-semibold rounded-full 
                    hover:bg-green-600 transition duration-300 ease-in-out transform hover:-translate-y-1 
                    shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 block text-center"
                  >
                    View More
                  </Link>
                </div>
              ))
            ) : (
              <div className="w-full text-center text-gray-700 font-semibold">
                No products found for your search criteria.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExplorePage;
