require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai"); 
const multer = require("multer");

const app = express();
const port = 3000;
const API_KEY = process.env.GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(API_KEY);

app.use(cors());
app.use(express.json());

// configurando o multer para guardar o arquivo na memória
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/corrigir', async (req, res) => {
    try {
        const { pergunta, resposta } = req.body;

        if (!pergunta || !resposta) {
            return res.status(400).json({ error: "A pergunta e a resposta são obrigatórias." });
        }

        const prompt = `Você é um assistente de professor avaliando uma questão.
        \n\n**Questão Original:** "${pergunta}"\n\n**Resposta do Aluno:** "${resposta}"
        \n\n**Sua tarefa é:**\n1. Avaliar o percentual de acerto da resposta do aluno.
        \n2. Listar os pontos fortes da resposta.
        \n3. Apontar os pontos fracos ou o que faltou para a resposta ser completa.\n\n**Análise:**`;
        
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        res.json({ correction: text });

    } catch (err) {
        console.error("ERRO DETALHADO NO SERVIDOR:", err);
        return res.status(500).json({ error: "Erro interno do servidor." });
    }
});

// rota para analisar a imagem enviada
app.post('/analisar-imagem', upload.single('imagem'), async (req, res) =>{
    try{
        if(!req.file){
            return res.status(400).json({error: "Nenhum imagem enviada"});
        }

        const arquivo = {
            inlineData: {
                data: req.file.buffer.toString('base64'),
                mimeType: req.file.mimetype,
            },
        };

       // O prompt que instrui a IA (inclusive sobre texto manuscrito)
        const prompt = `
            Você é um especialista em OCR (Reconhecimento Óptico de Caracteres).
            Analise a imagem em anexo (que pode ser uma foto de prova).
            O texto na imagem pode ser digitado ou MANUSCRITO. Transcreva ambos.
            
            Sua tarefa é identificar e extrair dois blocos de texto:
            1.  O texto da "Questão".
            2.  O texto da "Resposta" do aluno.
            
            Ignore qualquer outro texto (nome, data, etc).
            
            Retorne o resultado estritamente no seguinte formato JSON:
            {
              "pergunta": "O texto completo da pergunta que você transcreveu.",
              "resposta": "O texto completo da resposta do aluno que você transcreveu."
            }
        `;

        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const result = await model.generateContent([prompt, arquivo]);
        const response = await result.response;

        let jsonResponse = response.text()
        .replace(/```json/g, '')
        .replace(/```/g, '')
        .trim();

        const data = JSON.parse(jsonResponse);
        res.json(data);

    }catch(error){
        console.error("Erro ao analisar a imagem:", error);
        res.status(500).json({error: "Erro ao analisar a imagem."});
    }
})

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});