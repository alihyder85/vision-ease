/**
 * Text scaling - scales all text proportionally (80-200%)
 * Allows rem-based sizing to scale with user preference
 */

/**
 * Apply text scaling to the page
 * @param scale - Scale percentage (80-200)
 */
export function applyTextScale(scale: number): void {
  const styleId = 'visionease-textscale';
  let existingStyle = document.getElementById(styleId);

  // Clamp scale to valid range
  const clampedScale = Math.max(80, Math.min(200, scale));

  if (!existingStyle) {
    existingStyle = document.createElement('style');
    existingStyle.id = styleId;
    document.head.appendChild(existingStyle);
  }

  existingStyle.textContent = `html { font-size: ${clampedScale}% !important; }`;
}
