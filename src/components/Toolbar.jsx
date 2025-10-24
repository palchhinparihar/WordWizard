import React, { useState, useRef } from "react";
import { motion } from "framer-motion";

import { createPortal } from "react-dom";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Upload,
  Download,
  SpellCheck,
  Trash2,
  Copy,
  ArrowUp,
  ArrowDown,
  CornerUpLeft,
  MoveHorizontal,
  Type,
  Repeat,
  FileText,
  AlignJustify,
  Slash,
} from "lucide-react";

const ICON_MAP = {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  "Import file": Upload,
  "Export text": Download,
  "Check Grammar": SpellCheck,
  "Clear text": Trash2,
  "Copy text": Copy,
  "Convert to uppercase": ArrowUp,
  "Convert to lowercase": ArrowDown,
  "Remove line breaks": CornerUpLeft,
  "Trim start/end spaces": MoveHorizontal,
  "Remove extra spaces": AlignJustify,
  "Remove punctuation": Slash,
  "Smart Capitalization": Type,
  "Remove duplicate lines": Repeat,
  "Generate lorem ipsum": FileText,
};

const ALT_TEXT = {
  Bold: "Bold Text",
  Italic: "Italic Text",
  Underline: "Underline Text",
  Strikethrough: "Strikethrough Text",
  // "Import file": "Upload a text file",
  // "Export text": "Download the current text",
  "Check Grammar": "Check the grammar of your text",
  "Clear text": "Clear all text",
  "Copy text": "Copy text to clipboard",
  "Convert to uppercase": "Uppercase",
  "Convert to lowercase": "Lowercase",
  "Remove line breaks": "Remove line breaks",
  "Trim start/end spaces": "Trim spaces",
  "Remove extra spaces": "Remove extra spaces",
  "Remove punctuation": "Remove punctuation",
  "Smart Capitalization": "Automatically capitalize sentences properly",
  "Remove duplicate lines": "Remove duplicate lines",
  "Generate lorem ipsum": "Generate Lorem Ipsum",
};

const BUTTONS = Object.keys(ICON_MAP);

// Portal-based tooltip with scroll tracking + fade animation
const Tooltip = ({ targetRef, text, visible }) => {
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const tooltipRef = useRef(null);

  const updatePosition = () => {
    if (targetRef.current) {
      const rect = targetRef.current.getBoundingClientRect();
      setCoords({
        top: rect.top + window.scrollY - 35, // account for scroll
        left: rect.left + rect.width / 2 + window.scrollX,
      });
    }
  };

  React.useEffect(() => {
    if (visible) updatePosition();

    // Recalculate when scrolling or resizing
    window.addEventListener("scroll", updatePosition);
    window.addEventListener("resize", updatePosition);

    return () => {
      window.removeEventListener("scroll", updatePosition);
      window.removeEventListener("resize", updatePosition);
    };
  }, [visible]);

  return createPortal(
    <div
      ref={tooltipRef}
      style={{
        position: "absolute",
        top: coords.top,
        left: coords.left,
        transform: "translateX(-50%)",
        background: "#111",
        color: "#fff",
        padding: "0.35rem 0.6rem",
        borderRadius: "0.35rem",
        fontSize: "0.75rem",
        pointerEvents: "none",
        whiteSpace: "nowrap",
        zIndex: 9999,
        opacity: visible ? 1 : 0,
        transition: "opacity 0.2s ease-out, transform 0.2s ease-out",
        transformOrigin: "bottom center",
        transform: `translateX(-50%) translateY(${visible ? "0" : "5px"})`,
      }}
    >
      {text}
    </div>,
    document.body
  );
};

const Toolbar = ({
  textOperations,
  theme,
  colorTheme,
  loadingGrammar,
  text,
  activeStyles,
}) => {
  const iconSize = 20;
  const iconColor = theme === "light" ? "#040451ff" : "#fff";

  const getIcon = (label) => {
    const Icon = ICON_MAP[label];
    return Icon ? (
      <Icon size={iconSize} color={iconColor} />
    ) : (
      <FileText size={iconSize} color={iconColor} />
    );
  };

  const getFunc = (label) => {
    const op = textOperations.find((o) => o.label === label);
    return op ? op.func : () => {};
  };

  const isDisabled = (label) => {
    const op = textOperations.find((o) => o.label === label);
    if (!op) return true;
    return (
      (!(text && text.trim().length > 0) && !op.allowEmpty) ||
      (label === "Check Grammar" && loadingGrammar)
    );
  };

  const buttonStyle = {
    color: theme === "light" ? "black" : "white",
    backgroundImage:
      theme === "light"
        ? "linear-gradient(135deg, #faffa3 0%, #f0f0a8 100%)"
        : colorTheme,
    filter: theme === "light" ? "none" : "brightness(140%)",
    fontWeight: theme === "light" ? 400 : 300,
    boxShadow: "2px 2px 8px rgba(0,0,0,0.15)",
    padding: "0.5rem",
    margin: "0.15rem",
  };

  return (
    <div
      className={`z-50 mb-4 p-2 rounded-xl border shadow-sm backdrop-blur-sm flex gap-1 overflow-x-auto whitespace-nowrap
      ${
        theme === "light"
          ? "bg-yellow-200/90 border-yellow-300"
          : "bg-gray-900/90 border-gray-700"
      }`}
    >
      {BUTTONS.map((label, idx) => {
        const isActive = activeStyles?.[label];
        const altText = ALT_TEXT[label] || label;
        const btnRef = useRef(null);
        const [hover, setHover] = useState(false);

        return (
          <React.Fragment key={idx}>
            <motion.button
              ref={btnRef}
              disabled={isDisabled(label)}
              onClick={getFunc(label)}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              className={`relative flex items-center justify-center rounded-md transition-all
                ${
                  isDisabled(label)
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:scale-105"
                }
                ${isActive ? "ring-2 ring-yellow-400 shadow" : ""}`}
                style={{
                ...buttonStyle,
                background: isActive
                  ? theme === "light"
                    ? "linear-gradient(to right, #2c75dbff, #80adf6ff)"
                    : "linear-gradient(to right, #21252dff, #39414fff)"
                  : buttonStyle.backgroundImage,
                border: isActive
                  ? theme === "light"
                    ? "1px solid #fbbf24"
                    : "1px solid #3f3f46"
                  : buttonStyle.border,
                color: isActive
                  ? theme === "light"
                    ? "#000"
                    : "#fff"
                  : buttonStyle.color,
              }}
            >
              {getIcon(label)}
            </motion.button>

            {/* Portal tooltip */}
            <Tooltip targetRef={btnRef} text={altText} visible={hover} />
            {label === "Generate lorem ipsum" && (
              <div className="flex items-center gap-1 ml-2">
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={loremParagraphs}
                  onChange={(e) => setLoremParagraphs(parseInt(e.target.value))}
                  className="w-20 accent-blue-500 cursor-pointer"
                />
                <span className="text-xs font-bold text-gray-700 dark:text-gray-600">
                  {loremParagraphs}
                </span>
              </div>
            )}
            
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Toolbar;
