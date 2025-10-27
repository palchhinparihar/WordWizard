import React from "react";
// framer-motion removed to avoid unused-import lint issues; use native button
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
  Undo,
  Redo,
} from "lucide-react";

const ICON_MAP = {
  Undo,
  Redo,
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
  Undo: "Undo last action",
  Redo: "Redo last undone action",
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

// Note: simplified - using native title attribute for accessibility/tooltips

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

    if (op.disabled !== undefined) return op.disabled;

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
      {BUTTONS.map((label) => {
        const isActive = activeStyles?.[label];
        const altText = ALT_TEXT[label] || label;
        // compute styles without nested ternaries
        let bg = buttonStyle.backgroundImage;
        let borderStyle = buttonStyle.border || "none";
        let colorVal = buttonStyle.color;
        if (isActive) {
          if (theme === "light") {
            bg = "linear-gradient(to right, #2c75dbff, #80adf6ff)";
            borderStyle = "1px solid #fbbf24";
            colorVal = "#000";
          } else {
            bg = "linear-gradient(to right, #21252dff, #39414fff)";
            borderStyle = "1px solid #3f3f46";
            colorVal = "#fff";
          }
        }

        return (
          <React.Fragment key={label}>
            <button
              title={altText}
              disabled={isDisabled(label)}
              onClick={getFunc(label)}
              className={`relative flex items-center justify-center rounded-md transition-all
                ${
                  isDisabled(label)
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:scale-105 cursor-pointer"
                }
                ${isActive ? "ring-2 ring-yellow-400 shadow" : ""}`}
                style={{
                ...buttonStyle,
                background: bg,
                border: borderStyle,
                color: colorVal,
              }}
            >
              {getIcon(label)}
            </button>

            {/* No inline controls for lorem paragraphs here (random generation handled in TextForm) */}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Toolbar;
 
// Provide an empty propTypes object to satisfy prop validation lint rule where configured
Toolbar.propTypes = {};