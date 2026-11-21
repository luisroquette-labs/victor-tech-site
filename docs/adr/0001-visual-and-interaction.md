# 0001 — Visual and interaction choices

## Context

The site adapts Victor.Tech's earlier content into an editorial presentation inspired by Hotmart Launchpad. It uses scroll-driven animation and a WebGL background while keeping a static view for mobile devices and reduced-motion users.

## Decision

- Use Newsreader as the free transitional-serif alternative to the reference display font and Inter for body text and labels.
- Render the hero's orange lava effect with a recolored, raw-WebGL adaptation of chamaac's “Electric Mist” shader. The shader keeps dark bands and a dim center so foreground text remains legible.
- Synthesize interaction sounds with Web Audio. Audio is unlocked after the first user gesture because browsers restrict autoplay.
- Let JavaScript control the gallery card transforms during scrolling; CSS does not override those transforms on hover. The static gallery remains available on mobile and when reduced motion is requested.

## Consequences

The page does not need image or audio assets for these effects. Scroll and shader behavior still depend on browser support; the static and reduced-motion paths preserve the content.
