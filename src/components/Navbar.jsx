import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Sun,
  Moon,
  ChevronDown,
  Upload,
  Download,
} from "lucide-react";
import { allThemes } from "../data/themes";
import { languages, getThemeSections } from "../data/navbarContent";

const Navbar = (props) => {
  const [animate, setAnimate] = useState(false);
  const [textAnimate, setTextAnimate] = useState(false);
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
    setTextAnimate(true); // trigger animation
    const timer = setTimeout(() => setTextAnimate(false), 500); // duration of animation
    return () => clearTimeout(timer);
  }, [props.currentThemeId]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  const themeSections = getThemeSections(groupedThemes);

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
      {...(animate ? { "data-aos": "fade-up" } : {})}
      className={`sticky top-0 z-50 shadow-md flex items-center justify-between flex-wrap p-4 transition-all duration-300 ${isDark
          ? "bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white border-b border-gray-700"
          : "bg-gradient-to-r from-white via-gray-50 to-white text-gray-800 border-b border-gray-200"
        }`}
    >
      <div className="flex items-center flex-shrink-0 mr-6">
        <Link
          title={props.title || "Go to Home"}
          className={`font-bold text-xl tracking-tight hover:text-blue-500 transition-colors ${textAnimate ? 'animate-textChange' : ''} cursor-pointer`}
          to="/"
        >
          <strong>{props.title || "WordWizard"}</strong>
        </Link>
      </div>

      {/* Hamburger button */}
      <div className={`block lg:hidden ${textAnimate ? 'animate-textChange' : ''}`}>
        <button
          title={t("toggleMenu") || "Toggle menu"}
          onClick={() => setMenuOpen(!menuOpen)}
          className={`flex items-center px-3 py-2 border rounded transition-colors ${isDark
            ? "text-gray-300 border-gray-600 hover:text-white hover:border-gray-400"
            : "text-gray-600 border-gray-400 hover:text-gray-800 hover:border-gray-600"
            } cursor-pointer`}
        >
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>{t("menu") || "Menu"}</title>
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
        <div className={`text-sm lg:flex-grow ${textAnimate ? 'animate-textChange' : ''}`}>
          {["home", "about"].map((item) => {
            const to = item === "home" ? "/" : `/${item}`;
            return (
              <Link
                key={item}
                title={t(item)}
                className={`block mt-4 lg:inline-block lg:mt-0 mr-4 transition-colors ${isDark ? "hover:text-blue-400" : "hover:text-blue-600"
                  } cursor-pointer`}
                to={to}
              >
                {t(item)}
              </Link>
            );
          })}
        </div>

        {/* Language Toggle */}
        <div className="flex items-center gap-2 mt-4 lg:mt-0 mr-4">
          {languages.map((ln) => {
            const selected = i18n.language === ln.code;
            return (
              <button
                key={ln.code}
                title={`Change language to ${ln.code === "en" ? "English" : "Hindi"}`}
                onClick={() => changeLanguage(ln.code)}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors cursor-pointer ${selected
                    ? isDark
                      ? "bg-gray-700 text-white"
                      : "bg-gray-200 text-gray-900"
                    : isDark
                      ? "text-gray-300 hover:text-white"
                      : "text-gray-700 hover:text-gray-900"
                  }`}
                aria-pressed={selected}
              >
                {ln.label}
              </button>
            );
          })}
        </div>

        <div className={`mt-4 lg:mt-0 flex flex-col lg:flex-row lg:items-center gap-4 ${textAnimate ? 'animate-textChange' : ''} `}>
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
            title={"Upload a file"}
            onClick={handleUploadClick}
            className={`btn ${isDark ? "btn-dark" : "btn-light"
              } transition-all duration-200 flex items-center cursor-pointer`}
          >
            {/* Icon only on desktop (lg:), hidden on smaller */}
            <Upload className="hidden lg:block" />

            {/* Text only on mobile when menu is open */}
            {menuOpen && <span className="lg:hidden">Upload</span>}
          </button>

          {/* Download Button */}
          <button
            title={t("tooltip.downloadFile")}
            onClick={props.onExport}
            className={`mr-5 btn ${isDark ? "btn-dark" : "btn-light"
              } transition-all duration-200 flex items-center cursor-pointer`}
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
              title={currentTheme.name || "Select theme"}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 active:scale-95 ${isDark
                ? "bg-gray-800 hover:bg-gray-700 text-white"
                : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                } cursor-pointer`}
              aria-label="Select theme"
            >
              <div className="flex items-center gap-2">
                {isDark ? (
                  <Moon className={`w-5 h-5 text-blue-400 ${textAnimate ? 'animate-textChange' : ''}`} />
                ) : (
                  <Sun className={`w-5 h-5 text-amber-500 ${textAnimate ? 'animate-textChange' : ''}`} />
                )}
                <span className={`text-sm font-medium hidden sm:inline transition-all duration-500 ${textAnimate ? 'translate-y-1 opacity-0 animate-textChange' : ''
                  }`}
                >
                  {currentTheme.name}
                </span>

                <span className="text-lg sm:hidden" title={currentTheme.name}>{currentTheme.icon}</span>
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
                  } `}
              >
                <div className="max-h-96 overflow-y-auto">
                  {themeSections.map((section) => {
                    const IconComp = section.icon;
                    return (
                      <div key={section.key}>
                        <div
                          className={`px-3 py-2 text-xs font-semibold uppercase tracking-wider ${isDark
                            ? "text-gray-400 bg-gray-900"
                            : "text-gray-500 bg-gray-50"
                            } `}
                        >
                          <div className="flex items-center gap-2">
                            <IconComp className="w-3 h-3" />
                            <span>{section.label}</span>
                          </div>
                        </div>

                        {section.items.map((theme) => {
                          const isSelected = currentTheme.id === theme.id;
                          return (
                            <button
                              key={theme.id}
                              title={t("applyTheme", { name: theme.name }) || `Apply ${theme.name}`}
                              onClick={() => handleThemeSelect(theme.id)}
                              className={`w-full flex items-center gap-3 px-4 py-3 transition-all duration-200 cursor-pointer ${isSelected
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
                                title={theme.name}
                              />
                              <div className="flex-1 text-left">
                                <div className="text-sm font-medium flex items-center gap-2">
                                  <span>{theme.icon}</span>
                                  <span>{theme.name}</span>
                                </div>
                              </div>
                              {isSelected && (
                                <span className="text-blue-400 text-sm font-bold" title={t("selected") || "Selected"}>
                                  ✓
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
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
