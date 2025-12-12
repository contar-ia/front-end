"use client";

import React, { useState } from "react";
import { Shield, Users, Heart, Sparkles } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { ThemeSelector } from "@/components/create/ThemeSelector";
import { StorySidebar } from "@/components/create/StorySidebar";
import { StoryDetails } from "@/components/create/StoryDetails";
import { useRouter } from "next/navigation";
import { useStory } from "@/contexts/StoryContext";

export default function CreateStory() {
  const [theme, setTheme] = useState("Aventura");
  const [ageGroup, setAgeGroup] = useState(50);
  const [value, setValue] = useState("Honestidade"); 
  
  const [setting, setSetting] = useState(""); 
  const [characters, setCharacters] = useState(["Um cavaleiro corajoso", "Um esquilo falante"]);

  const { setStory } = useStory();

  const router = useRouter();

  const getAgeLabel = (val: number) => {
    if (val < 33) return "3-5 anos";
    if (val < 66) return "6-8 anos";
    return "9-12 anos";
  };

  async function handleCreateStory() {
    const prompt = `
    Crie uma história infantil com:

    Tema: ${theme}
    Faixa etária: ${getAgeLabel(ageGroup)}
    Valor educativo: ${value}
    Cenário: ${setting}
    Personagens: ${characters.join(", ")}
    `;

    sessionStorage.setItem("pending_prompt", prompt);

    setStory({
      theme,
      ageGroup,
      value,
      setting,
      characters,
    });

    router.push("/story");
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-800">

      <AppHeader />

      <main className="flex-grow w-full max-w-6xl mx-auto p-6 md:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          <div className="lg:col-span-2 space-y-8">
            
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Vamos criar uma história mágica</h1>
              <p className="text-slate-500 mb-6">Preencha os detalhes abaixo e deixe a nossa IA dar vida às suas ideias.</p>
              <div className="flex justify-between text-sm font-semibold mb-2"><span>Passo 1 de 4</span></div>
              <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-teal-400 w-1/4 rounded-full"></div>
              </div>
            </div>

            <section>
              <h3 className="text-lg font-bold mb-4">Escolha um Tema</h3>
              <ThemeSelector selectedTheme={theme} onSelect={setTheme} />
            </section>

            <section>
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                Selecione a Faixa Etária <span className="text-slate-400 text-sm font-normal">ⓘ</span>
              </h3>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <input 
                  type="range" min="0" max="100" value={ageGroup} 
                  onChange={(e) => setAgeGroup(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-400"
                />
                <div className="flex justify-between mt-3 text-sm text-slate-500 font-medium">
                  <span className={ageGroup < 33 ? "text-teal-600 font-bold" : ""}>3-5 anos</span>
                  <span className={(ageGroup >= 33 && ageGroup < 66) ? "text-teal-600 font-bold" : ""}>6-8 anos</span>
                  <span className={ageGroup >= 66 ? "text-teal-600 font-bold" : ""}>9-12 anos</span>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-bold mb-4">Escolha um Valor Educacional</h3>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { id: "Honestidade", icon: Shield, color: "text-yellow-500" },
                  { id: "Trabalho em Equipe", icon: Users, color: "text-blue-500" },
                  { id: "Bondade", icon: Heart, color: "text-pink-500" }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setValue(item.id)}
                    className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${value === item.id ? "bg-white border-teal-400 shadow-md" : "bg-white border-transparent hover:border-slate-200"}`}
                  >
                    <item.icon className={`mb-2 ${item.color}`} size={28} />
                    <span className="font-semibold text-slate-700 text-center text-sm">{item.id}</span>
                  </button>
                ))}
              </div>
            </section>

            <StoryDetails 
              characters={characters} 
              setting={setting} 
              onSettingChange={setSetting} 
              onCharactersChange={setCharacters}
            />
          </div>

          <div className="lg:col-span-1">
            
            <div className="sticky top-24 space-y-6">
              
              <StorySidebar 
                theme={theme}
                ageGroup={ageGroup}
                value={value}
                characters={characters}
                setting={setting}
              />
              
              <button
                onClick={handleCreateStory}
                className="w-full bg-teal-400 hover:bg-teal-500 text-white text-lg font-bold py-4 rounded-full shadow-lg shadow-teal-100 transition-transform hover:scale-[1.01] flex items-center justify-center gap-2"
              >
                <Sparkles size={24} />
                Criar a Minha História!
              </button>


            </div>

          </div>

        </div>
      </main>
    </div>
  );
}