import React from "react";
import { Lock, Eye, Shield, CheckCircle, Calendar } from "lucide-react";
import { useTranslation } from "react-i18next";

const PrivacyPolicy = () => {
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
      iconColor: "text-green-400",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 animate-fadeIn">
          <div className="inline-flex p-4 bg-slate-800 bg-opacity-50 backdrop-blur-sm rounded-full mb-6 text-purple-400 border border-slate-700">
            <Lock className="w-12 h-12" />
          </div>
          <h1 className="text-5xl font-bold mb-4 text-white">{t("privacyPage.title")}</h1>
           <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            {t("privacyPage.intro.part1")}
            <span className="font-semibold text-white">
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
              className="group relative bg-slate-800 bg-opacity-50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 hover:border-slate-600 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/20"
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

                <h2 className="text-xl font-bold mb-3 text-white">
                  {card.title}
                </h2>

                <p className="text-gray-300 leading-relaxed text-sm">
                  {card.content}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Information Card */}
        <div
          className="bg-slate-800 bg-opacity-50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 mb-8 transform hover:scale-[1.02] hover:border-slate-600 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20"
          style={{
            animation: "slideUp 0.5s ease-out 0.3s both",
          }}
        >
<h2>{t("privacyPage.rights.title")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-white mb-1">
                  {t("privacyPage.rights.access.title")}
                </h3>
                <p className="text-gray-300 text-sm">
                  {t("privacyPage.rights.access.content")}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-white mb-1">{t("privacyPage.rights.deletion.title")}</h3>
                <p className="text-gray-300 text-sm">
                  {t("privacyPage.rights.deletion.content")}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-white mb-1">
                  {t("privacyPage.rights.noSharing.title")}
                </h3>
                <p className="text-gray-300 text-sm">
                  {t("privacyPage.rights.noSharing.content")}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-white mb-1">
                  {t("privacyPage.rights.transparency.title")}
                </h3>
                <p className="text-gray-300 text-sm">
                  {t("privacyPage.rights.transparency.content")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Card */}
        <div
          className="bg-slate-800 bg-opacity-50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 flex items-center justify-between flex-wrap gap-4"
          style={{
            animation: "slideUp 0.5s ease-out 0.4s both",
          }}
        >
          <div className="flex items-center gap-3">
            <Calendar className="w-6 h-6 text-purple-400" />
            <div>
              <p className="text-sm text-gray-400"> {t("privacyPage.rights.footer.lastUpdated")}</p>
              <p className="text-white font-semibold">
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
            className="bg-slate-700 text-white font-semibold px-6 py-2 rounded-lg hover:bg-slate-600 transition-all duration-300 text-sm"
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
