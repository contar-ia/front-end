  "use client";

  import React, { useEffect, useState } from "react";
  import { Navbar } from "@/components/Navbar"; 
  import { StorySidebar } from "@/components/story/StorySidebar";
  import { StoryContent } from "@/components/story/StoryContent";
  import { ExportBar } from "@/components/story/ExportBar";
  import { useStory } from "@/contexts/StoryContext";

  export default function StoryPage() {
  const { story: storyData } = useStory();

  const [story, setStory] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      async function fetchStory() {
        const prompt = sessionStorage.getItem("pending_prompt");

        if (!prompt) {
          setStory("Nenhum prompt encontrado.");
          setLoading(false);
          return;
        }

        const res = await fetch("http://localhost:8000/llm/generate/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt })
        });

        const data = await res.json();

        const text = data.answer || data.response || data.story || "";

        setStory(text);
        setLoading(false);
      }

      fetchStory();
    }, []);

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
              <ExportBar story={story}/>
            </div>

          </div>
        </main>
      </div>
    );
  }