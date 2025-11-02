import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Upload, Download, X, Menu } from "lucide-react";
import Dropdown from "./DropDown";
import MobileMenu from "./MobileMenu";
import { allThemes } from "../data/themes";
import { languages } from "../data/navbarContent";

const Navbar = (props) => {
  const [animate, setAnimate] = useState(false);
  const [textAnimate, setTextAnimate] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const fileInputRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setTextAnimate(true);
    const timer = setTimeout(() => setTextAnimate(false), 500);
    return () => clearTimeout(timer);
  }, [props.currentThemeId]);

  const currentTheme =
    allThemes.find((t) => t.id === props.currentThemeId) || allThemes[0];
  const isDark =
    currentTheme.category === "dark" || currentTheme.category === "vibrant";

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("lang", lng);
  };

  const handleUploadClick = () => fileInputRef.current?.click();

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      props.onFileImport(e.target.files[0]);
      e.target.value = null;
    }
  }; 

  const handleMenuAction = () => {
    setMenuOpen(false);
    setTextAnimate(true);
    setTimeout(() => setTextAnimate(false), 600);
  };

  return (
    <nav
      {...(animate ? { "data-aos": "fade-up" } : {})}
      className={`sticky top-0 z-50 shadow-md transition-all duration-300 ${
        isDark
          ? "bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white border-b border-gray-700"
          : "bg-gradient-to-r from-white via-gray-50 to-white text-gray-800 border-b border-gray-200"
      }`}
    >
      <div className="flex items-center justify-between p-4 px-8 w-full">
        {/* LOGO */}
        <Link
          to="/"
          className={`font-bold text-2xl tracking-tight hover:text-blue-500 transition-colors ${
            textAnimate ? "animate-textChange" : ""
          }`}
        >
          <strong>{props.title || "WordWizard"}</strong>
        </Link>

        {/* DESKTOP NAV LINKS */}
        <div className="hidden lg:flex items-center space-x-6">
          <Link
            to="/"
            className={`transition-colors ${
              isDark ? "hover:text-blue-400" : "hover:text-blue-600"
            }`}
          >
            Home
          </Link>

          <Link
            to="/about"
            className={`transition-colors ${
              isDark ? "hover:text-blue-400" : "hover:text-blue-600"
            }`}
          >
            About
          </Link>

          {/* Upload & Download */}
          <div className="flex items-center space-x-6">
            <input
              type="file"
              accept=".txt"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />

            <button
              onClick={handleUploadClick}
              className={`flex items-center gap-1 cursor-pointer ${
                isDark
                  ? "text-gray-300 hover:text-blue-400"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              <Upload className="h-4 w-4" />
              Upload
            </button>

            <button
              onClick={props.onExport}
              className={`flex items-center gap-1 cursor-pointer ${
                isDark
                  ? "text-gray-300 hover:text-blue-400"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              <Download className="h-4 w-4" />
              Download
            </button>
          </div>

          {/* Language & Theme */}
          <div className="flex items-center space-x-2">
            {languages.map((ln) => {
              const selected = i18n.language === ln.code;
              return (
                <button
                  key={ln.code}
                  onClick={() => changeLanguage(ln.code)}
                  className={`px-2.5 py-0.5 rounded-md font-medium transition-colors cursor-pointer ${
                    selected
                      ? isDark
                        ? "bg-gray-700 text-white"
                        : "bg-gray-200 text-gray-900"
                      : isDark
                      ? "text-gray-300 hover:text-white"
                      : "text-gray-700 hover:text-gray-900"
                  }`}
                >
                  {ln.label}
                </button>
              );
            })}
            <Dropdown
              currentThemeId={props.currentThemeId}
              onThemeSelect={props.onThemeSelect}
            />
          </div>
        </div>

        {/* HAMBURGER (MOBILE ONLY) */}
        <div className="block lg:hidden">
          <button
            title={t("toggleMenu")}
            onClick={() => setMenuOpen(!menuOpen)}
            className={`flex items-center px-3 py-2 border rounded transition-colors ${
              isDark
                ? "text-gray-300 border-gray-600 hover:text-white hover:border-gray-400"
                : "text-gray-600 border-gray-400 hover:text-gray-800 hover:border-gray-600"
            } cursor-pointer`}
          >
            {menuOpen ? (
              <X className="h-4 w-4" aria-label={t("close")} />
            ) : (
              <Menu className="h-4 w-4" aria-label={t("menu")} />
            )}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <MobileMenu
        isDark={isDark}
        textAnimate={textAnimate}
        menuOpen={menuOpen}
        handleMenuAction={handleMenuAction}
        handleUploadClick={handleUploadClick}
        handleFileChange={handleFileChange}
        fileInputRef={fileInputRef}
        onExport={props.onExport}
        currentThemeId={props.currentThemeId}
        onThemeSelect={props.onThemeSelect}
        changeLanguage={changeLanguage}
        languages={languages}
        i18n={i18n}
      />
    </nav>
  );
};

export default Navbar;
