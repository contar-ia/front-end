"use client";

import Link from "next/link";
import { BookOpen } from "lucide-react";

export function Navbar() {
  return (
    <header className="w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">

      <Link 
        href="/" 
        className="flex items-center gap-2 font-bold text-xl text-slate-800 cursor-pointer hover:opacity-80 transition-opacity"
      >
        <div className="bg-teal-100 p-1.5 rounded-lg text-teal-600">
          <BookOpen size={24} />
        </div>
        <span>Contar-IA</span>
      </Link>

      <nav className="flex items-center gap-6 font-medium">
        <Link 
          href="/login" 
          className="text-slate-500 hover:text-teal-600 transition-colors"
        >
          Entrar
        </Link>
        
        <Link
          href="/register" 
          className="bg-teal-400 hover:bg-teal-500 text-white font-semibold py-2 px-6 rounded-full transition-colors shadow-sm shadow-teal-100"
        >
          Cadastrar
        </Link>
      </nav>
    </header>
  );
}