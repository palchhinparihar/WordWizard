import { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";

const Contributors = ({ theme }) => {
  const [contributors, setContributors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    fetch('https://api.github.com/repos/palchhinparihar/WordWizard/contributors')
      .then(response => {
        if (!response.ok) throw new Error('Failed to fetch');
        return response.json();
      })
      .then(data => {
        setContributors(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching contributors:', error);
        setError(true);
        setLoading(false);
      });
  }, []);

  const isDark = theme === 'dark';

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" bg-transparent>
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 mx-auto" style={{ borderColor: '#3471f4ff' }}></div>
          <p
            className={`mt-4 text-lg transition-colors duration-300 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            {t("contri.loadingText")}
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center" bg-transparent>
        <div className="text-center p-8 rounded-lg shadow-lg" style={{ backgroundColor: '#1a1a1a' }}>
          <p className="text-lg mb-4" style={{ color: '#e5e7eb' }}>{t("contri.errorText")}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-2 rounded-lg transition-colors"
            style={{ backgroundColor: '#6366f1', color: '#ffffff' }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#4f46e5'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#6366f1'}
          >
            {t("contri.tryAgain")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-transparent">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1
            className={`text-4xl md:text-5xl font-bold mb-4 transition-colors duration-300 ${
             theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            {t("contri.title")}
          </h1>
          <p 
            className={`text-lg md:text-xl max-w-2xl mx-auto transition-colors duration-300 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            {t("contri.subtitle")}
          </p>
          <div className="mt-6 flex justify-center items-center space-x-2 transition-colors duration-300">
            <span
              className={`text-3xl font-bold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}
            >
              {contributors.length}
            </span>
            <span
              className={`text-lg ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              {t("contri.contributions")}
            </span>
          </div>
        </div>

        {/* Contributors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {contributors.map((contributor, index) => (
            <div
              key={contributor.id}
              className={`rounded-xl shadow-md transform hover:-translate-y-2 transition-all duration-300 overflow-hidden ${
                theme === 'dark'
                  ? 'bg-gradient-to-br from-gray-800 via-gray-900 to-black border border-slate-700 hover:border-slate-600 hover:shadow-gray-500/20'
                  : 'bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 border border-blue-200 hover:border-blue-300 hover:shadow-gray-200'
              }`}
              style={{
                animation: `slideUp 0.5s ease-out ${index * 0.1}s both`,
              }}
            >

              <div className="p-6">
                {/* Avatar */}
                <div className="relative mb-4">
                  <img
                    src={contributor.avatar_url}
                    alt={contributor.login}
                    className="w-24 h-24 rounded-full mx-auto"
                    style={{ border: '4px solid #2a2a2a' }}
                  />
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                    <span className="text-xs font-semibold px-3 py-1 rounded-full shadow-lg" style={{ backgroundColor: '#164df3ff', color: '#ffffff' }}>
                      #{index + 1}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="text-center">
                 <h3
                    className={`text-lg font-semibold mb-2 truncate transition-colors duration-300 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    {contributor.login}
                  </h3>
                  <div className="flex items-center justify-center space-x-2 mb-4">
                    <svg className="w-5 h-5" style={{ color: '#10b981' }} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span
                      className={`text-sm font-medium transition-colors duration-300 ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      {contributor.contributions} contribution{contributor.contributions !== 1 ? 's' : ''}
                    </span>
                  </div>

                  {/* Buttons */}
                  <div className="flex space-x-2">
                    <a
                      href={contributor.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-sm font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                      style={{ 
                        backgroundColor: '#2a2a2a',
                        color: '#ffffff'
                      }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#3a3a3a'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = '#2a2a2a'}
                    >
                      {t("contri.githubButton")}
                    </a>
                    <a
                      href={`${contributor.html_url}?tab=repositories`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-sm font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                      style={{ 
                        backgroundColor: '#2641d8ff',
                        color: '#ffffff'
                      }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#171179ff'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = '#2641d8ff'}
                    >
                      {t("contri.profileButton")}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div
          className={`mt-16 text-center rounded-2xl shadow-lg p-8 transition-all duration-300 ${
            theme === 'dark'
              ? 'bg-gradient-to-br from-gray-800 via-gray-900 to-black border border-slate-700 hover:border-slate-600 hover:shadow-gray-500/20'
              : 'bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 border border-blue-200 hover:border-blue-300 hover:shadow-gray-200'
          }`}
        >
          <h2
            className={`text-2xl md:text-3xl font-bold mb-4 transition-colors duration-300 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            {t("contri.ctaTitle")}
          </h2>
          <p 
            className={`mb-6 max-w-2xl mx-auto transition-colors duration-300 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            {t("contri.ctaSubtitle")}
          </p>
          <a
            href="https://github.com/palchhinparihar/WordWizard"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-block font-semibold py-3 px-8 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200 ${
              theme === 'dark'
                ? 'bg-gradient-to-r from-gray-800 to-gray-700 text-white'
                : 'bg-gradient-to-r from-indigo-500 to-blue-400 text-white'
            }`}
          >
            {t("contri.viewOnGithub")}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contributors;