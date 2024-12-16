import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductPage from './ProductPage';

const ProductPageWrapper = () => {
  const { productId,index } = useParams();  // Get productId from URL
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);  // State to store product data
  const [loading, setLoading] = useState(true);  // State to handle loading
  const [error, setError] = useState(null);  // State to handle errors

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URI}/products/${productId}`);
        if (!response.ok) {
          throw new Error('Product not found');
        }
        const data = await response.json();
        setProduct(data);  // Set product data in state
      } catch (error) {
        setError(error.message);  // Set error message in state
      } finally {
        setLoading(false);  // Set loading to false when the fetch completes
      }
    };

    fetchProductData();
  }, [productId]);  // Re-fetch when productId changes

  const handleBackClick = () => {
    if (window.history.length > 1) {
      navigate(-1); // Navigate to the previous page
    } else {
      navigate('/'); // Fallback route if no history is available
    }
  };

  if (loading) {
    return <div>Loading...</div>;  // Show loading state
  }

  if (error) {
    return <div>{error}</div>;  // Show error message if there's any
  }

  if (!product) {
    return <div>Product not found</div>;  // Show message if product data is not found
  }

  return (
    <ProductPage product={product} onBackClick={handleBackClick} index={index}/>
  );
};

export default ProductPageWrapper;
