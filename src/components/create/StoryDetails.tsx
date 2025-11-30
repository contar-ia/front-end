import { X } from "lucide-react";

interface StoryDetailsProps {
  characters: string[];
  setting: string;
  onSettingChange: (value: string) => void;
}

export function StoryDetails({ characters, setting, onSettingChange }: StoryDetailsProps) {
  return (
    <section className="space-y-6">
      <div>
        <label className="block text-lg font-bold mb-2">
          Quais são as personagens principais? <span className="text-slate-400 font-normal text-sm">ⓘ</span>
        </label>
        <div className="flex flex-wrap items-center gap-2 bg-white border border-slate-200 rounded-xl p-3 shadow-sm focus-within:ring-2 focus-within:ring-teal-400 transition-all">
          
          {characters.map((char, index) => (
            <span key={index} className="bg-teal-50 text-teal-700 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
              {char} <X size={14} className="cursor-pointer hover:text-teal-900" />
            </span>
          ))}

          <input
            type="text"
            placeholder="ex: Um robô curioso..."
            className="flex-grow outline-none bg-transparent text-slate-700 placeholder-slate-400 min-w-[150px]"
          />
        </div>
      </div>

      <div>
        <label className="block text-lg font-bold mb-2">
          Onde se passa a história? <span className="text-slate-400 font-normal text-sm">ⓘ</span>
        </label>
        <input
          type="text"
          value={setting}
          onChange={(e) => onSettingChange(e.target.value)}
          placeholder="ex: Uma floresta encantada, uma cidade futurista..."
          className="w-full bg-white border border-slate-200 rounded-xl p-4 shadow-sm outline-none focus:ring-2 focus:ring-teal-400 transition-all"
        />
      </div>
    </section>
  );
}