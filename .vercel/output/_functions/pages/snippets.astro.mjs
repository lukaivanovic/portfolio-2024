import { c as createComponent, a as createAstro, m as maybeRenderHead, b as addAttribute, e as renderTemplate, f as renderComponent } from '../chunks/astro/server_DRB3QQ9E.mjs';
import 'kleur/colors';
import { $ as $$Tsushima, a as $$Layout } from '../chunks/Tsushima_C8hHMLp5.mjs';
import 'clsx';
/* empty css                                    */
export { renderers } from '../renderers.mjs';

const $$Astro$1 = createAstro();
const $$Menu = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Menu;
  const { pathname } = Astro2.url;
  return renderTemplate`${maybeRenderHead()}<nav class="menu-container" data-astro-cid-2j44jlrm> <div class="menu" data-astro-cid-2j44jlrm> <a href="/"${addAttribute(pathname === "/" ? "active" : "", "class")} data-astro-cid-2j44jlrm>Home</a> <a href="/work"${addAttribute(pathname === "/work" ? "active" : "", "class")} data-astro-cid-2j44jlrm>Work</a> <a href="/contact"${addAttribute(pathname === "/contact" ? "active" : "", "class")} data-astro-cid-2j44jlrm>Contact</a> </div> </nav> `;
}, "/Users/lukaivanovic/portfolio/portfolio/portfolio-2024/src/components/Menu.astro", void 0);

const $$Astro = createAstro();
const $$Snippets = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Snippets;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Welcome to Astro.", "data-astro-cid-j7yemjou": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section id="hero" data-astro-cid-j7yemjou> <div class="container px-6 pb-[200px]" data-astro-cid-j7yemjou> <div class="h-12 flex items-center text-primary" data-astro-cid-j7yemjou> <svg xmlns="http://www.w3.org/2000/svg" width="28" height="10" fill="none" viewBox="0 0 28 10" data-astro-cid-j7yemjou> <path fill="currentColor" d="M24 7V6h4v1h-4Z" data-astro-cid-j7yemjou></path> <path fill="currentColor" d="M24 7V6h4v1h-4ZM0 7V6h4v1H0Z" data-astro-cid-j7yemjou></path> <path fill="currentColor" fill-rule="evenodd" d="M18 3h6v4h-1V4h-4v3h-5V6h4V3Zm-8 0H4v4h1V4h4v3h5V6h-4V3Z" clip-rule="evenodd" data-astro-cid-j7yemjou></path> <path fill="currentColor" fill-rule="evenodd" d="M27 1H1v8h26V1ZM0 0v10h28V0H0Z" clip-rule="evenodd" data-astro-cid-j7yemjou></path> </svg> <div class="flex flex-row gap-4 ml-3" data-astro-cid-j7yemjou> <a href="/snippets" data-astro-cid-j7yemjou>Snippets</a> <a href="/contact" data-astro-cid-j7yemjou>Contact</a> </div> </div> <div class="flex flex-col w-full mt-[80px]" data-astro-cid-j7yemjou> <h1 class="max-w-[600px] mb-2" data-astro-cid-j7yemjou>
Independent creative technologist pursuing play with pixels.
</h1> </div> </div> </section> <section data-astro-cid-j7yemjou> <div class="container px-6 pb-[200px]" data-astro-cid-j7yemjou> <div class="masonry" data-astro-cid-j7yemjou> <div class="masonry-item" data-astro-cid-j7yemjou> ${renderComponent($$result2, "Tsushima", $$Tsushima, { "data-astro-cid-j7yemjou": true })} </div> <div class="masonry-item" data-astro-cid-j7yemjou> <img src="/GSH-TCpWYAAr_Jt.jpeg" alt="Tsushima" class="w-full h-auto" data-astro-cid-j7yemjou> </div> <div class="masonry-item" data-astro-cid-j7yemjou> <img src="/branding-01.png" alt="Tsushima" class="w-full h-auto" data-astro-cid-j7yemjou> </div> <div class="masonry-item" data-astro-cid-j7yemjou> <img src="/branding-02.png" alt="Tsushima" class="w-full h-auto" data-astro-cid-j7yemjou> </div> <div class="masonry-item" data-astro-cid-j7yemjou> <img src="/branding-03.png" alt="Tsushima" class="w-full h-auto" data-astro-cid-j7yemjou> </div> <div class="masonry-item" data-astro-cid-j7yemjou> <img src="/branding-04.png" alt="Tsushima" class="w-full h-auto" data-astro-cid-j7yemjou> </div> <div class="masonry-item" data-astro-cid-j7yemjou> <img src="/GWj3xBSWwAAu77k.jpeg" alt="Tsushima" class="w-full h-auto" data-astro-cid-j7yemjou> </div> <div class="masonry-item" data-astro-cid-j7yemjou> <img src="/GZ_xABsWkAEDSon.png" alt="Tsushima" class="w-full h-auto" data-astro-cid-j7yemjou> </div> </div> </div> </section> ${renderComponent($$result2, "Menu", $$Menu, { "data-astro-cid-j7yemjou": true })} ` })} `;
}, "/Users/lukaivanovic/portfolio/portfolio/portfolio-2024/src/pages/snippets.astro", void 0);

const $$file = "/Users/lukaivanovic/portfolio/portfolio/portfolio-2024/src/pages/snippets.astro";
const $$url = "/snippets";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Snippets,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
