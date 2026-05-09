/**
 * Cursor enlargement - injects a large, easy-to-see cursor
 */

/**
 * Apply cursor enlargement to the page
 * @param enabled - Whether to enable or disable cursor enlargement
 */
export function applyCursorEnlargement(enabled: boolean): void {
  const styleId = 'visionease-cursor';
  const existingStyle = document.getElementById(styleId);

  if (enabled && !existingStyle) {
    // Create large cursor SVG
    const cursorSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48">
      <circle cx="24" cy="24" r="20" fill="black" opacity="0.8"/>
      <circle cx="24" cy="24" r="18" fill="white"/>
    </svg>`;

    const cursorURL = `url('data:image/svg+xml;utf8,${encodeURIComponent(cursorSVG)}') 24 24, auto`;

    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `* { cursor: ${cursorURL} !important; }`;
    document.head.appendChild(style);
  } else if (!enabled && existingStyle) {
    existingStyle.remove();
  }
}
