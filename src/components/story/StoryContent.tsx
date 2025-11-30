import { Edit3, Eye } from "lucide-react";

export function StoryContent() {
  return (
    <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
      
      <div className="mb-6">
        <span className="text-teal-400 font-bold text-sm tracking-wide uppercase">A sua história mágica está pronta!</span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-2 mb-4 leading-tight">
          O Cavaleiro e a Bolota Sussurrante
        </h1>
        
        <div className="flex gap-2">
          <button className="p-2 bg-slate-100 rounded-lg text-slate-500 hover:bg-teal-50 hover:text-teal-500 transition-colors">
            <Edit3 size={20} />
          </button>
          <button className="p-2 bg-slate-100 rounded-lg text-slate-500 hover:bg-teal-50 hover:text-teal-500 transition-colors">
            <Eye size={20} />
          </button>
        </div>
      </div>

      <div className="w-full aspect-video rounded-2xl bg-slate-800 mb-8 overflow-hidden relative group">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-700 via-slate-800 to-black opacity-80" />
        <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl">🌲🏰🐿️</span>
        </div>
      </div>

      <div className="prose prose-slate prose-lg max-w-none text-slate-600 leading-relaxed">
        <p>
          Era uma vez, num reino vasto cercado por bosques sussurrantes, vivia um cavaleiro corajoso chamado Sir Gideon. 
          Ele não era conhecido por matar dragões, mas pela sua honestidade inabalável. O seu companheiro era Squeaky, 
          um esquilo que, graças ao feitiço de um mago desastrado, conseguia falar — e raramente se calava.
        </p>
        <p>
          Numa manhã ensolarada, a joia mais preciosa do Rei, a Estrela da Valentia, desapareceu. O Rei, em pânico, 
          declarou que quem a encontrasse seria recompensado com um baú de ouro. Todos os cavaleiros do reino partiram, 
          gabando-se de como encontrariam a joia.
        </p>
        <p>
          Sir Gideon e Squeaky começaram a sua busca nos jardins do palácio. Squeaky, com os seus olhos atentos, 
          avistou um rasto de pó brilhante que levava até ao Bosque dos Sussurros. “Por aqui, Gideon! A aventura chama, 
          e também bolotas potenciais!” tagarelou ele.
        </p>
        <p>
          No fundo do bosque, encontraram um texugo rabugento chamado Boris, que tinha a Estrela da Valentia. 
          Ela estava presa na sua garra favorita de escavar. “Eu não a roubei!” resmungou Boris. “Ela apenas... apareceu.” 
          Sir Gideon, vendo a verdade nos olhos do texugo, acreditou nele. Em vez de lutar, ofereceu ajuda.
        </p>
      </div>

    </div>
  );
}