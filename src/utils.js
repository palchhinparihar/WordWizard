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

// Simple in-browser extractive summarizer
// level: 'short' | 'medium' | 'detailed'
export const summarizeText = (text, level = "medium") => {
  if (!text || !text.trim()) return "";

  // Normalize whitespace
  const cleaned = text.replace(/\s+/g, " ").trim();

  // Split into sentences; if none detected, split by commas/semicolons or chunk
  let sentences = cleaned.match(/[^.!?]+[.!?]?/g)?.map((s) => s.trim()) || [];
  if (sentences.length === 0) {
    // fallback to comma/semicolon split
    sentences = cleaned.split(/[;,]+/).map((s) => s.trim()).filter(Boolean);
  }

  // If it's a single very long sentence, chunk into ~30-word pieces
  if (sentences.length === 1) {
    const words = sentences[0].split(/\s+/).filter(Boolean);
    if (words.length > 60) {
      const chunkSize = 30;
      const chunks = [];
      for (let i = 0; i < words.length; i += chunkSize) {
        chunks.push(words.slice(i, i + chunkSize).join(" "));
      }
      sentences = chunks;
    }
  }

  // Determine target count
  const n = sentences.length;
  let target = Math.max(1, Math.round(n * 0.25)); // medium default
  if (level === "short") target = Math.max(1, Math.round(n * 0.12));
  if (level === "detailed") target = Math.max(1, Math.round(n * 0.5));

  // Score words (basic frequency, ignore common stopwords)
  const stopwords = new Set(["the","is","in","and","a","to","of","it","that","this","for","on","as","are","was","with","by","an","be","or","from","at","which","but","not","have","has","had","they","their","its"]);
  const wordRegex = /[a-zA-Z0-9]+/g;
  const freq = new Map();
  sentences.forEach((s) => {
    const words = (s || "").toLowerCase().match(wordRegex) || [];
    words.forEach((w) => {
      if (stopwords.has(w)) return;
      freq.set(w, (freq.get(w) || 0) + 1);
    });
  });

  const scored = sentences.map((s, idx) => {
    const words = (s || "").toLowerCase().match(wordRegex) || [];
    let score = 0;
    words.forEach((w) => {
      if (stopwords.has(w)) return;
      score += freq.get(w) || 0;
    });
    return { idx, score, sentence: s };
  });

  // Select top scored sentences
  scored.sort((a, b) => b.score - a.score);
  let selected = scored.slice(0, Math.min(target, scored.length));
  // Preserve original order
  selected.sort((a, b) => a.idx - b.idx);

  let summary = selected.map((s) => s.sentence).join(" ");

  // If the summary is basically the same as the cleaned input (happens
  // with very short inputs or when scoring selects everything), force a
  // more aggressive selection so we actually condense.
  const normalized = cleaned.replace(/\s+/g, " ").trim();
  if (!summary || summary.length === 0 || summary === normalized || summary.length > normalized.length * 0.9) {
    // pick a smaller target depending on level
    let forcedTarget = 1;
    if (level === "medium") forcedTarget = Math.max(1, Math.round(n * 0.15));
    if (level === "detailed") forcedTarget = Math.max(1, Math.round(n * 0.3));

    const forced = scored.slice(0, Math.min(forcedTarget, scored.length));
    forced.sort((a, b) => a.idx - b.idx);
    summary = forced.map((s) => s.sentence).join(" ");
  }

  // Debugging aid
  // eslint-disable-next-line no-console
  console.debug("summarizeText: level=", level, "origLen=", normalized.length, "summaryLen=", summary.length);

  return summary;
};
