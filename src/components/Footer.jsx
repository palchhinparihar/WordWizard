import React from "react";
import { Heart, Github, Linkedin, ArrowUp } from "lucide-react";
import { useTranslation } from "react-i18next";

const Footer = ({ theme }) => {
  const isDark = theme === "dark";
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className={`mt-auto py-8 px-4 transition-all duration-300 ${
        isDark
          ? "bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-300 border-t border-gray-700"
          : "bg-gradient-to-r from-white via-gray-50 to-white text-gray-700 border-t border-gray-200"
      }`}
    >
      <div className="container mx-auto max-w-5xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          {/* About Section */}
          <div>
            <h3
              className={`text-lg font-bold mb-3 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              {t("footer.title")}
            </h3>
            <p className="text-sm leading-relaxed">{t("footer.description")}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3
              className={`text-lg font-bold mb-3 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              {t("footer.quickLinks")}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#/"
                  className={`transition-colors hover:underline ${
                    isDark ? "hover:text-blue-400" : "hover:text-blue-600"
                  }`}
                >
                  {t("footer.home")}
                </a>
              </li>
              <li>
                <a
                  href="#/about"
                  className={`transition-colors hover:underline ${
                    isDark ? "hover:text-blue-400" : "hover:text-blue-600"
                  }`}
                >
                  {t("footer.about")}
                </a>
              </li>
              <li>
                <button
                  onClick={scrollToTop}
                  className={`transition-colors hover:underline flex items-center gap-1 ${
                    isDark ? "hover:text-blue-400" : "hover:text-blue-600"
                  }`}
                >
                  {t("footer.backToTop")} <ArrowUp className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>

          {/* Connect Section */}
          <div>
            <h3
              className={`text-lg font-bold mb-3 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              {t("footer.connect")}
            </h3>
            <div className="flex gap-4">
              <a
                href="https://github.com/palchhinparihar"
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-all hover:scale-110 active:scale-95 ${
                  isDark ? "hover:text-blue-400" : "hover:text-blue-600"
                }`}
                aria-label="GitHub Profile"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="https://www.linkedin.com/in/palchhinparihar/"
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-all hover:scale-110 active:scale-95 ${
                  isDark ? "hover:text-blue-400" : "hover:text-blue-600"
                }`}
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className={`pt-6 border-t text-sm text-center ${
            isDark ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <p className="flex items-center justify-center gap-1 flex-wrap">
            {t("footer.madeWith")}
            <Heart
              className={`w-4 h-4 fill-current animate-pulse ${
                isDark ? "text-red-400" : "text-red-500"
              }`}
            />
            {t("footer.by")}
            <a
              href="https://github.com/palchhinparihar"
              target="_blank"
              rel="noopener noreferrer"
              className={`font-semibold transition-colors ${
                isDark ? "hover:text-blue-400" : "hover:text-blue-600"
              }`}
            >
              Palchhin
            </a>
          </p>
          <p className="mt-2 text-xs opacity-75">
            © {currentYear} {t("footer.copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
