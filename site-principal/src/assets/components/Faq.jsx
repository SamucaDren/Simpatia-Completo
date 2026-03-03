import Acordion from "./Acordion";
import "./Faq.css";

function ServicosPage() {
  return (
    <div className="container-pagina">
      <div className="conteudo-textual">
        <h2>PERGUNTAS FREQUENTES</h2>
        <h3>Possui alguma dúvida?</h3>
        <p>
          Aqui estão algumas das perguntas mais comuns que recebemos sobre
          nossos serviços. Se você não encontrar a resposta que procura, não
          hesite em nos contatar.
        </p>
      </div>

      <div className="lista-acordeoes">
        <Acordion pergunta="O que é o SIMPATIA?">
          É um sistema de mídias pedagógicas com ferramentas de Inteligência
          Artificial para apoiar professores e alunos em atividades
          educacionais.
        </Acordion>
        <Acordion pergunta="Quem pode usar o SIMPATIA?">
          Tanto professores quanto alunos podem se beneficiar do SIMPATIA. Cada
          um com acessos aos módulos e funcionalidades específicas para suas
          necessidades.
        </Acordion>
        <Acordion pergunta="Quais são os principais módulos disponíveis?">
          Gerador de Plano de Aula. Gerador de Questões. Agente de conversa por
          disciplina. Outras ferramentas educacionais baseadas em IA.
        </Acordion>
        <Acordion pergunta="Quem desenvolveu o SIMPATIA?">
          O Simpatia está sendo desenvolvido por uma equipe de estudantes da
          Unifenas, sob a orientação do professor Dr. Celso de Avila Ramos. A
          cada ano novos alunos se juntam ao projeto para contribuir com seu
          desenvolvimento.
        </Acordion>
        <Acordion pergunta="As respostas do agente de IA são confiáveis?">
          De forma geral, sim. O agente utiliza modelos avançados de IA para
          fornecer respostas precisas. No entanto, recomendamos que os usuários
          verifiquem as informações críticas para garantir sua exatidão.
        </Acordion>
      </div>
    </div>
  );
}

export default ServicosPage;
