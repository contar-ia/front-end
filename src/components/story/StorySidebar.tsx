import { Shield, User, MapPin, PlusCircle, Save, Users, Heart, Edit3 } from "lucide-react";
import Link from "next/link";

interface StorySidebarProps {
  theme: string;
  ageGroup: number;
  value: string;
  characters: string[];
  setting: string;
}

export function StorySidebar({theme, ageGroup, value, characters, setting}: StorySidebarProps) {
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
    <div className="flex flex-col gap-4">
      <div className="bg-cyan-50 rounded-3xl p-6 border border-cyan-100 shadow-sm">
        <h2 className="text-xl font-bold text-slate-800 mb-6">Resumo da História</h2>

        <div className="space-y-6">
  
          <div className="flex items-start gap-3">
            <div className="p-2 bg-white rounded-lg text-teal-600 shadow-sm">
              <span className="text-xl">{getThemeIcon(theme)}</span>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tema</p>
              <p className="font-bold text-slate-800">{theme}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 bg-white rounded-lg text-teal-600 shadow-sm">
              <span className="text-xl">😊</span>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Faixa Etária</p>
              <p className="font-bold text-slate-800">{getAgeLabel(ageGroup)}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 bg-white rounded-lg text-yellow-500 shadow-sm">
              {(() => {
                const { icon: Icon, color } = getValueIcon(value);
                return <Icon className={color} size={20} />;
              })()}
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Valor</p>
              <p className="font-bold text-slate-800">{value}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 bg-white rounded-lg text-blue-500 shadow-sm">
              <User size={20} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Personagens</p>
              <p className="font-bold text-slate-800 leading-tight">
                {characters.join(", ")}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 bg-white rounded-lg text-green-500 shadow-sm">
              <span className="text-xl">🌍</span>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Cenário</p>
              <p className="font-bold text-slate-800">{setting}</p>
            </div>
          </div>
        </div>
      </div>

      <button className="w-full bg-teal-400 hover:bg-teal-500 text-white font-bold py-3 px-4 rounded-xl shadow-md shadow-teal-100 flex items-center justify-center gap-2 transition-transform active:scale-95">
        <Save size={20} />
        Salvar na Biblioteca
      </button>

      <Link 
        href="/create" 
        onClick={(e) => {
          // Sinalizar para cancelar requisição em andamento
          sessionStorage.setItem("cancel_story_request", "true");
          // Pequeno delay para garantir que o sinal seja processado
          e.preventDefault();
          setTimeout(() => {
            window.location.href = "/create";
          }, 100);
        }}
        className="w-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold py-3 px-4 rounded-xl shadow-sm flex items-center justify-center gap-2 transition-transform active:scale-95"
      >
        <PlusCircle size={20} />
        Criar Nova História
      </Link>
    </div>
  );
}