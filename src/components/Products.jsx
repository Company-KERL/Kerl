import React from 'react';
import { Link } from 'react-router-dom';
import ProductData from './ProductData';

const Products = () => {
  return (
    <section className="py-16 bg-gray-100" id="products">
      <div className="container mx-auto px-4 md:px-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
          {ProductData.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-lg p-6">
              <img 
                src={product.images[0][0]} 
                alt={product.name} 
                className="w-full h-48 md:h-64 object-contain rounded-lg mb-4" 
              />
              <h3 className="text-xl md:text-2xl font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-4 text-base md:text-lg">{product.description.slice(0, 120)}...</p>
              
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
              
              <Link to={`/product/${product.id}`}>
                <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300">
                  View More
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
