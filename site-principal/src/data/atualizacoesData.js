const FEATURES = [    
  {           
    titulo: "Criação inicial do Simpatia", 
    data: "JANEIRO DE 2023",
    descricao: "Criação do projeto como Atividade de Extensao da Unifenas",
    equipe: [
      "Davi Braga",
      "José Roberto Lupianez Filho",
      "Pedro Henriqui de Paula Reis Siqueira",
      "Mairon Kaito Teodoro",
      "Raphael Rocha da Silva Pereira",
      "Robert Vagner da Silva"      
    ],    
    topicos: {
      links: {
        descricao:"",
        links:   [
          "https://simpatia.unifenas.br/index.html?",           
        ]      
      },
      introducao: "A equipe foi responsável criar do 0 o sistema",
      escolhas: `
      Criaram Sistema de Criação de Planos de Aulas automatizados
      Criaram Sistema de Criação de Questões automatizados
      Priorizaram a funcionalidade e entrega funcional do sistema      
      `,

      processo: "O processo de desenvolvimento foi feito em parceira com a Unifenas, utilizando metodologias ágeis e ferramentas colaborativas para garantir a entrega dentro dos prazos estabelecidos.",
      fotos: {
        descricao: "",
        fotos: [          
          "/fotos-features/criacaoinicial.png"
        ]
      },      
      conclusao: "Entrega de um sistema funcional e usavel."
    },
    id: 1
  },
  {           
    titulo: "Atualização do Front-End / Nova Interface", 
    data: "SETEMBRO DE 2025",
    descricao: "A atualização modernizou toda a camada visual, trazendo uma experiência mais fluida, rápida e padronizada. O foco foi melhorar navegação, identidade visual e usabilidade tanto para alunos quanto para professores.",
    equipe: [
      "Clinton Nogueira Silva",
      "Luiz Felipe dos Reis Baldini",
      "Rafael Oliveira de Carvalho Lopes",
      "Samuel Nogueira da Silva"
    ],    
    topicos: {
      links: {
        descricao:"",
        links:   [
          "https://github.com/clintonsilvas/Simpatia", 
          "https://www.unifenas.br"
        ]      
      },
      introducao: "A equipe foi responsável por reformular a interface principal do sistema, tornando-a mais clara, responsiva e acessível tanto para professores quanto para alunos. O foco foi criar uma experiência consistente e intuitiva, que pudesse ser facilmente escalada para novos módulos.",
      escolhas: `
      Paleta de cores: Definimos como padrão fundos claros para uma experiência suave. Azul foi mantido como cor primária de identidade, e roxo como cor de ação.
      Tipografia: Adotamos uma hierarquia simples com títulos em destaque e textos secundários neutros para melhorar a leitura em qualquer dispositivo.
      Ícones: Optamos pela biblioteca Phosphor Icons, priorizando a versão Regular para manter consistência visual.
      `,

      processo: "Planejamento no Figma, criação do design system, componentização com React + Tailwind, testes internos e ajustes de contraste e espaçamento.",
      fotos: {
        descricao: "",
        fotos: [          
          "/fotos-features/atualizacaointerface.png"
        ]
      },      
      conclusao: "A nova interface tornou o sistema mais modular, acessível e preparado para receber novos módulos de forma consistente."
    },
    id: 2
  },
  {           
    titulo: "Gerador de Questões Objetivas", 
    data: "AGOSTO DE 2025",
    descricao: "O módulo resolve o problema de criar questões personalizadas de forma rápida e automatizada, evitando que estudantes e professores percam tempo preparando exercícios manualmente. Ele gera questões inteligentes (múltipla escolha ou dissertativas) com base em disciplina, tópico e dificuldade, facilitando estudos, revisões e avaliações. É feito especialmente para professores que desejam otimizar o aprendizado com conteúdos sob medida.",
    equipe: [
      "Gabrielle Souza Pereira da Silva",
      "Ana Paula Veronezi"      
    ],    
    topicos: {
      links: {
        descricao:"",
        links:   [
          "https://github.com/gabriellesouzaps/gerador_questoes.git"          
        ]      
      },
      introducao: "O módulo de geração inteligente de questões foi criado para facilitar a vida de professores que precisam produzir exercícios personalizados de forma rápida e eficiente. Ele resolve o problema da criação manual de questões — um processo demorado, repetitivo e pouco escalável — oferecendo uma solução que utiliza IA para gerar perguntas de múltipla escolha ou dissertativas conforme disciplina, tópico e nível de dificuldade. Sua proposta é automatizar e padronizar a criação de materiais de estudo e avaliação, proporcionando praticidade, economia de tempo e maior qualidade no acompanhamento do aprendizado.",
      escolhas: `
      O módulo de geração inteligente de questões foi criado com o objetivo de automatizar e 
      simplificar a criação de exercícios personalizados para professores permitindo gerar perguntas 
      conforme disciplina, tópico, dificuldade e tipo desejado. 
      `,
      processo: `
      Para isso, foram utilizadas as tecnologias Java e Spring Boot, com desenvolvimento realizado no IntelliJ IDEA, organizando o projeto em uma arquitetura em camadas com pastas como controller, service, model e config. O processo iniciou pelo design das telas e do fluxo de uso, garantindo uma navegação simples; em seguida, definiu-se a arquitetura do sistema e implementou-se a lógica de negócio, as rotas REST e o tratamento das requisições no back-end. Após isso, foram executados testes para validar a geração das questões, a consistência das respostas e o comportamento das entradas do usuário. Durante o desenvolvimento, desafios como padronização das perguntas, controle de parâmetros, organização do fluxo de geração e integração entre as camadas foram superados com validações, ajustes estruturais e refino contínuo do código. Como resultado final, o módulo entrega funcionalidades completas, incluindo configuração dos parâmetros da questão, geração automática de exercícios, exibição organizada das perguntas e possibilidade de exportação, oferecendo uma solução prática, eficiente e alinhada às demandas do ambiente educacional.
      `,
      fotos: {
        descricao: "",
        fotos: [          
          "/fotos-features/imagemgeradordequestoes.png"
        ]
      },      
      conclusao: "Como resultado, o módulo demonstrou eficiência na geração automática de questões, atendendo às necessidades de personalização e agilidade dos usuários. A equipe adquiriu aprendizados importantes sobre organização em camadas, boas práticas com Spring Boot e validação de dados para garantir consistência no sistema. Além disso, o desenvolvimento reforçou a importância de testes contínuos e de um design focado na experiência do usuário. Para o futuro, o módulo pode ser ampliado com integração com bancos de dados, novas formas de exportação, melhorias na interface e maior uso de inteligência artificial para aprimorar a qualidade das perguntas geradas."
    },
    id: 3
  },
  {           
      titulo: "Gerador de Questões Descritivas", 
      data: "OUTUBRO DE 2025",
      descricao: "O módulo resolve a dificuldade dos professores em gerar e revisar prompts de forma manual e demorada. Ele automatiza todo o fluxo entre as duas etapas da IA, oferecendo mais rapidez e praticidade na criação de questões e correções.",
      equipe: [
        "Guilherme Rodrigues Costa", 
        "Lucas Silva de Oliveira", 
        "Matheus Rodrigues Cordeiro dos Santos",  
        "Pedro Augusto Dias Ferreira",              
      ],    
      topicos: {
        links: {
          descricao:"",
          links:   [
            "https://github.com/LucasSO-one/simpatia.git"          
          ]      
        },
        introducao: "O módulo foi criado para auxiliar professores na criação e correção de questões descritivas. Ele permite que o docente escreva a questão, insira a resposta do aluno e adicione palavras-chave que orientam a correção. A IA transforma automaticamente essas informações em um prompt estruturado, que é enviado para a etapa seguinte sem a necessidade de copiar e colar manualmente. Além disso, atualizamos o modelo Gemini para uma versão mais nova, reforçamos a arquitetura do código corrigindo problemas como arquivos desorganizados e token exposto e adicionamos a possibilidade de enviar fotos de documentos diretamente para análise. Assim, o módulo se torna mais rápido, seguro e prático para o uso docente.",
        escolhas: `
          A proposta central era reduzir etapas manuais, melhorar a organização das informações e tornar a interação com a inteligência artificial mais direta, rápida e confiável. Além disso, buscou-se oferecer uma solução capaz de lidar tanto com entradas digitadas quanto com imagens de questões, garantindo flexibilidade em diferentes cenários de uso.

          Objetivos do módulo: 
          Automatizar a geração do prompt usado para análise da IA, eliminando a necessidade de copiar e colar manualmente.
          Organizar o fluxo de entrada do professor em campos claros: enunciado, resposta do aluno e palavras-chave.
          Permitir que o professor escolha enviar uma imagem da questão, caso prefira trabalhar com material impresso.
          Melhorar a velocidade, estabilidade e segurança da aplicação, corrigindo falhas da versão anterior.
          Atualizar o modelo de IA (Gemini) para uma versão mais eficiente e precisa.

          Tecnologias e ferramentas utilizadas: 
          HTML, CSS e JavaScript puro no frontend, mantendo leveza e simplicidade.
          Google Gemini API (versão atualizada) para geração do prompt estruturado e correção final.
          GitHub para organização e versionamento.           
        `,
        processo: `
        Processo de Criação:
          a) Design e Planejamento
          Primeiro, acompanhamos e estudamos a estrutura que já estava pronta.
          Adicionar palavras-chave (gabarito).
          Gerar o prompt automaticamente.
          Enviar o prompt final à IA corretora.
          Também foi planejada a interface dividida em duas colunas:
          Coluna esquerda: entrada de dados do professor.
          Coluna direita: prompt gerado automaticamente + resposta final da IA.
          b) Arquitetura:
          O backend foi reestruturado para corrigir problemas da versão anterior. e fomos trabalhando e desenvolvendo conforme o professor passava as novas informações e possíveis melhorias pra gente nas sprints:

          c) Implementação:
          Na implementação, focou-se em:
          gerar automaticamente o prompt formatado a partir dos três campos preenchidos pelo professor;
          mover esse prompt para o segundo campo automaticamente, sem ação manual;
          integrar a IA corretora para produzir a resposta final;
          permitir upload de imagem com conversão para base64 antes de enviar à IA;
          atualizar o Gemini para uma versão mais rápida e precisa.
          d) Testes
          Foram realizados testes de:
          funcionamento das rotas,
          upload e conversão de imagens,
          geração automática do prompt,
          envio e retorno da resposta da IA,
          comportamento da interface ao transferir os dados entre campos,
          situações de erro (campos vazios, arquivos inválidos, falhas no servidor).
          O módulo foi ajustado até que todo o fluxo estivesse funcional e estável.
          4. Desafios Enfrentados e Soluções
          Durante o desenvolvimento do módulo não enfrentamos grandes obstáculos técnicos. Alguns pontos exigiram ajustes, especialmente na integração entre as camadas e na organização do fluxo de dados, porém todos foram resolvidos de forma tranquila. A cada dificuldade identificada, aplicamos as orientações fornecidas pelo professor, o que permitiu corrigir rapidamente os problemas e manter o projeto evoluindo conforme planejado.
          5. Principais Funcionalidades Entregues
          Tornamos a parte de copiar e colocar a resposta na IA automaticamente, facilitando e agilizando o processo do para o professor.
          Também implementamos a funcionalidade de enviar imagem pra IA.
          `,
        fotos: {
          descricao: "",
          fotos: [          
            "/fotos-features/imagemgeradordequestoesdescritivas.png"
          ]
        },      
        conclusao: "Ao final do desenvolvimento, o módulo atendeu aos objetivos propostos e mostrou-se funcional, estável e integrado ao restante do sistema. A equipe ampliou seus conhecimentos sobre arquitetura de software, boas práticas de desenvolvimento e uso das tecnologias aplicadas, adquirindo mais confiança para criar soluções completas. Embora o resultado atual seja satisfatório, ainda existem oportunidades de evolução, como otimizar alguns processos internos, ampliar testes automatizados, se possível uma ideia de layout e adicionar novas funcionalidades para tornar o módulo ainda mais robusto e flexível em versões futuras."
      },
      id: 4
  }, 
  {           
      titulo: "Acessibilidade Checker", 
      data: "DEZEMBRO DE 2025",
      descricao: "O módulo resolve o problema de avaliação rápida de acessibilidade de páginas web, identificando visualmente violações de critérios WCAG 2.2. Ele foi criado para professores (ou outros profissionais de desenvolvimento/design) que precisam de um feedback instantâneo sobre a conformidade de seus materiais digitais.",
      equipe: [
        "Gabriel Lourenço de Oliveira"             
      ],    
      topicos: {
        links: {
          descricao:"",
          links:   [
            "https://github.com/Gabriel-Oliviera42/acessibilidade-web"          
          ]      
        },
        introducao: `
        O módulo Acessibilidade Checker é uma ferramenta vital para promover a inclusão digital 
        ao automatizar a inspeção de páginas web. Ele resolve o desafio de realizar análises de 
        acessibilidade baseadas em WCAG 2.2 de forma ágil e visual. Criado para professores, designers 
        e desenvolvedores, o sistema oferece uma solução prática para garantir que o conteúdo digital
         seja acessível a todos, 
        fornecendo um relatório detalhado e um screenshot da página analisada.                     
        `,
         escolhas: `
          O desenvolvimento do Acessibilidade Checker focou em criar uma ponte eficiente entre a interface do usuário e a inteligência artificial para análise visual.
          Objetivos do Módulo
          O objetivo principal foi automatizar a identificação de violações de acessibilidade web (WCAG 2.2) a partir de uma URL, retornando um relatório estruturado e sugestões de correção de forma imediata e visualmente suportada por um screenshot.
          `,
        processo: `
        Tecnologias e Ferramentas Utilizadas
        Front-end (Cliente): HTML, CSS puro e JavaScript (Vanilla JS) para a lógica da interface e requisições assíncronas.

        Back-end (Servidor): Node.js e o framework Express para roteamento de API.

        Análise Visual/Captura de Tela: A biblioteca Puppeteer foi usada para abrir o Chrome headless, navegar até a URL e capturar a imagem completa da página.

        Análise de Dados/IA: A API Gemini 2.5 Flash foi empregada para realizar a análise da imagem (o screenshot), seguindo instruções de prompt rigorosas para devolver os dados do relatório em formato JSON.

        Processo de Criação
        O processo seguiu uma arquitetura full-stack. Primeiro, o Front-end (design) foi desenhado para ser intuitivo (apenas um campo de URL e um botão). Em seguida, definimos a arquitetura do endpoint /analyze no Express. A implementação principal envolveu três fases no Back-end: 1) Captura da URL via Puppeteer para gerar uma imagem base64; 2) Envio dessa imagem ao Gemini com um prompt detalhado (forçando a saída JSON); 3) Tratamento da resposta no Front-end, onde o texto JSON é parseado para ser exibido em cards formatados (Violação, Sugestão).

        Desafios Encontrados e Soluções
        O maior desafio foi garantir a saída JSON pura e estável da IA, crucial para que o Front-end pudesse processar o relatório. Solucionamos isso com um prompt de engenharia muito restritivo, que instrui o Gemini a atuar estritamente como uma "API JSON", garantindo a precisão do formato. Outro desafio inicial foi a configuração do ambiente (Node, Puppeteer) após a formatação da máquina, o que foi resolvido com a reinstalação das dependências (npm install puppeteer).

        Principais Funcionalidades Entregues
        Análise de acessibilidade web baseada em WCAG 2.2.

        Geração de screenshot da página para contexto visual.

        Relatório formatado com Violações Identificadas, Descrição do Problema e Sugestões de Correção.

        Avaliação de Nível de Conformidade Estimado (A, AA ou AAA).
        
          `,
        fotos: {
          descricao: "",
          fotos: [          
            "/fotos-features/imagemgeradordequestoesdescritivas.png"
          ]
        },      
        conclusao: "O Acessibilidade Checker alcançou seu objetivo de fornecer uma ferramenta de análise rápida e eficiente, combinando a precisão da inteligência artificial com a robustez do web scraping (Puppeteer). A equipe obteve um aprendizado profundo sobre integração de APIs de IA, arquitetura full-stack (Node/Express) e as nuances da automação de testes visuais. Como melhoria futura, planejamos adicionar o armazenamento histórico dos resultados de análise e integrar o módulo a um sistema de login para permitir que professores gerenciem relatórios de várias páginas ao longo do tempo."
      },
      id: 5
  },
  {           
      titulo: "Gerador de Plano de Aula ", 
      data: "NOVEMBRO DE 2025",
      descricao: "O projeto é uma solução desenhada para agilizar a criação de planos de aula. Ele permite que os professores gerem rapidamente um esboço completo do plano de aula gerando um prompt e, em seguida utiliza de uma interface de chat para edita-lo e personaliza-lo de forma intuitiva, otimizando drasticamente o tempo de planejamento.",
      equipe: [
        "Maria Eduarda Marques",
        "Talles Gabriel",
        "Hiago Augusto",
        "Geovana Fernandes "             
      ],    
      topicos: {
        links: {
          descricao:"",
          links:   [
            "https://github.com/Tallesdev/SimpatiaPlanoAula.git"          
          ]      
        },
        introducao: `
        A elaboração de planos de aula detalhados é uma etapa fundamental, mas frequentemente dispendiosa em tempo e esforço, na rotina dos educadores. O presente trabalho aborda essa ineficiência propondo uma solução tecnológica de ponta voltada especificamente para professores e educadores. O problema do planejamento manual é resolvido com automação do rascunho inicial, enquanto a flexibilidade e personalização são garantidas por interface de chat intuitiva. Essa proposta de solução transforma o planejamento em processo ágil, permitindo aos educadores editar, refinar e adaptar o plano de aula gerado conforme suas necessidades pedagógicas específicas, assegurando que possam focar na qualidade e menor burocracia do processo.                     
        `,
         escolhas: `
          Geração Rápida de Planos de Aula: O módulo cria um rascunho completo e personalizável a partir dos dados inseridos pelo professor, acelerando todo o processo.
          Tecnologias Utilizadas: API Gemini para geração e edição do plano; JavaScript para lógica e integração; Tailwind CSS para o layout responsivo e profissional.
`,
        processo: `        
          Arquitetura e Processo: Construído como uma SPA, estruturada para gerar e manipular um plano em JSON, garantindo organização e edição eficiente no front-end.

          Desafios e Soluções: Ajustes no prompt e no retorno JSON foram necessários; o problema do PDF foi resolvido com um mockup HTML que garantiu fidelidade ao modelo do professor.

          Funcionalidades Entregues: Geração automática do plano, chat interativo para edição e exportação final para PDF com formatação padronizada.
        
          `,
        fotos: {
          descricao: "",
          fotos: [  
            "/fotos-features/geradorplanodeaula.jpg"
          ]
        },      
        conclusao: "Em suma, os resultados obtidos com o módulo de Geração de Planos de Aula com IA são extremamente positivos, validando a premissa de que a tecnologia pode, de fato, reduzir a carga burocrática dos professores, resultando em planos detalhados e personalizados gerados em uma fração do tempo usual. O principal aprendizado da equipe técnica reside na maestria da Engenharia de Prompt, que se mostrou essencial para forçar o Gemini a aderir a formatos pedagógicos rígidos e estruturados, e na eficácia de tecnologias como o Tailwind CSS para prototipagem rápida e responsiva. Para melhorias futuras, o módulo está pronto para evoluir, incorporando recursos cruciais como a integração direta e para exportação automática, a criação de perfis de usuário com repositórios de planos salvos e a inclusão de um recurso de feedback e avaliação de planos por pares, solidificando sua posição como uma ferramenta indispensável no ecossistema educacional."
      },
      id: 6
  },
  {           
      titulo: "Ajuda Inteligencia Artificial ", 
      data: "OUTUBRO DE 2025",
      descricao: "O módulo é composto por agentes de IA especializados em diversas áreas do conhecimento. Cada agente é orientado a conduzir o aluno no processo de construção do próprio entendimento, promovendo aprendizado ativo e evitando a simples entrega direta das respostas.",
      equipe: [
        "Anderson Caproni de Oliveira",
        "Leonardo de Paula Paiva", 
        "Lucca valladão e Marchetti", "Rafael Costa Monte Alegre", 
        "Kawe Henrique de Oliveira Pereira"                  
      ],    
      topicos: {
        links: {
          descricao:"",
          links:   [
            "https://github.com/AndersonCaproni/simpatia"          
          ]      
        },
        introducao: `
O módulo apresenta um conjunto de agentes de IA especializados, cada um responsável por atuar em uma área específica do conhecimento. Ele foi desenvolvido para auxiliar estudantes que têm dúvidas pontuais, oferecendo orientação estruturada e conduzindo-os ao raciocínio correto, em vez de entregar respostas prontas. Dessa forma, o módulo resolve o problema da aprendizagem passiva, promovendo um aprendizado mais ativo, guiado e personalizado. Sua proposta geral é fornecer múltiplos chats independentes, cada qual com um agente capacitado em determinado domínio, garantindo suporte educacional direcionado, eficaz e alinhado às necessidades do aluno.        `,
         escolhas: `
O módulo foi idealizado com o objetivo de fornecer um ambiente de aprendizado assistido por inteligência artificial, no qual o aluno possa interagir com agentes especializados e, por meio dessa interação, ser conduzido ao entendimento de suas dúvidas sem receber respostas imediatas ou superficiais. A proposta central consiste em promover aprendizado ativo, incentivando o desenvolvimento de autonomia e pensamento crítico.

Para a implementação do módulo, utilizou-se a stack composta por React, Vite como ferramenta de build e o serviço de IA Gemini, responsável pelo processamento das interações. O processo de criação foi conduzido em etapas bem definidas: inicialmente realizou-se o planejamento das funcionalidades e do fluxo de interação do estudante; em seguida, o módulo passou pela etapa de design, na qual foram estabelecidos os layouts, a lógica de navegação e a identidade visual dos agentes. Posteriormente, iniciou-se a fase de implementação, estruturando a arquitetura do projeto, definindo os componentes, configurando o serviço de IA e integrando cada agente às suas respectivas áreas de especialização.`,
 processo: `        
          Após a construção das funcionalidades principais, o módulo passou por uma etapa de testes a fim de garantir a consistência da comunicação com o serviço de IA, o desempenho adequado do chat e a estabilidade geral da solução. Por fim, realizou-se o deploy, disponibilizando o módulo para uso dentro da plataforma. Não foram identificados desafios relevantes durante o desenvolvimento, o que permitiu um fluxo de criação contínuo e eficiente.

O resultado entregue contempla um conjunto de agentes de IA especializados em diferentes áreas, operando em chats independentes. Cada agente conduz o aluno em um diálogo pedagógico estruturado, estimulando-o a refletir, explorar conceitos e construir sua própria linha de raciocínio. Dessa forma, o módulo oferece um ambiente interativo de perguntas e respostas no qual o estudante insere sua dúvida e recebe orientação progressiva até alcançar a solução.
          `,
        fotos: {
          descricao: "",
          fotos: [  
            "/fotos-features/ajudaia1.png",
            "/fotos-features/ajudaia4.png"
          ]
        },      
        conclusao: `
        O desenvolvimento do módulo resultou em uma solução educacional robusta, organizada e eficaz no apoio ao processo de aprendizagem dos estudantes. A experiência obtida pela equipe reforçou a importância do uso de agentes especializados para aumentar a qualidade da orientação oferecida, além de demonstrar a relevância de uma interface clara, objetiva e direcionada ao usuário final. Como melhorias futuras, considera-se a possibilidade de ampliar o número de agentes especializados, incorporar métricas de acompanhamento de desempenho do aluno e implementar novos recursos de personalização, de modo a tornar a plataforma ainda mais dinâmica, adaptativa e eficiente no apoio pedagógico.
          `
      },
      id: 7
  },
  {           
      titulo: "Simpático IA , Oratória", 
      data: "NOVEMBRO DE 2025",
      descricao: "Uma aplicação Web para treinar argumentação através de debates com IA",
      equipe: [
        "Talysson De Moura Da Silva"                  
      ],    
      topicos: {
        links: {
          descricao:"",
          links:   [
            "https://github.com/Talysson19/Simpatico-IA---Oratoria.git"          
          ]      
        },
        introducao: `
          Módulo para treinar argumentação dos alunos
        `,
         escolhas: `
         Uma das principais melhorias propostas é a modernização da interface do sistema, utilizando React e TypeScript para garantir uma experiência mais fluida, intuitiva e responsiva para o usuário.

        `,
          processo: `        
          Uma das principais melhorias propostas é a modernização da interface do sistema, utilizando React e TypeScript para garantir uma experiência mais fluida, intuitiva e responsiva para o usuário.
          `,
        fotos: {
          descricao: "",
          fotos: [  
            "/fotos-features/ajudaia1.png",
            "/fotos-features/ajudaia4.png"
          ]
        },      
        conclusao: `
        Atualização da interface dentro dos padrões que foram pedidos

          `
      },
      id: 8
  },
  {           
      titulo: "Gerador de plano de estudos ", 
      data: "NOVEMBRO DE 2025",
      descricao: "O projeto é um gerador de plano de estudos inteligente para auxiliar o aluno na busca de um direcionamento e uma melhor organização do seu tempo.",
      equipe: [
        "Davi Costa Caetano",
        "Jonas Cézar Firmino da Silva", 
        "Rodolfo André de Souza"                  
      ],    
      topicos: {
        links: {
          descricao:"",
          links:   [
            "https://github.com/tifilial736/SimpatiaIA.git"          
          ]      
        },
        introducao: `
          Nosso site foi criado, para que, com ele o aluno/estudante, de uma maneira intuitiva e prática, consiga organizar um plano de estudos, de acordo com a realidade de sua rotina.
        `,
         escolhas: `
O módulo gerador de plano de ensino foi concebido com o propósito de otimizar a elaboração e a padronização de documentos acadêmicos, oferecendo aos docentes uma ferramenta automatizada, estruturada e de fácil utilização. Para sua implementação, adotou-se uma arquitetura baseada na biblioteca React, complementada por React Router, Context API, Styled Components e Axios. Os testes funcionais e de interface foram conduzidos com Jest e Testing Library, assegurando a confiabilidade dos componentes desenvolvidos.

O processo de desenvolvimento iniciou-se pela modelagem da interface e definição da experiência do usuário, com a elaboração de wireframes que orientaram a organização das seções do plano de ensino. A seguir, foi estruturada a arquitetura interna do módulo, priorizando modularidade, reutilização de componentes e clareza no fluxo de dados. A implementação contemplou formulários dinâmicos, validações automatizadas e hooks personalizados para gerenciamento de estado e integração com a API.
        `,
          processo: `        
Diversos desafios foram enfrentados ao longo do desenvolvimento, especialmente relacionados ao desempenho da interface e à padronização dos modelos de exportação. A otimização da renderização dos componentes e o uso de memorização permitiram resolver problemas de desempenho; já a criação de um sistema de templates possibilitou a adaptação do documento final a diferentes padrões institucionais.

Como resultado, o módulo entrega funcionalidades como criação orientada de planos de ensino, salvamento automático, edição estruturada de conteúdos, exportação em múltiplos formatos e navegação intuitiva, consolidando-se como uma solução eficaz para o apoio à gestão acadêmica.          `,
        fotos: {
          descricao: "",
          fotos: [  
            "/fotos-features/planodeestudo.png"
          ]
        },      
        conclusao: `
Os resultados obtidos foram, agilidade e melhor direcionamento, no cronograma de estudos. Através deste projeto, obtivemos uma melhor percepção das divisões de um ciclo, na etapa de desenvolvimento, aplicação e teste. E possíveis melhorias, temos o desejo de ampliar a gama de matérias e metodologias de estudos, através de uma coleta de dados das respectivas áreas e melhorar a estrutura do site através da "área de feedbacks" que vamos implementar em breve.
          `
      },
      id: 9
  },
  {           
      titulo: "Simpatico", 
      data: "NOVEMBRO DE 2025",
      descricao: "Utilização para tirar duvidas",
      equipe: [
        "João Gabriel", "Lucas Silva Santos", "Talysson Moura", "João Pedro", "Gabriel Pacheco"                  
      ],    
      topicos: {
        links: {
          descricao:"",
          links:   [
            "https://github.com/joaogabriel343/simpatico-atex.git"          
          ]      
        },
        introducao: `
          Atualização da Interface
        `,
         escolhas: `
         Atualização da Interface e React

        `,
          processo: `        
          Atualização da Interface
          `,
          fotos: {
          descricao: "",
          fotos: [  
            "/fotos-features/simpatico.png",
            "/fotos-features/simpatico2.png"            
          ]
        },      
        conclusao: `
        Atualização da Interface
        `
      },
      id: 9
  },
  
];

export default FEATURES;
