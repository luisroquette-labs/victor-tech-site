// Conteúdo do site Victor.Tech — migrado fielmente de victortech1.vercel.app,
// reescrito no estilo editorial "Launchpad". Edite aqui para ajustar textos.

export const person = {
  brand: "Victor.Tech",
  name: "Victor",
  role: "Especialista em Sites & Ativos Digitais de Vendas",
  thesis:
    "Landing pages de alta conversão e sites premium em código nativo — ativos digitais que vendem 24 horas por dia.",
  location: "Seropédica, Jardim Maracanã — RJ",
  whatsapp: "5521987215550",
  whatsappLabel: "(21) 98721-5550",
  instagram: "victor.tech1",
  instagramUrl: "https://instagram.com/victor.tech1",
  mapsUrl: "https://maps.google.com/?q=Seropédica,+Jardim+Maracanã+-+RJ",
  mapsEmbed: "https://www.google.com/maps?q=Serop%C3%A9dica,+Jardim+Maracan%C3%A3,+RJ&output=embed",
  dirUrl: "https://www.google.com/maps/dir/?api=1&destination=Serop%C3%A9dica,+Jardim+Maracan%C3%A3,+RJ",
  year: 2026,
};

export const whatsappHref = `https://wa.me/${person.whatsapp}?text=${encodeURIComponent(
  "Olá Victor! Vim pelo site e quero um diagnóstico do meu projeto digital."
)}`;

export const hero = {
  eyebrow: "Desenvolvimento web de elite",
  titleLead: "Páginas de alta conversão que",
  titleAccent: "transformam visitantes em clientes.",
  lead: "Pare de perder vendas com um posicionamento amador no digital. Desenvolvemos landing pages estratégicas e sites premium sob medida para comércios locais e profissionais liberais escalarem seus resultados.",
  ctaPrimary: "Quero avançar agora",
  ctaSecondary: "Ver projetos",
};

// Prompts que o "construtor" digita em loop na caixa — espírito Launchpad.
export const promptExamples = [
  "Crie uma landing page para minha clínica de estética…",
  "Quero um site premium para meu escritório de advocacia…",
  "Monte uma automação de WhatsApp que qualifica meus leads…",
  "Crie uma página de lançamento para o meu aplicativo…",
];

export const bigStat = { n: 320, prefix: "+", suffix: "%", label: "em conversões" };

export const stats = [
  { n: 150, suffix: "+", label: "Projetos entregues" },
  { n: 99.9, suffix: "%", label: "Índice de performance" },
  { n: 1.5, prefix: "< ", suffix: "s", label: "Carregamento médio" },
  { n: 3, suffix: "x+", label: "Aumento em leads" },
];

export const diferenciais = {
  eyebrow: "Diferenciais estratégicos",
  title: "Por que nossas páginas vendem muito mais?",
  lead: "Não criamos apenas layouts. Desenvolvemos estratégias completas unindo psicologia de consumo, engenharia de código limpo e neurodesign.",
  items: [
    {
      k: "01",
      title: "Copywriting direcionado",
      body: "Textos criados para tocar na dor do seu cliente ideal e induzir o clique. Cada palavra tem um propósito: fazer o visitante agir agora.",
    },
    {
      k: "02",
      title: "Estratégia aplicada",
      body: "Cada bloco é pensado logicamente para guiar o usuário até o fechamento. Funil otimizado, menos fricção, mais vendas no fim do mês.",
    },
    {
      k: "03",
      title: "Ultra performance",
      body: "Páginas leves, otimizadas para tráfego pago e carregamento em tempo recorde. Mais velocidade significa mais dinheiro no seu caixa.",
    },
    {
      k: "04",
      title: "Presença de autoridade",
      body: "Um design que eleva o valor percebido da sua marca desde o primeiro segundo. Posicionamento de alto nível que justifica o seu preço.",
    },
  ],
};

export const processo = {
  eyebrow: "Processo",
  title: "Do primeiro contato ao site no ar em menos de 7 dias.",
  lead: "Um processo simples, transparente e sem dor de cabeça.",
  steps: [
    {
      n: "1",
      title: "Diagnóstico",
      body: "Analisamos seu negócio, público-alvo e concorrência. Entendemos sua dor e definimos a estratégia ideal para a sua página.",
    },
    {
      n: "2",
      title: "Desenvolvimento",
      body: "Código nativo, copy estratégico e design premium. Cada pixel é pensado para guiar o visitante até a conversão, sem fricção.",
    },
    {
      n: "3",
      title: "Lançamento",
      body: "Seu site no ar, otimizado para tráfego pago e pronto para converter visitantes em clientes pagantes desde o primeiro dia.",
    },
  ],
};

export const automacao = {
  eyebrow: "Inteligência artificial",
  title: "Automatize seu negócio com IA que trabalha por você.",
  lead: "Enquanto seus concorrentes gastam horas em tarefas repetitivas, sua inteligência artificial resolve em minutos. Criamos automações e IAs sob medida que economizam tempo, dinheiro e liberam você para o que importa: crescer.",
  pillars: [
    {
      tag: "WhatsApp",
      title: "Automação WhatsApp",
      body: "Atendimento 24/7, respostas inteligentes, qualificação de leads e agendamento automático. Seu WhatsApp trabalha enquanto você dorme.",
      chips: ["Chatbot IA", "Fluxos automáticos", "CRM integrado"],
    },
    {
      tag: "Telegram",
      title: "Automação Telegram",
      body: "Bots inteligentes para atendimento, notificações, pedidos e gestão. Integração completa com os seus sistemas internos.",
      chips: ["Bot inteligente", "Notificações", "Pedidos auto"],
    },
    {
      tag: "IA Custom",
      title: "IA sob medida",
      body: "Inteligência artificial exclusiva para o seu negócio. Análise de dados, previsão de demanda, geração de conteúdo e muito mais.",
      chips: ["LLM custom", "Análise de dados", "Multi-agente"],
    },
  ],
  compare: {
    title: "Quanto tempo você está perdendo?",
    lead: "Compare o tempo gasto em tarefas manuais versus com as nossas automações de IA.",
    without: { n: 160, unit: "horas/mês", caption: "Respondendo mensagens, qualificando leads, agendando reuniões e fazendo tarefas repetitivas manualmente." },
    with: { n: 4, unit: "horas/mês", caption: "Apenas acompanhe os resultados. A IA cuida do atendimento, qualificação e agendamento automaticamente." },
    highlights: [
      { n: "97%", label: "Menos tempo em tarefas manuais" },
      { n: "156h", label: "Economizadas por mês" },
      { n: "24/7", label: "Atendimento ininterrupto" },
    ],
    cta: "Criar minha IA agora",
  },
};

// Simulador de faturamento — réplica da calculadora do site atual.
export const revenueSim = {
  eyebrow: "Simulador de faturamento",
  title: "Quanto dinheiro o seu site atual está deixando na mesa?",
  lead: "Simule em tempo real o potencial de retorno que uma landing page de alta performance, com neurodesign e copywriting estratégico, pode gerar para o seu negócio.",
  segments: [
    { label: "Clínica de Estética / Harmonização", lift: 0.05 },
    { label: "Consultório Odontológico", lift: 0.05 },
    { label: "Barbearia Premium / Salão", lift: 0.045 },
    { label: "Escritório de Advocacia", lift: 0.055 },
    { label: "Clínica Médica / Especialista", lift: 0.06 },
    { label: "Serviços / Consultoria Geral", lift: 0.05 },
  ],
  defaultVisitors: 500,
  defaultTicket: 350,
  note: "Baseado em um aumento estimado de conversão de +3% para +8% na sua landing page Victor.Tech.",
  cta: "Garantir este faturamento no WhatsApp",
};

// Simulação de conversa (WhatsApp) — roteiro ilustrativo.
export const whatsappSim = {
  header: "Online — respondendo automaticamente",
  messages: [
    { from: "lead", text: "Oi, vocês fazem avaliação de harmonização facial?" },
    { from: "bot", text: "Olá! 👋 Fazemos sim. Posso já verificar um horário pra você essa semana?" },
    { from: "lead", text: "Pode! Prefiro na parte da tarde." },
    { from: "bot", text: "Perfeito. Tenho quinta 15h ou sexta 16h30. Qual fica melhor?" },
    { from: "lead", text: "Quinta 15h 🙌" },
    { from: "bot", text: "Agendado ✅ Enviei a confirmação e o endereço. Até quinta!" },
  ],
};

export const portfolio = {
  eyebrow: "Casos de sucesso",
  title: "Portfólio de alta performance.",
  lead: "Projetos recentes que combinam velocidade incomparável, design atraente e foco absoluto nos resultados do negócio.",
  items: [
    {
      slug: "vwk-trader",
      name: "VWK Trader",
      kind: "Landing Page",
      tags: ["Alta conversão", "Estratégia"],
      blurb: "Landing page de alta conversão com copywriting persuasivo e estrutura de funil comprovada.",
      live: "",
      metric: "+320% em conversões",
      accent: "orange",
      caption: "Landing page de alta conversão",
    },
    {
      slug: "apex-law",
      name: "Apex Law",
      kind: "Corporate",
      tags: ["Performance", "SEO"],
      blurb: "Landing page sóbria e sofisticada para captação de clientes jurídicos corporativos de alto valor.",
      live: "https://apex-lawyers.com",
      metric: "SEO otimizado",
      accent: "cyan",
      caption: "Página corporativa jurídica",
    },
    {
      slug: "fitpulse",
      name: "FitPulse",
      kind: "App Landing",
      tags: ["Mobile-first", "Lançamento"],
      blurb: "Landing page dinâmica com animações mobile-first para o lançamento de um aplicativo de saúde.",
      live: "https://fitpulse.app",
      metric: "Design vibrante",
      accent: "orange",
      caption: "Lançamento de aplicativo",
    },
  ],
  mini: [
    { n: 150, suffix: "+", label: "Projetos" },
    { n: 3, suffix: "x", label: "Mais leads" },
    { n: 1, prefix: "< ", suffix: "s", label: "Load time" },
  ],
};

// Detalhe de cada caso — migrado das páginas internas do site atual.
export const projectDetails: Record<
  string,
  { label: string; title: string; blurb: string; live: string; features: { title: string; body: string }[]; cta: string }
> = {
  "vwk-trader": {
    label: "Landing Page · Alta conversão",
    title: "VWK Trader",
    blurb: "Página desenvolvida com foco total no cliente ideal, copywriting persuasivo e estrutura de funil comprovada.",
    live: "",
    features: [
      { title: "Copywriting estratégico", body: "Cada linha de texto é construída com base em gatilhos mentais e psicologia de consumo para guiar o visitante até a ação desejada." },
      { title: "Funil de conversão", body: "Estrutura lógica que reduz a fricção e maximiza o número de leads qualificados convertidos em clientes pagantes." },
      { title: "Performance extrema", body: "Código nativo otimizado para tráfego pago. Tempo de carregamento inferior a 1,5 segundo em qualquer dispositivo." },
    ],
    cta: "Quero uma landing page assim",
  },
  "apex-law": {
    label: "Projeto corporativo · Jurídico",
    title: "Apex Law",
    blurb: "Landing page focada em conversão para captação de clientes jurídicos corporativos de alto valor.",
    live: "https://apex-lawyers.com",
    features: [
      { title: "Identidade visual premium", body: "Design sóbrio e sofisticado que transmite autoridade e confiança — pilares essenciais para o segmento jurídico corporativo." },
      { title: "SEO otimizado", body: "Estrutura semântica e técnica preparada para ranqueamento orgânico nas principais palavras-chave do nicho jurídico." },
      { title: "Conversão de alto valor", body: "Funil construído para atrair e qualificar leads corporativos com ticket alto, maximizando o retorno sobre o investimento." },
    ],
    cta: "Quero presença de autoridade",
  },
  fitpulse: {
    label: "App Landing Page · Lançamento",
    title: "FitPulse",
    blurb: "Landing page altamente dinâmica com animações mobile-first para o lançamento de um aplicativo de saúde e rotinas físicas.",
    live: "https://fitpulse.app",
    features: [
      { title: "Animações mobile-first", body: "Transições e micro-interações otimizadas para dispositivos móveis que engajam o usuário desde o primeiro toque." },
      { title: "Design vibrante", body: "Paleta de cores energética e moderna que combina com o segmento de saúde e bem-estar, transmitindo motivação." },
      { title: "Download otimizado", body: "Funil de conversão construído para maximizar downloads na App Store e Google Play com copy irresistível." },
    ],
    cta: "Vou lançar um aplicativo",
  },
};

export const manifesto = {
  lead: "Se o seu negócio existe,",
  accent: "ele precisa vender enquanto você dorme.",
};

export const sobre = {
  eyebrow: "Quem é Victor",
  title: "Especialista em sites e ativos digitais de vendas.",
  mission:
    "Nossa missão é tirar o seu negócio do anonimato digital e estruturar um ativo de vendas 24 horas por dia.",
  body: "Traduzimos a essência de comércios locais e profissionais liberais em plataformas profissionais e focadas em faturamento. Cada projeto é desenvolvido com código limpo e nativo, sem depender de construtores pesados que sacrificam velocidade e performance.",
  bullets: [
    "Código nativo sem WordPress ou Elementor — sites até 10x mais rápidos.",
    "Design validado por psicologia comportamental e UX focado em conversão.",
    "Estrutura otimizada para tráfego pago e escala de resultados.",
  ],
  cta: "Conversar com o Victor",
};

export const contact = {
  eyebrow: "Contato",
  title: "Inicie a sua escala digital hoje.",
  lead: "Fale diretamente com o Victor pelo WhatsApp e receba um diagnóstico gratuito do seu site atual.",
};

export const faq = {
  eyebrow: "Dúvidas",
  title: "Perguntas frequentes",
  items: [
    {
      q: "Por que código nativo e não WordPress ou Elementor?",
      a: "Construtores pesados carregam dezenas de scripts desnecessários e derrubam a velocidade. Código nativo entrega páginas até 10x mais rápidas — e velocidade, no tráfego pago, é dinheiro no seu caixa.",
    },
    {
      q: "Em quanto tempo meu site fica pronto?",
      a: "Do primeiro contato ao site no ar em menos de 7 dias, passando por diagnóstico, desenvolvimento e lançamento. Projetos com automação de IA podem ter um prazo adicional, combinado no diagnóstico.",
    },
    {
      q: "O site é otimizado para anúncios e tráfego pago?",
      a: "Sim. Cada página é construída para carregar em menos de 1,5 segundo e com estrutura de funil pensada para maximizar conversões de campanhas no Meta e no Google.",
    },
    {
      q: "Como funcionam as automações de IA?",
      a: "Criamos chatbots e agentes sob medida para WhatsApp e Telegram que atendem 24/7, qualificam leads e agendam reuniões automaticamente — além de IAs custom para análise de dados e geração de conteúdo.",
    },
    {
      q: "Para quem são esses serviços?",
      a: "Comércios locais e profissionais liberais que querem sair do anonimato digital e transformar o site em um ativo de vendas — clínicas, consultórios, escritórios, salões e consultorias.",
    },
  ],
};

export const nav = [
  { label: "Início", href: "/" },
  { label: "Estratégia", href: "/#diferenciais" },
  { label: "IA & Automação", href: "/#ia" },
  { label: "Projetos", href: "/#projetos" },
  { label: "Blog", href: "/blog" },
  { label: "Sobre", href: "/sobre" },
];
