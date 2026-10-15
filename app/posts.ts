export type Block =
  | { t: "p"; v: string }
  | { t: "h2"; v: string }
  | { t: "h3"; v: string }
  | { t: "ul"; v: string[] };

export type Post = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  date: string; // YYYY-MM-DD
  readMin: number;
  body: Block[];
};

export const posts: Post[] = [
  {
    slug: "codigo-nativo-vs-wordpress",
    title: "Código nativo vs. WordPress: por que velocidade virou dinheiro",
    category: "Performance",
    excerpt:
      "Construtores como WordPress e Elementor carregam dezenas de scripts para entregar o que código nativo faz em uma fração do peso. No tráfego pago, cada segundo custa caro.",
    date: "2026-10-10",
    readMin: 6,
    body: [
      { t: "p", v: "Quando um visitante clica no seu anúncio, você já pagou por aquele clique. Se a página demora para abrir, parte desse dinheiro evapora antes mesmo do conteúdo aparecer na tela. É por isso que velocidade deixou de ser um detalhe técnico e virou uma variável direta de faturamento." },
      { t: "h2", v: "O custo escondido dos construtores" },
      { t: "p", v: "Plataformas como WordPress com Elementor são ótimas para publicar rápido, mas pagam esse conforto em peso. Para montar o visual no editor, elas injetam camadas de CSS e JavaScript genéricos, plugins que raramente são usados por completo e um banco de dados consultado a cada visita. O resultado é uma página que precisa baixar, interpretar e executar muito mais do que o necessário para mostrar um título, um texto e um botão." },
      { t: "p", v: "Código nativo faz o caminho inverso: entrega apenas o HTML, o CSS e o mínimo de JavaScript que aquela página realmente precisa. Menos requisições, menos processamento no aparelho do visitante, abertura quase instantânea — especialmente no 4G de celular, onde a maioria dos cliques de anúncio acontece." },
      { t: "h2", v: "Por que o Google penaliza a lentidão" },
      { t: "p", v: "O Google é explícito: velocidade de carregamento é um fator de ranqueamento e de qualidade de anúncio. Páginas lentas recebem um Índice de Qualidade menor, o que encarece o custo por clique e reduz a entrega. Ou seja, a lentidão cobra duas vezes — você perde visitantes que desistem de esperar e ainda paga mais caro por cada um que chega." },
      { t: "h3", v: "O que realmente move o ponteiro" },
      { t: "ul", v: [
        "Imagens otimizadas e servidas no tamanho exato de exibição.",
        "Zero plugins e scripts de terceiros desnecessários rodando no carregamento.",
        "Fontes carregadas com estratégia, sem travar a primeira pintura da tela.",
        "HTML semântico e enxuto, que o navegador desenha de imediato.",
      ] },
      { t: "h2", v: "A conta que importa" },
      { t: "p", v: "Não existe mágica: uma página que abre em menos de 1,5 segundo retém mais gente, converte mais e custa menos no leilão de anúncios. Para um negócio que investe em tráfego pago todo mês, a diferença entre uma página nativa e um site inchado não é estética — é margem." },
    ],
  },
  {
    slug: "anatomia-de-uma-landing-page-que-converte",
    title: "Anatomia de uma landing page que converte",
    category: "Conversão",
    excerpt:
      "Uma boa landing page não é um site bonito com um botão. É uma sequência lógica que reduz fricção e conduz o visitante, bloco a bloco, até a decisão de comprar.",
    date: "2026-10-06",
    readMin: 7,
    body: [
      { t: "p", v: "Toda landing page que vende resolve um único problema: levar uma pessoa que não te conhece do ceticismo à ação. Para isso, ela precisa responder, na ordem certa, as perguntas que passam pela cabeça do visitante — antes que ele feche a aba." },
      { t: "h2", v: "O herói: promessa clara em 5 segundos" },
      { t: "p", v: "O topo da página tem um trabalho só: deixar óbvio o que você faz, para quem e qual transformação entrega. Se o visitante precisa rolar para entender, você já perdeu parte dele. Uma headline direta, um subtítulo que reforça o benefício e um único botão de ação resolvem mais do que qualquer animação." },
      { t: "h2", v: "Prova antes do pedido" },
      { t: "p", v: "Ninguém compra de quem não confia. Depois da promessa, a página precisa sustentá-la: resultados concretos, casos, depoimentos reais, logos de clientes, números verificáveis. A prova social é o que transforma uma afirmação ('somos os melhores') em uma evidência ('veja o que entregamos')." },
      { t: "h3", v: "A estrutura que reduz fricção" },
      { t: "ul", v: [
        "Dor: mostre que você entende o problema melhor que o próprio cliente.",
        "Solução: apresente sua oferta como a ponte entre a dor e o desejo.",
        "Prova: casos, números e depoimentos que sustentam a promessa.",
        "Objeções: antecipe e desarme os 'mas' com um FAQ honesto.",
        "Ação: um CTA repetido, sempre com o mesmo verbo e a mesma cor.",
      ] },
      { t: "h2", v: "Um único objetivo por página" },
      { t: "p", v: "O erro mais comum é querer que a landing page faça tudo: vender, educar, apresentar a empresa e capturar e-mail ao mesmo tempo. Cada botão extra que leva para outro lugar é uma saída pela qual o visitante escapa. Uma página, um objetivo, uma ação. Foco é conversão." },
      { t: "h2", v: "O CTA é uma conversa, não um comando" },
      { t: "p", v: "Botões que dizem 'Enviar' não vendem. Botões que descrevem o que o visitante ganha ('Quero meu diagnóstico gratuito') convertem mais, porque transformam um clique em uma promessa. O texto do botão é, muitas vezes, a linha mais importante da página." },
    ],
  },
  {
    slug: "automacao-whatsapp-com-ia",
    title: "Automação de WhatsApp com IA: o atendente que não dorme",
    category: "Automação",
    excerpt:
      "Responder manualmente cada mensagem não escala e deixa dinheiro na mesa. Um agente de IA bem configurado qualifica, agenda e responde 24/7 — sem perder o tom humano.",
    date: "2026-10-02",
    readMin: 6,
    body: [
      { t: "p", v: "A maioria das vendas locais morre no tempo de resposta. O cliente manda mensagem às 22h, ninguém responde, e no dia seguinte ele já comprou do concorrente que respondeu em dois minutos. Automação de WhatsApp existe para fechar essa janela." },
      { t: "h2", v: "O que uma IA de atendimento realmente faz" },
      { t: "p", v: "Não se trata de um robô que repete respostas prontas. Um agente moderno entende a intenção da mensagem, puxa as informações certas e conduz a conversa em direção a um objetivo: qualificar o lead, tirar dúvidas e agendar. Quando a conversa exige um humano, ele passa o bastão com o contexto já organizado." },
      { t: "h3", v: "As tarefas que a automação assume" },
      { t: "ul", v: [
        "Responder perguntas frequentes no mesmo instante, a qualquer hora.",
        "Qualificar o lead com as perguntas certas antes de ocupar sua agenda.",
        "Agendar reuniões e consultas diretamente, sem troca manual de horários.",
        "Enviar lembretes e confirmações que reduzem faltas.",
      ] },
      { t: "h2", v: "Por que o tom importa tanto" },
      { t: "p", v: "Uma automação mal feita afasta mais do que converte. O segredo está em calibrar o agente com a voz do negócio: linguagem, ritmo, nível de formalidade. O cliente deve sentir que está sendo bem atendido — não que está falando com um formulário disfarçado." },
      { t: "h2", v: "Automação é alavanca, não substituição" },
      { t: "p", v: "O objetivo não é demitir o atendimento humano, e sim livrá-lo do repetitivo. A IA cuida do volume e do primeiro contato; a pessoa entra onde a relação e o fechamento pedem toque humano. É assim que um negócio pequeno passa a atender como um grande — sem aumentar a equipe." },
    ],
  },
  {
    slug: "neurodesign-gatilhos-que-fazem-agir",
    title: "Neurodesign: os gatilhos que fazem o visitante agir",
    category: "Estratégia",
    excerpt:
      "Design de conversão não é sobre o que é bonito, e sim sobre como o cérebro decide. Hierarquia visual, contraste e prova são ferramentas de persuasão — não de decoração.",
    date: "2026-09-28",
    readMin: 5,
    body: [
      { t: "p", v: "Neurodesign é o encontro entre design e a forma como o cérebro processa decisões. A ideia é simples: cada escolha visual de uma página — onde o olho pousa primeiro, o que contrasta, o que repete — influencia silenciosamente a decisão de agir ou sair." },
      { t: "h2", v: "Hierarquia: o olho segue o caminho que você desenha" },
      { t: "p", v: "O visitante não lê a página inteira; ele escaneia. Tamanho, peso e contraste decidem a ordem em que a informação é absorvida. Uma boa hierarquia garante que a promessa, a prova e o botão sejam vistos nessa sequência, mesmo por quem passa os olhos em três segundos." },
      { t: "h3", v: "Gatilhos que funcionam quando são honestos" },
      { t: "ul", v: [
        "Prova social: vemos o que os outros fizeram antes de decidir.",
        "Autoridade: sinais de competência reduzem a percepção de risco.",
        "Escassez e urgência reais: prazos verdadeiros aceleram a decisão.",
        "Clareza: a opção mais fácil de entender quase sempre vence.",
      ] },
      { t: "h2", v: "Contraste é direção, não enfeite" },
      { t: "p", v: "Se tudo na página grita, nada é ouvido. O botão principal deve ser o elemento de maior contraste da tela — uma cor que não aparece em mais nenhum lugar. Essa disciplina cromática é o que faz o olho encontrar a ação sem esforço." },
      { t: "h2", v: "O limite ético" },
      { t: "p", v: "Gatilhos mentais funcionam, mas manipular com escassez falsa ou prova inventada destrói a confiança no primeiro contato — e a confiança é o ativo que sustenta qualquer venda recorrente. Neurodesign bem aplicado torna a melhor decisão também a mais fácil. Nada além disso." },
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
