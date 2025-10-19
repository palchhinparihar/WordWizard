import React, { useState } from 'react';
import { getTextOperations } from '../data/textUtils';

const TextForm = (props) => {
  const [text, setText] = useState('');

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const textOperations = getTextOperations(text, setText, props);

  const buttonStyle = {
    color: props.theme === 'light' ? 'black' : "white",
    backgroundImage: props.theme === 'light' ? 'linear-gradient(135deg, #faffa3 0%, #f0f0a8 100%)' : `${props.colorTheme}`,
    filter: props.theme === 'light' ? 'none' : 'brightness(140%)',
    fontWeight: props.theme === 'light' ? 400 : 300,
    boxShadow: '2px 2px 8px rgba(0, 0, 0, 0.15)',
  }

  // -------------------------------
  // Remove punctuation function
  // -------------------------------
  const removePunctuation = () => {
    const newText = text.replace(/[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/g, '');
    setText(newText);
    props.showAlert('Punctuation removed!', 'success');
  };

  const getTopWords = (text) => {
    const words = text
      .toLowerCase()
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '')
      .split(/\s+/)
      .filter((word) => word.length > 0);

    const freq = {};
    words.forEach((word) => {
      freq[word] = (freq[word] || 0) + 1;
    });

    const sortedWords = Object.entries(freq).sort((a, b) => b[1] - a[1]);
    return sortedWords.slice(0, 3);
  };

  const topWords = getTopWords(text);

  return (
    <section
      data-aos="fade-up"
      className="min-h-screen py-10 px-4 transition-all duration-500 animated-gradient"
      style={{
        background: props.theme === 'light'
          ? `linear-gradient(270deg, ${props.colorTheme || '#a0522d'}, #ffffff, ${props.colorTheme || '#a0522d'})`
          : `linear-gradient(270deg, ${props.colorTheme || '#a0522d'}, #000000, ${props.colorTheme || '#a0522d'})`,
        color: props.theme === 'light' ? '#000' : '#fff',
      }}
    >
      <div className="container mx-auto max-w-4xl">
        {/* Textarea Section */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-6">{props.heading}</h1>
          <textarea
            className={`w-full p-4 rounded-xl border-2 resize-none focus:outline-none focus:ring-4 focus:ring-opacity-50 transition-all duration-300 ${
              props.theme === 'light'
                ? 'bg-white border-gray-300 focus:ring-yellow-300 text-gray-900'
                : 'bg-gray-700 border-gray-500 focus:ring-blue-500 text-white'
            }`}
            rows="10"
            value={text}
            onChange={handleChange}
            placeholder="Enter your text here..."
          ></textarea>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap gap-3 mb-8">
          {[...textOperations, { label: 'Remove Punctuation', func: removePunctuation }].map(
            (operation, index) => (
              <button
                key={index}
                disabled={text.length === 0}
                onClick={operation.func}
                className={`px-5 py-2.5 rounded-lg font-semibold transition-all duration-300 transform cursor-pointer ${
                  text.length === 0
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:scale-110 hover:rotate-1 hover:shadow-xl active:scale-95'
                }`}
                style={{
                  background: props.theme === 'light'
                    ? `linear-gradient(to right, #7c3aed, #a78bfa)`
                    : `linear-gradient(to right, #9333ea, #c084fc)`,
                  color: '#fff',
                }}
              >
                {operation.label}
              </button>
            )
          )}
        </div>

        {/* Summary & Preview Section */}
        <div className={`container mx-auto px-4 max-w-4xl ${props.theme === 'light' ? 'bg-gradient-to-br from-gray-50 to-gray-100' : 'bg-gradient-to-br from-gray-800 to-gray-900'} rounded-lg p-6`}>
          <h2 className="text-2xl font-bold mb-4">Summary of the Text</h2>
          <div className="space-y-2 mb-6">
      <div className={`container mx-auto px-4 max-w-4xl ${props.theme === 'light' ? 'bg-gradient-to-br from-gray-50 to-gray-100' : 'bg-gradient-to-br from-gray-800 to-gray-900'} rounded-lg p-6`}>
        <h2 className="text-2xl font-bold mb-4">Summary of the Text</h2>
        <div className="space-y-2 mb-6">
          <p className="text-lg">
            <span className="font-semibold">{text.split(/\s+/).filter((element) => element.length !== 0).length}</span> words and <span className="font-semibold">{text.length}</span> characters
          </p>
          <p className="text-lg">
            <span className="font-semibold">{(0.008 * text.split(' ').filter((element) => element.length !== 0).length).toFixed(2)}</span> minutes to read
          </p>

          {/* Display Top 3 Words only if available */}
          {topWords.length > 0 && (
            <p className="text-lg">
              <span className="font-semibold">{text.split(/\s+/).filter((e) => e.length !== 0).length}</span> words and{' '}
              <span className="font-semibold">{text.length}</span> characters
            </p>
            <p className="text-lg">
              <span className="font-semibold">
                {(0.008 * text.split(' ').filter((e) => e.length !== 0).length).toFixed(2)}
              </span>{' '}
              minutes to read
            </p>

            {topWords.length > 0 && (
              <p className="text-lg">
                <span className="font-semibold">Top Words:</span>{' '}
                {topWords.map(([word, count], index) => (
                  <span
                    key={index}
                    className="inline-block transform transition-all duration-500 hover:scale-110"
                  >
                    {word} ({count})
                    {index < topWords.length - 1 ? ', ' : ''}
                  </span>
                ))}
              </p>
            )}
          </div>

          <h2 className="text-2xl font-bold mb-4">Preview of the Text</h2>
          <p className={`text-lg p-4 rounded-lg ${props.theme === 'light' ? 'bg-gradient-to-r from-white to-gray-50 border border-gray-200' : 'bg-gradient-to-r from-gray-700 to-gray-600 border border-gray-500'}`}>
            {text.length > 0 ? text : "Nothing to preview!"}
          </p>
        </div>
        <h2 className="text-2xl font-bold mb-4">Preview of the Text</h2>
        <p className={`text-lg p-4 rounded-lg ${props.theme === 'light' ? 'bg-gradient-to-r from-white to-gray-50 border border-gray-200' : 'bg-gradient-to-r from-gray-700 to-gray-600 border border-gray-500'}`}>
          {text.length > 0 ? text : "Nothing to preview!"}
        </p>
      </div>
    </section>
  );
};

export default TextForm;
