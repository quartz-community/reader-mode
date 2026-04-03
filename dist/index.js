import { classNames } from '@quartz-community/utils/lang';
import { jsx, jsxs } from 'preact/jsx-runtime';

// src/util/lang.ts

// src/i18n/locales/en-US.ts
var en_US_default = {
  components: {
    readerMode: {
      title: "Reader mode"
    }
  }
};

// src/i18n/index.ts
var locales = {
  "en-US": en_US_default
};
function i18n(locale) {
  return locales[locale] || en_US_default;
}

// src/components/scripts/readermode.inline.ts
var readermode_inline_default = 'var n=!1,o=t=>{let e=new CustomEvent("readermodechange",{detail:{mode:t}});document.dispatchEvent(e)},d=()=>{let t=()=>{n=!n;let e=n?"on":"off";document.documentElement.setAttribute("reader-mode",e),o(e)};for(let e of document.getElementsByClassName("readermode"))e.addEventListener("click",t),window.addCleanup(()=>e.removeEventListener("click",t));document.documentElement.setAttribute("reader-mode",n?"on":"off")};document.addEventListener("nav",d);document.addEventListener("render",d);\n';

// src/components/styles/readermode.scss
var readermode_default = ".readermode {\n  cursor: pointer;\n  padding: 0;\n  position: relative;\n  background: none;\n  border: none;\n  width: 20px;\n  height: 32px;\n  margin: 0;\n  text-align: inherit;\n  flex-shrink: 0;\n}\n.readermode svg {\n  position: absolute;\n  width: 20px;\n  height: 20px;\n  top: calc(50% - 10px);\n  fill: var(--darkgray);\n  stroke: var(--darkgray);\n  transition: opacity 0.1s ease;\n}\n\n:root[reader-mode=on] .sidebar.left, :root[reader-mode=on] .sidebar.right {\n  opacity: 0;\n  transition: opacity 0.2s ease;\n}\n:root[reader-mode=on] .sidebar.left:hover, :root[reader-mode=on] .sidebar.right:hover {\n  opacity: 1;\n}";
var ReaderMode = ({ displayClass, cfg }) => {
  const title = i18n(cfg?.locale ?? "en-US").components.readerMode.title;
  return /* @__PURE__ */ jsx("button", { class: classNames(displayClass, "readermode"), children: /* @__PURE__ */ jsxs(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      xmlnsXlink: "http://www.w3.org/1999/xlink",
      version: "1.1",
      class: "readerIcon",
      fill: "currentColor",
      stroke: "currentColor",
      "stroke-width": "0.2",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      width: "64px",
      height: "64px",
      viewBox: "0 0 24 24",
      "aria-label": title,
      children: [
        /* @__PURE__ */ jsx("title", { children: title }),
        /* @__PURE__ */ jsx("g", { transform: "translate(-1.8, -1.8) scale(1.15, 1.2)", children: /* @__PURE__ */ jsx("path", { d: "M8.9891247,2.5 C10.1384702,2.5 11.2209868,2.96705384 12.0049645,3.76669482 C12.7883914,2.96705384 13.8709081,2.5 15.0202536,2.5 L18.7549359,2.5 C19.1691495,2.5 19.5049359,2.83578644 19.5049359,3.25 L19.5046891,4.004 L21.2546891,4.00457396 C21.6343849,4.00457396 21.9481801,4.28672784 21.9978425,4.6528034 L22.0046891,4.75457396 L22.0046891,20.25 C22.0046891,20.6296958 21.7225353,20.943491 21.3564597,20.9931534 L21.2546891,21 L2.75468914,21 C2.37499337,21 2.06119817,20.7178461 2.01153575,20.3517706 L2.00468914,20.25 L2.00468914,4.75457396 C2.00468914,4.37487819 2.28684302,4.061083 2.65291858,4.01142057 L2.75468914,4.00457396 L4.50368914,4.004 L4.50444233,3.25 C4.50444233,2.87030423 4.78659621,2.55650904 5.15267177,2.50684662 L5.25444233,2.5 L8.9891247,2.5 Z M4.50368914,5.504 L3.50468914,5.504 L3.50468914,19.5 L10.9478955,19.4998273 C10.4513189,18.9207296 9.73864328,18.5588115 8.96709342,18.5065584 L8.77307039,18.5 L5.25444233,18.5 C4.87474657,18.5 4.56095137,18.2178461 4.51128895,17.8517706 L4.50444233,17.75 L4.50368914,5.504 Z M19.5049359,17.75 C19.5049359,18.1642136 19.1691495,18.5 18.7549359,18.5 L15.2363079,18.5 C14.3910149,18.5 13.5994408,18.8724714 13.0614828,19.4998273 L20.5046891,19.5 L20.5046891,5.504 L19.5046891,5.504 L19.5049359,17.75 Z M18.0059359,3.999 L15.0202536,4 L14.8259077,4.00692283 C13.9889509,4.06666544 13.2254227,4.50975805 12.7549359,5.212 L12.7549359,17.777 L12.7782651,17.7601316 C13.4923805,17.2719483 14.3447024,17 15.2363079,17 L18.0059359,16.999 L18.0056891,4.798 L18.0033792,4.75457396 L18.0056891,4.71 L18.0059359,3.999 Z M8.9891247,4 L6.00368914,3.999 L6.00599909,4.75457396 L6.00599909,4.75457396 L6.00368914,4.783 L6.00368914,16.999 L8.77307039,17 C9.57551536,17 10.3461406,17.2202781 11.0128313,17.6202194 L11.2536891,17.776 L11.2536891,5.211 C10.8200889,4.56369974 10.1361548,4.13636104 9.37521067,4.02745763 L9.18347055,4.00692283 L8.9891247,4 Z" }) })
      ]
    }
  ) });
};
ReaderMode.beforeDOMLoaded = readermode_inline_default;
ReaderMode.css = readermode_default;
var ReaderMode_default = (() => ReaderMode);

export { ReaderMode_default as ReaderMode };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map