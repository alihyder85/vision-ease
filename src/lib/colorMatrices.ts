/**
 * Color blindness correction matrices based on Machado et al. 2009 research
 * "A Physiologically-based Model for Simulation of Color Vision Deficiency"
 * https://www.r1ch.net/stuff/colorblind/machado_et_al_2009.pdf
 *
 * Each matrix is a 20-element array representing the first 4 rows of a 5x5
 * transformation matrix for use with SVG <feColorMatrix> filter.
 */

/** Deuteranopia correction matrix (green color blindness) */
export const DEUTERANOPIA_MATRIX = [
  0.625099, 0.700684, -0.325783, 0,
  0.278538, 0.692361, 0.029101, 0,
  -0.030305, 0.029955, 1.000350, 0,
  0, 0, 0, 1
];

/** Protanopia correction matrix (red color blindness) */
export const PROTANOPIA_MATRIX = [
  0.567, 0.433, 0, 0,
  0.558, 0.442, 0, 0,
  0, 0.242, 0.758, 0,
  0, 0, 0, 1
];

/** Tritanopia correction matrix (blue-yellow color blindness) */
export const TRITANOPIA_MATRIX = [
  0.950, 0.050, 0, 0,
  0, 0.735, 0.265, 0,
  -0.023, 0.468, 0.555, 0,
  0, 0, 0, 1
];

/** Achromatopsia matrix (complete color blindness / grayscale) */
export const ACHROMATOPSIA_MATRIX = [
  0.299, 0.587, 0.114, 0,
  0.299, 0.587, 0.114, 0,
  0.299, 0.587, 0.114, 0,
  0, 0, 0, 1
];
