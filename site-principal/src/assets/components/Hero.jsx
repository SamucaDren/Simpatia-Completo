import NavBar from "./Nav";
import ButtonConhecerModulos from "./ButtonConhecerModulos";
import "./Hero.css";
import ButtonUnifenas from "./ButtonUnifenas";
import CarroselFotos from "./CarroselFotos";
import React, { useState, useEffect } from "react";

function Hero() {
  const palavras = ["aprender", "ensinar"];
  const [fotoAtual, setFotoAtual] = useState(1);

  // Estado que vai conter o texto que aparece letra por letra
  const [textoDigitado, setTextoDigitado] = useState("");

  // Quando o CarrosselFotos mudar a foto, atualizamos o texto
  const handleFotoChange = (novaFoto) => {
    setFotoAtual(novaFoto);
  };

  // Máquina de escrever
  useEffect(() => {
    const palavra = palavras[fotoAtual - 1];
    let index = 0;
    setTextoDigitado(""); // reseta o texto

    const intervalo = setInterval(() => {
      setTextoDigitado((prev) => prev + palavra[index]);
      index++;
      if (index >= palavra.length) {
        clearInterval(intervalo); // quando terminar, limpa o intervalo
      }
    }, 150); // velocidade da digitação (ms por letra)

    return () => clearInterval(intervalo); // limpa caso o efeito seja reiniciado
  }, [fotoAtual]);

  return (
    <section className="fundo-hero">
      <NavBar />
      <div className="secao-hero">
        <div className="hero-container">
          <h1>
            Uma nova forma de{" "}
            <span className="texto_azul">{textoDigitado}</span> com <br></br>o
            poder da IA
          </h1>
          <p>
            Ferramentas criadas para apoiar alunos e professores <br />
            na sala de aula.
          </p>
          <div className="botoes">
            <ButtonConhecerModulos
              texto="Quero conhecer os módulos!"
              mostrarIcone={false}
            />
            <ButtonUnifenas />
          </div>
        </div>
        <div class="hero-container-foto">
          <CarroselFotos onFotoChange={handleFotoChange} />
        </div>
      </div>
    </section>
  );
}

export default Hero;
