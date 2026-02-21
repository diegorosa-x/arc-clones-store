import { supabase } from "../lib/ClonesDatabase/client";
import type { Product, AIResponse } from "../types/types";

const FALLBACK: AIResponse = {
  suggestion: "Desculpe, tive um problema ao processar seu pedido.",
  recommendedProductIds: [],
};

export async function getShoppingAdvice(
  userPrompt: string,
  products: Product[],
): Promise<AIResponse> {
  const response = await supabase.functions.invoke("ai-shopper", {
    body: { userPrompt, products },
  });

  if (response.error) {
    console.error("Erro na Edge Function:", response.error);
    return FALLBACK;
  }

  const data = response.data as AIResponse | null;

  return data ?? FALLBACK;
}
