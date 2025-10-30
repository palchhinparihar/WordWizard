import React from "react";
import { Link } from "react-router-dom";
import { Upload, Download, X } from "lucide-react";
import Dropdown from "./DropDown";
import { languages } from "../data/navbarContent";

const MobileMenu = ({
  isDark,
  t,
  i18n,
  menuOpen,
  setMenuOpen,
  textAnimate,
  fileInputRef,
  handleMenuAction,
  handleFileChange,
  handleUploadClick,
  changeLanguage,
  currentThemeId,
  onThemeSelect,
  onExport,
}) => {
  return (
    <>
      {/* Backdrop */}
      <div
        className={`
          fixed inset-0 z-40 transition-opacity duration-300 bg-black/60
          ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
        onClick={() => setMenuOpen(false)}
      />

      {/* Slide-Down Panel from Top */}
      <div
        className={`
          fixed left-0 right-0 top-0 z-50 w-full
          flex flex-col
          transform transition-transform duration-300 ease-out
          ${menuOpen ? "translate-y-0" : "-translate-y-full"}
          ${isDark ? "bg-gray-900 text-white" : "bg-white text-gray-900"}
          shadow-2xl max-h-screen
        `}
        style={{ maxHeight: "100vh" }}
      >
        {/* Header: Logo + Close */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <Link
            to="/"
            onClick={handleMenuAction}
            className="font-bold text-xl tracking-tight hover:text-blue-500 transition-colors cursor-pointer"
          >
            WordWizard
          </Link>
          <button
            onClick={() => setMenuOpen(false)}
            className={`
              p-2 rounded-full transition-colors cursor-pointer
              ${isDark ? "hover:bg-gray-800" : "hover:bg-gray-100"}
            `}
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8">
          {/* Navigation Links */}
          <nav className="space-y-3">
            <Link
              onClick={handleMenuAction}
              to="/"
              className={`
                block py-3 text-lg font-medium transition-colors rounded-md px-3 cursor-pointer
                ${isDark ? "hover:bg-gray-800 hover:text-blue-400" : "hover:bg-gray-100 hover:text-blue-600"}
              `}
            >
              {t("home") || "Home"}
            </Link>
            <Link
              onClick={handleMenuAction}
              to="/about"
              className={`
                block py-3 text-lg font-medium transition-colors rounded-md px-3 cursor-pointer
                ${isDark ? "hover:bg-gray-800 hover:text-blue-400" : "hover:bg-gray-100 hover:text-blue-600"}
              `}
            >
              {t("about") || "About"}
            </Link>
          </nav>

          {/* Upload & Download */}
          <div className="space-y-3">
            <input
              type="file"
              accept=".txt,.docx,.pdf"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
            <button
              onClick={handleUploadClick}
              className={`
                w-full flex items-center justify-center gap-2 py-3 px-4 rounded-md font-medium transition-colors cursor-pointer
                ${isDark ? "bg-gray-800 hover:bg-gray-700" : "bg-gray-100 hover:bg-gray-200"}
              `}
            >
              <Upload className="h-5 w-5" />
              {t("upload") || "Upload"}
            </button>

            <button
              onClick={onExport}
              className={`
                w-full flex items-center justify-center gap-2 py-3 px-4 rounded-md font-medium transition-colors cursor-pointer
                ${isDark ? "bg-gray-800 hover:bg-gray-700" : "bg-gray-100 hover:bg-gray-200"}
              `}
            >
              <Download className="h-5 w-5" />
              {t("download") || "Download"}
            </button>
          </div>

          {/* Language Buttons */}
          <div className="flex gap-2">
            {languages.map((ln) => {
              const selected = i18n.language === ln.code;
              return (
                <button
                  key={ln.code}
                  onClick={() => {
                    changeLanguage(ln.code);
                    handleMenuAction();
                  }}
                  className={`
                    flex-1 py-2.5 rounded-md font-medium text-sm transition-colors cursor-pointer
                    ${selected
                      ? isDark
                        ? "bg-blue-600 text-white"
                        : "bg-blue-500 text-white"
                      : isDark
                      ? "bg-gray-800 text-gray-300 hover:text-white"
                      : "bg-gray-100 text-gray-700 hover:text-gray-900"
                    }
                  `}
                >
                  {ln.label}
                </button>
              );
            })}
          </div>

          {/* Theme Selector */}
          <div className={`space-y-2 ${textAnimate ? "animate-textChange" : ""}`}>
            <Dropdown
              currentThemeId={currentThemeId}
              onThemeSelect={(id) => {
                onThemeSelect(id);
                handleMenuAction();
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;