import 'kleur/colors';
import { g as decodeKey } from './chunks/astro/server_DRB3QQ9E.mjs';
import 'clsx';
import 'cookie';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_BOrhKRw5.mjs';
import 'es-module-lexer';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/lukaivanovic/portfolio/portfolio/portfolio-2024/","cacheDir":"file:///Users/lukaivanovic/portfolio/portfolio/portfolio-2024/node_modules/.astro/","outDir":"file:///Users/lukaivanovic/portfolio/portfolio/portfolio-2024/dist/","srcDir":"file:///Users/lukaivanovic/portfolio/portfolio/portfolio-2024/src/","publicDir":"file:///Users/lukaivanovic/portfolio/portfolio/portfolio-2024/public/","buildClientDir":"file:///Users/lukaivanovic/portfolio/portfolio/portfolio-2024/dist/client/","buildServerDir":"file:///Users/lukaivanovic/portfolio/portfolio/portfolio-2024/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"stage":"head-inline","children":"window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };\n\t\tvar script = document.createElement('script');\n\t\tscript.defer = true;\n\t\tscript.src = '/_vercel/insights/script.js';\n\t\tvar head = document.querySelector('head');\n\t\thead.appendChild(script);\n\t"}],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"stage":"head-inline","children":"window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };\n\t\tvar script = document.createElement('script');\n\t\tscript.defer = true;\n\t\tscript.src = '/_vercel/insights/script.js';\n\t\tvar head = document.querySelector('head');\n\t\thead.appendChild(script);\n\t"}],"styles":[{"type":"external","src":"/_astro/index.OZ5XHWel.css"},{"type":"inline","content":".menu-container[data-astro-cid-2j44jlrm]{display:flex;position:fixed;bottom:1rem;left:0;right:0;justify-content:center;padding:0;z-index:100}.menu[data-astro-cid-2j44jlrm]{display:flex;background-color:#000;border-radius:2rem;padding:.25rem;gap:.25rem}.menu[data-astro-cid-2j44jlrm] a[data-astro-cid-2j44jlrm]{color:#fff;text-decoration:none;padding:.5rem 1rem;border-radius:1.5rem;transition:background-color .3s ease}.menu[data-astro-cid-2j44jlrm] a[data-astro-cid-2j44jlrm]:hover{background-color:#ffffff1a}.menu[data-astro-cid-2j44jlrm] a[data-astro-cid-2j44jlrm].active{background-color:#333}.masonry[data-astro-cid-j7yemjou]{column-count:3;column-gap:16px}.masonry-item[data-astro-cid-j7yemjou]{display:inline-block;width:100%;margin-bottom:16px}@media (max-width: 768px){.masonry[data-astro-cid-j7yemjou]{column-count:2}}@media (max-width: 480px){.masonry[data-astro-cid-j7yemjou]{column-count:1}}\n"}],"routeData":{"route":"/snippets","isIndex":false,"type":"page","pattern":"^\\/snippets\\/?$","segments":[[{"content":"snippets","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/snippets.astro","pathname":"/snippets","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"stage":"head-inline","children":"window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };\n\t\tvar script = document.createElement('script');\n\t\tscript.defer = true;\n\t\tscript.src = '/_vercel/insights/script.js';\n\t\tvar head = document.querySelector('head');\n\t\thead.appendChild(script);\n\t"}],"styles":[{"type":"external","src":"/_astro/index.OZ5XHWel.css"},{"type":"external","src":"/_astro/index.CNOVqEQy.css"},{"type":"external","src":"/_astro/WwChat.Cnl8-riz.css"},{"type":"external","src":"/_astro/WwAiContext.B-eu1GSJ.css"},{"type":"external","src":"/_astro/AiToggle.DCHBczW6.css"},{"type":"inline","content":".v-enter-active[data-v-92ea8b8c],.v-leave-active[data-v-92ea8b8c]{transition:opacity .5s ease}.v-enter-from[data-v-92ea8b8c],.v-leave-to[data-v-92ea8b8c]{opacity:0}.ww-dialog{--translate-x: 0px;--translate-y: 0px;--translate-x-offset: 0px;--translate-y-offset: 0px;--scale: 1;--calc-translate-x: calc(var(--translate-x) + var(--translate-x-offset));--calc-translate-y: calc(var(--translate-y) + var(--translate-y-offset));transition:transform var(--transition-duration) var(--transition-easing),opacity var(--transition-duration) var(--transition-easing)!important;transform:translate(var(--calc-translate-x)) translateY(var(--calc-translate-y)) scaleX(var(--scale)) scaleY(var(--scale))!important}.fade-transition-enter-active,.fade-transition-leave-active{transition:opacity var(--transition-duration) var(--transition-easing)!important}.fade-transition-enter-from,.fade-transition-leave-to{opacity:0}.slide-in-left-transition-enter-from .ww-dialog{--translate-x-offset: -50%;opacity:0}.slide-in-left-transition-enter-to .ww-dialog,.slide-in-left-transition-leave-from .ww-dialog{--translate-x-offset: 0;opacity:1}.slide-in-left-transition-leave-to .ww-dialog{--translate-x-offset: -50%;opacity:0}.slide-in-right-transition-enter-from .ww-dialog{--translate-x-offset: 50%;opacity:0}.slide-in-right-enter-to .ww-dialog,.slide-in-right-transition-leave-from .ww-dialog{--translate-x-offset: 0;opacity:1}.slide-in-right-transition-leave-to .ww-dialog{--translate-x-offset: 50%;opacity:0}.slide-in-top-transition-enter-from .ww-dialog{--translate-y-offset: -50%;opacity:0}.slide-in-top-enter-to .ww-dialog,.slide-in-top-transition-leave-from .ww-dialog{--translate-y-offset: 0;opacity:1}.slide-in-top-transition-leave-to .ww-dialog{--translate-y-offset: -50%;opacity:0}.slide-in-bottom-transition-enter-from .ww-dialog{--translate-y-offset: 50%;opacity:0}.slide-in-bottom-enter-to .ww-dialog,.slide-in-bottom-transition-leave-from .ww-dialog{--translate-y-offset: 0;opacity:1}.slide-in-bottom-transition-leave-to .ww-dialog{--translate-y-offset: 50%;opacity:0}.zoom-transition-enter-from .ww-dialog,.zoom-transition-leave-to .ww-dialog{--scale: 0;opacity:0}.zoom-transition-enter-to .ww-dialog,.zoom-transition-leave-from .ww-dialog{--scale: 1;opacity:1}.pointer-capture{position:fixed;top:0;left:0;width:100dvw;height:100dvh;pointer-events:auto}.overlay[data-v-5c13340c]{inset:-2;border:1px dashed;@apply border-purple-600;}.overlay[data-v-5c13340c]:after{content:\"OVERLAY\";position:absolute;bottom:2px;right:2px;@apply bg-purple-500;@apply text-purple-100;font-size:9px;font-family:monospace;padding:2px;border-radius:4px;pointer-events:none}.content[data-v-5c13340c]{inset:-2;border:1px dashed;@apply border-orange-400;}.content[data-v-5c13340c]:after{content:\"CONTENT\";position:absolute;top:2px;right:2px;@apply bg-orange-500/50;@apply text-orange-800;font-size:9px;font-family:monospace;padding:2px;border-radius:4px;pointer-events:none}.trigger[data-v-5c13340c]{inset:-2;border:1px dashed;@apply border-cyan-400;}.trigger[data-v-5c13340c]:after{content:\"TRIGGER\";position:absolute;top:calc(50% - 9px);left:calc(100% + 4px);@apply bg-cyan-500/50;@apply text-cyan-800;font-size:9px;font-family:monospace;padding:2px;border-radius:4px;pointer-events:none}\n"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/lukaivanovic/portfolio/portfolio/portfolio-2024/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/Users/lukaivanovic/portfolio/portfolio/portfolio-2024/src/pages/snippets.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/snippets@_@astro":"pages/snippets.astro.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000noop-actions":"_noop-actions.mjs","/Users/lukaivanovic/portfolio/portfolio/portfolio-2024/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_E1PDWuj1.mjs","\u0000@astrojs-manifest":"manifest_DFR_yJP2.mjs","/Users/lukaivanovic/portfolio/portfolio/portfolio-2024/src/components/ww/dialog/DialogPreview.vue":"_astro/DialogPreview.B8p4KDOl.js","/Users/lukaivanovic/portfolio/portfolio/portfolio-2024/src/components/ww/AiToggle.vue":"_astro/AiToggle.lCZnt0IC.js","/Users/lukaivanovic/portfolio/portfolio/portfolio-2024/src/components/ww/WwAiContext.vue":"_astro/WwAiContext.Czak0a9l.js","/Users/lukaivanovic/portfolio/portfolio/portfolio-2024/src/components/ww/WwChat.vue":"_astro/WwChat.Cx_LsiEa.js","@astrojs/vue/client.js":"_astro/client.CmF2VIC4.js","/Users/lukaivanovic/portfolio/portfolio/portfolio-2024/src/pages/index.astro?astro&type=script&index=0&lang.ts":"_astro/index.astro_astro_type_script_index_0_lang.X8OMJiQP.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/Users/lukaivanovic/portfolio/portfolio/portfolio-2024/src/pages/index.astro?astro&type=script&index=0&lang.ts","document.addEventListener(\"DOMContentLoaded\",()=>{document.getElementById(\"theme-toggle\").addEventListener(\"click\",t=>{t.preventDefault(),document.body.classList.toggle(\"dark-mode\");const d=document.body.classList.contains(\"dark-mode\");localStorage.setItem(\"darkMode\",d?\"true\":\"false\")});const e=localStorage.getItem(\"darkMode\");e===\"false\"?document.body.classList.remove(\"dark-mode\"):e===\"true\"&&document.body.classList.add(\"dark-mode\")});"]],"assets":["/_astro/icons.DK2XcFoR.png","/_astro/test2.B1UGtiT5.jpg","/_astro/workflows.iVPS5zyT.jpg","/_astro/bg2.BrheNs3p.png","/_astro/index.OZ5XHWel.css","/_astro/index.CNOVqEQy.css","/Frame 2087328464.png","/GSH-TCpWYAAr_Jt.jpeg","/GWj3xBSWwAAu77k.jpeg","/GZ_xABsWkAEDSon.png","/apollon.png","/branding-01.png","/branding-02.png","/branding-03.png","/branding-04.png","/favicon.svg","/illustration.png","/og-image.png","/pattern.png","/test.png","/test.svg","/twitter-image.png","/_astro/AiToggle.DCHBczW6.css","/_astro/AiToggle.lCZnt0IC.js","/_astro/DialogPreview.B8p4KDOl.js","/_astro/WwAiContext.B-eu1GSJ.css","/_astro/WwAiContext.Czak0a9l.js","/_astro/WwChat.Cnl8-riz.css","/_astro/WwChat.Cx_LsiEa.js","/_astro/_plugin-vue_export-helper.DlAUqK2U.js","/_astro/client.CmF2VIC4.js","/_astro/runtime-core.esm-bundler.ChDNPKXW.js","/_astro/runtime-dom.esm-bundler.B4lLzrDj.js","/fonts/TWKLausanne-350.otf","/fonts/TWKLausanne-350.ttf","/fonts/TWKLausanne-450.woff2"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"KFspfPtffIaKtKVlL9X0rbg7r0sS2/fwDKFpaYXQ8Yg="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
