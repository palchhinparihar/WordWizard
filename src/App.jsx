import { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import Alert from "./components/Alert";
import TextForm from "./components/TextForm";
import About from "./components/About";
import Welcome from "./components/Welcome";
import Footer from "./components/Footer"; // ADD THIS

function App() {
  const [currentThemeId, setCurrentThemeId] = useState("dark");
  const [colorTheme, setColorTheme] = useState("linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)");
  const [alert, setAlert] = useState(null);
  const [showWelcome, setShowWelcome] = useState(true);

  const allThemes = [
    { id: 'dark', gradient: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)', category: 'dark' },
    { id: 'ocean', gradient: 'linear-gradient(135deg, #0a192f 0%, #1e3a5f 50%, #2d5a7b 100%)', category: 'dark' },
    { id: 'forest', gradient: 'linear-gradient(135deg, #052e16 0%, #14532d 50%, #166534 100%)', category: 'dark' },
    { id: 'royal', gradient: 'linear-gradient(135deg, #2e1065 0%, #4c1d95 50%, #6b21a8 100%)', category: 'dark' },
    { id: 'crimson', gradient: 'linear-gradient(135deg, #450a0a 0%, #7f1d1d 50%, #991b1b 100%)', category: 'dark' },
    { id: 'noir', gradient: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #2d2d2d 100%)', category: 'dark' },
    { id: 'light', gradient: 'linear-gradient(135deg, #ffffff 0%, #f3f4f6 50%, #e5e7eb 100%)', category: 'light' },
    { id: 'sunrise', gradient: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 50%, #fcd34d 100%)', category: 'light' },
    { id: 'mint', gradient: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 50%, #6ee7b7 100%)', category: 'light' },
    { id: 'aurora', gradient: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 40%, #3730a3 70%, #1e3a8a 100%)', category: 'vibrant' },
    { id: 'cyberpunk', gradient: 'linear-gradient(135deg, #0f172a 0%, #1e293b 40%, #334155 70%, #475569 100%)', category: 'vibrant' },
    { id: 'sunset-blaze', gradient: 'linear-gradient(135deg, #431407 0%, #7c2d12 40%, #9a3412 70%, #c2410c 100%)', category: 'vibrant' }
  ];

  const currentTheme = allThemes.find(t => t.id === currentThemeId) || allThemes[0];
  const theme = currentTheme.category === 'light' ? 'light' : 'dark';

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  const toggleTheme = () => {
    if (theme === "light") {
      // Switch to dark mode
      setTheme("dark");
      setColorTheme("linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)");
    } else {
      setTheme("light");
      setColorTheme("linear-gradient(135deg, #ffffff 0%, #f3f4f6 100%)");
    }
  };

  const addColorTheme = (colorName, bgColor) => {
    if (theme === "dark") {
      setColorTheme(bgColor);
      showAlert(`${colorName} theme applied!`, "success");
    } else {
      showAlert("Enable Dark Mode to use color themes.", "warning");
    }
  const handleThemeSelect = (themeId, gradient) => {
    setCurrentThemeId(themeId);
    setColorTheme(gradient);
    
    const themeName = themeId.charAt(0).toUpperCase() + themeId.slice(1).replace('-', ' ');
    showAlert(`${themeName} theme applied!`, "success");
  };

  useEffect(() => {
    document.body.style.background = colorTheme;
    document.body.style.transition = 'background 0.5s ease-in-out';
  }, [colorTheme]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Router>
        {showWelcome ? (
          <div
            style={{
              background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
            }}
          >
            <Welcome />
          </div>
        ) : (
          // WRAP EVERYTHING IN A FLEX CONTAINER
          <div className="min-h-screen flex flex-col">
            <Navbar
              title="WordWizard"
              theme={theme}
              currentThemeId={currentThemeId}
              onThemeSelect={handleThemeSelect}
            />
            <Alert alert={alert} theme={theme} />

            {/* ADD flex-1 TO MAIN CONTENT */}
            <main className="flex-1">
              <Routes>
                <Route
                  path="/"
                  element={
                    <TextForm
                      heading="Enter Your Text to Analyse"
                      showAlert={showAlert}
                      theme={theme}
                      colorTheme={colorTheme}
                    />
                  }
                />
                <Route
                  path="/about"
                  element={<About showAlert={showAlert} theme={theme} />}
                />
              </Routes>
            </main>

            {/* ADD FOOTER HERE */}
            <Footer theme={theme} />
          </div>
        )}
      </Router>
    </>
  );
}

export default App;