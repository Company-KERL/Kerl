import React from 'react';

const Filter = ({ selectedCategory, setSelectedCategory, priceRange, setPriceRange }) => {
  const handlePriceRangeChange = (e) => {
    const selectedRange = e.target.value;
    switch (selectedRange) {
      case 'under500':
        setPriceRange([0, 500]);
        break;
      case '500to1000':
        setPriceRange([500, 1000]);
        break;
      case '1000to5000':
        setPriceRange([1000, 5000]);
        break;
      case 'above5000':
        setPriceRange([5000, Infinity]); // Setting an infinite upper bound for "Above ₹5000"
        break;
      case 'all':
        setPriceRange([0, 10000]); // No price filter, show all products
        break;
      default:
        setPriceRange([0, 10000]); // Default to show all
    }
  };

  // Categories based on ProductData
  const categories = ['Multi Cleaner', 'Toilet Cleaner', 'Floor Cleaner', 'Liquid Detergent'];

  const handleResetFilters = () => {
    setSelectedCategory('');
    setPriceRange([0, 10000]); // Reset to default range
  };

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div>
        <label className="block text-lg font-semibold text-gray-700 mb-2">Category</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg shadow-md focus:ring-2 focus:ring-blue-500 transition-all duration-300"
        >
          <option value="">Select Category (All)</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range Filter */}
      <div>
        <label className="block text-lg font-semibold text-gray-700 mb-2">Price Range</label>
        <select
          value={
            priceRange[1] === Infinity
              ? 'above5000'
              : priceRange[1] === 10000
              ? 'all'
              : priceRange[1] <= 500
              ? 'under500'
              : priceRange[1] <= 1000
              ? '500to1000'
              : priceRange[1] <= 5000
              ? '1000to5000'
              : 'all'
          }
          onChange={handlePriceRangeChange}
          className="w-full px-4 py-2 border rounded-lg shadow-md focus:ring-2 focus:ring-blue-500 transition-all duration-300"
        >
          <option value="all">All</option>
          <option value="under500">Under ₹500</option>
          <option value="500to1000">₹500 - ₹1000</option>
          <option value="1000to5000">₹1000 - ₹5000</option>
          <option value="above5000">Above ₹5000</option>
        </select>
      </div>

      {/* Reset Filters Button */}
      <div className="text-right">
        <button
          onClick={handleResetFilters}
          className="px-6 py-3 bg-purple-400 text-white font-semibold rounded-full shadow-md 
          hover:bg-red-600 transition duration-300 ease-in-out w-full"
        >
          Reset All Filters
        </button>
      </div>
    </div>
  );
};

export default Filter;
