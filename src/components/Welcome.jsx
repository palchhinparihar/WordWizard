import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Sparkles, Wand2, BookOpen, Zap } from "lucide-react";

const Welcome = ({ theme }) => {
  const [displayText, setDisplayText] = useState("");
  const fullText = "Welcome to WordWizard!";
  const typingSpeed = 100;
  const isDark = theme === "dark";

  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: true,
      easing: "ease-out-cubic",
    });

    // Typewriter effect
    let i = 0;
    const typeWriter = () => {
      if (i < fullText.length) {
        setDisplayText(fullText.substring(0, i + 1));
        i++;
        setTimeout(typeWriter, typingSpeed);
      } else {
        // Start floating animation after typing completes
        document.querySelector('.welcome-text')?.classList.add('animate-float');
      }
    };

    setTimeout(typeWriter, 500); // Delay before starting
  }, []);

  return (
    <div className="relative min-h-screen h-screen md:min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 z-0">
        {/* Base gradient */}
        <div className={`absolute inset-0 transition-opacity duration-1000 ${isDark
          ? "bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900"
          : "bg-gradient-to-br from-blue-50 via-white to-purple-50"
          }`}></div>

        {/* Animated gradient layer */}
        <div className={`absolute inset-0 opacity-30 animate-gradient-x bg-gradient-to-r ${isDark
          ? "from-purple-600/10 via-blue-600/10 to-purple-600/10"
          : "from-blue-400/10 via-purple-400/10 to-pink-400/10"
          }`}></div>

        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full animate-float-particle ${isDark ? "bg-blue-400/20" : "bg-blue-300/30"
              }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 20 + 5}px`,
              height: `${Math.random() * 20 + 5}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 10}s`,
            }}
          ></div>
        ))}

        {/* Magic sparkles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className={`absolute animate-sparkle ${isDark ? "text-yellow-300/40" : "text-yellow-500/30"
                }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            >
              <Sparkles size={Math.random() * 20 + 10} />
            </div>
          ))}
        </div>

        {/* Geometric patterns */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-32 h-32 border-2 border-blue-400 rounded-full animate-spin-slow"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 border-2 border-purple-400 rounded-full animate-spin-slow-reverse"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 border-2 border-pink-400 rotate-45 animate-pulse"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4">
        <div className="text-center">
          {/* Animated Icons */}
          <div className="flex justify-center space-x-6 mb-8">
            <div
              data-aos="zoom-in"
              data-aos-delay="300"
              className={`p-4 rounded-2xl shadow-2xl transform transition-all duration-500 hover:scale-110 ${isDark
                ? "bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/30"
                : "bg-gradient-to-br from-blue-100 to-purple-100 border border-blue-200"
                }`}
            >
              <BookOpen size={32} className={isDark ? "text-blue-300" : "text-blue-600"} />
            </div>
            <div
              data-aos="zoom-in"
              data-aos-delay="500"
              className={`p-4 rounded-2xl shadow-2xl transform transition-all duration-500 hover:scale-110 ${isDark
                ? "bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/30"
                : "bg-gradient-to-br from-purple-100 to-pink-100 border border-purple-200"
                }`}
            >
              <Wand2 size={32} className={isDark ? "text-purple-300" : "text-purple-600"} />
            </div>
            <div
              data-aos="zoom-in"
              data-aos-delay="700"
              className={`p-4 rounded-2xl shadow-2xl transform transition-all duration-500 hover:scale-110 ${isDark
                ? "bg-gradient-to-br from-pink-600/20 to-blue-600/20 border border-pink-500/30"
                : "bg-gradient-to-br from-pink-100 to-blue-100 border border-pink-200"
                }`}
            >
              <Zap size={32} className={isDark ? "text-pink-300" : "text-pink-600"} />
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="welcome-text relative">
            <span className="block text-4xl md:text-6xl lg:text-7xl font-bold mb-4 tracking-tight">
              <span className={`bg-clip-text text-transparent bg-gradient-to-r ${isDark
                ? "from-blue-400 via-purple-400 to-pink-400"
                : "from-blue-600 via-purple-600 to-pink-600"
                }`}>
                {displayText}
                <span className={`inline-block w-[3px] h-12 ml-1 align-middle ${displayText.length < fullText.length
                  ? "animate-pulse"
                  : "opacity-0"
                  } ${isDark ? "bg-blue-400" : "bg-blue-600"
                  }`}></span>
              </span>
            </span>

            {/* Animated underline */}
            <div className="flex justify-center">
              <div className={`h-1 w-32 rounded-full mt-4 ${isDark ? "bg-gradient-to-r from-blue-500 to-purple-500" : "bg-gradient-to-r from-blue-400 to-purple-400"
                } animate-underline`}></div>
            </div>
          </h1>

          {/* Subtitle */}
          <p
            data-aos="fade-up"
            data-aos-delay="1200"
            className={`text-lg md:text-xl mt-8 max-w-2xl mx-auto leading-relaxed ${isDark ? "text-gray-300" : "text-gray-600"
              }`}
          >
            Transform your text with magical editing tools.
            <span className={`block mt-2 ${isDark ? "text-blue-300" : "text-blue-500"
              } font-medium`}>
              Upload, edit, analyze, and download with ease!
            </span>
          </p>

          {/* Stats or Features */}
          <div
            data-aos="fade-up"
            data-aos-delay="1800"
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-2xl mx-auto"
          >
            {[
              { label: "Real-time Editing", value: "✓" },
              { label: "Multiple Themes", value: "10+" },
              { label: "File Formats", value: "✓" },
              { label: "Languages", value: "2+" }
            ].map((stat, index) => (
              <div
                key={index}
                className={`p-4 rounded-xl backdrop-blur-sm border ${isDark
                  ? "bg-gray-900/30 border-gray-700"
                  : "bg-white/30 border-gray-200"
                  }`}
              >
                <div className={`text-2xl font-bold ${isDark ? "text-blue-400" : "text-blue-600"
                  }`}>{stat.value}</div>
                <div className={`text-sm mt-1 ${isDark ? "text-gray-400" : "text-gray-600"
                  }`}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add these CSS animations to your global CSS file or component style */}
      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes float-particle {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(0) translateX(20px); }
          75% { transform: translateY(20px) translateX(10px); }
        }
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1); }
        }
        @keyframes underline {
          0% { width: 0; opacity: 0; }
          100% { width: 8rem; opacity: 1; }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-slow-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 15s ease infinite;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-float-particle {
          animation: float-particle linear infinite;
        }
        .animate-sparkle {
          animation: sparkle 2s ease-in-out infinite;
        }
        .animate-underline {
          animation: underline 1.5s ease-out forwards;
          animation-delay: 2s;
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .animate-spin-slow-reverse {
          animation: spin-slow-reverse 25s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Welcome;