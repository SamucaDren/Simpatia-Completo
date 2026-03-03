import { useState, useEffect } from "react";
import CardModulo from "./CardModulo";
import ButtonConhecerModulos from "./ButtonConhecerModulos";
import "./Descubra.css";
import MODULOS_DATA from "../../data/modulosData";

function Descubra() {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("Aluno");
  const [cardAtualIndex, setCardAtualIndex] = useState(0); // Novo estado
  const [cardsAleatorios, setCardsAleatorios] = useState([]); // Novo estado para os cards aleatórios
  const [isButtonClick, setIsButtonClick] = useState(false);

  const handleButtonClick = (buttonType) => {
    if (buttonType === "esquerda") {
      setIsButtonClick(true);
    } else if (buttonType === "direita") {
      setIsButtonClick(false);
    }
  };

  const modulosAlunos = MODULOS_DATA.aluno;
  const modulosProfessores = MODULOS_DATA.professor;

  const listaModulosCompleta =
    categoriaSelecionada === "Aluno" ? modulosAlunos : modulosProfessores;

  useEffect(() => {
    // Função para embaralhar
    const shuffleArray = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };

    const listaCompleta =
      categoriaSelecionada === "Aluno" ? modulosAlunos : modulosProfessores;
    setCardsAleatorios(shuffleArray([...listaCompleta]).slice(0, 3));
    setCardAtualIndex(0);
  }, [categoriaSelecionada]);

  const handleProximoCard = () => {
    setCardAtualIndex((prevIndex) => (prevIndex + 1) % modulosExibidos.length);
  };

  const handleCardAnterior = () => {
    setCardAtualIndex(
      (prevIndex) =>
        (prevIndex - 1 + modulosExibidos.length) % modulosExibidos.length
    );
  };

  const modulosExibidos = cardsAleatorios;

  return (
    <div className="container-pagina">
      <div className="conteudo-textual">
        <h2>DESCUBRA</h2>
        <h3>Conheça todos os módulos</h3>
        <p>
          Explore as ferramentas criadas para facilitar o dia a dia de
          professores e tornar o aprendizado dos alunos mais envolvente.
        </p>
      </div>
      <div className="mudavel-lateral">
        <div className="botoes-flex">
          <button
            className={categoriaSelecionada === "Professor" ? "ativo" : ""}
            onClick={() => setCategoriaSelecionada("Professor")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="21"
              height="25"
              viewBox="0 0 21 25"
              fill="none"
            >
                           {" "}
              <path d="M19.8644 0.194702H3.94496C2.95153 0.194702 1.99878 0.589341 1.29632 1.2918C0.593858 1.99427 0.199219 2.94701 0.199219 3.94044V23.6056C0.199219 23.8539 0.297879 24.0921 0.473494 24.2677C0.64911 24.4434 0.887296 24.542 1.13565 24.542H17.9915C18.2398 24.542 18.478 24.4434 18.6536 24.2677C18.8293 24.0921 18.9279 23.8539 18.9279 23.6056C18.9279 23.3572 18.8293 23.119 18.6536 22.9434C18.478 22.7678 18.2398 22.6691 17.9915 22.6691H2.07209C2.07209 22.1724 2.26941 21.6961 2.62064 21.3448C2.97187 20.9936 3.44824 20.7963 3.94496 20.7963H19.8644C20.1127 20.7963 20.3509 20.6976 20.5265 20.522C20.7021 20.3464 20.8008 20.1082 20.8008 19.8598V1.13114C20.8008 0.882779 20.7021 0.644593 20.5265 0.468978C20.3509 0.293362 20.1127 0.194702 19.8644 0.194702ZM18.9279 18.9234H3.94496C3.28728 18.9225 2.6411 19.0958 2.07209 19.4256V3.94044C2.07209 3.44373 2.26941 2.96735 2.62064 2.61612C2.97187 2.26489 3.44824 2.06757 3.94496 2.06757H18.9279V18.9234Z" />
                         {" "}
            </svg>
            Professores
          </button>
          <button
            className={categoriaSelecionada === "Aluno" ? "ativo" : ""}
            onClick={() => setCategoriaSelecionada("Aluno")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="25"
              viewBox="0 0 28 25"
              fill="none"
            >
              <path d="M27.449 7.25444L14.4088 0.299636C14.283 0.232661 14.1427 0.197632 14.0002 0.197632C13.8577 0.197632 13.7173 0.232661 13.5916 0.299636L0.551304 7.25444C0.412213 7.32857 0.29589 7.43911 0.214779 7.57425C0.133668 7.70939 0.0908203 7.86403 0.0908203 8.02164C0.0908203 8.17925 0.133668 8.3339 0.214779 8.46904C0.29589 8.60417 0.412213 8.71472 0.551304 8.78884L3.56795 10.3982V15.66C3.56705 16.087 3.72421 16.4992 4.00915 16.8173C5.43271 18.4028 8.62214 21.0619 14.0002 21.0619C15.7834 21.0766 17.5532 20.7536 19.2163 20.11V23.67C19.2163 23.9005 19.3079 24.1216 19.4709 24.2847C19.6339 24.4477 19.855 24.5393 20.0856 24.5393C20.3162 24.5393 20.5373 24.4477 20.7003 24.2847C20.8634 24.1216 20.955 23.9005 20.955 23.67V19.27C22.0886 18.6155 23.113 17.788 23.9912 16.8173C24.2761 16.4992 24.4333 16.087 24.4324 15.66V10.3982L27.449 8.78884C27.5881 8.71472 27.7044 8.60417 27.7855 8.46904C27.8666 8.3339 27.9095 8.17925 27.9095 8.02164C27.9095 7.86403 27.8666 7.70939 27.7855 7.57425C27.7044 7.43911 27.5881 7.32857 27.449 7.25444ZM14.0002 19.3232C9.29806 19.3232 6.53244 17.0259 5.30665 15.66V11.3252L13.5916 15.7436C13.7173 15.8106 13.8577 15.8457 14.0002 15.8457C14.1427 15.8457 14.283 15.8106 14.4088 15.7436L19.2163 13.1802V18.2159C17.847 18.8548 16.1214 19.3232 14.0002 19.3232ZM22.6937 15.6556C22.1725 16.2339 21.5895 16.7532 20.955 17.2042V12.2521L22.6937 11.3252V15.6556ZM20.5203 10.5145L20.4964 10.5004L14.4109 7.25444C14.2079 7.15074 13.9722 7.13094 13.7548 7.19931C13.5373 7.26769 13.3553 7.41876 13.2482 7.61999C13.141 7.82122 13.1172 8.05649 13.1818 8.27512C13.2464 8.49375 13.3944 8.67824 13.5937 8.78884L18.6729 11.499L14.0002 13.9908L2.80727 8.02164L14.0002 2.05246L25.193 8.02164L20.5203 10.5145Z" />
            </svg>
            Alunos
          </button>
        </div>
        <div className="container-card">
          <div className="container-card-desktop">
            {cardsAleatorios.map((modulo, index) => (
              <CardModulo
                key={index}
                nome={modulo.titulo}
                descricao={modulo.descricao}
                link={modulo.link}
              />
            ))}
          </div>
          <div className="container-card-mobile">
            <CardModulo
              key={cardAtualIndex}
              nome={listaModulosCompleta[cardAtualIndex].titulo}
              descricao={listaModulosCompleta[cardAtualIndex].descricao}
            />
          </div>
        </div>
        <div className={`botao-passar`}>
          <button
            className={`botao-passar ${isButtonClick ? "ativo" : ""}`}
            onClick={() => {
              handleProximoCard();
              handleButtonClick("esquerda");
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="16"
              viewBox="0 0 36 16"
              fill="none"
            >
              <path d="M34.25 8.87939C34.8023 8.87939 35.25 8.43168 35.25 7.87939C35.25 7.32711 34.8023 6.87939 34.25 6.87939L34.25 7.87939L34.25 8.87939ZM0.542893 7.17228C0.15237 7.56281 0.15237 8.19597 0.542892 8.5865L6.90685 14.9505C7.29738 15.341 7.93054 15.341 8.32107 14.9505C8.71159 14.5599 8.71159 13.9268 8.32107 13.5362L2.66421 7.87939L8.32107 2.22254C8.71159 1.83201 8.71159 1.19885 8.32107 0.808324C7.93054 0.4178 7.29738 0.4178 6.90686 0.808324L0.542893 7.17228ZM34.25 7.87939L34.25 6.87939L1.25 6.87939L1.25 7.87939L1.25 8.87939L34.25 8.87939L34.25 7.87939Z" />
            </svg>
          </button>
          <button
            className={`botao-passar ${!isButtonClick ? "ativo" : ""}`}
            onClick={() => {
              handleProximoCard();
              handleButtonClick("direita");
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="16"
              viewBox="0 0 36 16"
              fill="none"
            >
              <path d="M1.75 8.87939C1.19772 8.87939 0.75 8.43168 0.75 7.87939C0.75 7.32711 1.19772 6.87939 1.75 6.87939L1.75 7.87939L1.75 8.87939ZM35.4571 7.17228C35.8476 7.56281 35.8476 8.19597 35.4571 8.5865L29.0931 14.9505C28.7026 15.341 28.0695 15.341 27.6789 14.9505C27.2884 14.5599 27.2884 13.9268 27.6789 13.5362L33.3358 7.87939L27.6789 2.22254C27.2884 1.83201 27.2884 1.19885 27.6789 0.808324C28.0695 0.4178 28.7026 0.4178 29.0931 0.808324L35.4571 7.17228ZM1.75 7.87939L1.75 6.87939L34.75 6.87939L34.75 7.87939L34.75 8.87939L1.75 8.87939L1.75 7.87939Z" />
            </svg>
          </button>
        </div>
      </div>
      <ButtonConhecerModulos texto="Ver todos os módulos" mostrarIcone={true} />
    </div>
  );
}

export default Descubra;
