"use client";

import React from "react";
import { Navbar } from "@/components/Navbar"; 
import { StorySidebar } from "@/components/story/StorySidebar";
import { StoryContent } from "@/components/story/StoryContent";
import { ExportBar } from "@/components/story/ExportBar";

export default function StoryPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-800">
      
      <Navbar />

      <main className="flex-grow w-full max-w-7xl mx-auto p-6 md:p-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-3 lg:sticky lg:top-24">
            <StorySidebar />
          </div>

          <div className="lg:col-span-9">
            <StoryContent />
            <ExportBar />
          </div>

        </div>
      </main>
    </div>
  );
}