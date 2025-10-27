import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

const BackToTopButton = ({ theme }) => {
  const [isVisible, setIsVisible] = useState(false);
  const isDark = theme === "dark";

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-110 hover:-translate-y-1 active:scale-95 cursor-pointer ${
        isDark
          ? "bg-gray-800 hover:bg-gray-700 text-white border border-gray-600 hover:border-gray-500"
          : "bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 hover:border-gray-400"
      }`}
      aria-label="Back to top"
      title="Back to top"
    >
      <ArrowUp className="w-5 h-5 mx-auto" />
    </button>
  );
};

export default BackToTopButton;
