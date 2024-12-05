import React from 'react';

function About() {
  return (
    <section id="about" className="py-10 bg-gray-100 scroll-mt-20">
      <div className="container mx-auto md:px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">ABOUT US</h2>
        <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start gap-10 lg:gap-20 px-4 lg:px-16 mt-10">
          <img 
            src="Logo_big.png" 
            alt="About" 
            className="w-48 md:w-60 lg:w-72 mb-8 lg:mb-0" 
          />
          <div className="bg-gray-200 p-4 md:p-6 lg:p-8 rounded-lg w-full lg:w-2/3 text-left">
            <p className="text-base md:text-lg lg:text-xl font-sans">
              Welcome to KERL, a biotechnology-driven company redefining the cleaning industry with eco-friendly, cruelty-free products. Established in 2024 in Kannur, Kerala, we specialize in detergents, floor cleaners, dishwash liquids, and more—each crafted using the best of chemical engineering and biotechnology. Our products prioritize sustainability, blending the power of science with the beauty of nature to create high-quality, environmentally responsible solutions.
              <br /><br />
              At KERL, we are committed to delivering effective cleaning products that are safe for both your home and the planet, ensuring a cleaner and greener future for everyone.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
