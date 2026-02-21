import React, { useState } from "react";
import { getShoppingAdvice } from "../service/aiShopperService.ts";
import type { Product } from "../types/types.ts";

interface AIShopperProps {
  products: Product[];
  onRecommendationClick: (ids: string[]) => void;
}

export const AIShopper: React.FC<AIShopperProps> = ({
  products,
  onRecommendationClick,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [history, setHistory] = useState<
    { role: "user" | "ai"; text: string; ids?: string[] }[]
  >([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!prompt.trim()) return;

    const userText = prompt;
    setPrompt("");
    setHistory((prev) => [...prev, { role: "user", text: userText }]);
    setLoading(true);

    try {
      const result = await getShoppingAdvice(userText, products);
      setHistory((prev) => [
        ...prev,
        {
          role: "ai",
          text: result.suggestion,
          ids: result.recommendedProductIds,
        },
      ]);
    } catch (err) {
      console.log("err", err);
      setHistory((prev) => [
        ...prev,
        {
          role: "ai",
          text: "Desculpe, nosso sistema de inteligência técnica está temporariamente fora do ar. Tente novamente em alguns minutos.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-10 right-10 z-40 bg-brand-gold text-brand-bg p-5 rounded-full shadow-[0_0_30px_rgba(198,167,94,0.3)] hover:scale-110 transition-all flex items-center justify-center border border-brand-bg"
      >
        <i className="fa-solid fa-wand-magic-sparkles text-xl"></i>
      </button>

      {/* Sidebar / Modal */}
      {isOpen && (
        <div className="fixed bottom-28 right-10 z-50 w-[340px] md:w-[420px] bg-brand-bg border border-brand-muted shadow-2xl flex flex-col rounded-sm overflow-hidden animate-in slide-in-from-bottom-5 duration-500">
          <div className="bg-brand-bg border-b border-brand-muted p-5 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-brand-gold rounded-full animate-pulse"></div>
              <span className="font-bold text-[10px] tracking-[0.3em] uppercase text-brand-gold">
                Concierge Técnico ARC
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-500 hover:text-brand-gold transition-colors"
            >
              <i className="fa-solid fa-xmark text-lg"></i>
            </button>
          </div>

          <div className="h-96 overflow-y-auto p-6 space-y-6 text-[12px] bg-brand-bg flex flex-col hide-scrollbar">
            {history.length === 0 && (
              <div className="text-slate-500 dark:text-slate-600 text-center py-16 flex flex-col items-center">
                <i className="fa-solid fa-microchip mb-4 text-brand-muted text-4xl opacity-20"></i>
                <p className="italic font-light leading-relaxed">
                  "Procuro um Daytona Panda da CLEAN Factory"
                  <br />
                  ou "Qual a diferença entre EW e VSF?"
                </p>
              </div>
            )}
            {history.map((msg, i) => (
              <div
                key={i}
                className={`${msg.role === "user" ? "self-end bg-brand-muted text-slate-900 dark:text-white" : "self-start bg-brand-bg border border-brand-muted text-slate-700 dark:text-slate-300"} max-w-[85%] p-4 rounded-sm shadow-sm animate-in fade-in duration-300`}
              >
                <p className="leading-relaxed font-light">{msg.text}</p>
                {msg.ids && msg.ids.length > 0 && (
                  <button
                    onClick={() => onRecommendationClick(msg.ids!)}
                    className="mt-4 text-[9px] font-bold uppercase tracking-[0.2em] text-brand-gold hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-2"
                  >
                    Ver Seleção Técnica ({msg.ids.length}){" "}
                    <i className="fa-solid fa-arrow-right"></i>
                  </button>
                )}
              </div>
            ))}
            {loading && (
              <div className="self-start bg-brand-muted/20 p-4 rounded-sm flex space-x-2">
                <div className="w-1.5 h-1.5 bg-brand-gold rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-brand-gold rounded-full animate-bounce delay-100"></div>
                <div className="w-1.5 h-1.5 bg-brand-gold rounded-full animate-bounce delay-200"></div>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-brand-muted flex items-center space-x-4 bg-brand-bg">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") void handleSend();
              }}
              placeholder="CONSULTAR ESPECIALISTA..."
              className="flex-1 text-[11px] bg-transparent border-none focus:ring-0 text-slate-900 dark:text-white placeholder-slate-500 uppercase tracking-widest"
            />
            <button
              onClick={() => void handleSend()}
              className="text-brand-gold hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <i className="fa-solid fa-paper-plane text-lg"></i>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AIShopper;
