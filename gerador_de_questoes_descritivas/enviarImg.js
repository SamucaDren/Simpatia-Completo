document.addEventListener("DOMContentLoaded", function(){

    const uploadImg = document.querySelector('.uploadImg');
    const questaoImg = document.querySelector('.questaoImg'); 
    
    if (uploadImg && questaoImg) {
        uploadImg.addEventListener('click', function() {
            questaoImg.click();
        });
    } else {
        console.error("enviarImg.js: ERRO - Elemento .uploadImg ou .questaoImg não encontrado!"); // ERRO A
    }
    
    if(questaoImg){
        questaoImg.addEventListener("change", function(event){
            
            const file = event.target.files[0];

            if(file){
                enviarImgParaAnalise(file);
            } else {
                console.warn("enviarImg.js: Evento 'change' disparado, mas nenhum arquivo encontrado."); // AVISO B
            }
        });
    } else {
         console.error("enviarImg.js: ERRO - Elemento .questaoImg não encontrado para adicionar listener de 'change'!"); // ERRO C
    }
});

async function enviarImgParaAnalise(file){

    const pergunta = document.getElementById('pergunta');
    const resposta = document.getElementById("respostaAluno"); 
    const respostaIA = document.getElementById('result');

    // Validação extra: verificar se os textareas existem
    if (!pergunta || !resposta || !respostaIA) {
        console.error("enviarImg.js: ERRO - Textarea 'pergunta', 'respostaAluno' ou 'result' não encontrado!"); // ERRO D
        return; 
    }

    const formData = new FormData();
    formData.append("imagem", file);

    // Feedback visual (se a função existir)
    if (typeof mostrarNotificacao === 'function') {
        mostrarNotificacao('Analisando imagem...');
    }
    respostaIA.value = "Lendo imagem, por favor aguarde...";

    try{
        const response = await fetch("http://localhost:3000/analisar-imagem", {
            method: "POST",
            body: formData,
        });

        if(!response.ok){
             console.error("Respeosta do servidor NÃO OK:", response.status, response.statusText); // ERRO E
            throw new Error("Erro na resposta do servidor");
        }

        const data = await response.json();
        pergunta.value = data.pergunta || "Não foi possível extrair a pergunta.";
        resposta.value = data.resposta || "Não foi possível extrair a resposta.";

        if (typeof mostrarNotificacao === 'function') {
            mostrarNotificacao('Texto extraído! Revise e clique em "Gerar Correção".');
        }

    } catch(error){
        // ERRO F - Erro durante o fetch ou processamento da resposta
        console.error("Erro DENTRO de enviarImgParaAnalise:", error); 
        if (typeof mostrarNotificacao === 'function') {
            mostrarNotificacao('Erro ao ler a imagem.');
        }
    }
}