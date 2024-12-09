import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';// Product listing page
import ProductPageWrapper from './components/ProductsWrapper'; // Wrapper for individual product page
import Home from './components/Home';
import '../src/App.css'
import Header from './components/Header';
import Footer from './components/Footer';
import ExplorePage from './components/Explore';
import CartPage from './components/Cart';
import LoginPage from './components/Login';
import SignupPage from './components/Signup';

const App = () => {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/product/:productId" element={<ProductPageWrapper />} /> {/* Dynamic ProductPage route */}
        <Route path="/explore" element={<ExplorePage/>}/>
        <Route path="/cart" element={<CartPage/>}/>
        <Route path='/login' element = {<LoginPage/>}/>
        <Route path='/signup' element={<SignupPage/>}/>
      </Routes>
      <Footer/>
    </Router>
  );
};

export default App;
