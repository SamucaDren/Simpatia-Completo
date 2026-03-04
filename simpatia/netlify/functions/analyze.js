export default async (req, context) => {
  // Apenas aceitar POST
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const { screenshotBase64, url, violacoes } = await req.json();

    if (!screenshotBase64 || !url) {
      return new Response(
        JSON.stringify({ error: "Screenshot e URL são obrigatórios" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

    if (!GEMINI_API_KEY) {
      console.error("GEMINI_API_KEY não configurada nas variáveis de ambiente");
      return new Response(
        JSON.stringify({ error: "Chave Gemini não configurada no servidor" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const userQuery = `
# ANÁLISE DE ACESSIBILIDADE DIGITAL

Analise a imagem fornecida considerando:
1. Violações detectadas: ${violacoes || "Nenhuma detectada por axe-core (URL externa)"}
2. URL de origem: ${url}

Também realize análise visual buscando:
- Problemas de contraste
- Tamanho das fontes
- Estrutura de hierarquia
- Navegação por teclado (se possível identificar)
- Problemas de cores

Retorne APENAS um JSON válido (sem markdown) com a estrutura:
{
  "analiseGeral": {
    "nivelConformidadeEstimado": "<A, AA ou AAA>",
    "justificativa": "<Breve explicação>",
    "comentariosGerais": "<Resumo geral>"
  },
  "violacoesIdentificadas": [
    {
      "criterioSucesso": {
        "id": "<ex: 1.4.3>",
        "nome": "<ex: Contraste (Mínimo)>"
      },
      "nivelConformidadeCriterio": "<A, AA ou AAA>",
      "descricaoProblema": "<Descrição>",
      "sugestaoCorrecao": "<Sugestão>",
      "eProvavel": true
    }
  ]
}`;

    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: userQuery },
                {
                  inlineData: {
                    mimeType: "image/jpeg",
                    data: screenshotBase64,
                  },
                },
              ],
            },
          ],
        }),
      }
    );

    if (!geminiResponse.ok) {
      const errorData = await geminiResponse.json();
      return new Response(
        JSON.stringify({
          error: `Erro Gemini: ${errorData.error?.message || "Desconhecido"}`,
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const geminiData = await geminiResponse.json();
    const analysisText = geminiData.candidates[0].content.parts[0].text;

    // Parsear resposta JSON
    let reportData;
    try {
      reportData = JSON.parse(analysisText);
    } catch (jsonErr) {
      return new Response(
        JSON.stringify({
          error: `Resposta do Gemini inválida: ${analysisText.substring(0, 100)}`,
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(JSON.stringify(reportData), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Erro na function:", error);
    return new Response(
      JSON.stringify({ error: `Erro interno do servidor: ${error.message}` }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
