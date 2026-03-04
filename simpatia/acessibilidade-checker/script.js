document
  .getElementById("siteForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const url = document.getElementById("url").value;
    const resultadoContainer = document.getElementById("resultado-container");
    const analysisTextSection = document.getElementById(
      "analysis-text-section",
    );
    const screenshotSection = document.getElementById("screenshot-section");

    resultadoContainer.style.display = "grid";
    analysisTextSection.innerHTML = `<p>Analisando <strong>${url}</strong>... Isso pode levar alguns segundos.</p>`;
    screenshotSection.innerHTML = "";

    try {
      const response = await fetch("/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      // Correção: lê como texto primeiro para debugar antes de tentar parse
      const rawText = await response.text();
      console.log("Resposta bruta do backend:", rawText);

      if (!rawText || rawText.trim() === "") {
        throw new Error("O backend retornou uma resposta vazia.");
      }

      let data;
      try {
        data = JSON.parse(rawText);
      } catch (parseErr) {
        throw new Error(
          `Resposta inválida do backend: ${rawText.substring(0, 200)}`,
        );
      }

      if (!response.ok) {
        throw new Error(data.error || "Erro na requisição.");
      }

      // Correção: limpa markdown que o Gemini às vezes envolve no JSON
      let analysisText = data.analysis.trim();
      analysisText = analysisText
        .replace(/^```json\s*/i, "")
        .replace(/^```\s*/i, "")
        .replace(/\s*```$/i, "")
        .trim();

      console.log("Texto da análise limpo:", analysisText);

      let reportData;
      try {
        reportData = JSON.parse(analysisText);
      } catch (jsonErr) {
        throw new Error(
          `O Gemini retornou um JSON inválido: ${analysisText.substring(0, 200)}`,
        );
      }

      analysisTextSection.innerHTML = createReportHTML(reportData);

      screenshotSection.innerHTML = `
            <h3>Screenshot da Página:</h3>
            <img src="${data.screenshot_url}" alt="Screenshot de ${url}" style="max-width:100%; border-radius:8px;">
        `;
    } catch (err) {
      console.error("Erro no front-end:", err);
      analysisTextSection.innerHTML = `<p style="color:red;">Ocorreu um erro na análise: ${err.message}</p>`;
      screenshotSection.innerHTML = "";
    }
  });

function createReportHTML(reportData) {
  const { analiseGeral, violacoesIdentificadas } = reportData;

  let html = `
        <div class="geral-info">
            <h3>Análise Geral</h3>
            <p><strong>Nível de Conformidade Estimado:</strong> ${analiseGeral.nivelConformidadeEstimado}</p>
            <p><strong>Justificativa:</strong> ${analiseGeral.justificativa}</p>
            <p><strong>Comentários Gerais:</strong> ${analiseGeral.comentariosGerais}</p>
        </div>
    `;

  if (violacoesIdentificadas && violacoesIdentificadas.length > 0) {
    html += `<h3>Violações Identificadas (${violacoesIdentificadas.length})</h3>`;

    violacoesIdentificadas.forEach((violacao) => {
      html += `
                <div class="violation-card">
                    <h4>${violacao.criterioSucesso.nome} (Critério ${violacao.criterioSucesso.id} - Nível ${violacao.nivelConformidadeCriterio})</h4>
                    <p class="problema"><span class="label">Problema:</span> ${violacao.descricaoProblema}</p>
                    <div class="suggestion">
                        <p><span class="label">Sugestão:</span> ${violacao.sugestaoCorrecao}</p>
                    </div>
                    <p class="tipo-violacao">
                        <em>Violação ${
                          violacao.eProvavel === true ||
                          violacao.eProvavel === "true"
                            ? "Provável (Inferida)"
                            : "Visível Diretamente"
                        }</em>
                    </p>
                </div>
            `;
    });
  } else {
    html += `<h3>🎉 Nenhuma violação identificada!</h3>`;
  }

  return html;
}
