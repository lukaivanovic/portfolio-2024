import { c as createComponent, a as createAstro, b as addAttribute, r as renderHead, d as renderSlot, e as renderTemplate, m as maybeRenderHead } from './astro/server_DRB3QQ9E.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                         */

const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="description" content="Software designer portfolio."><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><meta property="og:title"${addAttribute(title, "content")}><meta property="og:description" content="Software designer portfolio."><meta property="og:image" content="https://ivanovicluka.co/og-image.png"><meta property="og:url" content="https://lukaivanovic.co"><meta property="og:type" content="website"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:site" content="@lukaivnvc"><meta name="twitter:title" content="Luka Ivanovic © 2024"><meta name="twitter:description" content="Software designer"><meta name="twitter:image" content="https://ivanovicluka.co/twitter-image.png"><title>Luka Ivanovic</title>${renderHead()}</head> <body class="antialiased dark-mode relative"> ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "/Users/lukaivanovic/portfolio/portfolio/portfolio-2024/src/layouts/Layout.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Tsushima = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate(_a || (_a = __template(["", '<div id="tsushima-container" data-astro-cid-5cromubv> <!-- Three.js will render here --> </div> <script type="module" src="/src/components/tsushima/src/main.js"><\/script> '])), maybeRenderHead());
}, "/Users/lukaivanovic/portfolio/portfolio/portfolio-2024/src/components/tsushima/Tsushima.astro", void 0);

export { $$Tsushima as $, $$Layout as a };
