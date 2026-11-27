let isReaderMode = false;

const emitReaderModeChangeEvent = (mode: "on" | "off") => {
  const event: CustomEventMap["readermodechange"] = new CustomEvent("readermodechange", {
    detail: { mode },
  });
  document.dispatchEvent(event);
};

// Module scope, so that setting up again (`render` after `nav`, e.g. when encrypted-pages unlocks
// a page) re-adds the same function, which addEventListener ignores.
const switchReaderMode = () => {
  isReaderMode = !isReaderMode;
  const newMode = isReaderMode ? "on" : "off";
  document.documentElement.setAttribute("reader-mode", newMode);
  emitReaderModeChangeEvent(newMode);
};

const setupReaderMode = () => {
  for (const readerModeButton of document.getElementsByClassName("readermode")) {
    readerModeButton.addEventListener("click", switchReaderMode);
    window.addCleanup(() => readerModeButton.removeEventListener("click", switchReaderMode));
  }

  // Set initial state
  document.documentElement.setAttribute("reader-mode", isReaderMode ? "on" : "off");
};

document.addEventListener("nav", setupReaderMode);
document.addEventListener("render", setupReaderMode);
