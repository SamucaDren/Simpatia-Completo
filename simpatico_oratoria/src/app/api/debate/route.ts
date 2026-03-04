// src/app/api/debate/route.ts
export const dynamic = "force-static";
import { NextResponse } from "next/server";

// Atualizando para o modelo Gemini 2.0 Flash
const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

type Difficulty = "easy" | "medium" | "hard";

export async function POST(request: Request) {
  try {
    const { topic, context, difficulty, argument } = await request.json();

    // Validate required fields
    if (!topic || !context || !difficulty || !argument) {
      console.error("Missing required fields:", {
        topic,
        context,
        difficulty,
        argument,
      });
      return NextResponse.json(
        { error: "Todos os campos são obrigatórios" },
        { status: 400 },
      );
    }

    // Validate difficulty
    if (!["easy", "medium", "hard"].includes(difficulty)) {
      console.error("Invalid difficulty:", difficulty);
      return NextResponse.json(
        { error: "Nível de dificuldade inválido" },
        { status: 400 },
      );
    }

    const difficultyContext: Record<Difficulty, string> = {
      easy: "Seja gentil mas instigante. Faça perguntas que levem o participante a refletir mais profundamente sobre seu argumento.",
      medium:
        "Seja mais desafiador. Questione os pontos fracos do argumento e exija justificativas mais sólidas.",
      hard: "Seja rigoroso e exigente. Apresente contra-argumentos fortes e exija evidências concretas para cada afirmação.",
    };

    const prompt = `Você é um debatedor experiente em um debate sobre "${topic}".
		Contexto do debate: ${context}
		Nível de dificuldade: ${difficultyContext[difficulty as Difficulty]}

		Argumento do participante: ${argument}

		IMPORTANTE: Sua resposta deve ter NO MÁXIMO DOIS PARÁGRAFOS.

		No primeiro parágrafo:
		- Apresente um contraponto forte ao argumento do participante
		- Questione pontos específicos que precisam de mais fundamentação

		No segundo parágrafo:
		- Exija evidências para afirmações feitas
		- Instigue o participante a pensar mais profundamente sobre suas posições

		Seja direto e assertivo, mas mantenha o respeito. O objetivo é fazer o participante refletir e melhorar seus argumentos.`;

    // Check if API key is available
    if (!process.env.GEMINI_API_KEY) {
      console.error("GEMINI_API_KEY is not defined");
      return NextResponse.json(
        { error: "Configuração da API não encontrada" },
        { status: 500 },
      );
    }

    console.log("Sending request to Gemini API...");
    const apiUrl = `${GEMINI_API_URL}?key=${process.env.GEMINI_API_KEY}`;
    console.log("API URL:", apiUrl);

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 300, // Limitando o tamanho da resposta
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error("Gemini API error:", {
        status: response.status,
        statusText: response.statusText,
        error: errorData,
        url: apiUrl,
      });
      throw new Error(
        `Erro na API Gemini: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();

    if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
      console.error("Invalid response format:", data);
      throw new Error("Formato de resposta inválido da API");
    }

    const responseText = data.candidates[0].content.parts[0].text;
    console.log("Successfully received response from Gemini API");

    return NextResponse.json({ response: responseText });
  } catch (error) {
    console.error("Error in debate route:", error);
    return NextResponse.json(
      {
        error: "Erro ao processar o debate",
        details: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 500 },
    );
  }
}
