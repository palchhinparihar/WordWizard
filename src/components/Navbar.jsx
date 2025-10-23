import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import {
  Sun,
  Moon,
  ChevronDown,
  Palette,
  Upload,
  Download,
} from "lucide-react";

const Navbar = (props) => {
  const [animate, setAnimate] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { t, i18n } = useTranslation();


  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("lang", lng);
  };

  const fileInputRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const allThemes = [
    // Dark Themes
    {
      id: "dark",
      name: "Midnight Blue",
      gradient:
        "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
      preview: "from-indigo-950 via-blue-900 to-slate-900",
      category: "dark",
      icon: "🌙",
    },
    {
      id: "ocean",
      name: "Deep Ocean",
      gradient:
        "linear-gradient(135deg, #0a192f 0%, #1e3a5f 50%, #2d5a7b 100%)",
      preview: "from-slate-950 via-cyan-900 to-blue-800",
      category: "dark",
      icon: "🌊",
    },
    {
      id: "forest",
      name: "Forest Night",
      gradient:
        "linear-gradient(135deg, #052e16 0%, #14532d 50%, #166534 100%)",
      preview: "from-green-950 via-green-900 to-emerald-800",
      category: "dark",
      icon: "🌲",
    },
    {
      id: "royal",
      name: "Royal Purple",
      gradient:
        "linear-gradient(135deg, #2e1065 0%, #4c1d95 50%, #6b21a8 100%)",
      preview: "from-purple-950 via-purple-900 to-fuchsia-900",
      category: "dark",
      icon: "👑",
    },
    {
      id: "crimson",
      name: "Sunset Crimson",
      gradient:
        "linear-gradient(135deg, #450a0a 0%, #7f1d1d 50%, #991b1b 100%)",
      preview: "from-red-950 via-red-900 to-red-800",
      category: "dark",
      icon: "🌅",
    },
    {
      id: "noir",
      name: "Noir",
      gradient:
        "linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #2d2d2d 100%)",
      preview: "from-black via-gray-900 to-gray-800",
      category: "dark",
      icon: "🎬",
    },

    // Light Themes
    {
      id: "light",
      name: "Cloud White",
      gradient:
        "linear-gradient(135deg, #ffffff 0%, #f3f4f6 50%, #e5e7eb 100%)",
      preview: "from-white via-gray-50 to-gray-100",
      category: "light",
      icon: "☁️",
    },
    {
      id: "sunrise",
      name: "Sunrise",
      gradient:
        "linear-gradient(135deg, #fef3c7 0%, #fde68a 50%, #fcd34d 100%)",
      preview: "from-amber-100 via-amber-200 to-amber-300",
      category: "light",
      icon: "🌄",
    },
    {
      id: "mint",
      name: "Mint Fresh",
      gradient:
        "linear-gradient(135deg, #d1fae5 0%, #a7f3d0 50%, #6ee7b7 100%)",
      preview: "from-emerald-100 via-emerald-200 to-emerald-300",
      category: "light",
      icon: "🍃",
    },

    // Vibrant Themes - MORE SUBTLE & PROFESSIONAL
    {
      id: "aurora",
      name: "Aurora",
      gradient:
        "linear-gradient(135deg, #1e1b4b 0%, #312e81 40%, #3730a3 70%, #1e3a8a 100%)",
      preview: "from-indigo-950 via-indigo-800 to-blue-900",
      category: "vibrant",
      icon: "✨",
    },
    {
      id: "cyberpunk",
      name: "Cyberpunk",
      gradient:
        "linear-gradient(135deg, #0f172a 0%, #1e293b 40%, #334155 70%, #475569 100%)",
      preview: "from-slate-950 via-slate-800 to-slate-600",
      category: "vibrant",
      icon: "🤖",
    },
    {
      id: "sunset-blaze",
      name: "Sunset Blaze",
      gradient:
        "linear-gradient(135deg, #431407 0%, #7c2d12 40%, #9a3412 70%, #c2410c 100%)",
      preview: "from-orange-950 via-orange-800 to-orange-600",
      category: "vibrant",
      icon: "🔥",
    },
  ];

  const currentTheme =
    allThemes.find((t) => t.id === props.currentThemeId) || allThemes[0];
  const isDark =
    currentTheme.category === "dark" || currentTheme.category === "vibrant";

  const handleThemeSelect = (themeId) => {
    const selectedTheme = allThemes.find((t) => t.id === themeId);
    if (selectedTheme) {
      props.onThemeSelect(themeId, selectedTheme.gradient);
      setIsDropdownOpen(false);
    }
  };

  const groupedThemes = {
    dark: allThemes.filter((t) => t.category === "dark"),
    light: allThemes.filter((t) => t.category === "light"),
    vibrant: allThemes.filter((t) => t.category === "vibrant"),
  };

  // When Upload button clicked, trigger file input click
  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      props.onFileImport(e.target.files[0]);
      e.target.value = null; // reset so same file can be imported again if needed
    }
  };

  return (
    <nav
      {...(animate ? { 'data-aos': 'fade-up' } : {})}
      className={`sticky top-0 z-50 shadow-md flex items-center justify-between flex-wrap p-4 transition-all duration-300 ${isDark
          ? 'bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white border-b border-gray-700'
          : 'bg-gradient-to-r from-white via-gray-50 to-white text-gray-800 border-b border-gray-200'
        }`}
    >
      <div className="flex items-center flex-shrink-0 mr-6">
        <Link
          className="font-bold text-xl tracking-tight hover:text-blue-500 transition-colors"
          to="/"
        >
          <strong>{props.title}</strong>
        </Link>
      </div>

      {/* Hamburger button */}
      <div className="block lg:hidden">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`flex items-center px-3 py-2 border rounded transition-colors ${isDark
              ? "text-gray-300 border-gray-600 hover:text-white hover:border-gray-400"
              : "text-gray-600 border-gray-400 hover:text-gray-800 hover:border-gray-600"
            }`}
        >
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>

      {/* Menu + Right section */}
      <div
        className={`w-full block flex-grow lg:flex lg:items-center lg:w-auto ${menuOpen ? "block" : "hidden"
          } lg:block`}
      >
        {/* Links */}
        <div className="text-sm lg:flex-grow">
          <Link
            className={`block mt-4 lg:inline-block lg:mt-0 mr-4 transition-colors ${isDark ? "hover:text-blue-400" : "hover:text-blue-600"
              }`}
            to="/"
          >
            {t("home")}
          </Link>
          <Link
            className={`block mt-4 lg:inline-block lg:mt-0 mr-4 transition-colors ${isDark ? "hover:text-blue-400" : "hover:text-blue-600"
              }`}
            to="/about"
          >
            {t("about")}
          </Link>
        </div>

        {/* Language Toggle */}
        <div className="flex items-center gap-2 mt-4 lg:mt-0 mr-4">
          <button
            onClick={() => changeLanguage('en')}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${i18n.language === 'en'
                ? isDark ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-900'
                : isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'
              }`}
          >
            EN
          </button>
          <span>|</span>
          <button
            onClick={() => changeLanguage('hi')}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${i18n.language === 'hi'
                ? isDark ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-900'
                : isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'
              }`}
          >
            हिंदी
          </button>
        </div>

        <div className="mt-4 lg:mt-0 flex flex-col lg:flex-row lg:items-center gap-4">
          {/* Hidden File Input */}
          <input
            type="file"
            accept=".txt"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />

          {/* Upload Button */}
          <button
            onClick={handleUploadClick}
            className={`btn ${isDark ? "btn-dark" : "btn-light"
              } transition-all duration-200 flex items-center`}
          >
            {/* Icon only on desktop (lg:), hidden on smaller */}
            <Upload className="hidden lg:block" />

            {/* Text only on mobile when menu is open */}
            {menuOpen && <span className="lg:hidden">Upload</span>}
          </button>

          {/* Download Button */}
          <button
            onClick={props.onExport}
            className={`mr-5 btn ${isDark ? "btn-dark" : "btn-light"
              } transition-all duration-200 flex items-center`}
          >
            {/* Icon only on desktop (lg:), hidden on smaller */}
            <Download className="hidden lg:block" />

            {/* Text only on mobile when menu is open */}
            {menuOpen && <span className="lg:hidden">Download</span>}
          </button>
        </div>

        {/* Enhanced Theme Selector */}
        <div className="mt-4 lg:mt-0">
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 active:scale-95 ${isDark
                  ? "bg-gray-800 hover:bg-gray-700 text-white"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                }`}
              aria-label="Select theme"
            >
              <div className="flex items-center gap-2">
                {isDark ? (
                  <Moon className="w-5 h-5 text-blue-400" />
                ) : (
                  <Sun className="w-5 h-5 text-amber-500" />
                )}
                <span className="text-sm font-medium hidden sm:inline">
                  {currentTheme.name}
                </span>
                <span className="text-lg sm:hidden">{currentTheme.icon}</span>
              </div>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""
                  }`}
              />
            </button>

            {/* Enhanced Dropdown Menu */}
            {isDropdownOpen && (
              <div
                className={`absolute right-0 mt-2 w-72 rounded-xl shadow-2xl overflow-hidden z-50 animate-fadeIn ${isDark
                    ? "bg-gray-800 border border-gray-700"
                    : "bg-white border border-gray-200"
                  }`}
              >
                <div className="max-h-96 overflow-y-auto">
                  {/* Dark Themes Section */}
                  <div
                    className={`px-3 py-2 text-xs font-semibold uppercase tracking-wider ${isDark
                        ? "text-gray-400 bg-gray-900"
                        : "text-gray-500 bg-gray-50"
                      }`}
                  >
                    <div className="flex items-center gap-2">
                      <Moon className="w-3 h-3" />
                      <span>Dark Themes</span>
                    </div>
                  </div>
                  {groupedThemes.dark.map((theme) => {
                    const isSelected = currentTheme.id === theme.id;
                    return (
                      <button
                        key={theme.id}
                        onClick={() => handleThemeSelect(theme.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 transition-all duration-200 ${isSelected
                            ? isDark
                              ? "bg-gray-700 text-white"
                              : "bg-gray-100 text-gray-900"
                            : isDark
                              ? "hover:bg-gray-700 text-gray-300"
                              : "hover:bg-gray-50 text-gray-700"
                          }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-lg bg-gradient-to-br ${theme.preview
                            } border ${isDark ? "border-gray-600" : "border-gray-300"
                            } ${isSelected
                              ? "ring-2 ring-blue-400 ring-offset-2 ring-offset-gray-800"
                              : ""
                            }`}
                        />
                        <div className="flex-1 text-left">
                          <div className="text-sm font-medium flex items-center gap-2">
                            <span>{theme.icon}</span>
                            <span>{theme.name}</span>
                          </div>
                        </div>
                        {isSelected && (
                          <span className="text-blue-400 text-sm font-bold">
                            ✓
                          </span>
                        )}
                      </button>
                    );
                  })}

                  {/* Light Themes Section */}
                  <div
                    className={`px-3 py-2 text-xs font-semibold uppercase tracking-wider ${isDark
                        ? "text-gray-400 bg-gray-900"
                        : "text-gray-500 bg-gray-50"
                      }`}
                  >
                    <div className="flex items-center gap-2">
                      <Sun className="w-3 h-3" />
                      <span>Light Themes</span>
                    </div>
                  </div>
                  {groupedThemes.light.map((theme) => {
                    const isSelected = currentTheme.id === theme.id;
                    return (
                      <button
                        key={theme.id}
                        onClick={() => handleThemeSelect(theme.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 transition-all duration-200 ${isSelected
                            ? isDark
                              ? "bg-gray-700 text-white"
                              : "bg-gray-100 text-gray-900"
                            : isDark
                              ? "hover:bg-gray-700 text-gray-300"
                              : "hover:bg-gray-50 text-gray-700"
                          }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-lg bg-gradient-to-br ${theme.preview
                            } border ${isDark ? "border-gray-600" : "border-gray-300"
                            } ${isSelected
                              ? "ring-2 ring-blue-400 ring-offset-2"
                              : ""
                            }`}
                        />
                        <div className="flex-1 text-left">
                          <div className="text-sm font-medium flex items-center gap-2">
                            <span>{theme.icon}</span>
                            <span>{theme.name}</span>
                          </div>
                        </div>
                        {isSelected && (
                          <span className="text-blue-400 text-sm font-bold">
                            ✓
                          </span>
                        )}
                      </button>
                    );
                  })}

                  {/* Vibrant Themes Section */}
                  <div
                    className={`px-3 py-2 text-xs font-semibold uppercase tracking-wider ${isDark
                        ? "text-gray-400 bg-gray-900"
                        : "text-gray-500 bg-gray-50"
                      }`}
                  >
                    <div className="flex items-center gap-2">
                      <Palette className="w-3 h-3" />
                      <span>Accent Themes</span>
                    </div>
                  </div>
                  {groupedThemes.vibrant.map((theme) => {
                    const isSelected = currentTheme.id === theme.id;
                    return (
                      <button
                        key={theme.id}
                        onClick={() => handleThemeSelect(theme.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 transition-all duration-200 ${isSelected
                            ? isDark
                              ? "bg-gray-700 text-white"
                              : "bg-gray-100 text-gray-900"
                            : isDark
                              ? "hover:bg-gray-700 text-gray-300"
                              : "hover:bg-gray-50 text-gray-700"
                          }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-lg bg-gradient-to-br ${theme.preview
                            } border ${isDark ? "border-gray-600" : "border-gray-300"
                            } ${isSelected
                              ? "ring-2 ring-blue-400 ring-offset-2 ring-offset-gray-800"
                              : ""
                            }`}
                        />
                        <div className="flex-1 text-left">
                          <div className="text-sm font-medium flex items-center gap-2">
                            <span>{theme.icon}</span>
                            <span>{theme.name}</span>
                          </div>
                        </div>
                        {isSelected && (
                          <span className="text-blue-400 text-sm font-bold">
                            ✓
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
