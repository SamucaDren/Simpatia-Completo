import React, { useState } from "react";

function NavModulos() {
    const [selecionado, setSelecionado] = useState("professor");
    const MODULOS_DATA = {
        professor: [
            { titulo: "Gerenciar Turmas", descricao: "Controle completo de alunos e turmas.", id: 'p1' },
            { titulo: "Avaliações", descricao: "Crie e acompanhe provas e notas.", id: 'p2' },
            { titulo: "Relatórios", descricao: "Analise o desempenho das turmas.", id: 'p3' },
            { titulo: "Gerenciar Turmas", descricao: "Controle completo de alunos e turmas.", id: 'p1' },
            { titulo: "Avaliações", descricao: "Crie e acompanhe provas e notas.", id: 'p2' },
            { titulo: "Relatórios", descricao: "Analise o desempenho das turmas.", id: 'p3' },
            { titulo: "Gerenciar Turmas", descricao: "Controle completo de alunos e turmas.", id: 'p1' },
            { titulo: "Avaliações", descricao: "Crie e acompanhe provas e notas.", id: 'p2' },
            { titulo: "Relatórios", descricao: "Analise o desempenho das turmas.", id: 'p3' },
            { titulo: "Gerenciar Turmas", descricao: "Controle completo de alunos e turmas.", id: 'p1' },
            { titulo: "Avaliações", descricao: "Crie e acompanhe provas e notas.", id: 'p2' },
            { titulo: "Relatórios", descricao: "Analise o desempenho das turmas.", id: 'p3' },
        ],
        aluno: [
            { titulo: "Meus Cursos", descricao: "Acesse todo o conteúdo em um só lugar.", id: 'a1' },
            { titulo: "Assistente IA", descricao: "Receba ajuda personalizada nos estudos.", id: 'a2' },
            { titulo: "Calendário", descricao: "Veja suas aulas e prazos facilmente.", id: 'a3' },
            { titulo: "Gerenciar Turmas", descricao: "Controle completo de alunos e turmas.", id: 'p1' },
            { titulo: "Avaliações", descricao: "Crie e acompanhe provas e notas.", id: 'p2' },
            { titulo: "Relatórios", descricao: "Analise o desempenho das turmas.", id: 'p3' },
            { titulo: "Gerenciar Turmas", descricao: "Controle completo de alunos e turmas.", id: 'p1' },
            { titulo: "Avaliações", descricao: "Crie e acompanhe provas e notas.", id: 'p2' },
            { titulo: "Relatórios", descricao: "Analise o desempenho das turmas.", id: 'p3' },
            { titulo: "Gerenciar Turmas", descricao: "Controle completo de alunos e turmas.", id: 'p1' },
            { titulo: "Avaliações", descricao: "Crie e acompanhe provas e notas.", id: 'p2' },
            { titulo: "Relatórios", descricao: "Analise o desempenho das turmas.", id: 'p3' },
        ],

    };
    // 🎨 Estilos inline
    const styles = {
        container: {
            position: "absolute",
            top:'60px',
            display: "flex",
            flexDirection: "row",
            gap: "40px",
            padding: "30px",
            maxWidth: "1000px",
            margin: "0 auto",
            fontFamily: "Inter, sans-serif",
            backgroundColor: 'red'
        },
        grupoContent: {
            display: "flex",
            flexDirection: "column",
            gap: "15px",
        },
        titulo: {
            fontSize: "20px",
            fontWeight: "600",
            color: "#333",
        },
        divisor: {
            width: "40px",
            height: "3px",
            backgroundColor: "#007BFF",
            borderRadius: "2px",
            marginBottom: "15px",
        },
        opTipoBase: {
            border: "1px solid #e0e0e0",
            borderRadius: "12px",
            padding: "20px",
            cursor: "pointer",
            transition: "all 0.3s ease",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
        },
        opTipoSelecionado: {
            backgroundColor: "#f5f9ff",
            borderColor: "#007BFF",
            boxShadow: "0 0 6px rgba(0,123,255,0.2)",
        },
        opTipoNaoSelecionado: {
            backgroundColor: "#fff",
        },
        tipo: {
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontWeight: "600",
            fontSize: "18px",
            color: "#222",
        },
        tipoSub: {
            fontSize: "15px",
            color: "#555",
            marginLeft: "28px",
        },
        linkCta: {
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "14px",
            color: "#007BFF",
            fontWeight: "500",
            textDecoration: "none",
            marginLeft: "28px",
            transition: "color 0.3s ease",
        },
        grupoModulos: {
            display: "flex",
            flexDirection: "column",
            gap: "15px",
        },
        contentGrid: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
        },
        opModulo: {
            border: "1px solid #e0e0e0",
            borderRadius: "12px",
            padding: "18px",
            backgroundColor: "#fff",
            display: "flex",
            flexDirection: "column",
            gap: "6px",
            transition: "all 0.3s ease",
        },
        tipoModulo: {
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "18px",
            fontWeight: "600",
            color: "#222",
        },
    };

    return (
        <div style={styles.container}>
            {/* Grupo de seleção de tipo */}
            <div style={styles.grupoContent}>
                <span style={styles.titulo}>Para</span>
                <div style={styles.divisor}></div>

                {/* Opção Professores */}
                <div
                    style={{
                        ...styles.opTipoBase,
                        ...(selecionado === "professor"
                            ? styles.opTipoSelecionado
                            : styles.opTipoNaoSelecionado),
                    }}
                    onMouseEnter={() => setSelecionado("professor")}
                >
                    <span style={styles.tipo}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                        >
                            <path d="M17.3182 1H5.72727C5.00396 1 4.31026 1.29176 3.7988 1.81109C3.28734 2.33042 3 3.03479 3 3.76923V18.3077C3 18.4913 3.07183 18.6674 3.1997 18.7972C3.32757 18.9271 3.50099 19 3.68182 19H15.9545C16.1354 19 16.3088 18.9271 16.4367 18.7972C16.5645 18.6674 16.6364 18.4913 16.6364 18.3077C16.6364 18.1241 16.5645 17.948 16.4367 17.8182C16.3088 17.6883 16.1354 17.6154 15.9545 17.6154H4.36364C4.36364 17.2482 4.5073 16.896 4.76304 16.6363C5.01877 16.3766 5.36561 16.2308 5.72727 16.2308H17.3182C17.499 16.2308 17.6724 16.1578 17.8003 16.028C17.9282 15.8982 18 15.7221 18 15.5385V1.69231C18 1.5087 17.9282 1.33261 17.8003 1.20277C17.6724 1.07294 17.499 1 17.3182 1Z" />
                        </svg>
                        Professores
                    </span>
                    <span style={styles.tipoSub}>Ensine com mais eficiência.</span>
                    <a style={styles.linkCta} href="/modulos/professor">
                        Ver todos{" "}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="8"
                            viewBox="0 0 16 8"
                        >
                            <path d="M15.3536 4.35355C15.5488 4.15829 15.5488 3.84171 15.3536 3.64645L12.1716 0.464466C11.9763 0.269204 11.6597 0.269204 11.4645 0.464466C11.2692 0.659728 11.2692 0.976311 11.4645 1.17157L14.2929 4L11.4645 6.82843C11.2692 7.02369 11.2692 7.34027 11.4645 7.53553C11.6597 7.7308 11.9763 7.7308 12.1716 7.53553L15.3536 4.35355ZM0 4V4.5H15V3.5H0V4Z" />
                        </svg>
                    </a>
                </div>

                {/* Opção Alunos */}
                <div
                    style={{
                        ...styles.opTipoBase,
                        ...(selecionado === "aluno"
                            ? styles.opTipoSelecionado
                            : styles.opTipoNaoSelecionado),
                    }}
                    onMouseEnter={() => setSelecionado("aluno")}
                >
                    <span style={styles.tipo}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                        >
                            <path d="M19.6689 6.21832L10.2938 1.07543C10.2033 1.0259 10.1024 1 10 1C9.89755 1 9.79667 1.0259 9.70624 1.07543L0.331061 6.21832C0.231063 6.27313 0.147433 6.35488 0.0891189 6.45481C0.0308048 6.55474 0 6.66909 0 6.78564C0 6.90219 0.0308048 7.01655 0.0891189 7.11648C0.147433 7.21641 0.231063 7.29815 0.331061 7.35297L2.49985 8.54306V12.434C2.4992 12.7497 2.61219 13.0546 2.81705 13.2898C3.84051 14.4622 6.13352 16.4286 10 16.4286C11.282 16.4395 12.5544 16.2006 13.7501 15.7246V18.3571C13.7501 18.5276 13.8159 18.6912 13.9331 18.8117C14.0503 18.9323 14.2093 19 14.3751 19C14.5408 19 14.6998 18.9323 14.817 18.8117C14.9342 18.6912 15.0001 18.5276 15.0001 18.3571V15.1035C15.8151 14.6195 16.5516 14.0076 17.183 13.2898C17.3878 13.0546 17.5008 12.7497 17.5001 12.434V8.54306L19.6689 7.35297C19.7689 7.29815 19.8526 7.21641 19.9109 7.11648C19.9692 7.01655 20 6.90219 20 6.78564C20 6.66909 19.9692 6.55474 19.9109 6.45481C19.8526 6.35488 19.7689 6.27313 19.6689 6.21832Z" />
                        </svg>
                        Alunos
                    </span>
                    <span style={styles.tipoSub}>Estude com apoio da IA.</span>
                    <a style={styles.linkCta} href="/modulos/aluno">
                        Ver todos{" "}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="8"
                            viewBox="0 0 16 8"
                        >
                            <path d="M15.3536 4.35355C15.5488 4.15829 15.5488 3.84171 15.3536 3.64645L12.1716 0.464466C11.9763 0.269204 11.6597 0.269204 11.4645 0.464466C11.2692 0.659728 11.2692 0.976311 11.4645 1.17157L14.2929 4L11.4645 6.82843C11.2692 7.02369 11.2692 7.34027 11.4645 7.53553C11.6597 7.7308 11.9763 7.7308 12.1716 7.53553L15.3536 4.35355ZM0 4V4.5H15V3.5H0V4Z" />
                        </svg>
                    </a>
                </div>
            </div>

            {/* Módulos */}
            <div style={styles.grupoModulos}>
                <span style={styles.titulo}>Módulos disponíveis</span>
                <div style={styles.divisor}></div>

                <div style={styles.contentGrid}>
                    {MODULOS_DATA[selecionado].slice(0, 3).map((modulo, index) => (
                        <div key={index} style={styles.opModulo}>
                            <span style={styles.tipoModulo}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M17.3182 1H5.72727C5.00396 1 4.31026 1.29176 3.7988 1.81109C3.28734 2.33042 3 3.03479 3 3.76923V18.3077C3 18.4913 3.07183 18.6674 3.1997 18.7972C3.32757 18.9271 3.50099 19 3.68182 19H15.9545C16.1354 19 16.3088 18.9271 16.4367 18.7972C16.5645 18.6674 16.6364 18.4913 16.6364 18.3077Z" />
                                </svg>
                                {modulo.titulo}
                            </span>
                            <span style={styles.tipoSub}>{modulo.descricao}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default NavModulos;
