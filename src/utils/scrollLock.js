// Reference-counted body scroll lock. Reserves the scrollbar gutter so the
// page behind a modal keeps its exact width instead of reflowing wider.
let locks = 0;

export function lockScroll() {
  if (locks === 0) {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;
  }
  locks += 1;
}

export function unlockScroll() {
  locks = Math.max(0, locks - 1);
  if (locks === 0) {
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
  }
}
