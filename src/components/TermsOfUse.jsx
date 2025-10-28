import React from "react";
import { Scale, Shield, FileText, RefreshCw, Mail } from "lucide-react";

const TermsOfUse = () => {
  const termsCards = [
    {
      id: 1,
      icon: <FileText className="w-8 h-8" />,
      title: "Use of the Website",
      content: "You may use this website for personal and non-commercial purposes only. Any misuse or attempt to disrupt the functionality of the site is strictly prohibited.",
      iconColor: "text-cyan-400"
    },
    {
      id: 2,
      icon: <Shield className="w-8 h-8" />,
      title: "Intellectual Property",
      content: "All content, design, and code within WordWizard are protected by copyright. Unauthorized copying or redistribution is prohibited.",
      iconColor: "text-purple-400"
    },
    {
      id: 3,
      icon: <Scale className="w-8 h-8" />,
      title: "Disclaimer",
      content: "The information provided on this site is for general purposes only. We do not guarantee the accuracy or reliability of any content.",
      iconColor: "text-pink-400"
    },
    {
      id: 4,
      icon: <RefreshCw className="w-8 h-8" />,
      title: "Changes to Terms",
      content: "We reserve the right to update these terms at any time. Please review this page periodically for changes.",
      iconColor: "text-yellow-400"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 animate-fadeIn">
          <h1 className="text-5xl font-bold mb-4 text-white">
            Terms of Use
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Welcome to <span className="font-semibold text-white">WordWizard</span>. By accessing or using this website, you agree to comply with and be bound by the following terms and conditions.
          </p>
        </div>

        {/* Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {termsCards.map((card, index) => (
            <div
              key={card.id}
              className="group relative bg-slate-800 bg-opacity-50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 hover:border-slate-600 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/20"
              style={{
                animation: `slideUp 0.5s ease-out ${index * 0.1}s both`
              }}
            >
              <div className="relative z-10">
                {/* Icon */}
                <div className={`inline-flex p-3 rounded-xl bg-slate-900 ${card.iconColor} mb-4 transform group-hover:scale-110 transition-transform duration-300`}>
                  {card.icon}
                </div>
                
                <h2 className="text-2xl font-bold mb-3 text-white">
                  {card.id}. {card.title}
                </h2>
                
                <p className="text-gray-300 leading-relaxed">
                  {card.content}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Card */}
        <div 
          className="bg-slate-800 bg-opacity-50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 text-center transform hover:scale-105 hover:border-slate-600 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20"
          style={{
            animation: 'slideUp 0.5s ease-out 0.4s both'
          }}
        >
          <div className="inline-flex p-4 bg-slate-900 rounded-full mb-4 text-cyan-400">
            <Mail className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-bold mb-3 text-white">Get in Touch</h2>
          <p className="text-lg mb-4 text-gray-300">
            If you have any questions about these Terms, please contact us at
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