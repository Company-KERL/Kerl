import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';// Product listing page
import ProductPageWrapper from './components/ProductsWrapper'; // Wrapper for individual product page
import Home from './components/Home';
import '../src/App.css'
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/product/:productId" element={<ProductPageWrapper />} /> {/* Dynamic ProductPage route */}
      </Routes>
      <Footer/>
    </Router>
  );
};

export default App;
