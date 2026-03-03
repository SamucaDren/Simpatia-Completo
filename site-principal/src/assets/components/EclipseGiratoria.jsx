import "./EclipseGiratoria.css";

function EclipseGiratoria() {
  const texto =
    "SISTEMA • DE • MÍDIAS • PEDAGÓGICAS • PARA • ATIVIDADES • COM • INTELIGÊNCIA • ARTIFICIAL •";

  return (
    <div className="eclipse">
      <div className="container-baixo"></div>

      <svg className="texto-circular-svg" viewBox="0 0 200 200">
        <path
          id="caminhoCircular"
          d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
          fill="none"
        />

        <text className="texto-svg">
          <textPath
            href="#caminhoCircular"
            startOffset="50%"
            text-anchor="middle"
          >
            {texto}
          </textPath>
        </text>
      </svg>

      <div className="logo-container">
        <img src="/unifenaslogo.svg" alt="Unifenas Logo" />
      </div>
    </div>
  );
}

export default EclipseGiratoria;
