import { NextResponse } from "next/server";

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

type Difficulty = "easy" | "medium" | "hard";

export async function POST(request: Request) {
	try {
		const { theme, difficulty } = await request.json();

		const difficultyContext = {
			easy: "O cenário deve ser simples e direto, adequado para iniciantes no debate.",
			medium: "O cenário deve apresentar um desafio moderado, com elementos que exijam uma análise mais profunda.",
			hard: "O cenário deve ser complexo e desafiador, com múltiplas camadas de análise e possíveis interpretações.",
		}[difficulty as Difficulty];

		const prompt = `Crie um cenário de debate universitário sobre o tema "${theme}".

Nível de dificuldade: ${difficulty === "easy" ? "Fácil" : difficulty === "medium" ? "Médio" : "Difícil"}
${difficultyContext}

O cenário deve ser:
- Direto e claro
- Apropriado para estudantes universitários
- Focado em um caso específico ou situação concreta
- Formulado como uma pergunta ou situação que exija posicionamento

Formate a resposta como uma única pergunta ou situação, sem explicações adicionais.`;

		const response = await fetch(`${GEMINI_API_URL}?key=${process.env.GEMINI_API_KEY}`, {
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
			}),
		});

		const data = await response.json();

		if (!response.ok) {
			throw new Error(data.error?.message || "Erro ao gerar contexto");
		}

		const context = data.candidates[0].content.parts[0].text;

		return NextResponse.json({ context });
	} catch (error) {
		console.error("Error:", error);
		return NextResponse.json({ error: "Erro ao gerar o contexto do debate" }, { status: 500 });
	}
}
