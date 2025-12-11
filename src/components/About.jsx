import { useState } from "react";
import { useTranslation } from "react-i18next";
import { 
  Code2, 
  Palette, 
  Database, 
  Zap, 
  Sparkles, 
  LayoutGrid, 
  Users 
} from "lucide-react";
import { accordionItems } from "../data/accordionItems";

const About = ({ theme }) => {
  const { t } = useTranslation();
  const [openAccordion, setOpenAccordion] = useState(null);

  const toggleAccordion = (id) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  const glassLight = "bg-white/20 border-white/30 shadow-lg backdrop-blur-xl";
  const glassDark = "bg-gray-800/30 border-gray-600/30 shadow-xl backdrop-blur-xl";

  const techStack = [
    { name: "React", icon: Code2, description: "UI Library", color: "text-blue-400" },
    { name: "Tailwind", icon: Palette, description: "Styling Framework", color: "text-cyan-400" },
    { name: "Contentful", icon: Database, description: "Headless CMS", color: "text-purple-400" },
    { name: "Vite", icon: Zap, description: "Build Tool", color: "text-yellow-400" },
  ];

  const features = [
    {
      title: "Modern UI/UX",
      description: "Smooth animations, layered glass cards & premium interactions.",
      icon: LayoutGrid,
    },
    {
      title: "Performance Optimized",
      description: "Built using Vite, lazy-loading and caching for speed.",
      icon: Zap,
    },
    {
      title: "Scalable Architecture",
      description: "Reusable components, modular structure & clean code.",
      icon: Database,
    },
    {
      title: "Community First",
      description: "Open-source, contributor friendly and well documented.",
      icon: Users,
    },
  ];

  return (
    <section
      data-aos="fade-up"
      className={`min-h-screen py-12 ${
        theme === "light"
          ? "text-gray-900 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100"
          : "text-white "
      }`}
    >
      <div className="container mx-auto px-4 max-w-5xl">

        {/* ================= HERO GLASS ================= */}
        <div
          className={`mb-16 p-10 rounded-3xl border ${
            theme === "light" ? glassLight : glassDark
          } transition-all hover:scale-[1.01]`}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center gap-3">
            {t("aboutPage.heading", "About Us")}
          </h1>

          <p className="text-lg opacity-90 leading-relaxed">
            We combine design, innovation, and technology to craft delightful user experiences.
            Everything here is built with attention to detail and modern development practices.
          </p>
        </div>

        {/* ================= TECH STACK GLASS GRID ================= */}
        <h3 className="text-2xl font-bold mb-6">{t("aboutPage.techStack", "Built With")}</h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {techStack.map((tech) => {
            const Icon = tech.icon;
            return (
              <div
                key={tech.name}
                className={`p-6 rounded-2xl border cursor-pointer transition-all 
                hover:scale-105 hover:shadow-2xl 
                ${theme === "light" ? glassLight : glassDark}`}
              >
                <Icon className={`w-12 h-12 mx-auto mb-3 ${tech.color}`} strokeWidth={1.5} />
                <h4 className="font-semibold text-lg text-center">{tech.name}</h4>
                <p className="text-sm opacity-80 text-center">{tech.description}</p>
              </div>
            );
          })}
        </div>

        {/* ================= FEATURES SECTION (GLASS) ================= */}
        <h3 className="text-2xl font-bold mb-6">Key Highlights</h3>

        <div className="grid md:grid-cols-2 gap-6 mb-20">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className={`p-6 rounded-2xl border transition-all 
                hover:scale-105 hover:shadow-2xl 
                ${theme === "light" ? glassLight : glassDark}`}
              >
                <div className="flex items-center gap-4 mb-3">
                  <Icon className="w-8 h-8 text-blue-300" />
                  <h4 className="text-xl font-semibold">{feature.title}</h4>
                </div>
                <p className="text-sm opacity-90">{feature.description}</p>
              </div>
            );
          })}
        </div>

        {/* ================= GLASS ACCORDION (Q/Q TYPE) ================= */}
        <h3 className="text-2xl font-bold mb-6">How It Works</h3>

        <div className="space-y-4 mb-20">
          {accordionItems.map((item) => {
            const isOpen = openAccordion === item.id;
            const titleText = t(item.titleKey || item.title);
            const bodyText = t(item.contentKey || item.content);

            return (
              <div
                key={item.id}
                className={`rounded-2xl border overflow-hidden transition-all 
                ${theme === "light" ? glassLight : glassDark}`}
              >
                <button
                  onClick={() => toggleAccordion(item.id)}
                  className="w-full px-6 py-4 text-left font-semibold flex justify-between items-center"
                >
                  <span>{titleText}</span>
                  <svg
                    className={`w-5 h-5 transition-transform ${isOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Accordion Content */}
                <div
                  className={`transition-all duration-300 ${
                    isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  } overflow-hidden`}
                >
                  <div className="px-6 py-4 text-sm opacity-90">{bodyText}</div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default About;
