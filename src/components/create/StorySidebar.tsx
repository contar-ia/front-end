import { Shield, User } from "lucide-react";

interface StorySidebarProps {
  theme: string;
  ageGroup: number;
  characters: string[];
  setting: string;
}

export function StorySidebar({ theme, ageGroup, characters, setting }: StorySidebarProps) {
  
  const getAgeLabel = (val: number) => {
    if (val < 33) return "3-5 anos";
    if (val < 66) return "6-8 anos";
    return "9-12 anos";
  };

  const getThemeIcon = (t: string) => {
    if (t === "Aventura") return "🏞️";
    if (t === "Amizade") return "🦊";
    return "🔍";
  };

  return (
    <div className="bg-cyan-50 rounded-3xl p-6 border border-cyan-100 shadow-sm">
      <h2 className="text-xl font-bold text-slate-800 mb-6">A Sua História</h2>

      <div className="space-y-6">
        <div>
          <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Tema</p>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center text-xl">
              {getThemeIcon(theme)}
            </div>
            <span className="font-bold text-lg text-slate-800">{theme}</span>
          </div>
        </div>

        <div>
          <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Faixa Etária</p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-teal-500 shadow-sm">
              😊
            </div>
            <span className="font-semibold text-slate-700">{getAgeLabel(ageGroup)}</span>
          </div>
        </div>

        <div>
          <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Personagens</p>

          {characters.length === 0 ? (
            <p className="text-slate-400 italic text-sm">Adicione personagens ao lado...</p>
          ) : (
            <ul className="space-y-3">
              {characters.map((char, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-full text-red-400 shadow-sm">
                    <User size={16} />
                  </div>
                  <span className="text-slate-700 font-medium">{char}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Cenário</p>

          {setting.trim() === "" ? (
            <p className="text-slate-400 italic text-sm">À espera do seu lugar mágico...</p>
          ) : (
            <p className="text-slate-700 font-medium">{setting}</p>
          )}
        </div>
      </div>
    </div>
  );
}