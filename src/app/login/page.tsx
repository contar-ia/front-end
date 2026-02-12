"use client";

import Link from "next/link";
import { Footer } from "@/components/Footer";
import { User, Lock, LogIn, Loader2 } from "lucide-react";
import { Header } from "@/components/Header";
import { useState, FormEvent, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import {
  useSession,
  getLogoutReason,
  clearLogoutReason,
} from "@/contexts/SessionContext";

export default function LoginPage() {
  const router = useRouter();
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:8000";
  const requestTimeoutMs = 10000;
  const { replaceSessionData, logOut } = useSession();
  const [logoutReason, setLogoutReason] = useState<string | null>(null);
  const didResetSession = useRef(false);

  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: async () => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), requestTimeoutMs);

      try {
        const response = await fetch(`${backendUrl}/auth/login/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: loginData.email,
            password: loginData.password,
          }),
          signal: controller.signal,
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.detail || "Falha ao entrar. Verifique suas credenciais.");
        }

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
    onSuccess: (data) => {
      replaceSessionData({
        token: data.token,
        user_id: data.user_id,
        username: data.username,
        email: data.email,
        institution: data.institution ?? null,
        bio: data.bio ?? null,
      });

      router.push("/create");
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutate();
  };

  useEffect(() => {
    if (didResetSession.current) return;
    didResetSession.current = true;

    getLogoutReason().then((reason) => {
      logOut();
      if (reason) {
        setLogoutReason(reason);
        clearLogoutReason();
      }
    });
  }, [logOut]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-white to-pink-50 font-sans text-slate-800">
      <Header />

      <main className="flex-grow flex flex-col items-center justify-center p-4 w-full">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2">
              Bem-vindo(a)!
            </h1>
            <p className="text-slate-500">Vamos continuar a aventura.</p>
          </div>

          <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl shadow-slate-200/50">
            {logoutReason && (
              <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-500 text-blue-700 text-sm font-medium rounded-r-lg">
                {logoutReason}
              </div>
            )}
            
            {/* Alerta de Erro */}
            {isError && (
              <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm font-medium rounded-r-lg animate-in fade-in zoom-in">
                {(error as Error).message}
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">E-mail ou Usuário</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-500 transition-colors">
                    <User size={20} />
                  </div>
                  <input
                    required
                    type="text"
                    placeholder="Seu usuário"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-12 pr-4 outline-none focus:ring-2 focus:ring-teal-400 focus:bg-white transition-all placeholder:text-slate-400 text-slate-700"
                    onChange={(e) => setLoginData((p) => ({ ...p, email: e.target.value }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Senha</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-500 transition-colors">
                    <Lock size={20} />
                  </div>
                  <input
                    required
                    type="password"
                     placeholder="••••••••"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-12 pr-4 outline-none focus:ring-2 focus:ring-teal-400 focus:bg-white transition-all placeholder:text-slate-400 text-slate-700"
                    onChange={(e) => setLoginData((p) => ({ ...p, password: e.target.value }))}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="w-full bg-green-500 hover:bg-green-600 disabled:bg-slate-300 text-white font-bold py-4 rounded-xl shadow-lg shadow-green-200 transition-all active:scale-95 flex items-center justify-center gap-2 text-lg mt-2"
              >
                {isPending ? (
                  <Loader2 className="animate-spin" size={22} />
                ) : (
                  <>
                    <LogIn size={22} />
                    Entrar
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 text-center text-sm font-medium text-slate-500">
              Não tem uma conta?{" "}
              <Link href="/register" className="text-teal-600 hover:text-teal-700 font-bold hover:underline">
                Fazer cadastro
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
