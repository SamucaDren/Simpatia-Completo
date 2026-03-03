import './UnifenasAlt.css'

function UnifenasAlt() {
  return (
    <section className="inteiro">
      <div className="fundo-unifenas-alt">
        <div className="texto-unifenas-alt">
          <div className="frame-tag-alt">
            <h2 className="tag-sobre-alt">SOBRE</h2>
          </div>
          <h3 className="titulo-unifenas-page-alt">
              Projeto desenvolvido por alunos da 
              <span className="unifenas-bold-alt"> Unifenas</span>
          </h3>
          <p className="texto-descricao-page-alt">
              O SIMPATIA é um sistema desenvolvido por alunos do curso de Ciência da Computação da Unifenas, com o objetivo de integrar Inteligência Artificial às práticas pedagógicas. Nosso propósito é oferecer ferramentas que tornem o aprendizado mais dinâmico, inclusivo e eficaz
          </p>
        </div>
        <div className="imagem-unifenas-alt">
          <img 
            src="/fachadaunifenas.png" 
            alt="Fachada Unifenas" 
            className="img-unifenas-page-alt"
          />
        </div>
      </div>
    </section>
  );
}

export default UnifenasAlt