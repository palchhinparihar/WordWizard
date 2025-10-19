import React, { useState } from 'react';

const AIWriter = (props) => {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateText = async () => {
    setError(null);
    setResult('');

    if (!prompt || prompt.trim().length === 0) {
      setError('Please enter a prompt.');
      return;
    }

    setLoading(true);
    try {
      // POST to a relative backend endpoint that should handle the OpenAI API key securely.
      const resp = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, max_tokens: 512, temperature: 0.7 }),
      });

      if (!resp.ok) {
        const errText = await resp.text();
        throw new Error(errText || `HTTP ${resp.status}`);
      }

      const data = await resp.json();

      // Support multiple backend response shapes: { output }, { text }, or OpenAI-style { choices }
      const textFromBackend = data?.output || data?.text || data?.choices?.[0]?.text || '';
      setResult((textFromBackend || '').toString().trim());
      props.showAlert && props.showAlert('AI text generated', 'success');
    } catch (err) {
      setError(String(err.message || err));
      props.showAlert && props.showAlert('Failed to generate AI text', 'danger');
    } finally {
      setLoading(false);
    }
  };

  const copyResult = async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result);
      props.showAlert && props.showAlert('Copied to clipboard', 'success');
    } catch (err) {
      setError('Failed to copy');
    }
  };

  const downloadResult = () => {
    if (!result) return;
    const blob = new Blob([result], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ai-output.txt';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const containerBg = props.theme === 'light' ? 'bg-gray-50 text-gray-900' : 'bg-gray-800 text-white';

  return (
    <section className={`min-h-screen py-8 ${props.theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-3xl font-bold mb-4">AI Text Generator</h1>

        <div className={`rounded-lg p-6 mb-6 ${containerBg}`}>

          <label className="block mb-2 font-medium">Prompt</label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={6}
            className={`w-full p-3 rounded mb-4 border ${props.theme === 'light' ? 'border-gray-300 bg-white' : 'border-gray-600 bg-gray-700'}`}
            placeholder="Write a descriptive prompt for the AI..."
          />

          <div className="flex items-center gap-2">
            <button onClick={generateText} disabled={loading} className="px-4 py-2 rounded bg-green-600 text-white">{loading ? 'Generating...' : 'Generate'}</button>
            <button onClick={() => { setPrompt(''); setResult(''); }} className="px-4 py-2 rounded bg-gray-500 text-white">Reset</button>
            <div className="ml-auto text-sm text-gray-500">&nbsp;</div>
          </div>

          {error && <p className="mt-4 text-red-400">{error}</p>}
        </div>

        <div className={`rounded-lg p-6 ${containerBg}`}>
          <h2 className="text-2xl font-bold mb-2">Output</h2>
          <pre className={`whitespace-pre-wrap p-4 rounded border ${props.theme === 'light' ? 'bg-white border-gray-200' : 'bg-gray-700 border-gray-600'}`}>
            {result || 'No output yet.'}
          </pre>

          <div className="flex gap-2 mt-4">
            <button onClick={copyResult} disabled={!result} className="px-4 py-2 rounded bg-blue-600 text-white">Copy</button>
            <button onClick={downloadResult} disabled={!result} className="px-4 py-2 rounded bg-indigo-600 text-white">Download</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIWriter;
