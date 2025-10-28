import { useState } from "react";
import { useTranslation } from "react-i18next";
import { accordionItems } from "../data/accordionItems";

const About = ({ theme }) => {
  const [openAccordion, setOpenAccordion] = useState(null);
  const { t } = useTranslation();

  const toggleAccordion = (id) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  const techStack = [
    { name: "React", icon: "⚛️", description: "UI Library" },
    { name: "Tailwind CSS", icon: "🎨", description: "Styling Framework" },
    { name: "Contentful", icon: "📝", description: "Content API" },
    { name: "Vite", icon: "⚡", description: "Build Tool" }
  ];

  return (
    <section
      data-aos="fade-up"
      className={`min-h-screen py-8 ${
        theme === "light" ? "text-gray-900" : "text-white"
      }`}
    >
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-3xl font-bold mb-8">
          {t("aboutPage.heading", "About Us")}
        </h2>

        {/* Tech Stack Section */}
        <div className={`mb-8 p-6 rounded-lg ${
          theme === "light" 
            ? "bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200" 
            : "bg-gradient-to-br from-gray-800 to-gray-700 border border-gray-600"
        }`}>
          <h3 className="text-xl font-semibold mb-4">
            {t("aboutPage.techStack", "Built With")}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {techStack.map((tech) => (
              <div
                key={tech.name}
                className={`p-4 rounded-lg text-center transition-transform hover:scale-105 ${
                  theme === "light"
                    ? "bg-white shadow-sm hover:shadow-md"
                    : "bg-gray-900 hover:bg-gray-850"
                }`}
              >
                <div className="text-3xl mb-2">{tech.icon}</div>
                <div className="font-semibold text-sm">{tech.name}</div>
                <div className={`text-xs mt-1 ${
                  theme === "light" ? "text-gray-600" : "text-gray-400"
                }`}>
                  {tech.description}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Accordion Section */}
        <div className="space-y-4">
          {accordionItems.map((item) => {
            const isOpen = openAccordion === item.id;

            const titleText = t(item.titleKey || item.title);
            const bodyText = t(item.contentKey || item.content);

            return (
              <div
                key={item.id}
                className={`border rounded-lg overflow-hidden ${
                  theme === "light" ? "border-gray-200" : "border-gray-600"
                }`}
              >
                <button
                  className={`w-full px-6 py-4 text-left font-semibold flex justify-between items-center transition-colors ${
                    theme === "light"
                      ? "bg-gradient-to-r from-white to-gray-50 hover:from-gray-50 hover:to-gray-100 text-gray-900"
                      : "bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600 text-white"
                  }`}
                  onClick={() => toggleAccordion(item.id)}
                  aria-expanded={isOpen}
                  aria-controls={`accordion-content-${item.id}`}
                >
                  <span>{titleText}</span>
                  <svg
                    className={`w-5 h-5 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                <div
                  id={`accordion-content-${item.id}`}
                  className={`transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  } overflow-hidden`}
                >
                  <div
                    className={`px-6 py-4 ${
                      theme === "light"
                        ? "bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900"
                        : "bg-gradient-to-br from-gray-700 to-gray-600 text-white"
                    }`}
                  >
                    <span>{bodyText}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default About;