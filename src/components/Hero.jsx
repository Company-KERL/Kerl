import React from 'react';

function Hero() {
  return (
    <section id="ero" className="relative bg-gradient-to-b from-[#e6f3ff] to-[#d1e6f9] text-gray-800 flex items-center justify-center min-h-[850px] overflow-hidden">
      {/* Detailed Nature Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Layered Organic SVG Background */}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="absolute top-0 left-0 w-full h-full"
          viewBox="0 0 1440 810"
          preserveAspectRatio="xMinYMin slice"
        >
          {/* Soft Watercolor-like Background */}
          <defs>
            <linearGradient id="waterColorGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#b0e0e6" stopOpacity="0.3"/>
              <stop offset="100%" stopColor="#87ceeb" stopOpacity="0.1"/>
            </linearGradient>
            
            {/* Organic Shape Masks */}
            <mask id="organicMask">
              <rect width="100%" height="100%" fill="white"/>
              <path 
                d="M0,256 C288,213 576,170 864,170 C1152,170 1440,213 1440,256 L1440,810 L0,810 Z" 
                fill="black"
                transform="scale(1.1) translate(-100, 50)"
              />
              <circle cx="200" cy="200" r="150" fill="black" opacity="0.5"/>
              <circle cx="1200" cy="600" r="200" fill="black" opacity="0.5"/>
            </mask>
          </defs>
          
          {/* Background Layers */}
          <rect 
            width="100%" 
            height="100%" 
            fill="url(#waterColorGradient)" 
            mask="url(#organicMask)"
            className="opacity-60"
          />
          
          {/* Organic Shape Overlays */}
          <path 
            d="M-100,400 
               Q300,300 500,500 
               Q700,700 900,500 
               Q1100,300 1500,400 
               L1500,900 L-100,900 Z" 
            fill="rgba(144,238,144,0.1)" 
            className="animate-slow-drift"
          />
          <path 
            d="M-100,500 
               Q200,400 400,600 
               Q600,800 800,600 
               Q1000,400 1500,500 
               L1500,900 L-100,900 Z" 
            fill="rgba(0,128,0,0.09)" 
            className="animate-slow-drift animation-delay-2000"
          />
        </svg>
        
        {/* Floating Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden opacity-40">
          {/* Floating Leaf-like Shapes */}
          <div className="absolute top-20 left-10 w-48 h-48 bg-green-400 rounded-full mix-blend-multiply blur-2xl animate-float"></div>
          <div className="absolute bottom-20 right-20 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply blur-2xl animate-float animation-delay-1000"></div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="relative z-10 text-center px-6 lg:px-12 py-16 max-w-4xl mx-auto">
        <div className="relative">
          {/* Leaf accent */}
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="absolute -left-12 top-0 w-16 h-16 text-green-500 opacity-50"
            viewBox="0 0 100 100"
            fill="currentColor"
          >
            <path d="M50 10c-20 0-40 20-30 50s40 30 60 0-10-50-30-50z" />
          </svg>
          
          <h1 className="text-5xl md:text-6xl lg:text-8xl font-bold leading-tight text-indigo-800 relative">
            KERL
          </h1>
          
          <p className="mt-4 text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto font-light tracking-wide">
            Nature's Essence in Every Drop
          </p>
        </div>
        
        <div className="mt-8 flex justify-center items-center space-x-4">
          <a
            href="/explore"
            className="inline-block px-10 py-4 bg-green-500 text-white font-semibold rounded-full 
            hover:bg-green-600 transition duration-300 ease-in-out transform hover:-translate-y-1 
            shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          >
            Explore Our Eco-Friendly Solution
          </a>
          <a
            href="#about"
            className="inline-block px-10 py-4 border-2 border-green-500 text-green-800 
            font-semibold rounded-full hover:bg-green-50 transition duration-300 
            ease-in-out transform hover:-translate-y-1 shadow-md"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;

{/* 
  You'll want to add these custom animations to your Tailwind CSS configuration:
  
  @layer utilities {
    .animate-slow-drift {
      animation: drift 20s ease-in-out infinite alternate;
    }
    .animate-float {
      animation: float 6s ease-in-out infinite alternate;
    }
    @keyframes drift {
      0% { transform: translateX(-50px) translateY(-30px); }
      100% { transform: translateX(50px) translateY(30px); }
    }
    @keyframes float {
      0% { transform: translateY(0); }
      100% { transform: translateY(-30px); }
    }
    .animation-delay-2000 {
      animation-delay: 2s;
    }
  }
*/}