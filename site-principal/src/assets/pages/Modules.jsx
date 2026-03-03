import React, { useState, useMemo, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import CardModulos from "../components/CardModulo";
import Unifenas from "../components/Unifenas";
import HeroAlt from "../components/HeroAlt";
import "./Modules.css";

function Ferramentas({ todosModulos }) {
  const { tipo } = useParams();
  const tipoModulo = tipo || "professor";

  const listaModulos = todosModulos[tipoModulo] || [];
  const tituloExibicao = tipoModulo === "professor" ? "Professores" : "Alunos";
  const verboExibicao = tipoModulo === "professor" ? "ensino" : "aprendizado";

  const [paginaAtual, setPaginaAtual] = useState(1);
  const [ordenacao, setOrdenacao] = useState("asc");
  const MODULOS_POR_PAGINA = 9;

  const refTopo = useRef(null);

  useEffect(() => {
    if (refTopo.current) {
      refTopo.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [paginaAtual, ordenacao]);

  const modulosOrdenados = useMemo(() => {
    return [...listaModulos].sort((a, b) => {
      if (!a || !a.titulo) return 1;
      if (!b || !b.titulo) return -1;

      const nomeA = a.titulo.toUpperCase();
      const nomeB = b.titulo.toUpperCase();

      if (ordenacao === "asc") {
        if (nomeA < nomeB) return -1;
        if (nomeA > nomeB) return 1;
        return 0;
      } else {
        if (nomeA > nomeB) return -1;
        if (nomeA < nomeB) return 1;
        return 0;
      }
    });
  }, [listaModulos, ordenacao]);

  const totalPaginas = Math.ceil(modulosOrdenados.length / MODULOS_POR_PAGINA);
  const indiceInicial = (paginaAtual - 1) * MODULOS_POR_PAGINA;
  const indiceFinal = indiceInicial + MODULOS_POR_PAGINA;
  const modulosExibidos = modulosOrdenados.slice(indiceInicial, indiceFinal);

  const alternarOrdenacao = () => {
    setOrdenacao((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  return (
    <main className="ferramentas-page-container">
      <HeroAlt
        tagDeContexto="MÓDULOS DE IA"
        tituloPrincipal={
          <>
            Ferramentas de IA para <br />
            <span className="texto_azul">{tituloExibicao}</span>
          </>
        }
        subtitulo={
          <>
            Explore os módulos disponíveis e utilize as ferramentas que tornam
            seu {verboExibicao} mais dinâmico e eficiente.
          </>
        }
      />
      <div ref={refTopo}></div>
      <div className="modulos-container">
        <div className="cabecalho">
          <p>{listaModulos.length} módulos</p>
          <button
            onClick={alternarOrdenacao}
            className="btn-ordenar"
            title={`Ordenar por: ${ordenacao === "asc" ? "(Z-A)" : "(A-Z)"}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="13"
              viewBox="0 0 12 13"
              fill="none"
            >
              <path
                d="M3 12.3535C2.66863 12.3535 2.4 12.0849 2.4 11.7535V2.64852L1.27502 3.7735C1.04245 4.00607 0.6659 4.00773 0.431283 3.77723C0.193712 3.54383 0.19202 3.1615 0.427517 2.926L3 0.353516L5.57248 2.926C5.80798 3.1615 5.80629 3.54383 5.56872 3.77723C5.3341 4.00773 4.95755 4.00607 4.72498 3.7735L3.6 2.64852V11.7535C3.6 12.0849 3.33137 12.3535 3 12.3535ZM9 12.3535L6.42752 9.78103C6.19202 9.54554 6.19371 9.1632 6.43128 8.9298C6.6659 8.6993 7.04245 8.70096 7.27502 8.93353L8.4 10.0585V0.953517C8.4 0.622146 8.66863 0.353516 9 0.353516C9.33137 0.353516 9.6 0.622145 9.6 0.953516V10.0585L10.725 8.93353C10.9576 8.70096 11.3341 8.6993 11.5687 8.9298C11.8063 9.1632 11.808 9.54554 11.5725 9.78103L9 12.3535Z"
                fill="#ADADCC"
                stroke="#ADADCC"
                stroke-width="0.5"
              />
            </svg>
            Ordenar por: ({ordenacao === "asc" ? "A-Z" : "Z-A"})
          </button>
        </div>

        <div className="cards-grid">
          {modulosExibidos.length > 0 ? (
            modulosExibidos.map((modulo, index) => (
              <CardModulos
                key={modulo.id || index}
                nome={modulo.titulo}
                descricao={modulo.descricao}
                link={modulo.link}
              />
            ))
          ) : (
            <p>Nenhum módulo encontrado para {tituloExibicao}.</p>
          )}
        </div>

        {totalPaginas > 1 && (
          <div className="paginacao-controls">
            <span>
              Página {paginaAtual} de {totalPaginas}
            </span>
            <button
              onClick={() => setPaginaAtual((prev) => Math.max(1, prev - 1))}
              disabled={paginaAtual === 1}
            >
              &lt;
            </button>
            {Array.from({ length: totalPaginas }, (_, i) => i + 1).map(
              (numero) => (
                <button
                  key={numero}
                  onClick={() => setPaginaAtual(numero)}
                  className={numero === paginaAtual ? "active" : ""}
                >
                  {numero}
                </button>
              )
            )}
            <button
              onClick={() =>
                setPaginaAtual((prev) => Math.min(totalPaginas, prev + 1))
              }
              disabled={paginaAtual === totalPaginas}
            >
              &gt;
            </button>
          </div>
        )}
      </div>
      <Unifenas />
    </main>
  );
}

export default Ferramentas;
