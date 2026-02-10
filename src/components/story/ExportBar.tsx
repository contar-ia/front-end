"use client";

import { FileText, Share2, FileType } from "lucide-react";
import { exportStoryAsPdf, exportStoryAsDocx } from "@/utils/exportStory";

interface ExportBarProps {
  story: string;
}

export function ExportBar({ story }: ExportBarProps) {
  return (
    <div className="mt-8 bg-slate-100 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
      <span className="font-bold text-slate-700 text-lg">
        Exportar e Compartilhar
      </span>

      <div className="flex gap-3">
        <button
          onClick={() => exportStoryAsPdf(story)}
          className="flex items-center gap-2 bg-white border px-4 py-2 rounded-lg font-semibold text-slate-600 hover:text-red-500 hover:border-red-200 transition-colors"
        >
          <FileType size={18} /> PDF
        </button>

        <button
          onClick={() => exportStoryAsDocx(story)}
          className="flex items-center gap-2 bg-white border px-4 py-2 rounded-lg font-semibold text-slate-600 hover:text-blue-500 hover:border-blue-200 transition-colors"
        >
          <FileText size={18} /> DOCX
        </button>

        <button className="flex items-center gap-2 bg-white border px-4 py-2 rounded-lg font-semibold text-teal-600 hover:bg-teal-50 hover:border-teal-200 transition-colors">
          <Share2 size={18} /> Compartilhar
        </button>
      </div>
    </div>
  );
}
