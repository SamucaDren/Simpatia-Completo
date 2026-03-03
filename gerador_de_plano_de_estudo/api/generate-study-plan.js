// api/generate-study-plan.js
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    // no Vercel, precisa usar await req.json()
    const { discipline, dailyHours, knowledgeLevel, studyGoal, daysAvailable, totalHoursAvailable } = await req.json();

    const prompt = `
      Monte um plano de estudo detalhado para a disciplina "${discipline}".
      Nível de conhecimento: ${knowledgeLevel}.
      Objetivo do estudo: ${studyGoal}.
      Horas disponíveis por dia: ${dailyHours}.
      Dias disponíveis: ${daysAvailable}.
      Total de horas disponíveis: ${totalHoursAvailable}.
      Formate a resposta em JSON puro, com a estrutura:
      {
        "discipline": "...",
        "plan": [
          { "day": 1, "tasks": ["..."] },
          { "day": 2, "tasks": ["..."] }
        ]
      }
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini", // pode trocar para "gpt-4" se tiver acesso
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 1000,
    });

    let content = response.choices[0].message.content || "";
    content = content.replace(/```json|```/g, "").trim();

    let plan;
    try {
      plan = JSON.parse(content);
    } catch {
      plan = { raw: content }; // fallback para não quebrar
    }

    return res.status(200).json(plan);
  } catch (error) {
    console.error("Erro na API:", error);
    return res.status(500).json({ error: "Erro ao gerar plano de estudo" });
  }
}
