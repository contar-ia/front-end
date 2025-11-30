"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AppHeader } from "@/components/AppHeader";
import { Search, Plus, Calendar, Edit3, Trash2, Eye, MoreVertical } from "lucide-react";

const MOCK_STORIES = [
  {
    id: 1,
    title: "O Cavaleiro e a Bolota",
    theme: "Aventura",
    themeColor: "bg-blue-100 text-blue-700",
    date: "29 Nov, 2024",
    image: "🏰",
    bgGradient: "from-blue-200 to-slate-200"
  },
  {
    id: 2,
    title: "A Raposa que Sabia Voar",
    theme: "Amizade",
    themeColor: "bg-orange-100 text-orange-700",
    date: "15 Out, 2024",
    image: "🦊",
    bgGradient: "from-orange-200 to-yellow-100"
  },
  {
    id: 3,
    title: "O Mistério do Relógio Parado",
    theme: "Mistério",
    themeColor: "bg-purple-100 text-purple-700",
    date: "02 Set, 2024",
    image: "🕰️",
    bgGradient: "from-purple-200 to-slate-200"
  },
  {
    id: 4,
    title: "Viagem ao Planeta Doce",
    theme: "Fantasia",
    themeColor: "bg-pink-100 text-pink-700",
    date: "20 Ago, 2024",
    image: "🍭",
    bgGradient: "from-pink-200 to-rose-100"
  },
];

export default function StoriesPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredStories = MOCK_STORIES.filter(story => 
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-800">
      

      <AppHeader />

      <main className="flex-grow w-full max-w-7xl mx-auto p-6 md:p-10">
        

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900">Minha Biblioteca</h1>
            <p className="text-slate-500 mt-1">Gira e revisite as suas histórias mágicas.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">

            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="text" 
                placeholder="Pesquisar história..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-64 bg-white border border-slate-200 rounded-full py-3 pl-12 pr-6 outline-none focus:ring-2 focus:ring-teal-400 shadow-sm transition-all text-slate-700"
              />
            </div>


            <Link 
              href="/create"
              className="bg-teal-400 hover:bg-teal-500 text-white font-bold py-3 px-6 rounded-full shadow-lg shadow-teal-100 transition-transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <Plus size={20} />
              <span className="hidden sm:inline">Criar Nova</span>
            </Link>
          </div>
        </div>


        {filteredStories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            
            {filteredStories.map((story) => (
              <div key={story.id} className="group bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 flex flex-col overflow-hidden">
                

                <div className={`h-40 w-full bg-gradient-to-br ${story.bgGradient} relative flex items-center justify-center`}>
                  <span className="text-6xl drop-shadow-sm transform group-hover:scale-110 transition-transform duration-300">
                    {story.image}
                  </span>

                  <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold shadow-sm ${story.themeColor}`}>
                    {story.theme}
                  </span>
                </div>

                <div className="p-5 flex-grow flex flex-col">
                  
   
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-1 text-xs text-slate-400 font-medium">
                      <Calendar size={12} />
                      {story.date}
                    </div>
                    <button className="text-slate-300 hover:text-slate-600 transition-colors">
                      <MoreVertical size={16} />
                    </button>
                  </div>

    
                  <h3 className="text-lg font-bold text-slate-800 mb-2 line-clamp-2 leading-tight group-hover:text-teal-600 transition-colors">
                    {story.title}
                  </h3>

 
                  <p className="text-sm text-slate-500 line-clamp-3 mb-6">
                    Era uma vez, num reino muito distante, uma aventura incrível que mudou tudo para sempre...
                  </p>

    
                  <div className="mt-auto flex items-center gap-2 pt-4 border-t border-slate-50">
      
                    <Link 
                      href="/story" 
                      className="flex-grow bg-slate-50 hover:bg-teal-50 text-slate-600 hover:text-teal-600 border border-slate-200 hover:border-teal-200 rounded-lg py-2 flex items-center justify-center gap-2 text-sm font-bold transition-all"
                    >
                      <Eye size={16} /> Ler
                    </Link>


                    <button className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors" title="Editar">
                      <Edit3 size={18} />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Excluir">
                      <Trash2 size={18} />
                    </button>
                  </div>

                </div>
              </div>
            ))}

          </div>
        ) : (

          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="bg-slate-100 p-6 rounded-full mb-4">
              <Search size={48} className="text-slate-300" />
            </div>
            <h3 className="text-xl font-bold text-slate-700">Nenhuma história encontrada</h3>
            <p className="text-slate-500">Tente pesquisar outro termo ou crie uma nova história.</p>
          </div>
        )}

      </main>
    </div>
  );
}