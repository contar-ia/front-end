"use client";

import Link from "next/link";
import { Footer } from "@/components/Footer";
import { User, Lock, RotateCw, UserPlus, Loader2, Mail } from "lucide-react";
import { Header } from "@/components/Header";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { clearLogoutReason } from "@/contexts/SessionContext";

export default function RegisterPage() {
  const router = useRouter();
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:8000";
  const requestTimeoutMs = 10000;
  
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    passConfirmation: ""
  });

  const { mutate, isPending, error, isError } = useMutation({
    mutationFn: async () => {
      if (userData.password !== userData.passConfirmation) {
        throw new Error("As senhas não coincidem.");
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), requestTimeoutMs);

      try {
        const response = await fetch(`${backendUrl}/auth/register/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: userData.username,
            email: userData.email,
            password: userData.password,
          }),
          signal: controller.signal,
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.detail || "Erro no cadastro");
        return data;
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") {
          throw new Error("Servidor demorou para responder. Tente novamente.");
        }
        throw err;
      } finally {
        clearTimeout(timeoutId);
      }
    },
    onSuccess: () => {
      clearLogoutReason();
      router.push("/login");
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutate();
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-white to-pink-50 font-sans text-slate-800">
      <Header />

      <main className="flex-grow flex flex-col items-center justify-center p-4 w-full">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2">
              Crie a Sua Conta
            </h1>
            <p className="text-slate-500">Comece a sua aventura!</p>
          </div>

          <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl shadow-slate-200/50">
            
            {/* Erro gerenciado pelo TanStack */}
            {isError && (
              <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm font-medium rounded-r-lg">
                {(error as Error).message}
              </div>
            )}

            <form className="space-y-5" onSubmit={handleSubmit}>
              
              {/* Username */}
              <div className="space-y-1">
                <label className="text-sm font-bold text-slate-700 ml-1">Usuário</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-500 transition-colors">
                    <User size={20} />
                  </div>
                  <input
                    required
                    type="text"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-teal-400 focus:bg-white transition-all"
                    onChange={(e) => setUserData(p => ({ ...p, username: e.target.value }))}
                  />
                </div>
              </div>

              {/* Adicionado campo de email para conformar com modelo de dados backend */}
              <div className="space-y-1">
                <label className="text-sm font-bold text-slate-700 ml-1">Email</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-500 transition-colors">
                    <Mail size={20} />
                  </div>
                  <input
                    required
                    type="email"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-teal-400 focus:bg-white transition-all"
                    onChange={(e) => setUserData(p => ({ ...p, email: e.target.value }))}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1">
                <label className="text-sm font-bold text-slate-700 ml-1">Senha</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-500 transition-colors">
                    <Lock size={20} />
                  </div>
                  <input
                    required
                    type="password"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-teal-400 focus:bg-white transition-all"
                    onChange={(e) => setUserData(p => ({ ...p, password: e.target.value }))}
                  />
                </div>
              </div>

              {/* Confirmation */}
              <div className="space-y-1">
                <label className="text-sm font-bold text-slate-700 ml-1">Confirmar</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-500 transition-colors">
                    <RotateCw size={20} />
                  </div>
                  <input
                    required
                    type="password"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-teal-400 focus:bg-white transition-all"
                    onChange={(e) => setUserData(p => ({ ...p, passConfirmation: e.target.value }))}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="w-full bg-green-500 hover:bg-green-600 disabled:bg-slate-300 text-white font-bold py-4 rounded-xl shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 mt-4"
              >
                {isPending ? <Loader2 className="animate-spin" size={22} /> : <><UserPlus size={22} /> Cadastrar</>}
              </button>
            </form>

            <div className="mt-8 text-center text-sm font-medium text-slate-500">
              Já tem uma conta?{" "}
              <Link href="/login" className="text-teal-600 font-bold hover:underline">Entrar</Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
