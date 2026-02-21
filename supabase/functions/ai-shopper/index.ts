type AIResponse = {
  suggestion: string;
  recommendedProductIds: string[];
};

const GROQ_API_KEY = Deno.env.get("GROQ_API_KEY");

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      // CORS básico (para dev). Em produção, restrinja origem.
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":
        "authorization, x-client-info, apikey, content-type",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
    },
  });
}

Deno.serve(async (req) => {
  // Preflight CORS
  if (req.method === "OPTIONS") return json({ ok: true }, 200);

  try {
    if (req.method !== "POST") {
      return json({ error: "Method not allowed" }, 405);
    }

    if (!GROQ_API_KEY) {
      return json({ error: "Missing GROQ_API_KEY" }, 500);
    }

    const { userPrompt, products } = (await req.json()) as {
      userPrompt?: string;
      products?: unknown;
    };

    if (!userPrompt || typeof userPrompt !== "string") {
      return json({ error: "userPrompt is required" }, 400);
    }

    const system = `
Você é um concierge técnico especializado em clones de luxo para a ARC Clones.
NUNCA use termos como "Réplica", "Premium" ou "Primeira Linha". Use apenas "Clone" ou "Super Clone".
Responda SOMENTE em JSON no formato:
{ "suggestion": string, "recommendedProductIds": string[] }
`;

    const groqRes = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          temperature: 0.4,
          response_format: { type: "json_object" },
          messages: [
            { role: "system", content: system },
            {
              role: "user",
              content: `User query: ${userPrompt}\n\nCatálogo:\n${JSON.stringify(
                products ?? []
              )}`,
            },
          ],
        }),
      }
    );

    if (!groqRes.ok) {
      const details = await groqRes.text();
      return json({ error: "Groq error", details }, 500);
    }

    const data = await groqRes.json();
    const content: string = data?.choices?.[0]?.message?.content ?? "{}";

    let parsed: AIResponse;
    try {
      parsed = JSON.parse(content) as AIResponse;
    } catch {
      parsed = { suggestion: "Não conseguimos processar agora.", recommendedProductIds: [] };
    }

    if (
      !parsed ||
      typeof parsed.suggestion !== "string" ||
      !Array.isArray(parsed.recommendedProductIds)
    ) {
      parsed = { suggestion: "Não conseguimos processar agora.", recommendedProductIds: [] };
    }

    return json(parsed, 200);
  } catch (e) {
    return json(
      {
        suggestion: "Não conseguimos processar agora.",
        recommendedProductIds: [],
        error: String(e),
      },
      200
    );
  }
});
