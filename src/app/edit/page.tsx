"use client";

/**
 * ============================================================
 * PÁGINA: EDITAR HISTÓRIA (EditStoryPage)
 * ============================================================
 *
 * • Requer autenticação
 * • Busca história pelo ID
 * • Permite editar tema e conteúdo
 * • Exibe mensagem de sucesso destacada antes do redirecionamento
 */

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AppHeader } from "@/components/AppHeader";
import { useSession } from "@/contexts/SessionContext";
import { Save, ArrowLeft, Loader2 } from "lucide-react";

export default function EditStoryPage() {
  /**
   * ============================================================
   * CONTEXTOS
   * ============================================================
   */
  const router = useRouter();
  const searchParams = useSearchParams();
  const storyId = searchParams.get("id");

  const { data: session, isLoading } = useSession();

  const backendUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL ??
    "https://8522-2001-12f0-9c1-664-44d4-121b-454a-d470.ngrok-free.app/api";

  /**
   * ============================================================
   * ESTADOS
   * ============================================================
   */
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  /**
   * ============================================================
   * REDIRECIONAR SE NÃO AUTENTICADO
   * ============================================================
   */
  useEffect(() => {
    if (!isLoading && !session?.token) {
      router.push("/login");
    }
  }, [isLoading, session?.token, router]);

  /**
   * ============================================================
   * VALIDAR ID
   * ============================================================
   */
  useEffect(() => {
    if (!storyId && !isLoading) {
      setError("ID da história não informado.");
      setLoading(false);
    }
  }, [storyId, isLoading]);

  /**
   * ============================================================
   * BUSCAR HISTÓRIA
   * ============================================================
   */
  useEffect(() => {
    if (!session?.user_id || !storyId) return;

    setLoading(true);
    setError(null);

    fetch(
      `${backendUrl}/stories/by-id/${storyId}?user_id=${session.user_id}`
    )
      .then(async (res) => {
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.detail || "Erro ao carregar história.");
        }
        return res.json();
      })
      .then((data) => {
        setTitle(data.title || "");
        setContents(data.contents || "");
      })
      .catch((err) =>
        setError(err.message || "Erro ao carregar história.")
      )
      .finally(() => setLoading(false));
  }, [backendUrl, storyId, session?.user_id]);

  /**
   * ============================================================
   * SALVAR HISTÓRIA
   * ============================================================
   */
  const handleSave = async () => {
    if (!session?.user_id || !storyId) return;

    setSaving(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const res = await fetch(
        `${backendUrl}/stories/${storyId}?user_id=${session.user_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            contents,
          }),
        }
      );

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.detail || "Erro ao salvar história.");
      }

      setSuccessMessage("✨ História atualizada com sucesso!");

      setTimeout(() => {
        router.push("/stories");
      }, 2000);

    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Erro ao salvar.";
      setError(message);
    } finally {
      setSaving(false);
    }
  };

  /**
   * ============================================================
   * RENDERIZAÇÃO
   * ============================================================
   */
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-800">
      <AppHeader />

      <main className="flex-grow w-full max-w-4xl mx-auto p-6 md:p-10">
        {/* Cabeçalho */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-slate-500 hover:text-slate-700 font-semibold transition-colors"
          >
            <ArrowLeft size={18} />
            Voltar
          </button>

          <button
            onClick={handleSave}
            disabled={saving || loading || !!successMessage}
            className="bg-teal-400 hover:bg-teal-500 disabled:bg-teal-200 text-white font-bold py-3 px-6 rounded-full shadow-lg shadow-teal-100 transition-transform hover:scale-105 flex items-center gap-2"
          >
            {saving ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Salvando...
              </>
            ) : (
              <>
                <Save size={18} />
                Salvar Alterações
              </>
            )}
          </button>
        </div>

        {/* Mensagem de Sucesso Destacada */}
        {successMessage && (
          <div className="mb-6 bg-green-50 border-2 border-green-400 text-green-700 px-6 py-6 rounded-2xl text-center shadow-md animate-pulse">
            <h3 className="text-xl font-bold">{successMessage}</h3>
            <p className="text-sm mt-2">
              Redirecionando para sua biblioteca...
            </p>
          </div>
        )}

        {/* Estados */}
        {loading ? (
          <div className="text-center py-20">
            <Loader2
              size={48}
              className="animate-spin text-slate-300 mx-auto mb-4"
            />
            <h3 className="text-xl font-bold text-slate-700">
              Carregando história...
            </h3>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <h3 className="text-xl font-bold text-red-600 mb-2">
              Erro
            </h3>
            <p className="text-slate-500">{error}</p>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8 space-y-6">
            {/* Tema */}
            <div>
              <label className="block text-sm font-bold text-slate-600 mb-2">
                Tema
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-slate-200 rounded-xl p-4 outline-none focus:ring-2 focus:ring-teal-400 transition-all"
                placeholder="Digite o tema da história"
              />
            </div>

            {/* Conteúdo */}
            <div>
              <label className="block text-sm font-bold text-slate-600 mb-2">
                Conteúdo (Markdown)
              </label>
              <textarea
                value={contents}
                onChange={(e) => setContents(e.target.value)}
                rows={18}
                className="w-full border border-slate-200 rounded-xl p-4 outline-none focus:ring-2 focus:ring-teal-400 transition-all font-mono text-sm"
                placeholder="Escreva sua história aqui..."
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}