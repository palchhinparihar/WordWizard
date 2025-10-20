import React, { useState } from "react";
import { getTextOperations } from "../data/textUtils";
import DialogBox from "./DialogBox";

const TextForm = (props) => {
  const [text, setText] = useState("");
  const [previewText, setPreviewText] = useState("");
  const [dialogBoxOpen, setDialogBoxOpen] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrike, setIsStrike] = useState(false);
  const [grammarResults, setGrammarResults] = useState([]);
  const [loadingGrammar, setLoadingGrammar] = useState(false);
  const fileInputRef = React.useRef();

  const handleChange = (e) => {
    setText(e.target.value);
    setPreviewText(e.target.value);
  };

  const handleFileImport = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const content = ev.target.result;
      setText(content);
      setPreviewText(content);
      props.showAlert("File imported.", "success");
    };
    reader.onerror = () => props.showAlert("Failed to read file.", "error");
    reader.readAsText(file, "utf-8");
  };

  const handleFileInputClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const textOperations = getTextOperations(
    text,
    setText,
    previewText,
    setPreviewText,
    setDialogBoxOpen,
    props,
    setGrammarResults,
    setLoadingGrammar,
    { isBold, setIsBold, isItalic, setIsItalic, isUnderline, setIsUnderline, isStrike, setIsStrike },
    handleFileInputClick
  );

  // 🎨 Improved button style (theme-aware + hover effects)
  const buttonBaseStyle = {
    fontWeight: 500,
    border: "none",
    borderRadius: "0.6rem",
    transition: "all 0.25s ease",
    padding: "0.6rem 1.1rem",
    cursor: "pointer",
  };

  const getButtonStyle = (theme) => {
    if (theme === "light") {
      return {
        ...buttonBaseStyle,
        background: "linear-gradient(135deg, #ffd95a, #ffc107)",
        color: "#212121",
        boxShadow: "0 4px 8px rgba(255, 193, 7, 0.3)",
      };
    } else {
      return {
        ...buttonBaseStyle,
        background: "linear-gradient(135deg, #6d28d9, #9333ea)",
        color: "#ffffff",
        boxShadow: "0 4px 10px rgba(147, 51, 234, 0.35)",
      };
    }
  };

  // Helper: top 3 frequent words
  const getTopWords = (text) => {
    const words = text
      .toLowerCase()
      .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "")
      .split(/\s+/)
      .filter((w) => w.length > 0);
    const freq = {};
    words.forEach((w) => (freq[w] = (freq[w] || 0) + 1));
    return Object.entries(freq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);
  };

  const topWords = getTopWords(text);
  const textDecoration = [isUnderline ? "underline" : null, isStrike ? "line-through" : null]
    .filter(Boolean)
    .join(" ") || "none";

  
  return (
    <section
      data-aos="fade-up"
      className={`min-h-screen py-8 ${
        props.theme === "light" ? "text-gray-900" : "text-white"
      }`}
    >
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-6">{props.heading}</h1>

          <textarea
            className={`w-full p-4 rounded-lg border-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              props.theme === "light"
                ? "bg-white border-gray-300 text-gray-900"
                : "bg-gray-700 border-gray-500 text-white"
            }`}
            rows="10"
            value={text}
            onChange={handleChange}
            placeholder="Enter your text here..."
          ></textarea>

          <input
            ref={fileInputRef}
            type="file"
            accept=".txt"
            className="hidden"
            onChange={(e) =>
              handleFileImport(e.target.files && e.target.files[0])
            }
          />

          {grammarResults.length > 0 && (
            <div
              className={`mt-4 p-4 rounded-lg ${
                props.theme === "light" ? "bg-yellow-50" : "bg-gray-800"
              }`}
            >
              <h3 className="font-semibold mb-2">Grammar Suggestions:</h3>
              <ul className="list-disc list-inside space-y-1">
                {grammarResults.map((issue, i) => (
                  <li key={i}>
                    <strong>
                      {text.slice(issue.offset, issue.offset + issue.length)}
                    </strong>{" "}
                    →{" "}
                    {issue.replacements.length > 0
                      ? issue.replacements[0].value
                      : "No suggestion"}{" "}
                    <span className="text-gray-500">({issue.message})</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* 🔘 Text operation buttons */}
        <div className="flex flex-wrap gap-3 my-6">
          {textOperations.map((op, i) => {
            const themeStyle = getButtonStyle(props.theme);
            return (
              <button
                key={i}
                disabled={
                  (!(text && text.trim().length > 0) && !op.allowEmpty) ||
                  (op.label === "Check Grammar" && loadingGrammar)
                }
                onClick={op.func}
                style={themeStyle}
                className={`font-medium transform transition-all duration-300 ${
                  (!(text && text.trim().length > 0) && !op.allowEmpty) ||
                  (op.label === "Check Grammar" && loadingGrammar)
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:scale-105 hover:shadow-lg active:scale-95"
                }`}
              >
                {op.label === "Check Grammar" && loadingGrammar
                  ? "Checking..."
                  : op.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 📝 Summary Section (unchanged) */}
      <div
        className={`container mx-auto px-6 py-8 max-w-4xl rounded-2xl shadow-lg transition-all duration-300 ${
          props.theme === "light"
            ? "bg-yellow-100 text-gray-800"
            : "bg-gray-900 text-gray-100"
        }`}
      >
        <h2
          className={`text-3xl font-bold mb-6 text-center tracking-tight ${
            props.theme === "light" ? "text-gray-800" : "text-gray-100"
          }`}
        >
          Summary of the Text
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 text-center">
          <div
            className={`p-4 rounded-xl border shadow-sm transition-all duration-300 ${
              props.theme === "light"
                ? "bg-gradient-to-r from-yellow-200 to-yellow-300 border-yellow-400"
                : "bg-gradient-to-r from-gray-800 to-gray-700 border-gray-700"
            }`}
          >
            <p
              className={`text-sm font-medium ${
                props.theme === "light" ? "text-gray-600" : "text-gray-400"
              }`}
            >
              Words
            </p>
            <p className="text-2xl font-semibold">
              {text.split(/\s+/).filter((el) => el.length !== 0).length}
            </p>
          </div>

          <div
            className={`p-4 rounded-xl border shadow-sm transition-all duration-300 ${
              props.theme === "light"
                ? "bg-gradient-to-r from-yellow-200 to-yellow-300 border-yellow-400"
                : "bg-gradient-to-r from-gray-800 to-gray-700 border-gray-700"
            }`}
          >
            <p
              className={`text-sm font-medium ${
                props.theme === "light" ? "text-gray-600" : "text-gray-400"
              }`}
            >
              Characters
            </p>
            <p className="text-2xl font-semibold">{text.length}</p>
          </div>

          <div
            className={`p-4 rounded-xl border shadow-sm transition-all duration-300 ${
              props.theme === "light"
                ? "bg-gradient-to-r from-yellow-200 to-yellow-300 border-yellow-400"
                : "bg-gradient-to-r from-gray-800 to-gray-700 border-gray-700"
            }`}
          >
            <p
              className={`text-sm font-medium ${
                props.theme === "light" ? "text-gray-600" : "text-gray-400"
              }`}
            >
              Reading Time
            </p>
            <p className="text-2xl font-semibold">
              {(0.008 *
                text.split(" ").filter((el) => el.length !== 0).length).toFixed(
                2
              )}{" "}
              min
            </p>
          </div>
        </div>

        {topWords.length > 0 && (
          <div className="mb-8 text-center">
            <h3
              className={`text-xl font-semibold mb-2 ${
                props.theme === "light" ? "text-gray-800" : "text-gray-100"
              }`}
            >
              Top Words
            </h3>
            <div className="flex flex-wrap justify-center gap-2">
              {topWords.slice(0, 5).map(([word, count], index) => (
                <span
                  key={index}
                  className={`px-3 py-1 text-sm rounded-full border ${
                    props.theme === "light"
                      ? "bg-indigo-100 text-gray-800 border-gray-200"
                      : "bg-gray-700 text-gray-200 border-gray-600"
                  }`}
                >
                  {word} ({count})
                </span>
              ))}
            </div>
          </div>
        )}

        <div
          className={`border-t mb-8 ${
            props.theme === "light" ? "border-yellow-500" : "border-gray-700"
          }`}
        ></div>

        <h2
          className={`text-2xl font-bold mb-4 ${
            props.theme === "light" ? "text-gray-800" : "text-gray-100"
          }`}
        >
          Preview of the Text
        </h2>
        <p
          className={`text-lg leading-relaxed whitespace-pre-wrap break-words rounded-xl p-5 transition-colors ${
            props.theme === "light"
              ? "bg-yellow-50 border border-yellow-400 text-gray-800"
              : "bg-gray-800 border border-gray-700 text-gray-100"
          }`}
          style={{
            fontWeight: isBold ? "bold" : "normal",
            fontStyle: isItalic ? "italic" : "normal",
            textDecoration: textDecoration,
          }}
        >
          {previewText && previewText.length > 0
            ? previewText
            : "Nothing to preview!"}
        </p>
      </div>

      {dialogBoxOpen && (
        <DialogBox
          question="Are you sure you want to clear the text?"
          setDialogBoxOpen={setDialogBoxOpen}
          setText={setText}
          setPreviewText={setPreviewText}
          showAlert={props.showAlert}
          theme={props.theme}
        />
      )}
    </section>
  );
};

export default TextForm;
