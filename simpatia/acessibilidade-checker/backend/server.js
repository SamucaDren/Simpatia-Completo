import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { Buffer } from 'buffer';
import puppeteer from 'puppeteer';

// Configuração do servidor Express
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

// Middleware para permitir requisições de outras origens e para processar JSON
app.use(cors());
app.use(express.json());

// Rota principal para servir o frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
});

// Rota para analisar a URL
app.post('/analyze', async (req, res) => {
    const { url } = req.body;

    // Garante que uma URL foi fornecida
    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    try {
        // Chave da API do Gemini
        const geminiApiKey = 'AIzaSyBRE42e2I4yX7EUEAXtJPw6_xAe7hXpY3o';

        // Passo 1: Obter um screenshot da página usando o Puppeteer
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'networkidle2' });

        const imageBuffer = await page.screenshot({ fullPage: true });
        const base64Image = imageBuffer.toString('base64');
        const mimeType = 'image/jpeg';
        
        await browser.close();

        const userQuery = `
            # INSTRUÇÃO MESTRA
            Atue como uma API de análise de acessibilidade digital, especializada em WCAG 2.2. Sua única fonte de informação é a imagem de uma interface web fornecida. Sua tarefa é retornar um relatório de acessibilidade em um único objeto JSON válido, seguindo as regras e a estrutura abaixo com máxima precisão.

            # REGRAS CRÍTICAS
            1.  **ANÁLISE ESTRITAMENTE VISUAL:** Sua avaliação deve ser baseada **100% e exclusivamente** nos elementos visuais presentes na imagem. É **PROIBIDO** fazer suposições sobre o código-fonte (HTML, CSS, ARIA), performance ou comportamento de leitores de tela.
            2.  **PRECISÃO ACIMA DE QUANTIDADE:** Seu objetivo principal é a precisão. Identifique apenas violações que são claramente visíveis ou altamente prováveis a partir do design. Se o design parecer bom e não houver violações claras, Não invente problemas.
            3.  **VIOLAÇÕES PROVÁVEIS:** Se uma violação é uma inferência lógica mas não 100% visível (ex: um ícone de busca sem texto visível *provavelmente* precisa de um texto alternativo), identifique-a, mas marque-a no JSON.
            4.  **SAÍDA JSON PURA E EXCLUSIVA:** A resposta deve ser **APENAS** o código JSON. Sua saída deve começar DIRETAMENTE com o caractere '{' e terminar DIRETAMENTE com o caractere '}'. Nenhum outro caractere, texto, explicação, ou formatação de markdown (como \`\`\`) é permitido antes do JSON de abertura ou depois do JSON de fechamento.

            # ESTRUTURA E EXEMPLO DE SAÍDA JSON
            Sua resposta DEVE seguir esta estrutura. 

            {
            "analiseGeral": {
                "nivelConformidadeEstimado": "<A, AA ou AAA>",
                "justificativa": "<Justificativa curta para o nível estimado>",
                "comentariosGerais": "<Um resumo em texto livre. Se não houver violações, USE ESTE CAMPO para elogiar as boas práticas observadas, como bom contraste, tipografia legível, etc.>"
            },
            "violacoesIdentificadas": [
                {
                "criterioSucesso": {
                    "id": "<String, ex: '1.4.3'>",
                    "nome": "<String, ex: 'Contraste (Mínimo)'>"
                },
                "nivelConformidadeCriterio": "<A, AA ou AAA>",
                "descricaoProblema": "<String descrevendo a violação>",
                "sugestaoCorrecao": "<String com a sugestão de correção>",
                "eProvavel": "<Boolean: 'true' se for uma inferência, 'false' se for diretamente visível>"
                }
            ]
            }
        `;

        // Passo 2: Chamar a API do Gemini para a análise de acessibilidade
        const geminiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${geminiApiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [
                        { text: userQuery },
                        { inlineData: { mimeType, data: base64Image } }
                    ]
                }]
            })
        });

        const geminiData = await geminiResponse.json();

        // Trata a resposta da API do Gemini
        if (!geminiResponse.ok) {
            console.error('Erro na API do Gemini:', geminiData);
            throw new Error(`Erro na API do Gemini: ${geminiData.error.message}`);
        }

        const analysisText = geminiData.candidates[0].content.parts[0].text;
        res.json({ analysis: analysisText, screenshot_url: `data:${mimeType};base64,${base64Image}` });

    } catch (error) {
        // Captura e responde a erros inesperados
        console.error('Erro no backend:', error);
        res.status(500).json({ error: `Ocorreu um erro no backend: ${error.message}` });
    }
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
