import { Shield, User, MapPin, PlusCircle, Save } from "lucide-react";
import Link from "next/link";

export function StorySidebar() {
  return (
    <div className="flex flex-col gap-4">
      <div className="bg-cyan-50 rounded-3xl p-6 border border-cyan-100 shadow-sm">
        <h2 className="text-xl font-bold text-slate-800 mb-6">Resumo da História</h2>

        <div className="space-y-6">
  
          <div className="flex items-start gap-3">
            <div className="p-2 bg-white rounded-lg text-teal-600 shadow-sm">
              <span className="text-xl">🏞️</span>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tema</p>
              <p className="font-bold text-slate-800">Aventura</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 bg-white rounded-lg text-teal-600 shadow-sm">
              <span className="text-xl">😊</span>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Faixa Etária</p>
              <p className="font-bold text-slate-800">6-8 anos</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 bg-white rounded-lg text-yellow-500 shadow-sm">
              <Shield size={20} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Valor</p>
              <p className="font-bold text-slate-800">Honestidade</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 bg-white rounded-lg text-blue-500 shadow-sm">
              <User size={20} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Personagens</p>
              <p className="font-bold text-slate-800 leading-tight">
                Cavaleiro Corajoso,<br />Esquilo Falante
              </p>
            </div>
          </div>
        </div>
      </div>

      <button className="w-full bg-teal-400 hover:bg-teal-500 text-white font-bold py-3 px-4 rounded-xl shadow-md shadow-teal-100 flex items-center justify-center gap-2 transition-transform active:scale-95">
        <Save size={20} />
        Salvar na Biblioteca
      </button>

      <Link href="/create" className="w-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold py-3 px-4 rounded-xl shadow-sm flex items-center justify-center gap-2 transition-transform active:scale-95">
        <PlusCircle size={20} />
        Criar Nova História
      </Link>
    </div>
  );
}