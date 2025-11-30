"use client";

import Link from "next/link";
import { Footer } from "@/components/Footer";
import { BookOpen, User, Lock, LogIn } from "lucide-react";
import { Header } from "@/components/Header";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-white to-pink-50 font-sans text-slate-800">
      
      <Header/>

      <main className="flex-grow flex flex-col items-center justify-center p-4 w-full">
        
        <div className="w-full max-w-md">
          
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2">
              Bem-vindo(a)!
            </h1>
            <p className="text-slate-500">
              Vamos continuar a aventura.
            </p>
          </div>

          <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl shadow-slate-200/50">
            <form className="space-y-6">
              
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">
                  E-mail
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

                <div className="text-right">
                  <Link href="/forgot-password" className="text-sm font-bold text-teal-500 hover:text-teal-600 hover:underline">
                    Esqueceu a senha?
                  </Link>
                </div>
              </div>

              <button 
                type="button" 
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-green-200 transition-transform active:scale-95 flex items-center justify-center gap-2 text-lg mt-2"
              >
                <LogIn size={22} />
                Entrar
              </button>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-slate-400 font-medium">Ou continue com</span>
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <button className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 hover:shadow-md transition-all">
                <span className="text-xl">G</span> 
              </button>
              <button className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 hover:shadow-md transition-all">
                <span className="text-xl">📱</span>
              </button>
              <button className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 hover:shadow-md transition-all">
                <span className="text-xl">🍎</span>
              </button>
            </div>

            <div className="mt-8 text-center text-sm font-medium text-slate-500">
              Não tem uma conta?{" "}
              <Link href="/register" className="text-teal-600 hover:text-teal-700 font-bold hover:underline">
                Fazer cadastro
              </Link>
            </div>
          </div>

        </div>
      </main>

      <Footer/>
    </div>
  );
}