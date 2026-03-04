// API Key não é mais necessária aqui (fica segura na Netlify Function)

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
      // 1. Capturar screenshot usando html2canvas
      console.log("1. Capturando screenshot da URL...");
      const canvas = await html2canvas(document.querySelector("iframe") || document.body, {
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
      });
      const screenshotBase64 = canvas.toDataURL("image/jpeg", 0.8).split(",")[1];

      // 2. Rodar análise de acessibilidade com axe-core
      console.log("2. Rodando análise de acessibilidade...");
      let axeResults = { violations: [] };
      try {
        axeResults = await axe.run();
      } catch (err) {
        console.warn("Axe-core não conseguiu analisar URL externa (CORS):", err);
        // Se a URL for externa, vamos tentar sem axe-core
      }

      // 3. Chamar Netlify Function (API key fica segura no servidor)
      console.log("3. Enviando para Netlify Function...");

      const violacoes = axeResults.violations
        .map(
          (v) =>
            `- ${v.id}: ${v.description} (${v.impact}) - ${v.nodes.length} elementos`
        )
        .join("\n");

      // 4. Chamar API da função
      const functionResponse = await fetch("/.netlify/functions/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          screenshotBase64,
          url,
          violacoes:
            violacoes ||
            "Nenhuma detectada por axe-core (URL externa ou CORS bloqueado)",
        }),
      });

      if (!functionResponse.ok) {
        const errorData = await functionResponse.json();
        throw new Error(
          `Erro: ${errorData.error || "Erro ao chamar a função de análise"}`
        );
      }

      const reportData = await functionResponse.json();

      // 6. Exibir resultados
      analysisTextSection.innerHTML = createReportHTML(reportData);
      screenshotSection.innerHTML = `
        <h3>Screenshot da Página:</h3>
        <img src="data:image/jpeg;base64,${screenshotBase64}" alt="Screenshot de ${url}" style="max-width:100%; border-radius:8px;">
      `;
    } catch (err) {
      console.error("Erro:", err);
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
