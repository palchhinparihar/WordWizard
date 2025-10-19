import { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import Alert from "./components/Alert";
import TextForm from "./components/TextForm";
import About from "./components/About";
import Welcome from "./components/Welcome";
import AIWriter from "./components/AIWriter";

function App() {
  const [theme, setTheme] = useState("light");
  const [colorTheme, setColorTheme] = useState("#ffffff");
  const [alert, setAlert] = useState(null);
  const [showWelcome, setShowWelcome] = useState(true);

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
      setColorTheme("#042743");
      showAlert(`Dark theme enabled!`, "success");
    } else {
      setTheme("light");
      setColorTheme("#ffffff");
      showAlert("Light theme enabled!", "success");
    }
  };

  const addColorTheme = (colorName, bgColor) => {
    if (theme === "dark") {
      setColorTheme(bgColor);
      showAlert(`${colorName} theme applied!`, "success");
    } else {
      showAlert("Enable Dark Mode to use color themes.", "warning");
    }
  };

  useEffect(() => {
    document.body.style.backgroundColor = colorTheme;
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
          <>
            <Navbar
              title="WordWizard"
              theme={theme}
              toggleTheme={toggleTheme}
              addColorTheme={addColorTheme}
            />
            <Alert alert={alert} theme={theme} />

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
              <Route
                path="/ai"
                element={<AIWriter showAlert={showAlert} theme={theme} colorTheme={colorTheme} />}
              />
            </Routes>
          </>
        )}
      </Router>
    </>
  );
}

export default App;
