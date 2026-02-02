interface ThemeSelectorProps {
  selectedTheme: string;
  onSelect: (theme: string) => void;
}

export function ThemeSelector({ selectedTheme, onSelect }: ThemeSelectorProps) {
  const themes = [
    { id: "Aventura", color: "bg-green-100", icon: "🏞️", border: "border-teal-400" },
    { id: "Amizade", color: "bg-orange-100", icon: "🦊", border: "border-teal-400" },
    { id: "Mistério", color: "bg-purple-100", icon: "🔍", border: "border-teal-400" },
    { id: "OUTRO", color: "bg-slate-100", icon: "✏️", border: "border-teal-400" },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {themes.map((theme) => (
        <button
          key={theme.id}
          onClick={() => onSelect(theme.id)}
          className={`relative group overflow-hidden rounded-2xl h-32 border-4 transition-all flex flex-col items-center justify-center gap-2 ${selectedTheme === theme.id
              ? `${theme.border} scale-[1.03] shadow-md`
              : "border-transparent opacity-80 hover:opacity-100 hover:border-slate-200"
            }`}
        >
          <div className={`absolute inset-0 ${theme.color}`} />

          <div className="relative z-10 text-4xl">
            {theme.icon}
          </div>

          <span className="relative z-10 font-bold text-base text-slate-800">
            {theme.id}
          </span>
        </button>
      ))}
    </div>
  );
}
