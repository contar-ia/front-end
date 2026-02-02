"use client";

import { useEffect, useState } from "react";

export function StoryContent({ story, loading }: { story: string; loading: boolean }) {
  const [typedStory, setTypedStory] = useState("");

  useEffect(() => {
    if (!loading && story) {
      setTypedStory("");

      let i = 0;
      const interval = setInterval(() => {
        setTypedStory(story.slice(0, i));
        i++;
        if (i > story.length) clearInterval(interval);
      }, 5);
      
      return () => clearInterval(interval);
    }
  }, [loading, story]);

  return (
    <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm min-h-[400px]">

      {loading ? (
        <div className="w-full flex flex-col items-center justify-center py-20">
          <div className="animate-spin w-12 h-12 rounded-full border-b-2 border-teal-500"></div>
          <p className="mt-4 text-slate-500 font-medium">Criando sua história mágica...</p>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <span className="text-teal-400 font-bold text-sm tracking-wide uppercase">Sua história está pronta!</span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-2 mb-4 leading-tight">
              História Gerada
            </h1>
          </div>

          <div className="prose prose-slate prose-lg max-w-none text-slate-600 leading-relaxed whitespace-pre-wrap">
            {typedStory}
          </div>
        </>
      )}

    </div>
  );
}
