import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { QuartzComponentProps } from "@quartz-community/types";
import { ReaderMode } from "../src/index";
import { renderToHtml } from "./render";
import { fakeDom } from "./fakeDom";
import { bundleInline, runInline } from "./inlineScript";

const SCRIPT = new URL("../src/components/scripts/readermode.inline.ts", import.meta.url).pathname;

// Quartz's bundler turns the inline import into the script's source; do the same here
vi.mock("../src/components/scripts/readermode.inline.ts", async () => {
  const { bundleInline } = await import("./inlineScript");
  return {
    default: await bundleInline(
      new URL("../src/components/scripts/readermode.inline.ts", import.meta.url).pathname,
    ),
  };
});

const render = (props: Partial<QuartzComponentProps>) =>
  renderToHtml(ReaderMode()({ cfg: {}, ...props } as QuartzComponentProps));

describe("ReaderMode component", () => {
  it("renders a toggle button labelled in the site locale", () => {
    const html = render({ displayClass: "mobile-only" });
    expect(html).toMatch(/^<button class="mobile-only readermode" aria-label="Reader mode">/);
    expect(html).toContain("<title>Reader mode</title>");
    expect(render({ cfg: { locale: "fr-FR" } as QuartzComponentProps["cfg"] })).toContain(
      'aria-label="Mode lecture"',
    );
    expect(render({ cfg: { locale: "xx-XX" } as QuartzComponentProps["cfg"] })).toContain(
      'aria-label="Reader mode"',
    );
  });

  it("ships its script and its CSS", () => {
    const component = ReaderMode();
    expect(component.beforeDOMLoaded).toContain("reader-mode");
    expect(typeof component.css).toBe("string");
  });
});

describe("reader mode script", () => {
  let script: string;
  beforeEach(async () => {
    script ??= await bundleInline(SCRIPT);
  });
  afterEach(() => vi.unstubAllGlobals());

  it("starts off, toggles on click and announces the change", async () => {
    const dom = fakeDom({ buttonClass: "readermode" });
    runInline(script);
    dom.nav();
    expect(dom.attributes.get("reader-mode")).toBe("off");
    const modes: string[] = [];
    dom.document.addEventListener("readermodechange", (e) =>
      modes.push((e as CustomEvent<{ mode: string }>).detail.mode),
    );
    dom.click();
    expect(dom.attributes.get("reader-mode")).toBe("on");
    dom.click();
    expect(dom.attributes.get("reader-mode")).toBe("off");
    expect(modes).toEqual(["on", "off"]);
  });

  it("stays on across SPA navigations and toggles once per click after them", async () => {
    const dom = fakeDom({ buttonClass: "readermode" });
    runInline(script);
    dom.nav();
    dom.click();
    dom.nav();
    expect(dom.attributes.get("reader-mode")).toBe("on");
    dom.click(); // one listener: a stale one from the first page would cancel it out
    expect(dom.attributes.get("reader-mode")).toBe("off");
    dom.nav();
    dom.click();
    expect(dom.attributes.get("reader-mode")).toBe("on");
    dom.click();
    expect(dom.attributes.get("reader-mode")).toBe("off");
  });

  // regression: set up on both `nav` and `render`; encrypted-pages dispatches `render` after
  // unlocking. Each setup used to add another click listener, so a click toggled twice.
  it("toggles once per click after a `render` event (encrypted page unlocked)", async () => {
    const dom = fakeDom({ buttonClass: "readermode" });
    runInline(script);
    dom.nav();
    dom.render();
    dom.click();
    expect(dom.attributes.get("reader-mode")).toBe("on");
  });

  it("keeps one click listener after a nav and two `render`s", async () => {
    const dom = fakeDom({ buttonClass: "readermode" });
    runInline(script);
    dom.nav();
    dom.render();
    dom.render(); // three setups: an odd count would still end on "on", so count events
    const modes: string[] = [];
    dom.document.addEventListener("readermodechange", (e) =>
      modes.push((e as CustomEvent<{ mode: string }>).detail.mode),
    );
    dom.click();
    expect(dom.attributes.get("reader-mode")).toBe("on");
    expect(modes).toEqual(["on"]);
    dom.nav(); // cleanups still detach it: the next page has exactly one listener too
    dom.click();
    expect(modes).toEqual(["on", "off"]);
  });
});
