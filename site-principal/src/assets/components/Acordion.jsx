import React, { useState } from 'react';
import './Acordion.css';

// Componente para o ícone de recolher (o "menos")
const RecolherIcon = () => (
  <svg width="26" height="27" viewBox="0 0 26 27" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="13" cy="13.5056" rx="13" ry="12.8571" fill="#370199" />
    <path d="M9 13.5056L17 13.5056" stroke="white" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// Componente para o ícone de expandir (o "mais")
const ExpandirIcon = () => (
  <svg width="26" height="27" viewBox="0 0 26 27" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="13" cy="13.5056" rx="13" ry="12.8571" fill="#370199" />
    <path d="M12.9995 8.56055V18.4507" stroke="white" strokeWidth="2" strokeLinecap="round" />
    <path d="M9 13.5056L17 13.5056" stroke="white" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const Acordion = ({ pergunta, children }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`acordion-container ${isExpanded ? 'is-open' : ''}`}>
      <div className="acordion-content">
        <p className="acordion-pergunta">{pergunta}</p>
        <div className={`acordion-resposta-wrapper ${isExpanded ? 'is-open' : ''}`}>
          <p className="acordion-resposta">{children}</p>
        </div>
      </div>
      <div className="acordion-icone-wrapper" onClick={toggleExpand}>
        <div className="icone-transicao-container">
          <div className={`expandir-icon-wrapper ${isExpanded ? 'hidden' : ''}`}>
            <ExpandirIcon />
          </div>
          <div className={`recolher-icon-wrapper ${isExpanded ? 'visible' : ''}`}>
            <RecolherIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Acordion;