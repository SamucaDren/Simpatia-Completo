// script.js

document.getElementById("siteForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const url = document.getElementById("url").value;
    const resultadoContainer = document.getElementById("resultado-container");
    const analysisTextSection = document.getElementById("analysis-text-section");
    const screenshotSection = document.getElementById("screenshot-section");
    
    // Mostra o contêiner e a mensagem de "analisando"
    resultadoContainer.style.display = 'grid'; // Usamos grid para o layout
    analysisTextSection.innerHTML = `<p>Analisando <strong>${url}</strong>... Isso pode levar alguns segundos.</p>`;
    screenshotSection.innerHTML = ''; // Limpa a imagem antiga

    try {
        const response = await fetch('http://localhost:3000/analyze', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url: url })
        });

        const data = await response.json();

        if (response.ok) {
            // **A MÁGICA ACONTECE AQUI**
            // 1. Pegamos o TEXTO da análise.
            // 2. Usamos JSON.parse() para transformar o TEXTO em um OBJETO que o JavaScript entende.
            const reportData = JSON.parse(data.analysis);

            // 3. Usamos o objeto para criar o HTML bonito com uma função auxiliar.
            analysisTextSection.innerHTML = createReportHTML(reportData);

            // 4. Exibimos o screenshot.
            screenshotSection.innerHTML = `
                <h3>Screenshot da Página:</h3>
                <img src="${data.screenshot_url}" alt="Screenshot de ${url}">
            `;
        } else {
            throw new Error(data.error || 'Erro na requisição.');
        }

    } catch (err) {
        console.error("Erro no front-end:", err);
        analysisTextSection.innerHTML = `<p style="color:red;">Ocorreu um erro na análise: ${err.message}</p>`;
        screenshotSection.innerHTML = '';
    }
});

/**
 * Cria o HTML do relatório a partir do objeto de dados da análise.
 * @param {object} reportData - O objeto JavaScript contendo a análise.
 * @returns {string} - A string HTML formatada.
 */
function createReportHTML(reportData) {
    const { analiseGeral, violacoesIdentificadas } = reportData;

    // Cria a seção de Análise Geral
    let html = `
        <div class="geral-info">
            <h3>Análise Geral</h3>
            <p><strong>Nível de Conformidade Estimado:</strong> ${analiseGeral.nivelConformidadeEstimado}</p>
            <p><strong>Justificativa:</strong> ${analiseGeral.justificativa}</p>
            <p><strong>Comentários Gerais:</strong> ${analiseGeral.comentariosGerais}</p>
        </div>
    `;

    // Cria os cards para cada violação
    if (violacoesIdentificadas && violacoesIdentificadas.length > 0) {
        html += `<h3>Violações Identificadas (${violacoesIdentificadas.length})</h3>`;
        
        violacoesIdentificadas.forEach(violacao => {
            html += `
                <div class="violation-card">
                    <h4>${violacao.criterioSucesso.nome} (Critério ${violacao.criterioSucesso.id} - Nível ${violacao.nivelConformidadeCriterio})</h4>
                    <p class="problema"><span class="label">Problema:</span> ${violacao.descricaoProblema}</p>
                    <div class="suggestion">
                        <p><span class="label">Sugestão:</span> ${violacao.sugestaoCorrecao}</p>
                    </div>
                    <p class="tipo-violacao"><em>Violação ${violacao.eProvavel ? 'Provável (Inferida)' : 'Visível Diretamente'}</em></p>
                </div>
            `;
        });
    } else {
        html += `<h3>🎉 Nenhuma violação identificada!</h3>`;
    }

    return html;
}