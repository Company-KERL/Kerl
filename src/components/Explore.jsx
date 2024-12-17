import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Filter from "./Filter";

const ExplorePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [ProductData, setProducts] = useState([]); // To store fetched products
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const navigate = useNavigate();

  // Reset scroll to top when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URI}/products`
        ); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
        console.log(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchProducts();
  }, []);

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1); // Navigate to the previous page
    } else {
      navigate("/"); // Fallback route if no history is available
    }
  };

  // Transform the products to list each size as a separate product
  const transformedProducts = ProductData.flatMap((product) =>
    product.sizes.map((size, index) => ({
      _id: `${product._id}/${index}`, // Unique ID for each size
      name: `${product.name} (${size})`, // Include size in the product name
      description: product.description,
      category: product.category,
      price: product.prices[index], // Use the corresponding price
      offer: product.offers?.[index] || null, // Use the corresponding offer, if any
      image: product.images?.[index]?.[0] || null, // Use the corresponding image
    }))
  );

  // Filter the transformed products based on user input
  const filteredProducts = transformedProducts.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory
      ? product.name.toLowerCase().includes(selectedCategory.toLowerCase()) ||
        product.description
          .toLowerCase()
          .includes(selectedCategory.toLowerCase())
      : true;

    const matchesPrice =
      product.price >= priceRange[0] && product.price <= priceRange[1];

    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <section className="mt-16 py-16 bg-gray-50" id="explore">
      <div className="container mx-auto px-4 md:px-16">
        {/* Back Button */}
        <Link
          onClick={handleBack}
          className="text-gray-600 hover:text-gray-800 text-lg md:text-lg font-semibold mb-8 block"
        >
          ‹ Back
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
          Discover a wide variety of products that fit your needs. Use filters
          to narrow down your search and find the perfect items for you!
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
                  key={product._id}
                  className="bg-white rounded-xl shadow-lg p-6 transition-transform transform hover:scale-105 hover:shadow-2xl"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 md:h-64 object-contain rounded-lg mb-4"
                  />
                  <h3 className="text-xl md:text-2xl font-semibold mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mb-4 text-base md:text-md">
                    {product.description.slice(0, 120)}...
                  </p>

                  {/* Pricing Section */}
                  <div className="mb-4 font-sans">
                    {product.offer ? (
                      <div className="flex items-center space-x-2 text-lg font-bold">
                        <span className="text-gray-800">Starting from: </span>
                        <span className="line-through text-black">
                          ₹{product.price}
                        </span>
                        <span className="text-green-600 font-semibold">
                          Offer: ₹{product.offer}
                        </span>
                      </div>
                    ) : (
                      <span className="text-gray-700 font-semibold">
                        Starting from: ₹{product.price}
                      </span>
                    )}
                  </div>

                  {/* View More Button */}
                  <Link
                    to={`/product/${product._id}`}
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
