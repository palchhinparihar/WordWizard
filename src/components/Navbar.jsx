import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Upload, Download } from "lucide-react";
import Dropdown from "./DropDown";
import { allThemes } from "../data/themes";
import { languages } from "../data/navbarContent";

const Navbar = (props) => {
  const [animate, setAnimate] = useState(false);
  const [textAnimate, setTextAnimate] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
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
    setTextAnimate(true);
    const timer = setTimeout(() => setTextAnimate(false), 500);
    return () => clearTimeout(timer);
  }, [props.currentThemeId]);


  const currentTheme =
  allThemes.find((t) => t.id === props.currentThemeId) || allThemes[0];
  const isDark =
  currentTheme.category === "dark" || currentTheme.category === "vibrant";

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

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
      className={`sticky top-0 z-50 shadow-md flex items-center justify-between flex-wrap p-4 transition-all duration-300 ${
        isDark
          ? "bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white border-b border-gray-700"
          : "bg-gradient-to-r from-white via-gray-50 to-white text-gray-800 border-b border-gray-200"
      }`}
    >
      {/* Logo */}
      <div className={`flex items-center flex-shrink-0 mr-6 ${textAnimate ? 'animate-textChange' : ''}`}>
        <Link
          title={props.title || "Go to Home"}
          className={`font-bold text-2xl tracking-tight hover:text-blue-500 transition-colors ${
            textAnimate ? "animate-textChange" : ""
          } cursor-pointer`}
          to="/"
        >
          <strong>{props.title || "WordWizard"}</strong>
        </Link>
      </div>

      {/* Hamburger */}
      <div className={`block lg:hidden ${textAnimate ? "animate-textChange" : ""}`}>
        <button
          title={t("toggleMenu") || "Toggle menu"}
          onClick={() => setMenuOpen(!menuOpen)}
          className={`flex items-center px-3 py-2 border rounded transition-colors ${
            isDark
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

      {/* Menu Section */}
      <div
        className={`w-full block flex-grow lg:flex lg:items-center lg:w-auto ${
          menuOpen ? "block" : "hidden"
        } lg:block`}
      >
        <div
          className={`flex flex-col lg:flex-row lg:items-center text-base ${
            textAnimate ? "animate-textChange" : ""
          }`}
        >
          {/* 🟢 Add margin between logo and menu only in mobile */}
          <div
            className="flex flex-col lg:flex-row mt-4 lg:mt-0"
            style={{
              gap: "clamp(1rem, 2vw, 2rem)",
              fontSize: "clamp(0.985rem, 1vw, 1.125rem)",
            }}
          >
            <Link
              onClick={handleMenuAction}
              title={t("home")}
              className={`block transition-colors ${
                isDark ? "hover:text-blue-400" : "hover:text-blue-600"
              } cursor-pointer`}
              to="/"
            >
              {t("home")}
            </Link>

            <Link
              onClick={handleMenuAction}
              title={t("about")}
              className={`block transition-colors ${
                isDark ? "hover:text-blue-400" : "hover:text-blue-600"
              } cursor-pointer`}
              to="/about"
            >
              {t("about")}
            </Link>
          </div>

          {/* Upload + Download Buttons */}
          <div
            onClick={handleMenuAction}
            className="flex gap-4 mt-4 lg:mt-0 lg:ml-8"
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "flex-start",
              gap: "clamp(8px, 2vw, 24px)",
              fontSize: "clamp(0.875rem, 1vw, 1.125rem)",
            }}
          >
            <input
              type="file"
              accept=".txt"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <button
              title={t("tooltip.uploadFile")}
              onClick={handleUploadClick}
              className={`btn ${isDark ? "btn-dark" : "btn-light"} flex items-center cursor-pointer`}
            >
              <Upload className="w-5 h-5 mr-1" />
              Upload
            </button>

            <button
              title={t("tooltip.downloadFile")}
              onClick={props.onExport}
              className={`btn ${isDark ? "btn-dark" : "btn-light"} flex items-center cursor-pointer`}
            >
              <Download className="w-5 h-5 mr-1" />
              Download
            </button>
          </div>
        </div>

        {/* Language + Theme */}
        <div
        className={`flex flex-col lg:flex-row items-start lg:items-center mt-4 lg:mt-0 ml-auto gap-4 ${textAnimate ? 'animate-textChange' : ''}`}
        style={{
          flexWrap: "wrap",
          gap: "clamp(12px, 3vw, 32px)",
          fontSize: "clamp(0.875rem, 1vw, 1rem)",
        }}
      >

          {/* Language Buttons */}
          <div onClick={handleMenuAction} className="flex gap-3">
            {languages.map((ln) => {
              const selected = i18n.language === ln.code;
              return (
                <button
                  key={ln.code}
                  title={`Change language to ${ln.code === "en" ? "English" : "Hindi"}`}
                  onClick={() => changeLanguage(ln.code)}
                  className={`px-3 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                    selected
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

          {/* Theme Selector */}
          <Dropdown
            currentThemeId={props.currentThemeId}
            onThemeSelect={props.onThemeSelect}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
