import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useTranslation } from "react-i18next";

const FAQ = ({theme}) => {
  const [openIndex, setOpenIndex] = useState(null);
  const { t } = useTranslation();

  const faqs = [
    {
      question: t("faq.q1"),
      answer: t("faq.a1")
    },
    {
      question: t("faq.q2"),
      answer: t("faq.a2")
    },
    {
      question: t("faq.q3"),
      answer: t("faq.a3")
    },
    {
      question: t("faq.q4"),
      answer: t("faq.a4")
    }
  ];


  return (
    <div className="min-h-screen p-6 bg-transparent">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fadeIn">
          <div
            className={`inline-flex p-4 rounded-full mb-6 border backdrop-blur-sm transition-all duration-300 ${
              theme === 'dark'
                ? 'bg-slate-800 text-white border-slate-700'
                : 'bg-blue-100 text-blue-600 border-blue-300'
            }`}
          >
            <HelpCircle className="w-12 h-12" />
          </div>
          <h1 className={`text-5xl font-bold mb-4 transition-colors duration-300 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            {t("faq.title")}
          </h1>
          <p className={`text-lg max-w-2xl mx-auto transition-colors duration-300 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            {t("faq.subtitle")}
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`rounded-xl border overflow-hidden transition-all duration-300 backdrop-blur-sm ${
                  theme === "dark"
                    ? "bg-slate-800 bg-opacity-50 border-slate-700"
                    : "bg-white border-gray-300"
                }`}
                style={{
                  animation: `slideUp 0.5s ease-out ${0.3 + index * 0.1}s both`,
                  borderColor: isOpen
                    ? theme === "dark"
                      ? "#ebeff6ff"
                      : "#60a5fa"
                    : theme === "dark"
                    ? "#334155"
                    : "#6298eaff",
                  boxShadow: isOpen
                    ? theme === "dark"
                      ? "0 0 20px rgba(167, 139, 250, 0.15)"
                      : "0 0 20px rgba(96, 165, 250, 0.15)"
                    : "none",
                }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left transition-all duration-200 cursor-pointer"
                >
                  <span
                    className={`font-semibold pr-4 transition-colors ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {faq.question}
                  </span>

                  <div
                    className={`flex-shrink-0 p-2 rounded-lg transition-all duration-300 ${
                      isOpen
                        ? theme === "dark"
                          ? "bg-white bg-opacity-20 rotate-180"
                          : "bg-blue-400 rotate-180"
                        : theme === "dark"
                        ? "bg-slate-700"
                        : "bg-blue-200"
                    }`}
                  >
                    <ChevronDown
                      className={`w-5 h-5 transition-colors ${
                        isOpen
                          ? theme === "dark"
                            ? "text-black"
                            : "text-white"
                          : theme === "dark"
                          ? "text-gray-200"
                          : "text-gray-600"
                      } cursor-pointer`}
                    />
                  </div>
                </button>

                <div
                  className="overflow-hidden transition-all duration-300"
                  style={{
                    maxHeight: isOpen ? "500px" : "0",
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <div
                    className={`px-6 pb-5 pt-0 border-t ${
                      theme === "dark" ? "border-slate-700" : "border-gray-200"
                    }`}
                  >
                    <p
                      className={`leading-relaxed pt-4 transition-colors ${
                        theme === "dark" ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>


        {/* CTA */}
        <div 
          className={`mt-12 rounded-2xl p-8 text-center transition-all duration-300 ${
            theme === 'dark'
              ? 'bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white'
              : 'bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 text-gray-900'
          }`}
          style={{ animation: 'slideUp 0.5s ease-out 0.8s both' }}
        >
          <h2 className="text-3xl font-bold mb-3">
            {t("faq.ctaTitle")}
          </h2>
          <p className={`mb-6 ${
            theme === 'dark' ? 'text-blue-100' : 'text-gray-600'
          }`}>
            {t("faq.ctaSubtitle")}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://github.com/palchhinparihar/WordWizard/issues"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-block font-semibold py-3 px-8 rounded-lg transition-all duration-300 ${
                theme === 'dark'
                   ? 'bg-gradient-to-r from-gray-300 to-gray-400 text-black'
                   : 'bg-gradient-to-r from-indigo-500 to-blue-400 text-white'
              }`}
            >
              {t("faq.askGithub")}
            </a>
            <a
              href="https://github.com/palchhinparihar/WordWizard"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-block font-semibold py-3 px-8 rounded-lg transition-all duration-300 border ${
                theme === 'dark'
                  ? 'bg-gray-700 text-white border-gray-500'
                  : 'bg-white text-blue-700 border-blue-400'
              }`}
            >
              {t("faq.viewRepo")}
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }
      `}</style>
    </div>
  );
};

export default FAQ;