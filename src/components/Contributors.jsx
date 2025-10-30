import { useState, useEffect } from 'react';

const Contributors = ({ theme }) => {
  const [contributors, setContributors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

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
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#000000' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 mx-auto" style={{ borderColor: '#6366f1' }}></div>
          <p className="mt-4 text-lg" style={{ color: '#e5e7eb' }}>Loading contributors...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#000000' }}>
        <div className="text-center p-8 rounded-lg shadow-lg" style={{ backgroundColor: '#1a1a1a' }}>
          <p className="text-lg mb-4" style={{ color: '#e5e7eb' }}>Failed to load contributors</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-2 rounded-lg transition-colors"
            style={{ backgroundColor: '#6366f1', color: '#ffffff' }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#4f46e5'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#6366f1'}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#000000' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#ffffff' }}>
            Our Amazing Contributors
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto" style={{ color: '#9ca3af' }}>
            Thank you to all the wonderful people who have contributed to WordWizard! 
            Your contributions make this project better every day.
          </p>
          <div className="mt-6 flex justify-center items-center space-x-2">
            <span className="text-3xl font-bold" style={{ color: '#6366f1' }}>{contributors.length}</span>
            <span className="text-lg" style={{ color: '#9ca3af' }}>Contributors</span>
          </div>
        </div>

        {/* Contributors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {contributors.map((contributor, index) => (
            <div
              key={contributor.id}
              className="rounded-xl shadow-md hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden"
              style={{ 
                backgroundColor: '#1a1a1a',
                border: '1px solid #2a2a2a'
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
                    <span className="text-xs font-semibold px-3 py-1 rounded-full shadow-lg" style={{ backgroundColor: '#6366f1', color: '#ffffff' }}>
                      #{index + 1}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-2 truncate" style={{ color: '#ffffff' }}>
                    {contributor.login}
                  </h3>
                  <div className="flex items-center justify-center space-x-2 mb-4">
                    <svg className="w-5 h-5" style={{ color: '#10b981' }} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-medium" style={{ color: '#9ca3af' }}>
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
                      GitHub
                    </a>
                    <a
                      href={`${contributor.html_url}?tab=repositories`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-sm font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                      style={{ 
                        backgroundColor: '#6366f1',
                        color: '#ffffff'
                      }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#4f46e5'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = '#6366f1'}
                    >
                      Profile
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center rounded-2xl shadow-lg p-8" style={{ 
          backgroundColor: '#1a1a1a',
          border: '1px solid #2a2a2a'
        }}>
          <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: '#ffffff' }}>
            Want to contribute?
          </h2>
          <p className="mb-6 max-w-2xl mx-auto" style={{ color: '#9ca3af' }}>
            We welcome contributions from everyone! Check out our GitHub repository 
            to get started and become part of our amazing community.
          </p>
          <a
            href="https://github.com/palchhinparihar/WordWizard"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-semibold py-3 px-8 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200"
            style={{ 
              background: 'linear-gradient(to right, #6366f1, #8b5cf6)',
              color: '#ffffff'
            }}
          >
            View on GitHub
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contributors;