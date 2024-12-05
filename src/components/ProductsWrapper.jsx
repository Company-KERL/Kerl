import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductPage from './ProductPage';
import ProductData from './ProductData'; // Assuming you store product info here

const ProductPageWrapper = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const product = ProductData.find((p) => p.id === parseInt(productId, 10)); // Find product by ID

  const handleBackClick = () => {
    navigate('/'); // Navigate back to products page
  };

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <ProductPage product={product} onBackClick={handleBackClick} />
  );
};

export default ProductPageWrapper;
