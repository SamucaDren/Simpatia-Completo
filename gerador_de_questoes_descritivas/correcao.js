document.addEventListener('DOMContentLoaded', () => {
    const submitButton = document.getElementById('submitQuestion');
    const inputQuestion = document.getElementById('inputQuestion');
    const resultArea = document.getElementById('result');
    const perguntaTextarea = document.getElementById('pergunta');
    const respostaAlunoTextarea = document.getElementById('respostaAluno');

    async function getAIResponse(pergunta, resposta) {
        try {
            const response = await fetch('http://localhost:3000/corrigir', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    pergunta: pergunta,
                    resposta: resposta 
                })
            });

            if (!response.ok) {
                throw new Error('Erro na requisição ao servidor');
            }

            const data = await response.json();
            return data.correction;
        } catch (error) {
            console.error('Error fetching AI response:', error);
            return 'Erro ao obter resposta. Verifique se o servidor está rodando.';
        }
    }

    async function handleQuestionSubmit() {
        const pergunta = perguntaTextarea.value;
        let resposta = respostaAlunoTextarea.value;
        const gabarito = document.getElementById('gabarito').value;

         // Adiciona o gabarito ao prompt, se fornecido
        if (gabarito.trim() !== "") {
            resposta += `\n\nGabarito / Palavras-chaves esperadas: ${gabarito}`;
        }
        
        if (pergunta.trim() !== "" && resposta.trim() !== "") {
            resultArea.value = 'Carregando...';
            const response = await getAIResponse(pergunta, resposta);
            resultArea.value = response;
        } else {
            resultArea.value = 'Por favor, preencha tanto a questão quanto a resposta do aluno.';
        }
    }

    submitButton.addEventListener('click', handleQuestionSubmit);
});