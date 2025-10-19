import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = (props) => {
  const [animate, setAnimate] = useState(true);

  // After first render, disable animation attribute
  useEffect(() => {
    const timer = setTimeout(() => setAnimate(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const colors = [
    {
      colorName: "Green",
      hexCode: "linear-gradient(135deg, #063729 0%, #0a5f3f 100%)"
    },
    {
      colorName: "Brown",
      hexCode: "linear-gradient(135deg, #392626 0%, #6b4423 100%)"
    },
    {
      colorName: "Purple",
      hexCode: "linear-gradient(135deg, #421a42 0%, #7d3c7d 100%)"
    }
  ];

  return (
    <nav {...(animate ? { 'data-aos': 'fade-up' } : {})} className={`flex items-center justify-between flex-wrap p-4 ${props.theme === 'light' ? 'bg-gradient-to-r from-white to-gray-50 text-gray-800 border-b border-gray-200' : 'bg-gradient-to-r from-gray-800 to-gray-900 text-white border-b border-gray-700'}`}>
      <div className="flex items-center flex-shrink-0 mr-6">
        <Link className="font-bold text-xl" to="/"><strong>{props.title}</strong></Link>
      </div>
      
      <div className="block lg:hidden">
        <button className="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-500 hover:text-gray-300 hover:border-gray-300">
          <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
          </svg>
        </button>
      </div>
      
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          <Link className="block mt-4 lg:inline-block lg:mt-0 mr-4 hover:text-blue-400" to="/">Home</Link>
          <Link className="block mt-4 lg:inline-block lg:mt-0 mr-4 hover:text-blue-400" to="/about">About</Link>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className={`flex items-center space-x-2 ${props.theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
            <input 
              onClick={() => props.toggleTheme()} 
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" 
              type="checkbox" 
              role="switch" 
              id="switchCheckDefault" 
              value="Dark Blue" 
            />
            <label className="text-sm font-medium" htmlFor="switchCheckDefault">Enable Dark Mode</label>
          </div>

          <div className="flex space-x-2">
            {colors.map((color, index) => {
              return (
                <button 
                  key={index} 
                  disabled={props.theme === 'light'} 
                  onClick={(e) => props.addColorTheme(e.target.value, color.hexCode)} 
                  name="colorThemes" 
                  value={color.colorName} 
                  className={`w-8 h-8 rounded border-2 ${props.theme === 'light' ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110 transition-transform'}`}
                  style={{ backgroundImage: color.hexCode }}
                />
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;
