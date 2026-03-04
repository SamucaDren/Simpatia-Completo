# simpatia
Correção de Questões Descritivas

Este projeto é parte da SIMPATIA, uma plataforma web da UNIFENAS.
Na parte em trabalhamos o professor pode enviar uma imagem ou escrever a pergunta diretamente, e a aplicação envia esses dados ao backend, que processa a requisição usando a API Gemini.
O objetivo é oferecer uma solução simples, rápida e acessível para apoiar estudantes e professores.

Tecnologias Utilizadas
Frontend

HTML5

CSS3

JavaScript

Integração com backend via Fetch API

Backend

Node.js

Express

Integração com a API Gemini através de chave privada no .env

Instalação do Projeto
Pré-requisitos

Node.js instalado

NPM (ou Yarn)

Navegador moderno

Passo a Passo

Clone o repositório:

https://github.com/LucasSO-one/simpatia.git

Instale as dependências:

npm install


Crie um arquivo .env na raiz do projeto.

Dentro dele coloque sua chave da API Gemini:

GEMINI_API_KEY=SUA_CHAVE_AQUI


O arquivo .env.example existe apenas como modelo.
Quem baixar o projeto deve copiar ele, renomear para .env e colocar a própria chave.

Sobre o .env e Segurança

Por segurança, nenhum arquivo que contenha chaves sensíveis deve ser versionado, caso versionado, a chave é bloqueada pela própria Gemini.

Por isso o .gitignore contém:

.env
.env.local
.env.development
.env.production


Assim, apenas o arquivo .env.example é enviado para o GitHub.
Ele mostra o formato esperado, mas não expõe nenhuma chave real.

Exemplo do conteúdo:

GEMINI_API_KEY=INSIRA SUA CHAVE DA API AQUI

Como Rodar o Projeto
Backend

Após configurar o .env, use:

/simpatia/api > node server.js

O backend iniciará e ficará responsável por receber os dados e fazer a chamada para a API Gemini.

Frontend

O frontend está na pasta pública, basta utilizar o Live Server

Funcionalidades

Enviar imagem da questão

Enviar texto escrito pelo usuário

Processamento da imagem/texto no backend

Comunicação com o modelo Gemini para análise

Retorno formatado da resposta

Interface simples, elegante
