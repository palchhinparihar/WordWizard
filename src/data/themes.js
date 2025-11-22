export const allThemes = [
  // Dark Themes
  {
    id: "dark",
    nameKey: "themes.blue",
    gradient:
      "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
    preview: "from-indigo-950 via-blue-900 to-slate-900",
    category: "dark",
    icon: "🌙",
    cardBg: "from-indigo-900 to-indigo-800",
    cardBorder: "border-indigo-700",
    cardHover: "hover:shadow-indigo-600",
  },
  {
    id: "ocean",
    nameKey: "themes.ocean",
    gradient:
      "linear-gradient(135deg, #0a192f 0%, #1e3a5f 50%, #2d5a7b 100%)",
    preview: "from-slate-950 via-cyan-900 to-blue-800",
    category: "dark",
    icon: "🌊",
    cardBg: "from-cyan-900 to-blue-800",
    cardBorder: "border-cyan-800",
    cardHover: "hover:shadow-cyan-600",
  },
  {
    id: "forest",
    nameKey: "themes.forest",
    gradient:
      "linear-gradient(135deg, #052e16 0%, #14532d 50%, #166534 100%)",
    preview: "from-green-950 via-green-900 to-emerald-800",
    category: "dark",
    icon: "🌲",
    cardBg: "from-green-900 to-emerald-800",
    cardBorder: "border-green-800",
    cardHover: "hover:shadow-green-600",
  },
  {
    id: "royal",
    nameKey: "themes.royal",
    gradient:
      "linear-gradient(135deg, #2e1065 0%, #4c1d95 50%, #6b21a8 100%)",
    preview: "from-purple-950 via-purple-900 to-fuchsia-900",
    category: "dark",
    icon: "👑",
    cardBg: "from-purple-900 to-fuchsia-800",
    cardBorder: "border-purple-800",
    cardHover: "hover:shadow-purple-600",
  },
  {
    id: "crimson",
    nameKey: "themes.crimson",
    gradient:
      "linear-gradient(135deg, #450a0a 0%, #7f1d1d 50%, #991b1b 100%)",
    preview: "from-red-950 via-red-900 to-red-800",
    category: "dark",
    icon: "🌅",
    cardBg: "from-red-900 to-red-800",
    cardBorder: "border-red-800",
    cardHover: "hover:shadow-red-600",
  },
  {
    id: "noir",
    nameKey: "themes.noir",
    gradient:
      "linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #2d2d2d 100%)",
    preview: "from-black via-gray-900 to-gray-800",
    category: "dark",
    icon: "🎬",
    cardBg: "from-gray-900 to-gray-800",
    cardBorder: "border-gray-700",
    cardHover: "hover:shadow-gray-600",
  },

  // Light Themes
  {
    id: "light",
    nameKey: "themes.white",
    gradient:
      "linear-gradient(135deg, #ffffff 0%, #f3f4f6 50%, #e5e7eb 100%)",
    preview: "from-white via-gray-50 to-gray-100",
    category: "light",
    icon: "☁️",
    cardBg: "from-gray-100 to-gray-200",
    cardBorder: "border-gray-300",
    cardHover: "hover:shadow-gray-400",
  },
  {
    id: "sunrise",
    nameKey: "themes.sunrise",
    gradient:
      "linear-gradient(135deg, #fef3c7 0%, #fde68a 50%, #fcd34d 100%)",
    preview: "from-amber-100 via-amber-200 to-amber-300",
    category: "light",
    icon: "🌄",
    cardBg: "from-amber-200 to-amber-300",
    cardBorder: "border-amber-400",
    cardHover: "hover:shadow-amber-400",
  },
  {
    id: "mint",
    nameKey: "themes.mint",
    gradient:
      "linear-gradient(135deg, #d1fae5 0%, #a7f3d0 50%, #6ee7b7 100%)",
    preview: "from-emerald-100 via-emerald-200 to-emerald-300",
    category: "light",
    icon: "🍃",
    cardBg: "from-emerald-200 to-emerald-300",
    cardBorder: "border-emerald-400",
    cardHover: "hover:shadow-emerald-400",
  },
  {
    id: "pastel-pink",
    nameKey: "themes.pastel-pink",
    gradient: "linear-gradient(135deg, #fce7f3 0%, #f9a8d4 50%, #f472b6 100%)",
    preview: "from-pink-100 via-pink-200 to-pink-300",
    category: "light",
    icon: "🌸",
    cardBg: "from-pink-200 to-pink-300",
    cardBorder: "border-pink-400",
    cardHover: "hover:shadow-pink-400",
  },

  // Vibrant Themes - MORE SUBTLE & PROFESSIONAL
  {
    id: "aurora",
    nameKey: "themes.aurora",
    gradient:
      "linear-gradient(135deg, #1e1b4b 0%, #312e81 40%, #3730a3 70%, #1e3a8a 100%)",
    preview: "from-indigo-950 via-indigo-800 to-blue-900",
    category: "vibrant",
    icon: "✨",
    cardBg: "from-indigo-800 to-blue-800",
    cardBorder: "border-indigo-700",
    cardHover: "hover:shadow-indigo-500",
  },
  {
    id: "cyberpunk",
    nameKey: "themes.cyberpunk",
    gradient:
      "linear-gradient(135deg, #0f172a 0%, #1e293b 40%, #334155 70%, #475569 100%)",
    preview: "from-slate-950 via-slate-800 to-slate-600",
    category: "vibrant",
    icon: "🤖",
    cardBg: "from-slate-800 to-slate-700",
    cardBorder: "border-slate-600",
    cardHover: "hover:shadow-slate-500",
  },
  {
    id: "sunset-blaze",
    nameKey: "themes.sunset-blaze",
    gradient:
      "linear-gradient(135deg, #431407 0%, #7c2d12 40%, #9a3412 70%, #c2410c 100%)",
    preview: "from-orange-950 via-orange-800 to-orange-600",
    category: "vibrant",
    icon: "🔥",
    cardBg: "from-orange-800 to-orange-700",
    cardBorder: "border-orange-600",
    cardHover: "hover:shadow-orange-500",
  },
  {
    id: "neon-cyber",
    nameKey: "themes.neon-cyber",
    gradient:
      "linear-gradient(135deg, #1a1a1a 0%, #2a1a4a 40%, #4a1a6a 70%, #1a4acc 100%)",
    preview: "from-gray-800 via-purple-900 to-blue-600",
    category: "vibrant",
    icon: "⚡",
    cardBg: "from-purple-800 to-blue-700",
    cardBorder: "border-purple-700",
    cardHover: "hover:shadow-blue-500",
  },
];
