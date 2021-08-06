export function getOffset(el) {
  const rect = el.getBoundingClientRect();
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY,
    width: rect.width,
    midX: rect.left + rect.width / 2,
    midY: rect.top + rect.height / 2,
  };
}
