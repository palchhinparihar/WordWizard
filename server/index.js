import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Use the global fetch available in Node 18+. If running an older Node,
// you can either upgrade Node or install `node-fetch` manually.

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: "2mb" }));

app.post("/summarize", async (req, res) => {
  const { text, level = "medium" } = req.body || {};
  if (!text || !text.trim()) return res.status(400).json({ error: "No text provided" });

  const OPENAI_KEY = process.env.OPENAI_API_KEY;
  if (!OPENAI_KEY) {
    return res.status(500).json({ error: "Server: OPENAI_API_KEY not configured" });
  }

  // Map level to brief instruction
  const lengthMap = {
    short: "in 1-2 concise sentences",
    medium: "in 3-4 short sentences",
    long: "in 5-8 sentences keeping important details",
  };

  const instruction = lengthMap[level] || lengthMap["medium"];

  const system = `You are a helpful assistant that creates concise abstractive summaries in fluent English. Do not copy phrases verbatim from the source; instead, rephrase in your own words while preserving key points.`;
  const user = `Summarize the following text ${instruction}. Respond only with the summary (no commentary):\n\n${text}`;

  try {
    if (typeof fetch !== "function") {
      console.error("Global fetch is not available. Upgrade Node to v18+ or install node-fetch.");
      return res.status(500).json({ error: "Server requires Node 18+ or node-fetch dependency" });
    }

    const resp = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: system },
          { role: "user", content: user },
        ],
        temperature: 0.3,
        max_tokens: 400,
      }),
    });

    if (!resp.ok) {
      const textErr = await resp.text();
      console.error("OpenAI error:", textErr);
      return res.status(502).json({ error: "OpenAI API error", details: textErr });
    }

    const data = await resp.json();
    const summary = data?.choices?.[0]?.message?.content?.trim() || "";
    return res.json({ summary });
  } catch (err) {
    console.error("Summarize server error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Summarizer server listening on http://localhost:${PORT}`);
});
