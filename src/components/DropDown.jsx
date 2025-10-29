import React, { useRef, useEffect, useState } from "react";
import { Sun, Moon, Palette, ChevronDown } from "lucide-react";
import { allThemes } from "../data/themes";

const Dropdown = ({ currentThemeId, onThemeSelect }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentTheme =
    allThemes.find((t) => t.id === currentThemeId) || allThemes[0];
  const isDark =
    currentTheme.category === "dark" || currentTheme.category === "vibrant";

  const groupedThemes = {
    dark: allThemes.filter((t) => t.category === "dark"),
    light: allThemes.filter((t) => t.category === "light"),
    vibrant: allThemes.filter((t) => t.category === "vibrant"),
  };

  const handleThemeSelect = (themeId) => {
    const selectedTheme = allThemes.find((t) => t.id === themeId);
    if (selectedTheme) {
      onThemeSelect(themeId, selectedTheme.gradient);
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="mt-4 lg:mt-0">
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 active:scale-95 ${
            isDark
              ? "bg-gray-800 hover:bg-gray-700 text-white"
              : "bg-gray-100 hover:bg-gray-200 text-gray-800"
          } cursor-pointer`}
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
            className={`w-4 h-4 transition-transform duration-200 ${
              isDropdownOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && ( 
        <div
        className={`absolute mt-2 rounded-xl shadow-2xl overflow-hidden z-50 animate-fadeIn
            ${isDark ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"}
            max-h-[70vh] overflow-y-auto
            w-60 sm:w-56 md:w-64     
            right-0 sm:right-0 sm:left-auto
            left-0 sm:left-auto
            translate-x-0 sm:translate-x-0
            top-[3.5rem] sm:top-full
            max-w-[92vw]         
        `}
        >

            <div className="max-h-96 overflow-y-auto">
              {/* Reusable Section Renderer */}
              {Object.entries(groupedThemes).map(([key, themes]) => {
                const sectionTitle =
                  key === "dark"
                    ? "Dark Themes"
                    : key === "light"
                    ? "Light Themes"
                    : "Accent Themes";
                const sectionIcon =
                  key === "dark"
                    ? <Moon className="w-3 h-3" />
                    : key === "light"
                    ? <Sun className="w-3 h-3" />
                    : <Palette className="w-3 h-3" />;

                return (
                  <div key={key}>
                    <div
                      className={`px-3 py-2 text-xs font-semibold uppercase tracking-wider ${
                        isDark
                          ? "text-gray-400 bg-gray-900"
                          : "text-gray-500 bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {sectionIcon}
                        <span>{sectionTitle}</span>
                      </div>
                    </div>
                    {themes.map((theme) => {
                      const isSelected = currentTheme.id === theme.id;
                      return (
                        <button
                          key={theme.id}
                          onClick={() => handleThemeSelect(theme.id)}
                          className={`w-full flex items-center gap-3 px-4 py-3 transition-all duration-200 ${
                            isSelected
                              ? isDark
                                ? "bg-gray-700 text-white"
                                : "bg-gray-100 text-gray-900"
                              : isDark
                              ? "hover:bg-gray-700 text-gray-300"
                              : "hover:bg-gray-50 text-gray-700"
                          } cursor-pointer`}
                        >
                          <div
                            className={`w-8 h-8 rounded-lg bg-gradient-to-br ${
                              theme.preview
                            } border ${
                              isDark ? "border-gray-600" : "border-gray-300"
                            } ${
                              isSelected
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
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
