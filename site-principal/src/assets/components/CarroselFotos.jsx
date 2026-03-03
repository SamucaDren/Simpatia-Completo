import React, { useState, useEffect, useRef } from "react";
import "./CarroselFotos.css";
import EclipseGiratoria from "./EclipseGiratoria";

function CarroselFotos({ onFotoChange }) {
  const [fotoVisivel, setFotoVisivel] = useState(1);
  const intervaloRef = useRef(null); // mantém referência do intervalo ativo

  // Função para alternar a foto automaticamente
  const mudarFoto = () => {
    setFotoVisivel((prevFoto) => (prevFoto === 1 ? 2 : 1));
  };

  // Função para resetar o temporizador
  const resetarIntervalo = () => {
    if (intervaloRef.current) clearInterval(intervaloRef.current);
    intervaloRef.current = setInterval(mudarFoto, 5000);
  };

  // Cria o intervalo inicial
  useEffect(() => {
    resetarIntervalo();
    return () => clearInterval(intervaloRef.current);
  }, []);

  // Quando o usuário clica manualmente, muda a foto e reseta o tempo
  const handleClick = (foto) => {
    setFotoVisivel(foto);
    resetarIntervalo(); // ← reinicia o ciclo ao clicar
  };

  // Sempre que a foto muda, avisa o Hero
  useEffect(() => {
    if (onFotoChange) onFotoChange(fotoVisivel);
  }, [fotoVisivel, onFotoChange]);

  return (
    <div className="fotos">
      <div className="fundo"></div>
      <div className={`foto1 ${fotoVisivel === 1 ? "visible" : ""}`}></div>
      <div className={`foto2 ${fotoVisivel === 2 ? "visible" : ""}`}></div>

      <div className="menu">
        <span
          onClick={() => handleClick(1)}
          className={`item-menu ${fotoVisivel === 1 ? "active" : ""}`}
        ></span>
        <span
          onClick={() => handleClick(2)}
          className={`item-menu ${fotoVisivel === 2 ? "active" : ""}`}
        ></span>
      </div>

      <div className="eclipse-container">
        <EclipseGiratoria />
      </div>
    </div>
  );
}

export default CarroselFotos;
