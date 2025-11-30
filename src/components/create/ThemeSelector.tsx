import { Sparkles } from "lucide-react";

interface ThemeSelectorProps {
  selectedTheme: string;
  onSelect: (theme: string) => void;
}

export function ThemeSelector({ selectedTheme, onSelect }: ThemeSelectorProps) {
  const themes = [
    { id: "Aventura", color: "bg-slate-800", icon: "🏞️", border: "border-teal-400" },
    { id: "Amizade", color: "bg-orange-100", icon: "🦊", border: "border-teal-400" },
    { id: "Mistério", color: "bg-purple-100", icon: "🔍", border: "border-teal-400" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {themes.map((theme) => (
        <button
          key={theme.id}
          onClick={() => onSelect(theme.id)}
          className={`relative group overflow-hidden rounded-2xl aspect-video border-4 transition-all ${
            selectedTheme === theme.id
              ? `${theme.border} scale-105`
              : "border-transparent opacity-80 hover:opacity-100"
          }`}
        >
          <div className={`absolute inset-0 ${theme.color} transition-colors`} />
          <span className={`absolute bottom-3 left-4 font-bold text-lg z-10 ${theme.id === "Aventura" ? "text-white" : "text-slate-800"}`}>
            {theme.id}
          </span>
          <div className="absolute inset-0 flex items-center justify-center text-4xl">
            {theme.icon}
          </div>
        </button>
      ))}
    </div>
  );
}