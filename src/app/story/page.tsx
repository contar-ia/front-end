"use client";

import React, { useEffect, useState, useRef } from "react";
import { Navbar } from "@/components/Navbar";
import { StorySidebar } from "@/components/story/StorySidebar";
import { StoryContent } from "@/components/story/StoryContent";
import { ExportBar } from "@/components/story/ExportBar";
import { useStory } from "@/contexts/StoryContext";
import { Disclaimer } from "@/components/story/Disclaimer";
import { Alert } from "@/components/Alert";
import { StoryGenerationRequest, StoryGenerationResponse } from "@/types/story";
import { useRouter } from "next/navigation";

export default function StoryPage() {
  const { story: storyData } = useStory();
  const router = useRouter();
  const isFetchingRef = useRef(false); // Ref para rastrear se já está fazendo fetch
  const lastStoryKeyRef = useRef<string>(""); // Ref para rastrear a última história
  const abortControllerRef = useRef<AbortController | null>(null); // Ref para o AbortController atual
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null); // Ref para o timeout atual

  const [story, setStory] = useState("");
  const [loading, setLoading] = useState(true); // Iniciar como true para mostrar spinner imediatamente
  const [issues, setIssues] = useState<string[]>([]);

  const getAgeLabel = (val: number) => {
    if (val < 33) return "3-5 anos";
    if (val < 66) return "6-8 anos";
    return "9-12 anos";
  };

  // Função para cancelar requisição em andamento
  const cancelCurrentRequest = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
      timeoutIdRef.current = null;
    }
    isFetchingRef.current = false;
    setLoading(false);
  };

  useEffect(() => {
    // Verificar se há sinal para cancelar requisição (vindo da página de criação ou botão)
    const shouldCancel = sessionStorage.getItem("cancel_story_request");
    if (shouldCancel === "true") {
      cancelCurrentRequest();
      sessionStorage.removeItem("cancel_story_request");
      // Resetar estados quando cancelar
      setLoading(false);
      setStory("");
      setIssues([]);
      isFetchingRef.current = false;
      return; // IMPORTANTE: não continuar se foi cancelado
    }
    
    // Verificar se temos dados no context antes de continuar
    // Dar um pequeno delay para permitir que o context seja atualizado
    if (!storyData.theme || !storyData.value) {
      // Aguardar um pouco antes de mostrar erro, caso os dados ainda estejam sendo carregados
      const checkDataTimeout = setTimeout(() => {
        if (!storyData.theme || !storyData.value) {
          setLoading(false);
          setStory("Dados da história não encontrados. Por favor, crie uma nova história.");
          setIssues([]);
          isFetchingRef.current = false;
        }
      }, 500);
      
      return () => {
        clearTimeout(checkDataTimeout);
      };
    }
    
    // Criar uma chave única baseada no conteúdo do storyData
    const currentStoryKey = JSON.stringify({
      theme: storyData.theme,
      value: storyData.value,
      ageGroup: storyData.ageGroup,
      setting: storyData.setting,
      characters: storyData.characters.sort() // Ordenar para garantir consistência
    });
    
    // Se é uma nova história (chave diferente), cancelar requisição anterior e resetar estados
    if (lastStoryKeyRef.current !== currentStoryKey) {
      if (isFetchingRef.current) {
        cancelCurrentRequest();
      }
      // Resetar estados para nova história
      setIssues([]);
      setStory("");
      setLoading(true); // IMPORTANTE: garantir que loading seja true para nova história
      lastStoryKeyRef.current = currentStoryKey;
    } else {
      // Se é a mesma história e já está fazendo fetch, não executar novamente
      if (isFetchingRef.current) {
        return;
      }
      // Se é a mesma história mas não está fazendo fetch, resetar estados e começar
      setIssues([]);
      setStory("");
      setLoading(true);
    }
    
    // Marcar que está fazendo fetch ANTES de criar o abortController
    isFetchingRef.current = true;
    
    // Garantir que loading está true antes de iniciar a requisição
    setLoading(true);

    const abortController = new AbortController();
    abortControllerRef.current = abortController; // Armazenar referência
    
    // Timeout de 5 minutos (300 segundos) para permitir geração completa
    const timeoutId = setTimeout(() => {
      if (abortControllerRef.current === abortController) {
        abortController.abort();
        console.error("Timeout: A requisição demorou mais de 5 minutos");
      }
    }, 300000); // 5 minutos
    timeoutIdRef.current = timeoutId; // Armazenar referência

    async function fetchStory() {
      // Verificar novamente se foi cancelado antes de iniciar
      if (abortController.signal.aborted) {
        isFetchingRef.current = false;
        return;
      }

      // Construir StoryGenerationRequest a partir do context
      const storyRequest: StoryGenerationRequest = {
        theme: storyData.theme,
        age_group: getAgeLabel(storyData.ageGroup),
        educational_value: storyData.value,
        setting: storyData.setting,
        characters: storyData.characters,
      };

      try {
        const res = await fetch("http://localhost:8000/stories/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(storyRequest),
          signal: abortController.signal,
        });

        // Verificar se foi cancelado durante a requisição
        if (abortController.signal.aborted) {
          return;
        }

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        // Limpar timeout se a requisição completar com sucesso
        if (timeoutIdRef.current === timeoutId) {
          clearTimeout(timeoutId);
          timeoutIdRef.current = null;
        }
        
        const data: StoryGenerationResponse = await res.json();

        // Verificar novamente se foi cancelado antes de processar resposta
        if (abortController.signal.aborted || abortControllerRef.current !== abortController) {
          return;
        }

        // Se a história foi gerada com sucesso, limpar issues irrelevantes
        if (data.story_markdown && data.story_markdown.trim().length > 0) {
          // História foi gerada - filtrar issues irrelevantes
          const relevantIssues = (data.issues || []).filter(issue => {
            const issueLower = issue.toLowerCase();
            return !issueLower.includes("história não foi gerada") &&
                   !issueLower.includes("erro ao gerar história") &&
                   !issueLower.includes("conteúdo sensível detectado") && // Se história foi gerada, input foi aprovado
                   !issueLower.includes("conteúdo impróprio");
          });
          
          if (relevantIssues.length > 0) {
            setIssues(relevantIssues);
          } else {
            setIssues([]);
          }
          
          setStory(data.story_markdown);
        } else {
          // Não há história - pode ser rejeição de input ou erro
          if (data.issues && data.issues.length > 0) {
            setIssues(data.issues);
            setStory(""); // Não mostrar mensagem genérica, deixar o alerta explicar
          } else {
            setStory("Não foi possível gerar a história.");
            setIssues([]);
          }
        }
      } catch (error) {
        // Ignorar erros de requisição cancelada
        if (error instanceof Error && error.name === "AbortError") {
          // Verificar se ainda é a requisição atual antes de limpar
          if (abortControllerRef.current === abortController) {
            isFetchingRef.current = false;
            abortControllerRef.current = null;
            if (timeoutIdRef.current === timeoutId) {
              clearTimeout(timeoutId);
              timeoutIdRef.current = null;
            }
          }
          return;
        }

        // Verificar se foi cancelado antes de processar erro
        if (abortController.signal.aborted || abortControllerRef.current !== abortController) {
          return;
        }

        console.error("Erro ao gerar história:", error);
        
        // Detectar se é erro de conexão (backend não disponível)
        let errorMessage = "Erro ao gerar a história. Por favor, tente novamente.";
        if (error instanceof TypeError && error.message.includes("Failed to fetch")) {
          errorMessage = "Não foi possível conectar ao servidor. Verifique se o backend está rodando em http://localhost:8000";
        } else if (error instanceof Error) {
          // Verificar se é timeout
          if (error.message.includes("timeout") || error.message.includes("Timeout")) {
            errorMessage = "A geração da história está demorando mais que o esperado. Por favor, aguarde ou tente novamente.";
          } else {
            errorMessage = `Erro: ${error.message}`;
          }
        }
        
        setStory("");
        setIssues([errorMessage]);
      } finally {
        // Só atualizar estados se ainda for a requisição atual
        if (abortControllerRef.current === abortController && !abortController.signal.aborted) {
          if (timeoutIdRef.current === timeoutId) {
            clearTimeout(timeoutId);
            timeoutIdRef.current = null;
          }
          setLoading(false);
          isFetchingRef.current = false; // Marcar que terminou
          abortControllerRef.current = null;
        }
      }
    }

    fetchStory();

    // Cleanup: cancelar requisição se o componente for desmontado ou se storyData mudar
    return () => {
      // Só cancelar se ainda for a requisição atual
      if (abortControllerRef.current === abortController) {
        cancelCurrentRequest();
      }
    };
  }, [storyData]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-800">
      <Navbar />

      <main className="flex-grow w-full max-w-7xl mx-auto p-6 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-3 lg:sticky lg:top-24">
            <StorySidebar
              theme={storyData.theme}
              ageGroup={storyData.ageGroup}
              value={storyData.value}
              characters={storyData.characters}
              setting={storyData.setting}
            />
          </div>

          <div className="lg:col-span-9">
            {/* Exibir alerta de conteúdo impróprio se houver issues e não houver história */}
            {!loading && issues.length > 0 && !story && (
              <Alert
                type="error"
                title="Conteúdo Impróprio Detectado"
                message={issues.join("\n\n")}
                dismissible={false}
              />
            )}

            {/* Exibir alertas de aviso se houver issues mas também houver história */}
            {/* Só mostrar se os issues não forem sobre "história não foi gerada" (já que ela foi gerada) */}
            {!loading && issues.length > 0 && story && 
             issues.some(issue => !issue.toLowerCase().includes("história não foi gerada") && 
                               !issue.toLowerCase().includes("erro ao gerar história")) && (
              <Alert
                type="warning"
                title="Avisos"
                message={issues.filter(issue => 
                  !issue.toLowerCase().includes("história não foi gerada") &&
                  !issue.toLowerCase().includes("erro ao gerar história")
                ).join("\n\n")}
              />
            )}

            <StoryContent 
              story={story} 
              loading={loading} 
              hasError={!loading && issues.length > 0 && !story}
              key={`${loading}-${story ? story.length : 0}`} 
            />
            
            {/* Mostrar botão para voltar e criar nova história se foi rejeitado */}
            {!loading && issues.length > 0 && !story && (
              <div className="mt-6 flex justify-center">
                <button
                  onClick={() => {
                    // Sinalizar cancelamento antes de cancelar
                    sessionStorage.setItem("cancel_story_request", "true");
                    cancelCurrentRequest();
                    // Pequeno delay para garantir que o cancelamento seja processado
                    setTimeout(() => {
                      router.push("/create");
                    }, 100);
                  }}
                  className="bg-teal-400 hover:bg-teal-500 text-white font-bold py-3 px-8 rounded-full shadow-lg shadow-teal-100 transition-transform hover:scale-[1.01]"
                >
                  Voltar e Criar Nova História
                </button>
              </div>
            )}
            
            {/* Botão para criar nova história quando há história gerada */}
            {story && !loading && (
              <div className="mt-6 flex justify-center">
                <button
                  onClick={() => {
                    // Sinalizar cancelamento antes de cancelar
                    sessionStorage.setItem("cancel_story_request", "true");
                    cancelCurrentRequest();
                    // Pequeno delay para garantir que o cancelamento seja processado
                    setTimeout(() => {
                      router.push("/create");
                    }, 100);
                  }}
                  className="bg-teal-400 hover:bg-teal-500 text-white font-bold py-3 px-8 rounded-full shadow-lg shadow-teal-100 transition-transform hover:scale-[1.01]"
                >
                  Criar Nova História
                </button>
              </div>
            )}

            {story && (
              <>
                <Disclaimer />
                <ExportBar story={story} />
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
