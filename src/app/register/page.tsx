"use client";

import Link from "next/link";
import { Footer } from "@/components/Footer";
import { BookOpen, User, Lock, RotateCw, UserPlus } from "lucide-react";
import { Header } from "@/components/Header";

export default function RegisterPage() {
  return (

    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-white to-pink-50 font-sans text-slate-800">

      <Header/>

      <main className="flex-grow flex flex-col items-center justify-center p-4 w-full">
        
        <div className="w-full max-w-md">
          
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2">
              Crie a Sua Conta
            </h1>
            <p className="text-slate-500">
              Comece a sua aventura de contar histórias!
            </p>
          </div>

          <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl shadow-slate-200/50">
            <form className="space-y-6">
              
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">
                  Email ou Nome de Utilizador
                </label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-500 transition-colors">
                    <User size={20} />
                  </div>
                  <input 
                    type="text" 
                    placeholder="voce@exemplo.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-12 pr-4 outline-none focus:ring-2 focus:ring-teal-400 focus:bg-white transition-all placeholder:text-slate-400 text-slate-700"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">
                  Senha
                </label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-500 transition-colors">
                    <Lock size={20} />
                  </div>
                  <input 
                    type="password" 
                    placeholder="••••••••"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-12 pr-4 outline-none focus:ring-2 focus:ring-teal-400 focus:bg-white transition-all placeholder:text-slate-400 text-slate-700"
                  />
                </div>
              </div>
      
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">
                  Confirmar Senha
                </label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-500 transition-colors">
                    <RotateCw size={20} />
                  </div>
                  <input 
                    type="password" 
                    placeholder="••••••••"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-12 pr-4 outline-none focus:ring-2 focus:ring-teal-400 focus:bg-white transition-all placeholder:text-slate-400 text-slate-700"
                  />
                </div>
              </div>

              <button 
                type="button" 
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-green-200 transition-transform active:scale-95 flex items-center justify-center gap-2 text-lg mt-4"
              >
                <UserPlus size={22} />
                Cadastrar
              </button>
            </form>

            <div className="mt-8 text-center text-sm font-medium text-slate-500">
              Já tem uma conta?{" "}
              <Link href="/login" className="text-teal-600 hover:text-teal-700 font-bold hover:underline">
                Entrar
              </Link>
            </div>
          </div>

        </div>
      </main>

      <Footer/>
    </div>
  );
}