import React, { useEffect, useState } from "react";
import { getTextOperations } from "../data/textUtils";
import DialogBox from "./DialogBox";
import Toolbar from "./Toolbar";
import Aos from "aos";
import { useTranslation } from "react-i18next";

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
  const [loremParagraphs, setLoremParagraphs] = useState(1);
  const fileInputRef = React.useRef();

  const { t } = useTranslation();

  useEffect(() => {
    Aos.refresh();
  }, [props.theme]);

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
      props.showAlert(t("alerts.fileImported"), "success");
    };
    reader.onerror = () => {
      props.showAlert(t("alerts.fileError"), "error");
    };
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
    {
      isBold,
      setIsBold,
      isItalic,
      setIsItalic,
      isUnderline,
      setIsUnderline,
      isStrike,
      setIsStrike,
    },
    handleFileInputClick,
    loremParagraphs
  );




  useEffect(() => {
  // When text becomes empty, reset formatting states
  if (!text.trim()) {
    setIsBold(false);
    setIsItalic(false);
    setIsUnderline(false);
    setIsStrike(false);
  }
}, [text]);


  const buttonStyle = {
    color: props.theme === "light" ? "black" : "white",
    backgroundImage:
      props.theme === "light"
        ? "linear-gradient(135deg, #faffa3 0%, #f0f0a8 100%)"
        : `${props.colorTheme}`,
    filter: props.theme === "light" ? "none" : "brightness(140%)",
    fontWeight: props.theme === "light" ? 400 : 300,
    boxShadow: "2px 2px 8px rgba(0, 0, 0, 0.15)",
  };

  const getTopWords = (text) => {
    const words = text
      .toLowerCase()
      .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "")
      .split(/\s+/)
      .filter((word) => word.length > 0);

    const freq = {};
    words.forEach((word) => {
      freq[word] = (freq[word] || 0) + 1;
    });

    const sortedWords = Object.entries(freq).sort((a, b) => b[1] - a[1]);
    return sortedWords.slice(0, 5); // Limit to top 5 for display
  };
  

  const topWords = getTopWords(text);

  // FIX 1: Defined the missing `textDecoration` variable.
  // This function computes the correct CSS value based on the state.
  const getDecoration = () => {
    const decorations = [];
    if (isUnderline) decorations.push("underline");
    if (isStrike) decorations.push("line-through");
    return decorations.join(" "); // e.g., "underline line-through" or "underline"
  };
  const textDecoration = getDecoration();

  return (
    <section
      className={`min-h-screen py-8 ${props.theme === "light" ? "text-gray-900" : "text-white"
        }`}
    >
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-6" data-aos="fade-down" data-aos-duration="800">
          <h1 className="text-3xl font-bold mb-6">{t("textForm.title")}</h1>

          <Toolbar
            textOperations={textOperations}
            theme={props.theme}
            colorTheme={props.colorTheme}
            loadingGrammar={loadingGrammar}
            text={text}
            activeStyles={{
              Bold: isBold,
              Italic: isItalic,
              Underline: isUnderline,
              Strikethrough: isStrike,
            }}
            loremParagraphs={loremParagraphs}
            setLoremParagraphs={setLoremParagraphs}
          />

          <textarea
            className={`w-full p-4 rounded-lg border-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 ${props.theme === "light"
              ? "bg-white border-gray-300 text-gray-900"
              : "bg-gray-700 border-gray-500 text-white"
              }`}
            rows="10"
            value={text}
            onChange={handleChange}
            placeholder={t("textForm.placeholder")}
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
        </div>

        {/* FUNCTION BUTTONS */}
        <div
          className="flex flex-wrap gap-2 my-6"
          data-aos="fade-up"
          data-aos-delay="200"
          data-aos-duration="800"
        >
          {textOperations.map((op, i) =>
            op.id === "generate-lorem" ? (
              <div key={i} className="flex items-center gap-2">
                <button
                  onClick={op.func}
                  style={buttonStyle}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 active:scale-95`}
                >
                  {op.id === "grammar-check" && loadingGrammar ? t("textForm.checking") : op.label}
                </button>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={loremParagraphs}
                  onChange={(e) => setLoremParagraphs(parseInt(e.target.value))}
                  className="w-24"
                />
                <span>{loremParagraphs}</span>
              </div>
            ) : (
              // FIX 2: Corrected the malformed button with duplicate attributes.
              <button
                key={i}
                disabled={
                  (!(text && text.trim().length > 0) && !op.allowEmpty) ||
                  (op.id === "grammar-check" && loadingGrammar)
                }
                onClick={op.func}
                style={buttonStyle}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  (!(text && text.trim().length > 0) && !op.allowEmpty) ||
                  (op.id === "grammar-check" && loadingGrammar)
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:scale-105 active:scale-95"
                }`}
              >
                {op.id === "grammar-check" && loadingGrammar
                  ? "Checking..."
                  : op.label}
              </button>
            )
          )}
        </div>
      </div>

      {/* SUMMARY CARD */}
      {/* FIX 3: Merged the two `className` attributes into one. */}
      <div
        data-aos="zoom-in-up"
        data-aos-delay="400"
        data-aos-duration="800"
      >
        <h2
          className={`text-2xl sm:text-3xl font-bold mb-8 text-center tracking-tight ${
            props.theme === "light" ? "text-gray-800" : "text-gray-100"
          }`}
        >
          {t("textForm.summary")}
        </h2>

        {/* FIX 4: Cleaned up the jumbled HTML for the stats grid. */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8 text-center place-items-center">
          <div
            className={`w-3/5 sm:w-full p-4 rounded-xl border shadow-sm transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 hover:shadow-lg ${
              props.theme === "light"
                ? "bg-gradient-to-r from-yellow-200 to-yellow-300 border-yellow-400"
                : "bg-gradient-to-r from-gray-800 to-gray-700 border-gray-700"
              }`}
            data-aos="fade-up"
            data-aos-delay="600"
          >
            <p
              className={`text-sm font-medium ${props.theme === "light" ? "text-gray-600" : "text-gray-400"
                }`}
            >
              {t("textForm.words")}
            </p>
            <p className="text-2xl font-bold">
              {text.split(/\s+/).filter((el) => el.length !== 0).length}
            </p>
          </div>
          <div
            className={`w-3/5 sm:w-full p-4 rounded-xl border shadow-sm transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 hover:shadow-lg ${
              props.theme === "light"
                ? "bg-gradient-to-r from-yellow-200 to-yellow-300 border-yellow-400"
                : "bg-gradient-to-r from-gray-800 to-gray-700 border-gray-700"
              }`}
            data-aos="fade-up"
            data-aos-delay="700"
          >
            <p
              className={`text-sm font-medium ${
                props.theme === "light" ? "text-gray-600" : "text-gray-400"
              }`}
            >
              Characters
            </p>
            <p className="text-2xl font-bold">{text.length}</p>
          </div>
          <div
            className={`w-3/5 sm:w-full p-4 rounded-xl border shadow-sm transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 hover:shadow-lg ${
              props.theme === "light"
                ? "bg-gradient-to-r from-yellow-200 to-yellow-300 border-yellow-400"
                : "bg-gradient-to-r from-gray-800 to-gray-700 border-gray-700"
              }`}
            data-aos="fade-up"
            data-aos-delay="800"
          >
            <p
              className={`text-sm font-medium ${
                props.theme === "light" ? "text-gray-600" : "text-gray-400"
              }`}
            >
              Reading Time
            </p>
            <p className="text-2xl font-bold">
              {(
                0.008 * text.split(/\s+/).filter((el) => el.length !== 0).length
              ).toFixed(2)}{" "}
              {t("textForm.minutes")}
            </p>
          </div>
        </div>

        {/* Top Words Section */}
        {topWords.length > 0 && (
          <div className="mb-8 text-center" data-aos="fade-up" data-aos-delay="50">
            <h3
              className={`text-xl font-semibold mb-4 ${props.theme === "light" ? "text-gray-800" : "text-gray-100"
                }`}
            >
              Top Words
            </h3>
            <div className="flex flex-wrap justify-center gap-2">
              {topWords.map(([word, count], index) => (
                <span
                  key={index}
                  className={`px-3 py-1 text-sm font-medium rounded-full border transition-transform duration-200 hover:scale-110 ${props.theme === "light"
                    ? "bg-blue-200 text-blue-800 border-blue-500"
                    : "bg-gray-700 text-gray-200 border-gray-600"
                    }`}
                >
                  {word} ({count})
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Divider */}
        <div
          className={`border-t-2 my-8 ${props.theme === "light" ? "border-blue-500/50" : "border-gray-700"
            }`}
        ></div>

        {/* Preview Section */}
        <div data-aos="fade-up" data-aos-delay="10">
          <h2
            className={`text-2xl font-bold mb-4 ${props.theme === "light" ? "text-gray-800" : "text-gray-100"
              }`}
          >
            {t("textForm.preview")}
          </h2>
          <p
            className={`text-lg leading-relaxed whitespace-pre-wrap break-words rounded-xl p-6 min-h-[100px] transition-all duration-300 hover:shadow-md ${props.theme === "light"
              ? "bg-blue-100 border border-blue-400 text-gray-800"
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
              : t("textForm.noPreview")}
          </p>
        </div>
      </div>

      {dialogBoxOpen && (
        <DialogBox
          setDialogBoxOpen={setDialogBoxOpen}
          setText={setText}
          setPreviewText={setPreviewText}
          showAlert={props.showAlert}
          theme={props.theme}
          question="Are you sure you want to clear all text?"
        />
      )}
    </section>
  );
};

export default TextForm;