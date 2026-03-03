import HeroAlt from "../components/HeroAlt.jsx";
import Faq from "../components/Faq.jsx";
import UnifenasAlt from "../components/UnifenasAlt.jsx";
import Atualizacoes from "../components/Atualizacoes.jsx";
function UpdatesPage() {
  const linhaDivisoria = {
    width: "100%",
    height: "0",
    margin: "64px 0",
    borderTop: "2px dashed var(--roxo-claro-03)",
  };

  return (
    <>
      <HeroAlt
        tagDeContexto="ATUALIZAÇÕES"
        tituloPrincipal={
          <>
            Conheça mais <br />
            <span className="texto_azul">sobre o Projeto</span>
          </>
        }
        subtitulo={
          <>
            Ferramentas criadas para apoiar alunos e professores <br />
            na sala de aula.
          </>
        }
      />
      <UnifenasAlt />
      <Atualizacoes />
      <div style={linhaDivisoria}></div>
      <Faq />
    </>
  );
}

export default UpdatesPage;
