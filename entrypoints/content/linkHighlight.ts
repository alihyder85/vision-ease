/**
 * Link highlighting - ensures all links are underlined and bold
 * Makes links visually distinct regardless of color
 */

/**
 * Apply link highlighting to the page
 * @param enabled - Whether to enable or disable link highlighting
 */
export function applyLinkHighlight(enabled: boolean): void {
  const styleId = 'visionease-links';
  const existingStyle = document.getElementById(styleId);

  if (enabled && !existingStyle) {
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      a:not([class*="button"]):not([class*="btn"]) {
        text-decoration: underline !important;
        text-decoration-thickness: 2px !important;
        text-underline-offset: 2px !important;
        font-weight: 500 !important;
      }
    `;
    document.head.appendChild(style);
  } else if (!enabled && existingStyle) {
    existingStyle.remove();
  }
}
