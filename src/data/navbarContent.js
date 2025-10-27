import { Moon, Sun, Palette } from "lucide-react";

// languages list (use map instead of repeating buttons)
export const languages = [
  { code: "en", label: "EN" },
  { code: "hi", label: "हिंदी" },
];

// theme sections to avoid repeating markup for each category
export const getThemeSections = (groupedThemes) => {
  return [
    { key: "dark", label: "Dark Themes", icon: Moon, items: groupedThemes.dark },
    { key: "light", label: "Light Themes", icon: Sun, items: groupedThemes.light },
    { key: "vibrant", label: "Accent Themes", icon: Palette, items: groupedThemes.vibrant },
  ];
}