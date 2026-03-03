import React from 'react';
import SimpatIaImg from '../assets/SimpatIa.png'; // ajuste o caminho se necessário

export default function Footer() {
  return (
    <footer className="px-6 py-10 bg-gray-100 text-gray-600">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
        <div>
          {/* Logo como imagem */}
          <img src={SimpatIaImg} alt="SIMPATia" className="h-8 w-auto mb-2" />
          <p className="text-sm">A nova forma de aprender com o poder da IA.</p>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Links</h4>
          <ul className="space-y-1 text-sm">
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">Módulos</a>
            </li>
            <li>
              <a href="#">FAQ</a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Contato</h4>
          <p className="text-sm">email@exemplo.com</p>
        </div>
      </div>

      <p className="text-center text-xs mt-6 text-gray-400">
        © {new Date().getFullYear()} SIMPATia - Todos os direitos reservados.
      </p>
    </footer>
  );
}
