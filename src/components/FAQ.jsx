import { useState } from 'react';
import { ChevronDown, HelpCircle, Search, Sparkles } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = [
    {
      question: "What is WordWizard?",
      answer: "WordWizard is a free, open-source text analysis tool that helps you count words, characters, sentences, and transform text case instantly in your browser."
    },
    {
      question: "Is my text data private?",
      answer: "Yes! All text processing happens locally in your browser. Your data never leaves your device and isn't stored anywhere."
    },
    {
      question: "What features are available?",
      answer: "Word/character/sentence counting, reading time estimation, case transformation (uppercase, lowercase, title case), and text export to .txt files."
    },
    {
      question: "Can I contribute to the project?",
      answer: "Absolutely! WordWizard is open-source and welcomes contributions. Visit our GitHub repository to get started."
    }
  ];

  const filteredFAQs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fadeIn">
          <div className="inline-flex p-4 bg-slate-800 bg-opacity-50 backdrop-blur-sm rounded-full mb-6 text-purple-400 border border-slate-700">
            <HelpCircle className="w-12 h-12" />
          </div>
          <h1 className="text-5xl font-bold mb-4 text-white">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Quick answers about WordWizard
          </p>
        </div>

        {/* Search */}
        <div 
          className="mb-8"
          style={{ animation: 'slideUp 0.5s ease-out 0.2s both' }}
        >
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-400" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-slate-800 bg-opacity-50 backdrop-blur-sm border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-white placeholder-gray-400"
            />
          </div>
        </div>

        {/* FAQ List */}
        {filteredFAQs.length === 0 ? (
          <div 
            className="text-center py-12 bg-slate-800 bg-opacity-50 backdrop-blur-sm rounded-xl border border-slate-700"
            style={{ animation: 'slideUp 0.5s ease-out 0.3s both' }}
          >
            <Sparkles className="w-12 h-12 mx-auto mb-4 text-purple-400 opacity-50" />
            <p className="text-gray-400">No questions found matching your search.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredFAQs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className="bg-slate-800 bg-opacity-50 backdrop-blur-sm rounded-xl border overflow-hidden transition-all duration-300"
                  style={{
                    animation: `slideUp 0.5s ease-out ${0.3 + index * 0.1}s both`,
                    borderColor: isOpen ? '#a78bfa' : '#334155',
                    boxShadow: isOpen ? '0 0 20px rgba(167, 139, 250, 0.15)' : 'none'
                  }}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left transition-all duration-200"
                  >
                    <span className="font-semibold text-white pr-4">
                      {faq.question}
                    </span>
                    <div className={`flex-shrink-0 p-2 rounded-lg transition-all duration-300 ${
                      isOpen ? 'bg-purple-500 bg-opacity-20 rotate-180' : 'bg-slate-700'
                    }`}>
                      <ChevronDown className={`w-5 h-5 transition-colors ${
                        isOpen ? 'text-purple-400' : 'text-gray-400'
                      }`} />
                    </div>
                  </button>
                  <div 
                    className="overflow-hidden transition-all duration-300"
                    style={{
                      maxHeight: isOpen ? '500px' : '0',
                      opacity: isOpen ? 1 : 0
                    }}
                  >
                    <div className="px-6 pb-5 pt-0 border-t border-slate-700">
                      <p className="text-gray-300 leading-relaxed pt-4">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* CTA */}
        <div 
          className="mt-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-center text-white"
          style={{ animation: 'slideUp 0.5s ease-out 0.8s both' }}
        >
          <h2 className="text-3xl font-bold mb-3">Still have questions?</h2>
          <p className="mb-6 text-purple-100">
            Join our community or open an issue on GitHub
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://github.com/palchhinparihar/WordWizard/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-purple-600 font-semibold py-3 px-8 rounded-lg transition-all duration-300"
            >
              Ask on GitHub
            </a>
            <a
              href="https://github.com/palchhinparihar/WordWizard"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-purple-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 border border-purple-500"
            >
              View Repository
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