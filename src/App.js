import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Product listing page
import ProductPageWrapper from "./components/ProductsWrapper"; // Wrapper for individual product page
import Home from "./components/Home";
import "../src/App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ExplorePage from "./components/Explore";
import CartPage from "./components/Cart";
import LoginPage from "./components/Login";
import SignupPage from "./components/Signup";
import { UserContext } from "./context/UserContext";
import useCheckAuth from "./utils/useCheckAuth";
import PageNotFound from "./components/PageNotFound";

const App = () => {
  const { loading, isLoggedIn, user } = useContext(UserContext);
  useCheckAuth();
  // useEffect(() => {
  //   console.log(isLoggedIn);
  //   console.log(user);
  // }, [isLoggedIn, user]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Router>
      <Header />
      <Routes>  
        <Route path="/" element={<Home />} />
        <Route
          path="/product/:productId"
          element={<ProductPageWrapper />}
        />{" "}
        {/* Dynamic ProductPage route */}
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        <Route 
          path="*" 
          element={<PageNotFound/>} 
        />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
