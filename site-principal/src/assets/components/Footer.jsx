import "./Footer.css";
import ButtonUnifenas from "./ButtonUnifenas";
import ButtonConhecerModulos from "./ButtonConhecerModulos";
import MODULOS_DATA from "../../data/modulosData";

function Footer() {
  const modulosAlunos = MODULOS_DATA.aluno.slice(0, 4);
  const modulosProfessores = MODULOS_DATA.professor.slice(0, 3);

  return (
    <footer className="footer-container">
      <div className="footer-content">
        {/* Divisão Esquerda */}
        <div className="footer-left">
          <img
            src="/logosimpatia.svg"
            alt="Logo Simpatia"
            className="footer-logo-simpatia"
          />
          <div className="footer-text-box">
            <p>
              O SIMPATIA foi desenvolvido por alunos da Unifenas a fim de
              auxiliar discentes e docentes com ferramentas de Inteligência
              Artificial.
            </p>
          </div>
          <ButtonConhecerModulos
            texto="Quero conhecer os módulos!"
            mostrarIcone={true}
          />
        </div>

        {/* Divisão Meio/Direita */}
        <div className="footer-right">
          {/* Divisão de cima */}
          <div className="footer-right-top">
            {/* Coluna 1 (links) */}
            <div className="footer-column">
              <h3>Para Professores</h3>
              <ul>
                {modulosProfessores.map((item, index) => (
                  <li key={index}>
                    <a href={item.link}>{item.titulo}</a>
                  </li>
                ))}
              </ul>
            </div>
            {/* Coluna 2 (links) */}
            <div className="footer-column">
              <h3>Para Alunos</h3>
              <ul>
                {modulosAlunos.map((item, index) => (
                  <li key={index}>
                    <a href={item.link}>{item.titulo}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* Divisão de baixo */}
          <div className="footer-right-bottom">
            <a href="/about" className="footer-text-know-more">
              Conheça mais sobre o projeto
            </a>
            <ButtonUnifenas />
          </div>
        </div>
      </div>

      <div className="footer-divider"></div>
      <div className="footer-final-division">
        <span className="atex-info">ATEX - © 2025 SIMPATIA</span>
        <span className="system-info">-</span>
        <span className="system-info">
          Sistema de Mídias Pedagógicas para Atividades com Inteligência
          Artificial
        </span>
      </div>
    </footer>
  );
}

export default Footer;
