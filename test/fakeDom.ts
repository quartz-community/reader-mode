import { vi } from "vitest";

/**
 * Just enough of a browser for an inline component script (no jsdom in this repo): `document` and
 * buttons are real EventTargets, attributes and classes are recorded, `window.addCleanup`
 * collects cleanups the way Quartz's SPA router runs them before the next `nav`.
 */
export function fakeDom(opts: {
  buttonClass: string;
  stored?: Record<string, string>;
  prefersDark?: boolean;
}) {
  const attributes = new Map<string, string>();
  const bodyClasses = new Set<string>();
  const button = new EventTarget();
  const store = new Map(Object.entries(opts.stored ?? {}));
  const darkQuery = Object.assign(new EventTarget(), { matches: opts.prefersDark ?? false });
  let cleanups: (() => void)[] = [];

  const document = Object.assign(new EventTarget(), {
    documentElement: {
      setAttribute: (name: string, value: string) => attributes.set(name, String(value)),
      getAttribute: (name: string) => attributes.get(name) ?? null,
    },
    body: {
      classList: {
        add: (...names: string[]) => names.forEach((n) => bodyClasses.add(n)),
        remove: (...names: string[]) => names.forEach((n) => bodyClasses.delete(n)),
      },
    },
    getElementsByClassName: (name: string) => (name === opts.buttonClass ? [button] : []),
  });
  const window = {
    matchMedia: (query: string) =>
      query.includes("dark") ? darkQuery : { matches: !(opts.prefersDark ?? false) },
    addCleanup: (fn: () => void) => cleanups.push(fn),
  };
  const localStorage = {
    getItem: (key: string) => store.get(key) ?? null,
    setItem: (key: string, value: string) => store.set(key, value),
  };
  vi.stubGlobal("document", document);
  vi.stubGlobal("window", window);
  vi.stubGlobal("localStorage", localStorage);

  return {
    document,
    button,
    darkQuery,
    attributes,
    bodyClasses,
    store,
    click: () => button.dispatchEvent(new Event("click")),
    /** an SPA navigation: run the previous page's cleanups, then `nav` */
    nav: () => {
      cleanups.forEach((fn) => fn());
      cleanups = [];
      document.dispatchEvent(new CustomEvent("nav"));
    },
    render: () => document.dispatchEvent(new CustomEvent("render")),
  };
}
