import React from "react";
import { useTranslation } from "react-i18next";
import { Scale, Shield, FileText, RefreshCw, Mail } from "lucide-react";

const TermsOfUse = ({ theme }) => {
const { t } = useTranslation();

  const termsCards = [
    {
      id: 1,
      icon: <FileText className="w-8 h-8" />,
      title: t("termsPage.useOfWebsite.title"),
      content: t("termsPage.useOfWebsite.content"),
      iconColor: "text-cyan-400",
    },
    {
      id: 2,
      icon: <Shield className="w-8 h-8" />,
      title: t("termsPage.intellectualProperty.title"),
      content: t("termsPage.intellectualProperty.content"),
      iconColor: "text-purple-400",
    },
    {
      id: 3,
      icon: <Scale className="w-8 h-8" />,
      title: t("termsPage.disclaimer.title"),
content: t("termsPage.disclaimer.content"),
      iconColor: "text-pink-400",
    },
    {
      id: 4,
      icon: <RefreshCw className="w-8 h-8" />,
      title: t("termsPage.changesToTerms.title"),
content: t("termsPage.changesToTerms.content"),
      iconColor: "text-yellow-400",
    },
  ];

  return (
    <div className="min-h-screen p-6 bg-transparent">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 animate-fadeIn">
          <h1
            className={`text-5xl font-bold mb-4 transition-colors duration-300 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            {t("termsPage.title")}
          </h1>
          <p
            className={`text-lg max-w-2xl mx-auto transition-colors duration-300 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            {t("termsPage.intro.part1")}
            <span
              className={`font-semibold transition-colors duration-300 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}
            >
              {" "}
              {t("termsPage.intro.highlight")}
            </span>
            . {t("termsPage.intro.part2")}
          </p>
        </div>

        {/* Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {termsCards.map((card, index) => (
            <div
              key={card.id}
              className={`group relative rounded-2xl p-6 backdrop-blur-sm transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl ${
                theme === 'dark'
                  ? 'bg-slate-800 bg-opacity-50 border border-slate-700 hover:border-slate-600 hover:shadow-purple-500/20'
                  : 'bg-blue-50 border border-blue-600 hover:border-blue-300 hover:shadow-blue-200'
              }`}
              style={{
                animation: `slideUp 0.5s ease-out ${index * 0.1}s both`,
              }}
            >
              <div className="relative z-10">
                {/* Icon */}
                <div
                  className={`inline-flex p-3 rounded-xl bg-gray-900 ${card.iconColor} mb-4 transform group-hover:scale-110 transition-transform duration-300`}
                >
                  {card.icon}
                </div>

                <h2
                  className={`text-2xl font-bold mb-3 transition-colors duration-300 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {card.id}. {card.title}
                </h2>

                <p
                  className={`leading-relaxed transition-colors duration-300 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  {card.content}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Card */}
        <div
          className={`rounded-2xl p-8 text-center backdrop-blur-sm transform hover:scale-105 transition-all duration-300 ${
            theme === 'dark'
              ? 'bg-slate-800 bg-opacity-50 border border-slate-700 hover:border-slate-600 hover:shadow-purple-500/20'
              : 'bg-blue-50 border border-blue-600 hover:border-blue-300 hover:shadow-blue-200'
          }`}
          style={{ animation: 'slideUp 0.5s ease-out 0.4s both' }}
        >

          <div className="inline-flex p-4 bg-slate-900 rounded-full mb-4 text-cyan-400">
            <Mail className="w-10 h-10" />
          </div>
          <h2 
            className={`text-3xl font-bold mb-3 transition-colors duration-300 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >  
            {t("termsPage.contact.title")}
          </h2>
          <p 
            className={`text-lg mb-4 transition-colors duration-300 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            {t("termsPage.contact.content")}
          </p>
          <a
            href="mailto:support@wordwizard.com"
            className="inline-block bg-slate-700 text-white font-semibold px-8 py-3 rounded-lg hover:bg-slate-600 transition-all duration-300 transform hover:scale-105"
          >
            support@wordwizard.com
          </a>
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
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }
      `}</style>
    </div>
  );
};

export default TermsOfUse;