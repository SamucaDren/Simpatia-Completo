import { NextResponse } from "next/server";

// USANDO O ENDPOINT QUE VOCÊ DEFINIU.
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

interface IChatRequest {
  curso: string;
  materia: string;
  mensagem_usuario: string;
  nome: string;
  id: string;
}

export async function POST(request: Request ) {
	try {
		const { curso, materia, mensagem_usuario, nome }: IChatRequest = await request.json();

		if (!curso || !materia || !mensagem_usuario || !nome) {
			console.error("Missing required fields:", { curso, materia, mensagem_usuario, nome });
			return NextResponse.json({ error: "Campos obrigatórios ausentes na requisição" }, { status: 400 });
		}

		let prompt;

		if (mensagem_usuario === "First message") {
			prompt = `Você é um tutor de IA chamado 'Simpático', especialista em ${materia}.
			Sua tarefa é ajudar o aluno ${nome} na matéria de ${materia} do curso de ${curso}.
			Seja amigável, didático e incentive o aprendizado.
			Comece a conversa se apresentando de forma breve e perguntando ao aluno qual é sua primeira dúvida sobre ${materia}.
			Responda em Markdown.`;
		} else {
			prompt = `Você é um tutor de IA chamado 'Simpático', especialista em ${materia}.
			O aluno ${nome} está estudando ${materia} no curso de ${curso}.
			A dúvida/mensagem do aluno é: "${mensagem_usuario}"

			Responda à dúvida do aluno de forma clara, didática e amigável.
			Use exemplos quando apropriado e incentive o aluno a fazer mais perguntas.
			Mantenha a resposta concisa e focada na pergunta.
			Responda em Markdown.`;
		}

		if (!process.env.GEMINI_API_KEY) {
			console.error("GEMINI_API_KEY is not defined");
			return NextResponse.json({ error: "Configuração da API não encontrada" }, { status: 500 });
		}

		const apiUrl = `${GEMINI_API_URL}?key=${process.env.GEMINI_API_KEY}`;

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
					maxOutputTokens: 400,
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

		const responseText = data.candidates[0].content.parts[0].text;

		return new Response(responseText, {
			status: 200,
			headers: { 'Content-Type': 'text/plain' },
		});

	} catch (error) {
		console.error("Error in chat route:", error);
		return NextResponse.json(
			{
				error: "Erro ao processar a mensagem",
				details: error instanceof Error ? error.message : "Erro desconhecido",
			},
			{ status: 500 }
		);
	}
}
