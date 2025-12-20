import React, { useEffect, useState } from "react";
import { getTextOperations } from "../data/textUtils";
import DialogBox from "./DialogBox";
import Toolbar from "./Toolbar";
import Aos from "aos";
import { useTranslation } from "react-i18next";
import SummaryCard from "./SummaryCard";
import Split from "react-split";

const TextForm = (props) => {
    const {
        text, // This is the 'currentValue' from the hook in App.js
        setText: addToHistory, // 'setText' prop is 'addToHistory' from App.js
        onFileImport, // This is the 'handleFileImport' from App.js
        undo,
        redo,
        canUndo,
        canRedo,
        resetHistory,
    } = props;
    const [previewText, setPreviewText] = useState("");
    const [dialogBoxOpen, setDialogBoxOpen] = useState(false);
    const [isBold, setIsBold] = useState(false);
    const [isItalic, setIsItalic] = useState(false);
    const [isUnderline, setIsUnderline] = useState(false);
    const [isStrike, setIsStrike] = useState(false);
    const [grammarResults, setGrammarResults] = useState([]);
    const [loadingGrammar, setLoadingGrammar] = useState(false);
    const [activeOperation, setActiveOperation] = useState(null);

    // Split sizes state - stores the percentage widths for left and right panes
    const [splitSizes, setSplitSizes] = useState([50, 50]);

    const fileInputRef = React.useRef();

    const { t } = useTranslation();

    // Load saved split width from localStorage on mount
    useEffect(() => {
        const savedWidth = localStorage.getItem("splitWidth");
        if (savedWidth) {
            const parsed = parseFloat(savedWidth);
            if (!isNaN(parsed) && parsed >= 20 && parsed <= 80) {
                setSplitSizes([parsed, 100 - parsed]);
            }
        }
    }, []);

    // Handler for when split sizes change during drag (updates state only)
    const handleSplitDrag = (sizes) => {
        setSplitSizes(sizes);
    };

    // Handler for when dragging ends (saves to localStorage)
    const handleSplitDragEnd = (sizes) => {
        setSplitSizes(sizes);
        // Save the left pane percentage
        localStorage.setItem("splitWidth", sizes[0].toString());
    };

    useEffect(() => {
        Aos.refresh();
    }, [props.theme]);

    useEffect(() => {
        // Sync preview text when text changes
        setPreviewText(text);
    }, [text]);

    // Keyboard shortcuts for undo/redo
    useEffect(() => {
        const handleKeyDown = (e) => {
            // Check for Ctrl+Z (undo) or Ctrl+Y (redo)
            if (e.ctrlKey || e.metaKey) {
                if (e.key === "z" && !e.shiftKey) {
                    e.preventDefault();
                    if (canUndo) {
                        undo();
                        props.showAlert("Undo", "success");
                    }
                } else if (e.key === "y" || (e.key === "z" && e.shiftKey)) {
                    e.preventDefault();
                    if (canRedo) {
                        redo();
                        props.showAlert("Redo", "success");
                    }
                }
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [undo, redo, canUndo, canRedo, props]);

    const handleChange = (e) => {
        const newValue = e.target.value;
        addToHistory(newValue);
        setPreviewText(newValue);
    };

    const handleFileInputClick = () => {
        if (fileInputRef.current) fileInputRef.current.click();
    };

    const textOperations = getTextOperations(
        text,
        addToHistory,
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
        setActiveOperation,
        { undo, redo, canUndo, canRedo, resetHistory }
    );

    useEffect(() => {
        // When text becomes empty, reset formatting states
        if (!text.trim()) {
            setIsBold(false);
            setIsItalic(false);
            setIsUnderline(false);
            setIsStrike(false);
            setActiveOperation(null);
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

    // ➜ Equal sizing
    width: "100px",
    height: "70px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "8px",
    cursor: "pointer",
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
            className={`min-h-screen pt-4 pb-8 ${
                props.theme === "light" ? "text-gray-900" : "text-white"
            }`}
        >
            <div className="container mx-auto px-8">
                <div className="lg:flex lg:gap-8 ">
                    <div
                        className="mb-6 lg:w-70/100"
                        data-aos="fade-down"
                        data-aos-duration="800"
                    >
                        <h1 className="text-3xl font-bold mb-6">
                            {t("textForm.title")}
                        </h1>

                        <div data-aos="fade-right">
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
                            />
                        </div>

                        <Split
                            className={`split flex flex-row max-h-[70vh] min-h-[50vh] rounded-lg border-2 overflow-hidden ${
                                props.theme === "light"
                                    ? "bg-white border-gray-300 text-gray-900"
                                    : "bg-gray-700 border-gray-500 text-white"
                            }`}
                            sizes={splitSizes}
                            minSize={[20, 20]}
                            gutterSize={10}
                            gutterAlign="center"
                            snapOffset={30}
                            dragInterval={1}
                            direction="horizontal"
                            cursor="col-resize"
                            onDrag={handleSplitDrag}
                            onDragEnd={handleSplitDragEnd}
                        >
                            {/* Textarea Section */}
                            <div className="flex flex-col h-full overflow-hidden">
                                <textarea
                                    className={`w-full h-full p-4 resize-none focus:outline-none focus:ring-2 overflow-y-auto custom-scrollbar bg-transparent`}
                                    value={text}
                                    onChange={handleChange}
                                    placeholder={t("textForm.placeholder")}
                                ></textarea>
                            </div>

                            {/* Preview Section */}
                            <div
                                className={`flex-1 w-full overflow-y-auto custom-scrollbar text-lg leading-relaxed whitespace-pre-wrap break-words p-6 ${
                                    props.theme === "light"
                                        ? "bg-gray-600 text-white"
                                        : "bg-gray-800 text-white"
                                }`}
                                style={{
                                    fontWeight: isBold ? "bold" : "normal",
                                    fontStyle: isItalic ? "italic" : "normal",
                                    textDecoration: textDecoration,
                                    minHeight: "100%",
                                }}
                            >
                                {previewText || t("textForm.noPreview")}
                            </div>
                        </Split>

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept=".txt"
                            className="hidden"
                            onChange={(e) =>
                                onFileImport(
                                    e.target.files && e.target.files[0]
                                )
                            }
                        />

                        {/* Grammar results (inline, styled like Summary) - moved here to sit just below textarea and before function buttons */}
                        {grammarResults && grammarResults.length > 0 && (
                            <section data-aos="fade-up" data-aos-delay="200">
                                <h2
                                    className={`text-2xl sm:text-3xl font-bold mb-4 text-center tracking-tight ${
                                        props.theme === "light"
                                            ? "text-gray-800"
                                            : "text-gray-100"
                                    }`}
                                >
                                    Grammar issues
                                </h2>

                                <div className="grid grid-cols-1 gap-4 mb-8">
                                    <div
                                        className={`w-full p-4 rounded-xl border shadow-sm transition-all duration-300 ${
                                            props.theme === "light"
                                                ? "bg-gradient-to-r from-yellow-200 to-yellow-300 border-yellow-400"
                                                : "bg-gradient-to-r from-gray-800 to-gray-700 border-gray-700"
                                        }`}
                                    >
                                        <div className="flex items-center justify-between mb-3">
                                            <strong className="text-lg">
                                                Summary of Issues
                                            </strong>
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm text-gray-600 dark:text-gray-300">
                                                    {grammarResults.length}{" "}
                                                    found
                                                </span>
                                                <button
                                                    aria-label="Clear grammar issues"
                                                    onClick={() =>
                                                        setGrammarResults([])
                                                    }
                                                    className="ml-2 text-sm font-medium px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
                                                >
                                                    Clear
                                                </button>
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            {grammarResults.map((item, idx) => (
                                                <div
                                                    key={item.id || idx}
                                                    className={`p-3 rounded-md border ${
                                                        props.theme === "light"
                                                            ? "border-blue-50"
                                                            : "border-gray-600"
                                                    }`}
                                                >
                                                    <div className="flex items-start justify-between">
                                                        <div>
                                                            <p className="text-sm font-semibold">
                                                                {item.message}
                                                            </p>
                                                            {item.context &&
                                                                item.context
                                                                    .text && (
                                                                    <p className="text-xs mt-1 text-gray-500">
                                                                        "
                                                                        {
                                                                            item
                                                                                .context
                                                                                .text
                                                                        }
                                                                        "
                                                                    </p>
                                                                )}
                                                            {item.replacements &&
                                                                item
                                                                    .replacements
                                                                    .length >
                                                                    0 && (
                                                                    <p className="text-xs mt-1 text-green-500">
                                                                        Suggestion:{" "}
                                                                        {item
                                                                            .replacements[0]
                                                                            .value ||
                                                                            item
                                                                                .replacements[0]}
                                                                    </p>
                                                                )}
                                                        </div>

                                                        <div className="flex flex-col items-end gap-2">
                                                            <button
                                                                onClick={() =>
                                                                    setGrammarResults(
                                                                        (
                                                                            prev
                                                                        ) =>
                                                                            prev.filter(
                                                                                (
                                                                                    _,
                                                                                    i
                                                                                ) =>
                                                                                    i !==
                                                                                    idx
                                                                            )
                                                                    )
                                                                }
                                                                className="text-xs px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
                                                            >
                                                                Dismiss
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </section>
                        )}
                    </div>
                    <div className="lg:w-30/100" data-aos="fade-left">
                        <SummaryCard
                            theme={props.theme}
                            currentTheme={props.currentTheme}
                            t={t}
                            text={text}
                            topWords={topWords}
                        />
                    </div>
                </div>

                {/* FUNCTION BUTTONS */}
                <div
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 my-6 justify-center justify-items-center "
                    data-aos="fade-in"
                    data-aos-delay="200"
                    data-aos-duration="800"
                >
                    {textOperations.map((op, i) =>
                        op.id === "generate-lorem" ? (
                            <div key={i} className="flex items-center gap-2">
                                <button
                                    onClick={() => {
                                        setActiveOperation(op.id);
                                        // generate a random number between 1 and 10
                                        const randomCount =
                                            Math.floor(Math.random() * 10) + 1;
                                        op.func(randomCount);
                                    }}
                                    style={{
                                        ...buttonStyle,
                                        opacity:
                                            activeOperation === op.id ? 0.6 : 1,
                                        transform:
                                            activeOperation === op.id
                                                ? "scale(0.95)"
                                                : "scale(1)",
                                    }}
                                    className={`w-full text-center px-4 py-2 rounded-lg font-medium transition-all duration-300 ...`}
                                >
                                    {op.id === "grammar-check" && loadingGrammar
                                        ? t("textForm.checking")
                                        : op.label}
                                </button>
                            </div>
                        ) : (
                            // FIX 2: Corrected the malformed button with duplicate attributes.
                            <button
                                key={i}
                                disabled={
                                    (!(text && text.trim().length > 0) &&
                                        !op.allowEmpty) ||
                                    (op.id === "grammar-check" &&
                                        loadingGrammar)
                                }
                                onClick={() => {
                                    setActiveOperation(op.id);
                                    op.func();
                                }}
                                style={{
                                    ...buttonStyle,
                                    opacity:
                                        activeOperation === op.id ? 0.6 : 1,
                                    transform:
                                        activeOperation === op.id
                                            ? "scale(0.95)"
                                            : "scale(1)",
                                }}
                                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                                    (!(text && text.trim().length > 0) &&
                                        !op.allowEmpty) ||
                                    (op.id === "grammar-check" &&
                                        loadingGrammar)
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

            {dialogBoxOpen && (
                <DialogBox
                    setDialogBoxOpen={setDialogBoxOpen}
                    setText={addToHistory}
                    setPreviewText={setPreviewText}
                    showAlert={props.showAlert}
                    theme={props.theme}
                    question="Are you sure you want to clear all text?"
                    setActiveOperation={setActiveOperation}
                />
            )}
        </section>
    );
};

export default TextForm;

// minimal propTypes stub to satisfy prop validation rules where configured
TextForm.propTypes = {};

