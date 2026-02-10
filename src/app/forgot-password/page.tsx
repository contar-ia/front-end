"use client";

import Link from "next/link";
import { Footer } from "@/components/Footer";
import { BookOpen, Mail, ArrowLeft, KeyRound } from "lucide-react";

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-white to-pink-50 font-sans text-slate-800">
      

      <header className="w-full p-6 md:p-10 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-slate-800 hover:opacity-80 transition-opacity">
          <div className="bg-white p-1.5 rounded-lg shadow-sm text-teal-600">
            <BookOpen size={24} />
          </div>
          <span>Contar-IA</span>
        </Link>
      </header>


      <main className="flex-grow flex flex-col items-center justify-center p-4 w-full">
        
        <div className="w-full max-w-md">
          

          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-sm text-teal-500 mb-4">
               <KeyRound size={32} />
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-2">
              Esqueceu a Senha?
            </h1>
            <p className="text-slate-500">
              Não se preocupe! Insira o seu email e enviaremos instruções de recuperação.
            </p>
          </div>

   
          <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl shadow-slate-200/50">
            <form className="space-y-6">
              

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">
                  Email
                </label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-500 transition-colors">
                    <Mail size={20} />
                  </div>
                  <input 
                    type="email" 
                    placeholder="voce@exemplo.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-12 pr-4 outline-none focus:ring-2 focus:ring-teal-400 focus:bg-white transition-all placeholder:text-slate-400 text-slate-700"
                  />
                </div>
              </div>

              <button 
                type="button" 
                className="w-full bg-teal-400 hover:bg-teal-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-teal-100 transition-transform active:scale-95 flex items-center justify-center gap-2 text-lg mt-2"
              >
                Enviar Link
              </button>
            </form>

 
            <div className="mt-8 text-center">
              <Link 
                href="/login" 
                className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors"
              >
                <ArrowLeft size={16} />
                Voltar para o Login
              </Link>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div> 
  );
}