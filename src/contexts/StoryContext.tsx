"use client";

import { createContext, useContext, useState } from "react";

interface StoryData {
  theme: string;
  ageGroup: number;
  value: string;
  setting: string;
  characters: string[];
}

interface StoryContextType {
  story: StoryData;
  setStory: (data: Partial<StoryData>) => void;
}

const StoryContext = createContext<StoryContextType | null>(null);

export function StoryProvider({ children }: { children: React.ReactNode }) {
  const [story, setStoryState] = useState<StoryData>({
    theme: "",
    ageGroup: 0,
    value: "",
    setting: "",
    characters: []
  });

  function setStory(data: Partial<StoryData>) {
    setStoryState(prev => ({ ...prev, ...data }));
  }

  return (
    <StoryContext.Provider value={{ story, setStory }}>
      {children}
    </StoryContext.Provider>
  );
}

export function useStory() {
  const ctx = useContext(StoryContext);
  if (!ctx) throw new Error("useStory must be used inside StoryProvider");
  return ctx;
}
