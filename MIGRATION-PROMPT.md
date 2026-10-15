# Prompt de migração — cole no seu agente de desenvolvimento

Este repositório é o **novo design** do seu site. O prompt abaixo instrui um agente de IA (Lovable, Cursor, Claude Code, etc.) a trazer toda a parte funcional e os dados reais do seu site atual para dentro deste visual, sem refazer o layout. Copie tudo que está entre as linhas e cole no seu agente, com este repositório aberto.

---

```
CONTEXTO
Você tem dois sites:
1. DESIGN NOVO (este repositório): um site Next.js 15 (App Router, `output: export`, CSS puro)
   com o visual final já pronto — fundo preto "molten", tipografia serifada, acento laranja + cyan.
   NÃO altere o design, a estrutura de componentes nem o CSS. Ele é o alvo.
2. SITE ANTIGO: https://victortech1.vercel.app/ (e as páginas landing-pages.html, apex-law.html,
   fitpulse.html). É a fonte das configurações e integrações reais.

OBJETIVO
Portar tudo que é FUNCIONAL e REAL do site antigo para o design novo, mantendo o visual deste repo
intacto. Trabalhe apenas em arquivos de dados e integrações — não reescreva componentes visuais.

TAREFAS
1. Dados de contato e identidade — confirme/atualize em `app/content.ts`:
   - WhatsApp, Instagram (@victor.tech1), endereço (Seropédica, Jardim Maracanã — RJ), link do Maps.
   - Se algum dado mudou, troque só o valor em `content.ts`.

2. Projetos/portfólio — em `app/content.ts` (`portfolio` e `projectDetails`):
   - Garanta que os links "live" de cada caso (Apex Law, FitPulse, VWK Trader) apontem para as URLs
     reais e no ar. Adicione novos projetos seguindo o mesmo formato de objeto.

3. Automação e formulários — hoje os CTAs abrem o WhatsApp com mensagem pré-preenchida (mock funcional).
   Se o site antigo tiver formulários ou integrações reais (ex.: envio para CRM, webhook, e-mail,
   agendamento), conecte-os:
   - Troque os `href` de WhatsApp pelos endpoints/fluxos reais onde fizer sentido, OU
   - Adicione um formulário real e ligue ao backend que você já usa. Mantenha o estilo das classes CSS
     existentes (`.btn`, `.sim`, `.contact-band`).

4. Assistente N.E.X.U.S. (`components/Nexus.tsx`) — hoje é um mock que leva ao WhatsApp. Se você tinha
   um chatbot/IA real no site antigo, ligue os botões do painel ao fluxo real (ou à sua API), sem mudar
   o visual do componente.

5. Simulador de Faturamento (`components/RevenueSim.tsx`) e a simulação de WhatsApp
   (`components/WhatsAppSim.tsx`) — são réplicas fiéis do site antigo e já funcionam no front-end.
   Só ajuste os números/segmentos em `app/content.ts` (objeto `revenueSim`) se a sua lógica real for outra.

6. SEO e metadados — confira `app/layout.tsx` (title/description), `app/sitemap.ts` e `app/robots.ts`.
   Troque o domínio base (`NEXT_PUBLIC_SITE_URL`) pelo seu domínio final quando tiver um.

REGRAS
- Não mude cores, fontes, animações nem a estrutura das páginas.
- Toda mudança de dado acontece em `app/content.ts` ou `app/posts.ts`.
- Rode `npm run dev` e confira cada seção antes de concluir.
- Rode `npm run build` para garantir que o export estático continua funcionando.

ENTREGUE
Um relatório curto do que foi conectado (contatos, projetos, formulários, integrações) e o que ainda
precisa de credencial/endpoint seu para ficar 100%.
```

---

Depois de rodar o prompt, revise `npm run dev` e dê `git push` — o site publica sozinho no GitHub Pages.
