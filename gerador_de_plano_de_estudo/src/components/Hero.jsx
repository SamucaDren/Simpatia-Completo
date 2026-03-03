import React from 'react';
import { useNavigate } from 'react-router-dom';
import heroImg from '../assets/hero.png';

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="flex flex-col md:flex-row items-center justify-between px-6 py-16 bg-gray-50">
      <div className="max-w-xl">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
  Estude de forma mais <span className="text-blue-600">eficiente</span> com
  o poder da <span style={{ color: 'rgb(73, 3, 199)' }}>IA</span>
</h1>

        <p className="mt-4 text-lg text-gray-600">
          Gere planos de estudo personalizados para suas disciplinas com
          inteligência artificial.
        </p>
        <button
  onClick={() => navigate('/study-plan')}
  className="mt-6 px-6 py-3 text-white font-medium rounded-md hover:brightness-90 transition"
  style={{ backgroundColor: 'rgb(73, 3, 199)' }}
>
  Planejar Sua Aula
</button>

      </div>
      <img
        src={heroImg}
        alt="Estudante"
        className="mt-10 md:mt-0 w-full md:w-1/2"
      />
    </section>
  );
}
