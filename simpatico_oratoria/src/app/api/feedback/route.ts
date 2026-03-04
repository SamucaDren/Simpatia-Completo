import { NextResponse } from "next/server";

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

export async function POST(request: Request) {
	try {
		const { messages, theme, difficulty } = await request.json();

		// Validate required fields
		if (!messages || !theme || !difficulty) {
			console.error("Missing required fields:", { messages, theme, difficulty });
			return NextResponse.json({ error: "Todos os campos são obrigatórios" }, { status: 400 });
		}

		const prompt = `Analise o seguinte debate sobre "${theme}" e forneça um feedback detalhado sobre as habilidades de argumentação do participante.
		Considere o nível de dificuldade ${difficulty === "easy" ? "fácil" : difficulty === "medium" ? "médio" : "difícil"}.

		Mensagens do participante:
		${messages}

		Forneça um feedback estruturado com:
		1. Pontos fortes (3-4 pontos)
		2. Pontos a melhorar (3-4 pontos)
		3. Uma avaliação geral

		Formate a resposta como um objeto JSON com as seguintes chaves:
		{
			"strengths": ["ponto forte 1", "ponto forte 2", ...],
			"improvements": ["ponto a melhorar 1", "ponto a melhorar 2", ...],
			"overall": "avaliação geral em 2-3 frases"
		}

		Seja construtivo e específico no feedback, focando em aspectos como:
		- Clareza dos argumentos
		- Uso de evidências
		- Estrutura lógica
		- Respeito ao tema
		- Capacidade de contra-argumentação
		- Uso da linguagem`;

		// Check if API key is available
		if (!process.env.GEMINI_API_KEY) {
			console.error("GEMINI_API_KEY is not defined");
			return NextResponse.json({ error: "Configuração da API não encontrada" }, { status: 500 });
		}

		console.log("Sending request to Gemini API for feedback...");
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
					maxOutputTokens: 1024, // Permitindo um pouco mais de tokens para o feedback
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
			throw new Error(`Erro na API Gemini: ${response.status} ${response.statusText}`);
		}

		const data = await response.json();

		if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
			console.error("Invalid response format:", data);
			throw new Error("Formato de resposta inválido da API");
		}

		const feedbackText = data.candidates[0].content.parts[0].text;
		console.log("Successfully received feedback from Gemini API");

		// Extrair o objeto JSON da resposta
		const jsonMatch = feedbackText.match(/\{[\s\S]*\}/);
		if (!jsonMatch) {
			console.error("Invalid JSON format in response:", feedbackText);
			throw new Error("Formato de resposta inválido");
		}

		const feedback = JSON.parse(jsonMatch[0]);

		return NextResponse.json(feedback);
	} catch (error) {
		console.error("Error generating feedback:", error);
		return NextResponse.json(
			{
				strengths: ["Não foi possível gerar feedback neste momento."],
				improvements: ["Por favor, tente novamente mais tarde."],
				overall: "Ocorreu um erro ao gerar o feedback.",
			},
			{ status: 500 }
		);
	}
}
