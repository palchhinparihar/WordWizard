import React from "react";
import { wordCount } from "../utils";

const SummaryCard = ({ theme, t, text = "", topWords = [] }) => {
  const words = wordCount(text);
  const charCount = (text || "").length;
  const readingTime = (0.008 * words).toFixed(2);

  const cards = [
    { id: "words", label: t("textForm.words"), value: words },
    { id: "chars", label: t("textForm.characters"), value: charCount },
    { id: "reading", label: t("textForm.readingTime"), value: `${readingTime} ${t("textForm.minutes")}` },
  ];

  return (
    <section
      data-aos="fade-in"
      data-aos-duration="800"
      className="w-[95%] lg:w-[80%] mx-auto"
    >
      <h2
        className={`text-2xl md:text-3xl font-bold mb-8 text-center tracking-tight ${
          theme === "light" ? "text-gray-800" : "text-gray-100"
        }`}
      >
        {t("textForm.summary")}
      </h2>

      <div className=" sm:grid-cols-3 gap-6 mb-8 text-center place-items-center">
        {cards.map((c, idx) => (
          <div
            key={c.id}
            className={`w-[95%] lg:h-20 p-4 mb-6 rounded-xl border shadow-sm transition duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-700
              ${
                theme === "light"
                  ? "bg-gradient-to-r from-yellow-200 to-yellow-300 border-yellow-400"
                  : "bg-gradient-to-r from-gray-800 to-gray-700 border-gray-700"
              }`}
          >
            <p
              className={`text-sm font-medium ${
                theme === "light" ? "text-gray-600" : "text-gray-400"
              }`}
            >
              {c.label}
            </p>
            <p className="text-2xl font-bold">{c.value}</p>
          </div>
        ))}
      </div>

      {topWords.length > 0 && (
        <div className="mb-8 text-center">
          <h3
            className={`text-xl font-semibold mb-4 ${
              theme === "light" ? "text-gray-800" : "text-gray-100"
            }`}
          >
            Top Words
          </h3>
          <div className="flex flex-wrap justify-center gap-2">
            {topWords.map(([word, count], index) => (
              <span
                key={index}
                className={`px-3 py-1 text-sm font-medium rounded-full border transition-transform duration-200 hover:shadow-lg hover:shadow-purple-700 hover:scale-110 ${
                  theme === "light"
                    ? "bg-blue-200 text-blue-800 border-blue-500"
                    : "bg-gray-700 text-gray-200 border-gray-600"
                }`}
              >
                {word} ({count})
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default SummaryCard;
