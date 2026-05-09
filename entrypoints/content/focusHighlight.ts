/**
 * Focus highlighting - adds visible blue focus rings to interactive elements
 * Improves keyboard navigation accessibility
 */

/**
 * Apply focus highlighting to the page
 * @param enabled - Whether to enable or disable focus highlighting
 */
export function applyFocusHighlight(enabled: boolean): void {
  const styleId = 'visionease-focus';
  const existingStyle = document.getElementById(styleId);

  if (enabled && !existingStyle) {
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      *:focus {
        outline: 3px solid #4f9cf9 !important;
        outline-offset: 2px !important;
        box-shadow: 0 0 0 3px rgba(79, 156, 249, 0.3) !important;
      }
    `;
    document.head.appendChild(style);
  } else if (!enabled && existingStyle) {
    existingStyle.remove();
  }
}
