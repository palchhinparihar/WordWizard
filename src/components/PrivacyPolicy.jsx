import React from "react";
import { Lock, Eye, Shield, CheckCircle, Calendar } from "lucide-react";
import { useTranslation } from "react-i18next";

const PrivacyPolicy = ({theme}) => {
  const { t } = useTranslation();

  const privacyCards = [
    {
      id: 1,
      icon: <Eye className="w-8 h-8" />,
      title: t("privacyPage.informationWeCollect.title"),
      content: t("privacyPage.informationWeCollect.content"),
      iconColor: "text-cyan-400",
    },
    {
      id: 2,
      icon: <Shield className="w-8 h-8" />,
      title: t("privacyPage.dataProtection.title"),
      content: t("privacyPage.dataProtection.content"),
      iconColor: "text-purple-400",
    },
    {
      id: 3,
      icon: <CheckCircle className="w-8 h-8" />,
      title: t("privacyPage.userConsent.title"),
      content: t("privacyPage.userConsent.content"),
      iconColor: "text-green-600",
    },
  ];

  return (
    <div className="min-h-screen p-6 bg-transparent">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 animate-fadeIn">
          <div
            className={`inline-flex p-4 rounded-full mb-6 border backdrop-blur-sm transition-all duration-300 ${
              theme === 'dark'
                ? 'bg-slate-800 bg-opacity-50 text-blue-400 border-slate-700'
                : 'bg-blue-100 text-blue-600 border-blue-300'
            }`}
          >
            <Lock className="w-12 h-12" />
          </div>
          <h1
            className={`text-5xl font-bold mb-4 transition-colors duration-300 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            {t("privacyPage.title")}
          </h1>
           <p
            className={`text-lg max-w-2xl mx-auto transition-colors duration-300 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            {t("privacyPage.intro.part1")}
            <span
              className={`font-semibold transition-colors duration-300 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}
            >
              {t("privacyPage.intro.highlight")}
            </span>
            {t("privacyPage.intro.part2")}
          </p>
        </div>

        {/* Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {privacyCards.map((card, index) => (
            <div
              key={card.id}
              className={`group relative rounded-2xl p-6 backdrop-blur-sm transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl ${
                theme === 'dark'
                  ? 'bg-slate-800 bg-opacity-50 border border-slate-700 hover:border-slate-600 hover:shadow-gray-500/20'
                  : 'bg-blue-50 border border-blue-600 hover:border-blue-300 hover:shadow-blue-200'
              }`}
              style={{
                animation: `slideUp 0.5s ease-out ${index * 0.1}s both`,
              }}
            >
              <div className="relative z-10">
                {/* Icon */}
                <div
                  className={`inline-flex p-3 rounded-xl bg-slate-900 ${card.iconColor} mb-4 transform group-hover:scale-110 transition-transform duration-300`}
                >
                  {card.icon}
                </div>

                <h2
                  className={`text-xl font-bold mb-3 transition-colors duration-300 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {card.title}
                </h2>
                <p
                className={`leading-relaxed text-sm transition-colors duration-300 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                {card.content}
              </p>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Information Card */}
        <div
          className={`rounded-2xl p-8 mb-8 backdrop-blur-sm transform hover:scale-[1.02] transition-all duration-300 hover:shadow-2xl ${
            theme === 'dark'
              ? 'bg-slate-800 bg-opacity-50 border border-slate-700 hover:border-slate-600 hover:shadow-gray-500/20'
              : 'bg-blue-50 border border-blue-600 hover:border-blue-300 hover:shadow-blue-200'
          }`}
          style={{
            animation: 'slideUp 0.5s ease-out 0.3s both',
          }}
        >
          <h2
            className={`text-xl font-bold mb-3 transition-colors duration-300 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            {t("privacyPage.rights.title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <h3 
                  className={`font-semibold mb-1 transition-colors duration-300 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {t("privacyPage.rights.access.title")}
                </h3>
                <p  
                  className={`text-sm transition-colors duration-300 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  {t("privacyPage.rights.access.content")}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className={`font-semibold mb-1 transition-colors duration-300 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {t("privacyPage.rights.deletion.title")}
                </h3>
                <p 
                  className={`text-sm transition-colors duration-300 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  {t("privacyPage.rights.deletion.content")}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className={`font-semibold mb-1 transition-colors duration-300 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {t("privacyPage.rights.noSharing.title")}
                </h3>
                <p 
                  className={`text-sm transition-colors duration-300 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  {t("privacyPage.rights.noSharing.content")}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className={`font-semibold mb-1 transition-colors duration-300 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {t("privacyPage.rights.transparency.title")}
                </h3>
                <p 
                  className={`text-sm transition-colors duration-300 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  {t("privacyPage.rights.transparency.content")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Card */}
        <div
          className={`rounded-2xl p-6 flex items-center justify-between flex-wrap gap-4 backdrop-blur-sm border transition-all duration-300 ${
            theme === 'dark'
              ? 'bg-slate-800 bg-opacity-50 border-slate-700 hover:border-slate-600 hover:shadow-gray-500/20'
              : 'bg-blue-50 border border-blue-600 hover:border-blue-300 hover:shadow-blue-200'
          }`}
          style={{
            animation: "slideUp 0.5s ease-out 0.4s both",
          }}
        >

          <div className="flex items-center gap-3">
            <Calendar className="w-6 h-6 text-blue-600" />
            <div>
              <p 
                className={`text-sm transition-colors duration-300 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}
              > 
                {t("privacyPage.rights.footer.lastUpdated")}
              </p>
              <p 
                className={`font-semibold transition-colors duration-300 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
              >
                {new Date().toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
          <a
            href="mailto:support@wordwizard.com"
            className={`font-semibold px-6 py-2 rounded-lg transition-all duration-300 text-sm ${
              theme === 'dark'
                ? 'bg-white text-slate-800 hover:bg-gray-200'
                : 'bg-slate-800 text-white hover:bg-slate-600'
            }`}
          >
            {t("privacyPage.rights.footer.contact")}
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

export default PrivacyPolicy;
