/**
 * Dark mode image fix - re-inverts images when dark mode is enabled
 * Keeps images and videos rendered in natural colors despite page inversion
 */

/**
 * Apply dark mode image fix to the page
 * @param darkModeEnabled - Whether dark mode is currently enabled
 */
export function applyDarkModeImageFix(darkModeEnabled: boolean): void {
  const styleId = 'visionease-imgfix';
  const existingStyle = document.getElementById(styleId);

  if (darkModeEnabled && !existingStyle) {
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      img, video, iframe, [style*="background-image"] {
        filter: invert(1) hue-rotate(180deg) !important;
      }
    `;
    document.head.appendChild(style);
  } else if (!darkModeEnabled && existingStyle) {
    existingStyle.remove();
  }
}
