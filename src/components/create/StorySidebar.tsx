import { Edit3, Heart, Shield, User, Users } from "lucide-react";

interface StorySidebarProps {
  theme: string;
  ageGroup: number;
  value: string;
  characters: string[];
  setting: string;
}

export function StorySidebar({ theme, ageGroup, value, characters, setting }: StorySidebarProps) {

  const getAgeLabel = (val: number) => {
    if (val < 33) return "3-5 anos";
    if (val < 66) return "6-8 anos";
    return "9-12 anos";
  };

  const getThemeIcon = (t: string) => {
    if (t === "Aventura") return "🏞️";
    if (t === "Amizade") return "🦊";
    if (t === "Mistério") return "🔍";
    return "✏️";
  };

  const getValueIcon = (t: string) => {
    if (t === "Honestidade") return { icon: Shield, color: "text-yellow-500" };
    if (t === "Trabalho em Equipe") return { icon: Users, color: "text-blue-500", };
    if (t === "Bondade") return { icon: Heart, color: "text-pink-500" };
    return { icon: Edit3, color: "text-slate-600" };
  };

  return (
    <div className="bg-cyan-50 rounded-3xl p-6 border border-cyan-100 shadow-sm">
      <h2 className="text-xl font-bold text-slate-800 mb-6">A Sua História</h2>

      <div className="space-y-6">
        <div>
          <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Tema</p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-teal-500 shadow-sm">
              {getThemeIcon(theme)}
            </div>
            <span className="font-semibold text-slate-700">{theme}</span>
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
          <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Valor</p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-teal-500 shadow-sm">
              {(() => {
                const { icon: Icon, color } = getValueIcon(value);
                return <Icon className={color} size={20} />;
              })()}
            </div>
            <span className="font-semibold text-slate-700">{value}</span>
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
                  <span className="font-semibold text-slate-700">{char}</span>
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
            <p className="font-semibold text-slate-700">{setting}</p>
          )}
        </div>
      </div>
    </div>
  );
}