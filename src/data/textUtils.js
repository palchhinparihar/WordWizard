import { checkGrammar, generateLoremIpsum } from "../utils";

export const getTextOperations = (
  text,
  setText,
  previewText,
  setPreviewText,
  setDialogBoxOpen,
  props,
  setGrammarResults,
  setLoadingGrammar,
  styles,
  triggerFileInput,
  loremParagraphs
) => {
  const { isBold, setIsBold, isItalic, setIsItalic, isUnderline, setIsUnderline, isStrike, setIsStrike } = styles;

  const handleUpClick = () => {
    setPreviewText(text.toUpperCase());
    props.showAlert("Converted to uppercase.", "success");
  };

  const handleLoClick = () => {
    setPreviewText(text.toLowerCase());
    props.showAlert("Converted to lowercase.", "success");
  };

  const handleRemoveLineBreaks = () => {
    const src = previewText || text;
    const newText = src.replace(/\r?\n+/g, " ");
    setPreviewText(newText);
    props.showAlert("Line breaks removed.", "success");
  };

  const handleTrimEdges = () => {
    const src = previewText || text;
    const newText = src.trim();
    setPreviewText(newText);
    props.showAlert("Trimmed leading/trailing spaces.", "success");
  };

  const handleExtraSpaces = () => {
    const newText = text.split(/\s+/).join(" ");
    setPreviewText(newText);
    props.showAlert("Removed extra spaces.", "success");
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(previewText || text);
    props.showAlert("Copied to clipboard.", "success");
  };

  const handleClearText = () => {
    setDialogBoxOpen(true);
  };

  const handleRemovePunctuation = () => {
    const newText = (previewText || text).replace(/[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/g, "");
    setPreviewText(newText);
    props.showAlert("Punctuation removed.", "success");
  };

  const handleSmartCapitalization = () => {
    let newText = (previewText || text).toLowerCase();

    newText = newText.replace(
      /(^|\.)\s*([a-z])/g,
      (match, punctuation, letter) => {
        return (
          punctuation +
          match.substring(punctuation.length, match.length - 1) +
          letter.toUpperCase()
        );
      }
    );

    newText = newText.replace(/\bi\b/g, "I");

    setPreviewText(newText);
    props.showAlert("Smart capitalization applied.", "success");
  };

  const handleExportText = () => {
    const blob = new Blob([previewText || text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "exported_text.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    props.showAlert("Text exported.", "success");
  };

  const handleRemoveDuplicateLines = () => {
    const src = previewText || text;
    const lines = src.split(/\r?\n/);
    const seen = new Set();
    const unique = [];
    lines.forEach((l) => {
      if (!seen.has(l)) {
        seen.add(l);
        unique.push(l);
      }
    });
    const newText = unique.join("\n");
    setPreviewText(newText);
    props.showAlert("Duplicate lines removed.", "success");
  };

  const handleGenerateLorem = async () => {
    try {
      const lorem = await generateLoremIpsum(loremParagraphs);
      setText(lorem);
      setPreviewText(lorem);
      props.showAlert(`Generated ${loremParagraphs} paragraph(s) of Lorem Ipsum.`, "success");
    } catch (err) {
      props.showAlert("Failed to generate Lorem Ipsum.", "error");
    }
  };

  const handleImportFile = () => {
    if (typeof triggerFileInput === "function") triggerFileInput();
  };

  const handleBold = () => {
    setIsBold(!isBold);
    props.showAlert(isBold ? "Bold removed." : "Bold applied.", "success");
  };

  const handleItalic = () => {
    setIsItalic(!isItalic);
    props.showAlert(isItalic ? "Italic removed." : "Italic applied.", "success");
  };

  const handleUnderline = () => {
    setIsUnderline(!isUnderline);
    props.showAlert(isUnderline ? "Underline removed." : "Underline applied.", "success");
  };

  const handleStrike = () => {
    setIsStrike(!isStrike);
    props.showAlert(isStrike ? "Strikethrough removed." : "Strikethrough applied.", "success");
  };

  const handleGrammarCheck = async () => {
    if (!text.trim()) return;
    setLoadingGrammar(true);
    try {
      const results = await checkGrammar(text);
      setGrammarResults(results);
      if (results.length === 0) {
        props.showAlert("No grammar issues found!", "success");
      } else {
        props.showAlert(`${results.length} grammar issues found.`, "warning");
      }
    } catch (err) {
      console.error(err);
      props.showAlert("Failed to check grammar.", "error");
    } finally {
      setLoadingGrammar(false);
    }
  };

  const obj = [
    { id: "uppercase", func: handleUpClick, label: "Convert to uppercase" },
    { id: "lowercase", func: handleLoClick, label: "Convert to lowercase" },
    { id: "remove-line-breaks", func: handleRemoveLineBreaks, label: "Remove line breaks", allowEmpty: false },
    { id: "trim-edges", func: handleTrimEdges, label: "Trim start/end spaces", allowEmpty: false },
    { id: "remove-extra-spaces", func: handleExtraSpaces, label: "Remove extra spaces" },
    { id: "copy", func: handleCopyClick, label: "Copy text" },
    { id: "clear", func: handleClearText, label: "Clear text" },
    { id: "grammar-check", func: handleGrammarCheck, label: "Check Grammar" },
    { id: "remove-punctuation", func: handleRemovePunctuation, label: "Remove punctuation" },
    { id: "smart-capitalization", func: handleSmartCapitalization, label: "Smart Capitalization" },
    { id: "remove-duplicate-lines", func: handleRemoveDuplicateLines, label: "Remove duplicate lines", allowEmpty: false },
    { id: "generate-lorem", func: handleGenerateLorem, label: "Generate lorem ipsum", allowEmpty: true },
    { id: "import-file", func: handleImportFile, label: "Import file", allowEmpty: true },
    { id: "export-text", func: handleExportText, label: "Export text" },
    { id: "bold", func: handleBold, label: "Bold" },
    { id: "italic", func: handleItalic, label: "Italic" },
    { id: "underline", func: handleUnderline, label: "Underline" },
    { id: "strike", func: handleStrike, label: "Strikethrough", allowEmpty: true },
  ];

  return obj;
};