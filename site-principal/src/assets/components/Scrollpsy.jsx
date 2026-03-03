import React, { useEffect, useRef, useState } from "react";
import "./Scrollpsy.css";

function Scrollspy({ topicos, informacoes, links }) {
  const [active, setActive] = useState(topicos[0]?.id);
  const refs = useRef({});

  console.log("informacoes (geral)", informacoes); // <-- aqui

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.6,
      }
    );

    Object.values(refs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  function handleClick(id) {
    refs.current[id]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    setActive(id);
  }

  return (
    <div className="scrollspy-container">
      <aside className="scrollspy-sidebar">
        <h2 className="sidebar-title">Tópicos</h2>

        <ul className="sidebar-list">
          {topicos.map((item) => (
            <li key={item.id} className="sidebar-item">
              <button
                onClick={() => handleClick(item.id)}
                className={`sidebar-button ${
                  active === item.id ? "sidebar-button-active" : ""
                }`}
              >
                <svg
                  class="bullet"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                >
                  <circle cx="8" cy="8" r="4" fill="currentColor" />
                  <circle
                    cx="8"
                    cy="8"
                    r="6.2"
                    fill="none"
                    stroke="currentColor"
                    stroke-opacity="0.12"
                    stroke-width="1.6"
                  />
                </svg>
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </aside>
      <main className="scrollspy-content">
        {links?.length > 0 && (
          <section id="links" className="links-section">
            <div className="section-links">
              <div className="wrapper-titulo-links">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                >
                  <g clip-path="url(#clip0_1124_1301)">
                    <path
                      d="M33.0007 11.0288C32.9505 12.7696 32.2347 14.4249 31.0007 15.6538L26.657 20C26.0243 20.6361 25.2718 21.1404 24.4429 21.4837C23.6141 21.827 22.7253 22.0025 21.8282 22H21.822C20.9095 21.9994 20.0064 21.8159 19.1661 21.4603C18.3257 21.1048 17.5652 20.5845 16.9293 19.9301C16.2934 19.2757 15.7951 18.5005 15.4639 17.6503C15.1327 16.8001 14.9752 15.8921 15.0007 14.98C15.0082 14.7148 15.1207 14.4634 15.3135 14.2811C15.5063 14.0989 15.7636 14.0007 16.0288 14.0081C16.2941 14.0156 16.5454 14.1281 16.7277 14.3209C16.91 14.5137 17.0082 14.771 17.0007 15.0363C16.9825 15.6812 17.0937 16.3232 17.3279 16.9244C17.562 17.5256 17.9143 18.0737 18.3638 18.5364C18.8134 18.9992 19.3512 19.3671 19.9453 19.6185C20.5395 19.8699 21.178 19.9996 21.8232 20C22.4574 20.0016 23.0857 19.8775 23.6716 19.6349C24.2576 19.3922 24.7896 19.0358 25.237 18.5863L29.5807 14.2425C30.4769 13.335 30.9777 12.1098 30.9737 10.8344C30.9697 9.55897 30.4613 8.33692 29.5594 7.43506C28.6575 6.53319 27.4355 6.02476 26.1601 6.02077C24.8847 6.01678 23.6595 6.51755 22.752 7.41376L21.377 8.78876C21.1879 8.96838 20.9362 9.06703 20.6754 9.0637C20.4146 9.06036 20.1655 8.95529 19.9811 8.77088C19.7967 8.58648 19.6916 8.33734 19.6883 8.07658C19.6849 7.81582 19.7836 7.56407 19.9632 7.37501L21.3382 6.00001C21.9726 5.36542 22.7258 4.86202 23.5547 4.51857C24.3837 4.17513 25.2722 3.99835 26.1695 3.99835C27.0668 3.99835 27.9553 4.17513 28.7842 4.51857C29.6132 4.86202 30.3663 5.36542 31.0007 6.00001C31.6578 6.6587 32.1739 7.44422 32.5178 8.30874C32.8616 9.17326 33.0259 10.0987 33.0007 11.0288ZM16.6257 23.2075L15.2507 24.5825C14.8022 25.034 14.2685 25.3918 13.6805 25.6351C13.0925 25.8785 12.4621 26.0025 11.8257 26C10.8711 25.9992 9.93811 25.7155 9.14467 25.1847C8.35122 24.6539 7.73291 23.8999 7.36786 23.0178C7.0028 22.1357 6.90739 21.1653 7.09368 20.229C7.27996 19.2927 7.73958 18.4327 8.41446 17.7575L12.7507 13.4138C13.4337 12.7272 14.3073 12.2618 15.2582 12.0781C16.2091 11.8944 17.1932 12.0009 18.0828 12.3837C18.9723 12.7665 19.7262 13.4079 20.2466 14.2246C20.767 15.0414 21.0297 15.9958 21.0007 16.9638C20.9933 17.229 21.0915 17.4863 21.2737 17.6791C21.456 17.8719 21.7074 17.9844 21.9726 17.9919C22.2378 17.9993 22.4951 17.9011 22.6879 17.7189C22.8807 17.5366 22.9933 17.2852 23.0007 17.02C23.0247 16.0914 22.8598 15.1676 22.516 14.3047C22.1722 13.4418 21.6567 12.6577 21.0007 12C19.7197 10.7195 17.9826 10.0002 16.1713 10.0002C14.3601 10.0002 12.623 10.7195 11.342 12L7.00071 16.3438C6.046 17.2981 5.39561 18.514 5.13173 19.8378C4.86784 21.1617 5.00232 22.5341 5.51815 23.7815C6.03399 25.029 6.90803 26.0955 8.02983 26.8463C9.15162 27.5972 10.4708 27.9987 11.8207 28C12.7181 28.0026 13.607 27.8272 14.4361 27.4839C15.2651 27.1406 16.0179 26.6362 16.6507 26L18.0257 24.625C18.1875 24.4344 18.2721 24.1901 18.2627 23.9402C18.2533 23.6903 18.1506 23.453 17.9749 23.2751C17.7992 23.0972 17.5632 22.9916 17.3134 22.9791C17.0637 22.9666 16.8183 23.0481 16.6257 23.2075Z"
                      fill="#006FFF"
                    />
                  </g>
                </svg>
                <span className="title-links">Links Úteis</span>
              </div>
              {links.map((link, index) => (
                <ul>
                  <li>
                    <a
                      key={index}
                      href={link}
                      target="_blank"
                      className="section-link"
                    >
                      {link}
                    </a>
                  </li>
                </ul>
              ))}
            </div>
          </section>
        )}

        {topicos.map((item) => (
          <section
            key={item.id}
            id={item.id}
            ref={(el) => (refs.current[item.id] = el)}
            className="content-section"
          >
            <h3 className="section-title">{item.label}</h3>
            <p className="section-text">
              {informacoes[item.id]?.descricao ??
                "Nenhuma descrição disponível"}
            </p>

            {informacoes[item.id]?.fotos?.length > 0 && (
              <div className="section-gallery">
                {informacoes[item.id].fotos.map((img, i) => (
                  <img src={img} key={i} className="gallery-image" />
                ))}
              </div>
            )}
          </section>
        ))}
      </main>
    </div>
  );
}

export default Scrollspy;
