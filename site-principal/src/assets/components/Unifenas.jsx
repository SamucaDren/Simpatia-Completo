import ButtonConhecerModulos from "./ButtonConhecerModulos";
import EclipseGiratoria from "./EclipseGiratoria";
import "./Unifenas.css";

function Unifenas() {
  return (
    <section className="inteiro">
      <div className="fundo-unifenas">
        <div className="texto-unifenas">
          <h2>SOBRE</h2>
          <h3>
            Projeto desenvolvido por alunos da <strong>Unifenas</strong>
          </h3>
          <p>
            O SIMPATIA é um sistema desenvolvido por alunos do curso de Ciência
            da Computação da Unifenas, com o objetivo de integrar Inteligência
            Artificial às práticas pedagógicas. Nosso propósito é oferecer
            ferramentas que tornem o aprendizado mais dinâmico, inclusivo e
            eficaz
          </p>
          <div className="button-conhecer-mobile">
            <ButtonConhecerModulos
              texto="Conheça mais sobre o projeto"
              mostrarIcone={true}
            />
          </div>
        </div>
        <div className="imagem-unifenas">
          {/* <div className="eclipse-sobreposto">
            <EclipseGiratoria />
          </div> */}
          <img src="/fachadaunifenas.png" alt="Logo Unifenas" />
        </div>
      </div>
    </section>
  );
}

export default Unifenas;
