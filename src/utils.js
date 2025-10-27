export function capitalize(word) {
  const lower = word.toLowerCase();
  return lower.charAt(0).toUpperCase() + lower.slice(1);
}

export const checkGrammar = async (text) => {
  if (!text.trim()) return [];

  const API_URL = import.meta.env.VITE_LANUGAGETOOL_API_URL;

  const params = new URLSearchParams();
  params.append("text", text);
  params.append("language", "en-US");

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params,
    });

    if (!response.ok) {
      const text = await response.text(); // read plain text error
      console.error("LanguageTool Error:", text);
      throw new Error(text);
    }

    const data = await response.json();
    return data.matches || [];
  } catch (err) {
    console.error("Grammar API Error:", err);
    throw err;
  }
};

export const generateLoremIpsum = async (paragraphs) => {
  try {
    const response = await fetch(
      `https://loripsum.net/api/${paragraphs}/short/plaintext`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch Lorem Ipsum text.");
    }
    const text = await response.text();
    return text;
  } catch (err) {
    console.error("Lorem Ipsum API Error:", err);
    throw err;
  }
};

// Simple in-browser extractive summarizer.
// Levels: 'short' (~15% sentences), 'medium' (~35%), 'long' (~60%)
// This is an inexpensive heuristic summarizer that scores sentences by
// word-frequency (excluding common stopwords) and picks the top sentences
// in the original order to form a concise summary.
export const summarizeText = (text = "", level = "medium") => {
  if (!text || !text.trim()) return "";

  // Split into sentences using a simple regex (sufficient for most English text)
  const sentences = text
    .replace(/\n+/g, " ")
    .match(/[^.!?]+[.!?]?/g)
    ?.map((s) => s.trim())
    .filter(Boolean) || [];

  if (sentences.length <= 1) return text.trim();

  const ratios = { short: 0.15, medium: 0.35, long: 0.6 };
  const ratio = ratios[level] || ratios["medium"];
  const targetCount = Math.max(1, Math.ceil(sentences.length * ratio));

  // Small stopword list to ignore common words when scoring
  const stopwords = new Set([
    "the","and","is","in","it","of","to","a","an","that","this","with","for","on","as","are","was","were","be","by","or","from","at","which","but","not","have","has","had","they","you","i","he","she","we","us","our","his","her",
  ]);

  // Build word frequency map (lowercased, punctuation removed)
  const wordFreq = Object.create(null);
  const words = text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w && !stopwords.has(w));

  words.forEach((w) => {
    wordFreq[w] = (wordFreq[w] || 0) + 1;
  });

  // Score sentences (normalized by sentence length to prefer concise high-value sentences)
  const sentenceScores = sentences.map((s, idx) => {
    const sWords = s
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, " ")
      .split(/\s+/)
      .filter((w) => w);
    let score = 0;
    sWords.forEach((w) => {
      if (wordFreq[w]) score += wordFreq[w];
    });
    const norm = sWords.length > 0 ? score / sWords.length : 0;
    return { idx, score: norm };
  });

  // Pick top sentences and restore original order
  const top = sentenceScores
    .slice()
    .sort((a, b) => b.score - a.score)
    .slice(0, targetCount)
    .sort((a, b) => a.idx - b.idx);

  const summary = top.map((t) => sentences[t.idx]).join(" ");
  return summary.trim();
};

// Call an external abstractive summarization API (server proxy to OpenAI).
// The client will call this function when VITE_USE_ABSTRACT_API is enabled.
export const summarizeTextAPI = async (text = "", level = "medium") => {
  if (!text || !text.trim()) return "";

  const apiUrl = import.meta.env.VITE_SUMMARIZER_API_URL || "http://localhost:3001/summarize";

  try {
    const resp = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, level }),
    });

    if (!resp.ok) {
      const body = await resp.text();
      throw new Error(`Summarizer API error: ${body}`);
    }

    const data = await resp.json();
    return data.summary || "";
  } catch (err) {
    console.error("summarizeTextAPI error:", err);
    throw err;
  }
};

export const wordCount = (text) => {
  return text
  .split(/\s+/)
  .filter((el) => el.length !== 0).length;
};

export const importFile = (file, callback, errorCallback) => {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    const content = e.target.result;
    callback(content);
  };
  reader.onerror = () => {
    errorCallback();
  };
  reader.readAsText(file, "utf-8");
};

export const exportFile = (text, filename) => {
  if (!text) return;
  const blob = new Blob([text], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};
