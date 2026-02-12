"use client";

import React, { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AppHeader } from "@/components/AppHeader";
import { User, Mail, BookOpen, Star, Settings, Camera, Save, Lock, Loader2 } from "lucide-react";
import { useSession } from "@/contexts/SessionContext";
import { StoryStatsResponse } from "@/types/story";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isLoading, updateSessionData } = useSession();
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:8000";

  const [stats, setStats] = useState<StoryStatsResponse>({
    created_count: 0,
    reads_count: 0,
    saved_count: 0,
  });

  const [name, setName] = useState(session?.username ?? "");
  const [email, setEmail] = useState(session?.email ?? "");
  const [school, setSchool] = useState(session?.institution ?? "");
  const [bio, setBio] = useState(session?.bio ?? "");
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading && !session?.token) {
      router.push("/login");
    }
  }, [isLoading, session?.token, router]);

  useEffect(() => {
    if (!session?.user_id) return;

    fetch(`${backendUrl}/stories/stats/${session.user_id}`)
      .then(async (res) => {
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.detail || `HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setStats(data))
      .catch(() => setStats({ created_count: 0, reads_count: 0, saved_count: 0 }));
  }, [backendUrl, session?.user_id]);

  useEffect(() => {
    setName(session?.username ?? "");
    setEmail(session?.email ?? "");
    setSchool(session?.institution ?? "");
    setBio(session?.bio ?? "");
  }, [session?.username, session?.email, session?.institution, session?.bio]);

  const handleSaveProfile = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaveError(null);
    setSaveSuccess(null);

    if (!session?.token) {
      setSaveError("Sessao invalida. Faca login novamente.");
      return;
    }

    if (!name.trim() || !email.trim()) {
      setSaveError("Nome e email sao obrigatorios.");
      return;
    }

    setIsSaving(true);

    try {
      const response = await fetch(`${backendUrl}/auth/me`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.token}`,
        },
        body: JSON.stringify({
          username: name,
          email,
          institution: school,
          bio,
        }),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data.detail || "Nao foi possivel salvar as alteracoes.");
      }

      setName(data.username ?? "");
      setEmail(data.email ?? "");
      setSchool(data.institution ?? "");
      setBio(data.bio ?? "");

      updateSessionData({
        username: data.username,
        email: data.email,
        institution: data.institution ?? null,
        bio: data.bio ?? null,
      });

      setSaveSuccess("Alteracoes salvas com sucesso.");
    } catch (error) {
      setSaveError(error instanceof Error ? error.message : "Erro inesperado ao salvar perfil.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-800">
      <AppHeader />

      <main className="flex-grow w-full max-w-6xl mx-auto p-6 md:p-10">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900">Meu Perfil</h1>
          <p className="text-slate-500">Gerencie suas informacoes e veja seu progresso.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-teal-400 to-green-400"></div>

              <div className="relative mt-8 mb-4">
                <div className="w-24 h-24 rounded-full bg-white p-1 shadow-md">
                  <div className="w-full h-full rounded-full bg-slate-200 flex items-center justify-center text-slate-400 overflow-hidden">
                    <User size={48} />
                  </div>
                </div>
                <button className="absolute bottom-0 right-0 p-2 bg-slate-800 text-white rounded-full hover:bg-slate-700 transition-colors shadow-sm border-2 border-white">
                  <Camera size={14} />
                </button>
              </div>

              <h2 className="text-xl font-bold text-slate-800">{name}</h2>
              <p className="text-sm text-slate-500 font-medium mb-4">Educadora • Plano Pro</p>

              <div className="flex gap-2 mb-6">
                <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-bold flex items-center gap-1">
                  <Star size={12} fill="currentColor" /> Top Criadora
                </span>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <nav className="flex flex-col">
                <button className="flex items-center gap-3 px-6 py-4 bg-teal-50 text-teal-700 font-semibold border-l-4 border-teal-500">
                  <User size={18} /> Dados Pessoais
                </button>
                <button className="flex items-center gap-3 px-6 py-4 text-slate-600 hover:bg-slate-50 transition-colors font-medium">
                  <Lock size={18} /> Senha e Seguranca
                </button>
                <button className="flex items-center gap-3 px-6 py-4 text-slate-600 hover:bg-slate-50 transition-colors font-medium">
                  <Settings size={18} /> Preferencias
                </button>
              </nav>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
                  <BookOpen size={24} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800">{stats.created_count}</p>
                  <p className="text-xs text-slate-500 font-bold uppercase">Historias</p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                <div className="p-3 bg-purple-100 text-purple-600 rounded-xl">
                  <Star size={24} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800">{stats.reads_count}</p>
                  <p className="text-xs text-slate-500 font-bold uppercase">Leituras</p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                <div className="p-3 bg-green-100 text-green-600 rounded-xl">
                  <Save size={24} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800">{stats.saved_count}</p>
                  <p className="text-xs text-slate-500 font-bold uppercase">Salvas</p>
                </div>
              </div>
            </section>

            <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-slate-800">Informacoes da Conta</h3>
              </div>

              {saveError && (
                <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                  {saveError}
                </div>
              )}

              {saveSuccess && (
                <div className="mb-4 rounded-xl border border-green-200 bg-green-50 p-3 text-sm text-green-700">
                  {saveSuccess}
                </div>
              )}

              <form className="space-y-6" onSubmit={handleSaveProfile}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Nome Completo</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-teal-400 transition-all text-slate-700"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Instituicao</label>
                    <div className="relative">
                      <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input
                        type="text"
                        value={school}
                        onChange={(e) => setSchool(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-teal-400 transition-all text-slate-700"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-bold text-slate-700">Endereco de Email</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-teal-400 transition-all text-slate-700"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-bold text-slate-700">Biografia Curta</label>
                    <textarea
                      rows={4}
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      placeholder="Conte um pouco sobre voce..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-teal-400 transition-all text-slate-700 resize-none"
                    ></textarea>
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-slate-100">
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="bg-green-500 hover:bg-green-600 disabled:bg-slate-300 text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-green-100 transition-transform active:scale-95 flex items-center gap-2"
                  >
                    {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                    Salvar alteracoes
                  </button>
                </div>
              </form>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
