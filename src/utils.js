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
