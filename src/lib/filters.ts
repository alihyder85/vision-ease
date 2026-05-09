import { VisionEaseSettings } from './types';
import {
  DEUTERANOPIA_MATRIX,
  PROTANOPIA_MATRIX,
  TRITANOPIA_MATRIX,
  ACHROMATOPSIA_MATRIX,
} from './colorMatrices';

/**
 * Build an SVG filter data URL for color blindness correction
 * @param matrix - 20-element array of feColorMatrix values
 * @returns SVG data URL for use in CSS filter property
 */
export function buildColorBlindnessSVG(matrix: number[]): string {
  // Create SVG with feColorMatrix filter
  const svgContent = `
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        <filter id="colorblind" color-interpolation-filters="linearRGB">
          <feColorMatrix type="matrix" values="${matrix.join(' ')}"/>
        </filter>
      </defs>
    </svg>
  `;

  // URL-encode the SVG for use in CSS filter
  const encodedSVG = svgContent
    .trim()
    .replace(/[\n\r]/g, '')
    .replace(/['"]/g, "'");

  return `url('data:image/svg+xml;utf8,${encodeURIComponent(encodedSVG)}')`;
}

/**
 * Build complete CSS filter string from VisionEase settings
 * @param settings - Current accessibility settings
 * @returns Space-separated CSS filter string
 */
export function buildFilterCSS(settings: VisionEaseSettings): string {
  const filters: string[] = [];

  // 1. Color blindness filter (if enabled)
  if (settings.cbFilter !== 'none') {
    let matrix: number[];

    switch (settings.cbFilter) {
      case 'deuteranopia':
        matrix = DEUTERANOPIA_MATRIX;
        break;
      case 'protanopia':
        matrix = PROTANOPIA_MATRIX;
        break;
      case 'tritanopia':
        matrix = TRITANOPIA_MATRIX;
        break;
      case 'achromatopsia':
        matrix = ACHROMATOPSIA_MATRIX;
        break;
      default:
        matrix = ACHROMATOPSIA_MATRIX;
    }

    const svgUrl = buildColorBlindnessSVG(matrix);
    filters.push(svgUrl);
  }

  // 2. Dark mode inversion
  if (settings.darkMode) {
    filters.push('invert(1) hue-rotate(180deg)');
  }

  // 3. High contrast
  if (settings.highContrast) {
    filters.push('contrast(1.5)');
  }

  // 4. Brightness — only apply when non-default
  if (settings.brightness !== 100) {
    const brightnessPercent = Math.max(30, Math.min(150, settings.brightness));
    filters.push(`brightness(${brightnessPercent / 100})`);
  }

  // 5. Saturation — only apply when non-default
  if (settings.saturation !== 100) {
    const saturationPercent = Math.max(0, Math.min(200, settings.saturation));
    filters.push(`saturate(${saturationPercent / 100})`);
  }

  return filters.join(' ');
}
