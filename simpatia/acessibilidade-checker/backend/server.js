import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import puppeteer from "puppeteer";
import { GEMINI_API_KEY } from "./config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

app.use(cors());
// Correção: aumenta o limite para suportar respostas grandes
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(express.static(path.join(__dirname, "..")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "index.html"));
});

app.post("/analyze", async (req, res) => {
  console.log("Requisição recebida:", req.body);
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  let browser;
  try {
    const geminiApiKey = GEMINI_API_KEY;

    browser = await puppeteer.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
      ],
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    await page.goto(url, { waitUntil: "networkidle2", timeout: 30000 });

    // Correção: JPEG com quality 60 — muito menor que PNG, suficiente para análise visual
    const imageBuffer = await page.screenshot({
      fullPage: true,
      type: "jpeg",
      quality: 60,
    });
    const base64Image = imageBuffer.toString("base64");
    const mimeType = "image/jpeg";

    await browser.close();
    browser = null;

    const userQuery = `
            # INSTRUÇÃO MESTRA
            Atue como uma API de análise de acessibilidade digital, especializada em WCAG 2.2. Sua única fonte de informação é a imagem de uma interface web fornecida. Sua tarefa é retornar um relatório de acessibilidade em um único objeto JSON válido, seguindo as regras e a estrutura abaixo com máxima precisão.

            # REGRAS CRÍTICAS
            1.  **ANÁLISE ESTRITAMENTE VISUAL:** Sua avaliação deve ser baseada **100% e exclusivamente** nos elementos visuais presentes na imagem.
            2.  **PRECISÃO ACIMA DE QUANTIDADE:** Identifique apenas violações claramente visíveis ou altamente prováveis a partir do design.
            3.  **VIOLAÇÕES PROVÁVEIS:** Se uma violação é uma inferência lógica, identifique-a e marque-a no JSON.
            4.  **SAÍDA JSON PURA E EXCLUSIVA:** A resposta deve ser APENAS o código JSON, começando com '{' e terminando com '}'.

            # ESTRUTURA DE SAÍDA JSON
            {
            "analiseGeral": {
                "nivelConformidadeEstimado": "<A, AA ou AAA>",
                "justificativa": "<Justificativa curta para o nível estimado>",
                "comentariosGerais": "<Resumo em texto livre>"
            },
            "violacoesIdentificadas": [
                {
                "criterioSucesso": {
                    "id": "<ex: '1.4.3'>",
                    "nome": "<ex: 'Contraste (Mínimo)'>"
                },
                "nivelConformidadeCriterio": "<A, AA ou AAA>",
                "descricaoProblema": "<Descrição da violação>",
                "sugestaoCorrecao": "<Sugestão de correção>",
                "eProvavel": "<true se for inferência, false se diretamente visível>"
                }
            ]
            }
        `;

    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${geminiApiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: userQuery },
                { inlineData: { mimeType, data: base64Image } },
              ],
            },
          ],
        }),
      },
    );

    const geminiData = await geminiResponse.json();

    if (!geminiResponse.ok) {
      console.error("Erro na API do Gemini:", geminiData);
      throw new Error(
        `Erro na API do Gemini: ${geminiData.error?.message || "Erro desconhecido"}`,
      );
    }

    // Adicione estes logs:
    console.log("Status Gemini:", geminiResponse.status);
    console.log("Candidates:", JSON.stringify(geminiData.candidates, null, 2));
    console.log(
      "Analysis text:",
      geminiData.candidates?.[0]?.content?.parts?.[0]?.text,
    );

    console.log("=== RESPOSTA COMPLETA DO GEMINI ===");
    console.log(JSON.stringify(geminiData, null, 2));
    console.log("=== FIM DA RESPOSTA ===");

    const analysisText = geminiData.candidates[0].content.parts[0].text;
  } catch (error) {
    if (browser) await browser.close();
    console.error("Erro no backend:", error);
    res
      .status(500)
      .json({ error: `Ocorreu um erro no backend: ${error.message}` });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
