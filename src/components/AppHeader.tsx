import Link from "next/link";
import { BookOpen, User, LogOut } from "lucide-react";

export function AppHeader() {
  return (
    <header className="w-full bg-white border-b border-slate-100 py-3 px-6 flex items-center justify-between sticky top-0 z-50">

      <Link 
        href="/" 
        className="flex items-center gap-2 font-bold text-xl text-slate-800 hover:opacity-80 transition-opacity"
      >
        <div className="bg-teal-100 p-1.5 rounded-lg text-teal-600">
          <BookOpen size={20} />
        </div>
        <span>Contar-IA</span>
      </Link>

      <div className="flex items-center gap-6">
        
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-500">
          <Link href="/create" className="text-teal-600 font-bold">
            Criar Nova
          </Link>
          <Link href="/stories" className="hover:text-teal-600 transition-colors">
            Minhas Histórias
          </Link>
        </nav>

        <div className="h-6 w-px bg-slate-200 hidden md:block"></div>

        <div className="flex items-center gap-3 pl-2">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-slate-700 leading-none">Olá, Professor(a)</p>
            <Link href="/login" className="text-xs text-slate-400 hover:text-red-400 flex items-center justify-end gap-1 mt-1">
              Sair <LogOut size={10} />
            </Link>
          </div>

          <Link href="/profile">
            <div className="w-10 h-10 rounded-full bg-teal-100 border-2 border-teal-200 flex items-center justify-center text-teal-700 font-bold cursor-pointer hover:bg-teal-200 transition-colors shadow-sm">
              <User size={20} />
            </div>
          </Link>
        </div>

      </div>
    </header>
  );
}