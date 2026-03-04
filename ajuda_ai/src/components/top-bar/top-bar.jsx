import { useState, useEffect, useRef } from "react";
import Logo from "../../assets/logo.png";
import Unifenas from "../../assets/unifenas.png";
import Button from "../button";
import styles from "./top-bar.module.css";
import ModuleIA from "../modules-ia/modules-ia";
import { useNavigate } from "react-router-dom";

const TopBar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();

    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !event.target.closest(`.${styles.hamburger}`)
      ) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);


  return (
    <div className={styles.topbar}>
      <img src={Logo} alt="Logo" className={styles.logo} onClick={() => window.open("https://simpatiaunifenas.web.app", "_blank")} />

      {!isMobile && (
        <div className={styles.nav}>
          <ModuleIA />
          <Button types="outline" onClick={() => window.open("https://simpatiaunifenas.web.app/about", "_blank")} >Sobre o Projeto</Button>
          <Button types="top" onClick={() => window.open("https://www.unifenas.br/", "_blank")} className={styles.btn}>
            <img
              src={Unifenas}
              alt="Unifenas"
              style={{ height: "20px", width: "20px" }}
            />
            Conheça a Unifenas
          </Button>
        </div>
      )}

      {isMobile && (
        <div className={styles.mobileMenu}>
          <button
            ref={dropdownRef}
            className={styles.hamburger}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      )}

      {menuOpen && isMobile && (
        <div ref={dropdownRef} className={styles.dropdown}>
          <ModuleIA />
          <Button types="outline" className={styles.btnTop} onClick={() => window.open("https://simpatiaunifenas.web.app/about", "_blank")}>
            Sobre o Projeto
          </Button>
          <Button types="top" className={styles.btn} onClick={() => window.open("https://www.unifenas.br/", "_blank")} >
            <img
              src={Unifenas}
              alt="Unifenas"
              style={{ height: "20px", width: "20px" }}
            />
            Conheça a Unifenas
          </Button>
        </div>
      )}
    </div>
  );
};

export default TopBar;
