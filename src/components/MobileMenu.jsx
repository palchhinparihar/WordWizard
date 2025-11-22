import React from "react";
import { Link } from "react-router-dom";
import { Upload, Download } from "lucide-react";
import Dropdown from "./DropDown";
import { useTranslation } from "react-i18next";

const MobileMenu = ({
  isDark,
  menuOpen,
  handleMenuAction,
  handleUploadClick,
  handleFileChange,
  fileInputRef,
  onExport,
  currentThemeId,
  onThemeSelect,
  changeLanguage,
  languages,
  i18n,
}) => {
  const { t } = useTranslation();
  if (!menuOpen) return null; 

  return (
    <div
      className={`lg:hidden flex flex-col p-4 space-y-4 border-t ${
        isDark ? "border-gray-700" : "border-gray-200"
      }`}
    >
      <Link
        to="/"
        onClick={handleMenuAction}
        className={`transition-colors ${
          isDark ? "hover:text-blue-400" : "hover:text-blue-600"
        }`}
      >
        {t("navbar.home")}
      </Link>

      <Link
        to="/about"
        onClick={handleMenuAction}
        className={`transition-colors ${
          isDark ? "hover:text-blue-400" : "hover:text-blue-600"
        }`}
      >
        {t("navbar.about")}
      </Link>

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
        <Upload className="w-4 h-4" />
        {t("navbar.upload")}
      </button>

      <button
        onClick={onExport}
        className={`flex items-center gap-1 cursor-pointer ${
          isDark
            ? "text-gray-300 hover:text-blue-400"
            : "text-gray-700 hover:text-blue-600"
        }`}
      >
        <Download className="w-4 h-4" />
        {t("navbar.download")}
      </button>

      <div className="flex flex-wrap items-center gap-3 mt-2">
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
      </div>

      <Dropdown currentThemeId={currentThemeId} onThemeSelect={onThemeSelect} />
    </div>
  );
};

export default MobileMenu;
