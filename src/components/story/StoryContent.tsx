"use client";

import { useEffect, useState } from "react";
import { marked } from "marked";

// Configurar marked para quebrar linhas em parágrafos
marked.setOptions({
  breaks: true,
  gfm: true,
});

// Função para limpar duplicações e resumos da história
function cleanStory(story: string): string {
  if (!story) return story;
  
  // Remove "História:" se aparecer no meio do texto (geralmente indica duplicação)
  let cleaned = story.replace(/^História:\s*/i, "");
  
  // Se houver múltiplas ocorrências do mesmo título, mantém apenas a primeira
  const titleMatch = story.match(/^#\s+(.+)$/m);
  if (titleMatch) {
    const title = titleMatch[1];
    // Remove duplicações do título
    const titleRegex = new RegExp(`^#\\s+${title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'gm');
    const matches = story.match(titleRegex);
    if (matches && matches.length > 1) {
      // Mantém apenas a primeira ocorrência do título e remove o resumo curto que vem antes
      const firstTitleIndex = story.indexOf(`# ${title}`);
      if (firstTitleIndex > 0) {
        // Se há texto antes do primeiro título, pode ser um resumo - removê-lo
        const beforeTitle = story.substring(0, firstTitleIndex).trim();
        // Se o texto antes do título é muito curto (provavelmente um resumo), removê-lo
        if (beforeTitle.length < 500 && !beforeTitle.includes("##")) {
          cleaned = story.substring(firstTitleIndex);
        }
      }
    }
  }
  
  return cleaned.trim();
}

export function StoryContent({ story, loading, hasError }: { story: string; loading: boolean; hasError?: boolean }) {
  const [typedStory, setTypedStory] = useState("");
  const [renderedStory, setRenderedStory] = useState("");
  const [loadingMessage, setLoadingMessage] = useState("Criando sua história mágica...");
  const [loadingTime, setLoadingTime] = useState(0);

  // Atualizar mensagem de loading baseado no tempo
  useEffect(() => {
    if (!loading) {
      setLoadingTime(0);
      return;
    }

    const interval = setInterval(() => {
      setLoadingTime(prev => {
        const newTime = prev + 1;
        
        // Atualizar mensagem baseado no tempo decorrido
        if (newTime < 10) {
          setLoadingMessage("Validando o conteúdo...");
        } else if (newTime < 30) {
          setLoadingMessage("Gerando a história...");
        } else if (newTime < 60) {
          setLoadingMessage("Verificando a segurança...");
        } else if (newTime < 90) {
          setLoadingMessage("Validando os requisitos...");
        } else if (newTime < 120) {
          setLoadingMessage("Revisando e formatando...");
        } else {
          setLoadingMessage("Finalizando os últimos detalhes...");
        }
        
        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [loading]);

  useEffect(() => {
    // Resetar quando começar a carregar
    if (loading) {
      setTypedStory("");
      setRenderedStory("");
      setLoadingTime(0);
      setLoadingMessage("Criando sua história mágica...");
      return;
    }

    // Só processar a história quando não estiver carregando E houver história
    if (!loading && story && story.trim().length > 0) {
      // Limpar a história antes de processar
      const cleanedStory = cleanStory(story);
      setTypedStory("");

      let i = 0;
      const interval = setInterval(() => {
        const currentText = cleanedStory.slice(0, i);
        setTypedStory(currentText);
        // Renderizar markdown conforme o texto vai sendo digitado
        setRenderedStory(marked.parse(currentText) as string);
        i++;
        if (i > cleanedStory.length) clearInterval(interval);
      }, 5);
      
      return () => clearInterval(interval);
    }
  }, [loading, story]);

  // Determinar o que mostrar
  // Mostrar spinner se estiver carregando
  // Se não estiver carregando e não houver história, pode ser:
  // 1. Erro (hasError) - não mostrar nada
  // 2. Aguardando - mostrar mensagem de aguardo
  const showLoading = loading;
  const hasStory = story && story.trim().length > 0;

  return (
    <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm min-h-[400px]">

      {showLoading ? (
        <div className="w-full flex flex-col items-center justify-center py-20">
          <div className="relative">
            {/* Spinner principal */}
            <div 
              className="animate-spin w-16 h-16 rounded-full border-4 border-teal-100"
              style={{
                borderTopColor: '#2dd4bf',
                borderRightColor: '#2dd4bf',
                borderBottomColor: 'transparent',
                borderLeftColor: 'transparent',
              }}
            ></div>
            {/* Spinner interno (rotação reversa) */}
            <div 
              className="absolute top-0 left-0 w-16 h-16 rounded-full border-4 border-transparent animate-spin"
              style={{
                borderTopColor: '#14b8a6',
                borderRightColor: 'transparent',
                borderBottomColor: 'transparent',
                borderLeftColor: 'transparent',
                animationDirection: 'reverse',
                animationDuration: '1.5s',
              }}
            ></div>
          </div>
          
          {/* Mensagem de loading dinâmica */}
          <p className="mt-6 text-slate-700 font-semibold text-lg animate-pulse">
            {loadingMessage}
          </p>
          
          {/* Indicador de tempo */}
          <div className="mt-4 flex items-center gap-2 text-slate-400 text-sm">
            <div className="flex gap-1">
              <div className="w-1 h-1 rounded-full bg-teal-400 animate-bounce" style={{ animationDelay: '0s' }}></div>
              <div className="w-1 h-1 rounded-full bg-teal-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-1 h-1 rounded-full bg-teal-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
            <span className="ml-2">
              {loadingTime > 0 && `${Math.floor(loadingTime / 60)}:${String(loadingTime % 60).padStart(2, '0')}`}
            </span>
          </div>
          
          {/* Barra de progresso animada */}
          <div className="mt-6 w-full max-w-md">
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-teal-400 via-teal-500 to-teal-400 rounded-full animate-pulse"
                style={{
                  width: `${Math.min(95, 10 + (loadingTime * 0.5))}%`,
                  transition: 'width 0.5s ease-out',
                }}
              ></div>
            </div>
          </div>
          
          {/* Dica para o usuário */}
          <p className="mt-6 text-slate-400 text-sm max-w-md text-center">
            Isso pode levar alguns minutos. Estamos criando uma história personalizada e única para você!
          </p>
        </div>
      ) : hasStory ? (
        <>
          <div className="mb-6">
            <span className="text-teal-400 font-bold text-sm tracking-wide uppercase">Sua história está pronta!</span>
          </div>

          <div 
            className="markdown-content text-slate-600"
            dangerouslySetInnerHTML={{ __html: renderedStory }}
          />
        </>
      ) : hasError ? (
        // Não mostrar nada se houver erro - o Alert já está sendo exibido na página
        null
      ) : !loading && !hasStory ? (
        // Só mostrar "Aguardando" se não estiver carregando E não tiver história E não tiver erro
        // Mas isso só deve acontecer em casos muito específicos
        <div className="w-full flex flex-col items-center justify-center py-20">
          <p className="text-slate-500 font-medium">Aguardando dados da história...</p>
        </div>
      ) : null}
    </div>
  );
}
