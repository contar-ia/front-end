"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";
// Remova o import do Footer daqui

export function Hero() {
  return (
    // Removi: min-h-screen, bg-gradient e o Footer
    // Adicionei: w-full para garantir largura total
    <section className="flex flex-col items-center justify-center text-center px-6 w-full py-10 md:py-0">
      <div className="max-w-4xl">
        
        <div className="flex justify-center gap-4 text-4xl mb-6 animate-bounce-slow">
          <span>📚</span>
          <span>✨</span>
          <span>🎨</span>
        </div>

        <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
          Crie Histórias Mágicas <br />
          <span className="text-teal-400">com Inteligência Artificial</span>
        </h1>

        <p className="text-lg md:text-xl text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed">
          Bem-vindo ao <span className="font-bold text-slate-700">Contar-IA</span>, 
          a ferramenta encantada para educadores gerarem histórias personalizadas, 
          educativas e divertidas para crianças em minutos. Desperte a imaginação e 
          torne a aprendizagem numa aventura!
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/create"
            className="bg-teal-400 hover:bg-teal-500 text-white text-lg font-bold py-4 px-8 rounded-full shadow-lg shadow-teal-100 transition-transform hover:scale-105 flex items-center justify-center gap-2"
          >
            <Sparkles size={20} />
            ✨ Começar a criar sua história
          </Link>
          
          <Link
            href="/learn"
            className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-lg font-bold py-4 px-8 rounded-full transition-all hover:shadow-md"
          >
            Saiba Mais
          </Link>
        </div>
      </div>
    </section>
  );
}