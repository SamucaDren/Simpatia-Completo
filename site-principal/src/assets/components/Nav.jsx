import React, { useState, useEffect } from "react";
import ButtonUnifenas from "../components/ButtonUnifenas";
import "./Nav.css";
import NavModulos from "./NavModulos";

function NavBar() {
  // ESTADOS

  const [isMenuOpen, setIsMenuOpen] = useState(false); // Controla se o menu principal (mobile) está aberto
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false); // Controla se o submenu ("Módulos de IA") está aberto
  const [scrolled, setScrolled] = useState(false); // Indica se a página já foi rolada além da seção hero

  // EFEITOS
  useEffect(() => {
    /**
     * Detecta o scroll da página e define se a navbar
     * deve mudar de estilo ao sair da seção hero.
     */
    const handleScroll = () => {
      const heroHeight = window.innerHeight * 0.1; // ponto de troca (~10% da tela)
      setScrolled(window.scrollY > heroHeight);
    };

    // Adiciona e remove o listener de scroll
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ===========================
  // HANDLERS (AÇÕES DO USUÁRIO)
  // ===========================

  // Abre/fecha o menu lateral (modo mobile)
  const handleMenuClick = () => {
    setIsMenuOpen((prev) => !prev);
  };

  // Abre o submenu ao passar o mouse
  const handleSubMenuEnter = () => {
    setIsSubMenuOpen(true);
  };

  // Fecha o submenu ao sair do hover
  const handleSubMenuLeave = () => {
    setIsSubMenuOpen(false);
  };

  // RENDERIZAÇÃO
  return (
    <nav
      className={`navbar 
        ${isMenuOpen ? "open-nav" : ""} 
        ${scrolled ? "navbar-scrolled" : ""}`}
    >
      {/* Cabeçalho da navbar: logo + menu hambúrguer */}
      <div className="navbar-header">
        <a href="/">
          <img src="/logosimpatia.svg" alt="Logo" className="logo" />
        </a>

        <div className="hamburger-menu" onClick={handleMenuClick}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      {/* Links principais da navbar */}
      <div className={`nav-links ${isMenuOpen ? "open" : ""}`}>
        <div className="links-centrais">
          {/* Dropdown - Módulos de IA */}
          <div
            className="nav-item-dropdown"
            onMouseEnter={handleSubMenuEnter}
            onMouseLeave={handleSubMenuLeave}
          >
            <a href="#" className="dropdown-trigger body-16-medium">
              Módulos de IA
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="8"
                viewBox="0 0 12 8"
                fill="none"
                className={`arrow-icon ${isSubMenuOpen ? "rotated" : ""}`}
              >
                <path
                  d="M1 1.5L6 6.5L11 1.5"
                  stroke="var(--azul-principal)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>

            {/* Submenu com os módulos */}
            <div className={`submenu-links ${isSubMenuOpen ? "open" : ""}`}>
              <NavModulos />
            </div>
          </div>

          <hr />
          <a href="/about">Sobre o Projeto</a>
          <hr />
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
