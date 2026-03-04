# Acessibilidade Checker

Ferramenta de análise de acessibilidade que roda 100% no navegador, usando:

- **html2canvas** - Captura screenshots
- **axe-core** - Análise de acessibilidade
- **Gemini API** - Análise inteligente com IA
- **Netlify Functions** - Backend serverless seguro

## Como Funciona

1. Usuário entra com uma URL
2. Captura screenshot com `html2canvas`
3. Roda análise de acessibilidade local com `axe-core`
4. Envia screenshot + análise para **Netlify Function**
5. Function chama Gemini API (chave fica segura no servidor)
6. Retorna relatório formatado

## Deploy no Netlify

### 1. Adicione Variável de Ambiente

No dashboard do Netlify:

1. Vá para **Site Settings** → **Build & Deploy** → **Environment**
2. Clique em **Edit variables**
3. Adicione:
   - **Key**: `GEMINI_API_KEY`
   - **Value**: Sua chave do Gemini (obtenha em https://makersuite.google.com/app/apikey)

### 2. Deploy

```bash
git add .
git commit -m "Add accessibility checker with Netlify Functions"
git push origin main
```

Netlify vai detectar as mudanças automaticamente e fazer deploy!

### 3. Teste

Acesse: `https://seu-dominio.netlify.app/acessibilidade-checker/`

## Arquivo de Configuração

- `netlify.toml` - Configuração de build e funções
- `netlify/functions/analyze.js` - Função serverless para análise com IA

## Resposta da API

```json
{
  "analiseGeral": {
    "nivelConformidadeEstimado": "AA",
    "justificativa": "...",
    "comentariosGerais": "..."
  },
  "violacoesIdentificadas": [...]
}
```

## Segurança

✅ **API Key protegida**: A chave do Gemini fica segura na Netlify Function