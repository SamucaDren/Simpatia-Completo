import React from 'react';
import SimpatIaImg from '../assets/SimpatIa.png'; // ajuste o caminho se necessário

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 shadow-sm bg-white">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img src={SimpatIaImg} alt="SIMPATia" className="h-10 w-auto" />
      </div>
    </header>
  );
}
