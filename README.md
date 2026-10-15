# Victor.Tech — novo site (mockup para migração)

Uma releitura completa do seu site ([victortech1.vercel.app](https://victortech1.vercel.app/)) em um estilo **cinematográfico molten/editorial** — fundo preto com veios de lava, tipografia serifada de alto impacto e um toque cyan de tecnologia. Inspiração de layout: a landing da Hotmart Launchpad.

**No ar:** https://luisroquette-labs.github.io/victor-tech-site/

Um presente. O código é seu: edite, troque de hospedagem ou aponte um domínio próprio quando quiser.

## O que já está aqui

Todo o conteúdo do seu site atual foi migrado para o novo visual:

- **Hero** com plasma de lava vivo (canvas) e caixa de prompt que digita exemplos.
- **Stats animados** (+320%, 150+, 99.9%, <1.5s, 3x+).
- **Diferenciais, Processo em 7 dias** (cards em leque), **IA & Automação** (WhatsApp, Telegram, IA custom).
- **Simulação de conversa no WhatsApp** e o **Simulador de Faturamento** interativo (mesma lógica do site atual).
- **Portfólio** (VWK Trader, Apex Law, FitPulse) com páginas de detalhe.
- **Blog** com 4 artigos, páginas `/sobre`, `/blog`, `/projetos/*`, e `sitemap.xml` / `robots.txt`.
- Assistente flutuante **N.E.X.U.S.** e botão de WhatsApp.

Os CTAs já apontam para o seu WhatsApp `(21) 98721-5550`.

## Rodar localmente

```bash
npm install
npm run dev      # http://localhost:3000
```

## Como é publicado

A cada `git push` na `main`, o GitHub Actions compila e publica no GitHub Pages automaticamente (`.github/workflows/deploy.yml`). Você não precisa fazer nada além de dar push.

## Editar o conteúdo

Tudo fica em arquivos de texto:

- `app/content.ts` — nome, bio, serviços, estatísticas, FAQ, contatos, projetos.
- `app/posts.ts` — os artigos do blog.
- `app/globals.css` — todas as cores e o estilo visual.

## Usar um domínio próprio

1. Em `Settings → Pages → Custom domain`, aponte para o seu domínio.
2. Remova o `basePath` do `next.config.mjs` (com domínio próprio o site passa a servir na raiz).

## Migrar as suas configurações para cá

Este repositório é o **novo visual**. Para trazer a parte funcional do seu site atual (integrações, backends, dados reais) para dentro dele sem trabalho manual, use o arquivo **[`MIGRATION-PROMPT.md`](./MIGRATION-PROMPT.md)**: é um prompt pronto para colar no seu agente de desenvolvimento.
