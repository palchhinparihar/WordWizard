import { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { importFile, exportFile } from "./utils";
import { allThemes } from "./data/themes";
import { useUndoRedo } from "./hooks/useUndoRedo";

// Components
import Navbar from "./components/Navbar";
import Alert from "./components/Alert";
import TextForm from "./components/TextForm";
import About from "./components/About";
import Welcome from "./components/Welcome";
import Footer from "./components/Footer";
import BackToTopButton from "./components/BackToTopButton";
import TermsOfUse from "./components/TermsOfUse";
import PrivacyPolicy from "./components/PrivacyPolicy";
import Contributors from './components/Contributors';
import FAQ from "./components/FAQ";

function App() {
  const { t } = useTranslation();
  const [currentThemeId, setCurrentThemeId] = useState(
    localStorage.getItem("theme") || "dark"
  );
  const [colorTheme, setColorTheme] = useState(
    localStorage.getItem("colorTheme") ||
      "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)"
  );
  const [alert, setAlert] = useState(null);
  const [showWelcome, setShowWelcome] = useState(true);

  const {
    currentValue: text,
    addToHistory,
    undo,
    redo,
    canUndo,
    canRedo,
    reset: resetHistory,
  } = useUndoRedo("", 50);

  const handleFileImport = (file) => {
    importFile(
      file,
      (content) => {
        addToHistory(content);
        showAlert(t("alerts.fileImported"), "success");
      },
      () => {
        showAlert(t("alerts.fileError"), "error");
      }
    );
  };

  const handleExport = () => {
    exportFile(text, "exported_text.txt");
    showAlert(t("alerts.textExported"), "success");
  };

  const currentTheme =
    allThemes.find((t) => t.id === currentThemeId) || allThemes[0];
  const theme = currentTheme.category === "light" ? "light" : "dark";

  const showAlert = (message, type) => {
    setAlert({ msg: message, type });
    setTimeout(() => setAlert(null), 1500);
  };

  const handleThemeSelect = (themeId, gradient) => {
    setCurrentThemeId(themeId);
    setColorTheme(gradient);
    localStorage.setItem("theme", themeId);
    localStorage.setItem("colorTheme", gradient);

    const themeName =
      themeId.charAt(0).toUpperCase() + themeId.slice(1).replace("-", " ");
    showAlert(`${themeName} theme applied!`, "success");
  };

  useEffect(() => {
    const timer = setTimeout(() => setShowWelcome(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      {showWelcome ? (
        <div style={{ background: colorTheme }}>
          <Welcome theme={theme} />
        </div>
      ) : (
        <div
          className="min-h-screen flex flex-col"
          style={{
            background: colorTheme,
            transition: "background 0.15s ease-in-out",
          }}
        >
          <Navbar
            title="WordWizard"
            theme={theme}
            currentThemeId={currentThemeId}
            onThemeSelect={handleThemeSelect}
            text={text}
            onFileImport={handleFileImport}
            onExport={handleExport}
          />

          <Alert alert={alert} theme={theme} />

          {/* MAIN CONTENT */}
          <main className="flex-1">
            <Routes>
              <Route
                path="/"
                element={
                  <TextForm
                    heading="Enter Your Text to Analyse"
                    showAlert={showAlert}
                    theme={theme}
                    currentTheme={currentTheme}
                    colorTheme={colorTheme}
                    text={text}
                    setText={addToHistory}
                    onFileImport={handleFileImport}
                    onExport={handleExport}
                    undo={undo}
                    redo={redo}
                    canUndo={canUndo}
                    canRedo={canRedo}
                    resetHistory={resetHistory}
                  />
                }
              />
              <Route
                path="/about"
                element={<About showAlert={showAlert} theme={theme} />}
              />
              <Route path="/terms" element={<TermsOfUse theme={theme} />} />
              <Route path="/contributors" element={<Contributors theme={theme} />} />
              <Route path="/faq" element={<FAQ theme={theme} />} />
              {/* ✅ Added Privacy Policy Route inside Routes */}
              <Route path="/privacy-policy" element={<PrivacyPolicy theme={theme} />} />
            </Routes>
          </main>

          <Footer theme={theme} />
          <BackToTopButton theme={theme} />
        </div>
      )}
    </Router>
  );
}

export default App;
