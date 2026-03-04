import axios from "axios";

export async function ChatMensagem(pergunta, specialties) {
  try {

    const data = `${JSON.stringify(
      pergunta
    )} - RESPONDA SEMPRE MINHA ÚLTIMA PERGUNTA, PORÉM LEVE EM CONTA TODAS AS OUTRAS PERGUNTAS E RESPOSTA QUE EXISTEM NA LISTA. VOCÊ DEVE SER UM AGENTE DE IA TREINADO EM ${specialties}, NÃO PODE SAIR DO SEU TEMA. É EXTREMAMENTE PROIBIDO VOCÊ DAR A RESPOSTA PARA O ALUNO, VOCÊ DEVE EXPLICAR COMO O ALUNO CHEGA NO SEU OBJETIVO, SEJA CORTEZ.`;

    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent",
      {
        contents: [
          {
            role: "user",
            parts: [{ text: data }],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": process.env.REACT_APP_GEMINI_API_KEY,
        },
      }
    );

    if (
      !response.data ||
      !response.data.candidates?.[0]?.content?.parts?.[0]?.text
    ) {
      throw new Error("Resposta inválida da API Gemini");
    }

    const respostaTexto = response.data.candidates[0].content.parts[0].text;

    return respostaTexto;
  } catch (erro) {
    console.error("Erro ao consultar Gemini:", erro);
    return "Houve um erro ao consultar a IA. Tente novamente em instantes.";
  }
}
