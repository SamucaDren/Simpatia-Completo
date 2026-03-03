import React, { useState } from 'react';

const faqs = [
  {
    q: 'Como funciona o gerador de planos?',
    a: 'A IA gera planos de estudo detalhados para qualquer atividade solicitada, ajudando o aluno a organizar seus estudos sem coletar informações pessoais.',
  },
  {
    q: 'Posso personalizar as disciplinas?',
    a: 'Sim! Você pode escolher quais matérias deseja estudar e a IA adaptará o plano de estudo para atender suas necessidades.',
  },
  {
    q: 'É gratuito?',
    a: 'Sim! Toda a plataforma é 100% gratuita, permitindo que você gere planos de estudo básicos sem custo algum. Recursos avançados poderão ser adicionados no futuro, mas o essencial para aprender já está disponível para todos.',
  },
  {
    q: 'Como acompanho meu progresso?',
    a: 'Você pode acompanhar os planos de estudo gerados e marcar tarefas concluídas para visualizar sua evolução.',
  },
];

export default function FAQ() {
  const [openItem, setOpenItem] = useState(null);

  return (
    <section className="w-full py-16 bg-neutral-100">
      <div className="px-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          Perguntas Frequentes
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`rounded-lg transition-all duration-300 ${
                openItem === i
                  ? 'bg-white shadow-lg'
                  : 'bg-gray-200 hover:bg-gray-100 hover:shadow-md'
              }`}
            >
              <button
                className="w-full flex items-center justify-between p-4 text-left focus:outline-none"
                onClick={() => setOpenItem(openItem === i ? null : i)}
              >
                <span className={`text-gray-700 font-medium`}>
                  {faq.q}
                </span>
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary text-white text-lg">
                  {openItem === i ? '−' : '+'}
                </span>
              </button>

              {openItem === i && (
                <div className="px-4 pb-4 pt-2 border-t border-gray-300 text-gray-700">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
