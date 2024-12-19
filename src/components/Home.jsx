import React, { useState } from "react";
import Hero from "./Hero";
import Aboutus from "./Aboutus";
import Products from "./Products";
import Loader from "./Loading";

const Home = () => {
  const [loading, setLoading] = useState(false);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <Hero />
      <Aboutus />
      <Products setLoading={setLoading} />
    </div>
  );
};

export default Home;
