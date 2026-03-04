let notificationTimeout;

function mostrarNotificacao(mensagem) {

    // 1. Encontra o elemento da notificação no HTML
    const popup = document.getElementById('notificacao-popup');
    
    // Se o elemento não existir, não faz nada
    if (!popup) {
        console.error("Elemento de notificação não encontrado.");
        return;
    }

    // Limpa qualquer timer anterior para resetar a animação de saída
    clearTimeout(notificationTimeout);

    // 2. Define a mensagem e mostra o pop-up
    popup.textContent = mensagem;
    popup.classList.add('show');

    // 3. Define um timer para esconder o pop-up depois de 3 segundos
    notificationTimeout = setTimeout(() => {
        popup.classList.remove('show');
    }, 3000); // 3000 milissegundos = 3 segundos
}

document.addEventListener('DOMContentLoaded', function() {
    const gerarPromptBtn = document.getElementById('gerarPrompt');
    const inputQuestion = document.getElementById('inputQuestion');
    const perguntaTextarea = document.getElementById('pergunta');
    const respostaAlunoTextarea = document.getElementById('respostaAluno');

    gerarPromptBtn.addEventListener('click', function() {
        const pergunta = perguntaTextarea.value;
        let resposta = respostaAlunoTextarea.value;
        const gabarito = document.getElementById('gabarito').value;

         // Adiciona o gabarito ao prompt, se fornecido
        if (gabarito.trim() !== "") {
            resposta += `\n\nGabarito / Palavras-chaves esperadas: ${gabarito}`;
        }

         // Validação simples para garantir que os campos não estão vazios

        if (pergunta.trim() === "" || resposta.trim() === "") {
            alert('Por favor, preencha tanto a questão quanto a resposta do aluno.');
            return;
        }

        const prompt = `Considere a seguinte questão: ${pergunta}. 
        Verifique o percentual de acerto da seguinte resposta: ${resposta}
        , e explique o motivo da porcentagem e coloque referências bibliográficas.`;

        inputQuestion.value = prompt;

        mostrarNotificacao(' Prompt gerado com sucesso!', 'success');
    });
});