"use client";

import React, { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { StorySidebar } from "@/components/story/StorySidebar";
import { StoryContent } from "@/components/story/StoryContent";
import { ExportBar } from "@/components/story/ExportBar";
import { useStory } from "@/contexts/StoryContext";
import { Disclaimer } from "@/components/story/Disclaimer";
import { StoryGenerationRequest, StoryGenerationResponse } from "@/types/story";

export default function StoryPage() {
  const { story: storyData } = useStory();

  const [story, setStory] = useState("");
  const [loading, setLoading] = useState(true);
  const [issues, setIssues] = useState<string[]>([]);

  const getAgeLabel = (val: number) => {
    if (val < 33) return "3-5 anos";
    if (val < 66) return "6-8 anos";
    return "9-12 anos";
  };

  useEffect(() => {
    async function fetchStory() {
      // Verificar se temos dados no context
      if (!storyData.theme || !storyData.value) {
        setStory("Dados da história não encontrados. Por favor, crie uma nova história.");
        setLoading(false);
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
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data: StoryGenerationResponse = await res.json();

        // Parsear StoryGenerationResponse
        if (data.story_markdown) {
          setStory(data.story_markdown);
        } else {
          setStory("Não foi possível gerar a história.");
        }

        // Exibir issues se houver
        if (data.issues && data.issues.length > 0) {
          setIssues(data.issues);
          console.warn("Problemas encontrados:", data.issues);
        } else {
          setIssues([]);
        }
      } catch (error) {
        console.error("Erro ao gerar história:", error);
        setStory("Erro ao gerar a história. Por favor, tente novamente.");
        setIssues([`Erro: ${error instanceof Error ? error.message : "Erro desconhecido"}`]);
      } finally {
        setLoading(false);
      }
    }

    fetchStory();
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
            <StoryContent story={story} loading={loading} />
            <Disclaimer />
            <ExportBar story={story} />
          </div>
        </div>
      </main>
    </div>
  );
}
