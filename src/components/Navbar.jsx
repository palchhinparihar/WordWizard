import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Menu, X } from "lucide-react";
import { allThemes } from "../data/themes";
import MobileMenu from "./MobileMenu";

const Navbar = (props) => {
  const [animate, setAnimate] = useState(false);
  const [textAnimate, setTextAnimate] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const fileInputRef = useRef(null);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("lang", lng);
  };

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
    if (fileInputRef.current) fileInputRef.current.click();
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
      className={`
        sticky top-0 z-50 shadow-md
        flex flex-col lg:flex-row lg:items-center 
        p-4 transition-all duration-300
        ${isDark
          ? "bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white border-b border-gray-700"
          : "bg-gradient-to-r from-white via-gray-50 to-white text-gray-800 border-b border-gray-200"
        }`}
    >
      {/* Logo + Mobile Toggle */}
      <div className="flex items-center justify-between w-full px-10">
        <div
          className={`flex items-center flex-shrink-0 ${
            textAnimate ? "animate-textChange" : ""
          }`}
        >
          <Link
            title={props.title || "Go to Home"}
            className="font-bold text-2xl tracking-tight hover:text-blue-500 transition-colors cursor-pointer"
            to="/"
          >
            <strong>{props.title || "WordWizard"}</strong>
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <div className="lg:hidden">
          <button
            title={
              menuOpen
                ? t("closeMenu") || "Close menu"
                : t("toggleMenu") || "Toggle menu"
            }
            onClick={() => setMenuOpen(!menuOpen)}
            className={`
              flex items-center px-3 py-2 border rounded transition-colors cursor-pointer
              ${isDark
                ? "text-gray-300 border-gray-600 hover:text-white hover:border-gray-400"
                : "text-gray-600 border-gray-400 hover:text-gray-800 hover:border-gray-600"
              }`}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex items-center justify-between pl-10 gap-8">
        <div className="flex space-x-8 text-[15px] font-medium">
          <Link to="/" className="hover:text-blue-500 transition-colors cursor-pointer">
            {t("home") || "Home"}
          </Link>
          <Link to="/about" className="hover:text-blue-500 transition-colors cursor-pointer">
            {t("about") || "About"}
          </Link>
          <button
            onClick={handleUploadClick}
            className="hover:text-blue-500 transition-colors cursor-pointer"
          >
            {t("upload") || "Upload"}
          </button>
          <button
            onClick={props.onExport}
            className="hover:text-blue-500 transition-colors cursor-pointer"
          >
            {t("download") || "Download"}
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".txt,.docx,.pdf"
            className="hidden"
          />
        </div>

        <div className="flex items-center space-x-4 px-10">
          <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-md overflow-hidden">
            <button
              onClick={() => changeLanguage("en")}
              className={`px-3 py-1 text-sm font-semibold cursor-pointer ${
                i18n.language === "en"
                  ? "bg-gray-300 dark:bg-gray-600"
                  : "hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => changeLanguage("hi")}
              className={`px-3 py-1 text-sm font-semibold cursor-pointer ${
                i18n.language === "hi"
                  ? "bg-gray-300 dark:bg-gray-600"
                  : "hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              हिंदी
            </button>
          </div>

          <div className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-md flex items-center space-x-2 cursor-pointer">
            <span className="text-yellow-500">Sun</span>
            <select
              value={props.currentThemeId}
              onChange={(e) => props.onThemeSelect(e.target.value)}
              className="bg-transparent focus:outline-none text-sm cursor-pointer"
            >
              {allThemes.map((theme) => (
                <option key={theme.id} value={theme.id}>
                  {theme.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Mobile Menu Modal (from top) */}
      <MobileMenu
        isDark={isDark}
        t={t}
        i18n={i18n}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        textAnimate={textAnimate}
        fileInputRef={fileInputRef}
        handleMenuAction={handleMenuAction}
        handleFileChange={handleFileChange}
        handleUploadClick={handleUploadClick}
        changeLanguage={changeLanguage}
        currentThemeId={props.currentThemeId}
        onThemeSelect={props.onThemeSelect}
        onExport={props.onExport}
      />
    </nav>
  );
};

export default Navbar;