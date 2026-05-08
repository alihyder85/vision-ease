export interface VisionEaseSettings {
  // Colour blindness filter
  cbFilter: 'none' | 'deuteranopia' | 'protanopia' | 'tritanopia' | 'achromatopsia';
  // Display toggles
  darkMode: boolean;
  highContrast: boolean;
  focusHighlight: boolean;
  readingRuler: boolean;
  cursorEnlarge: boolean;
  linkHighlight: boolean;
  // Display sliders
  brightness: number;   // 30–150
  saturation: number;   // 0–200
  textScale: number;    // 80–200
  // Dyslexia
  dyslexiaFont: boolean;
  letterSpacing: number; // 0–5
  wordSpacing: number;   // 0–10
  lineHeight: number;    // 10–30 (÷10 = actual multiplier, e.g. 15 → 1.5×)
  // Mobility
  reduceMotion: boolean;
  largeTargets: boolean;
  headingOverlay: boolean;
  // Meta
  profiles: Record<string, VisionEaseSettings>;
  wizardComplete: boolean;
}

export const DEFAULT_SETTINGS: VisionEaseSettings = {
  cbFilter: 'none',
  darkMode: false,
  highContrast: false,
  focusHighlight: false,
  readingRuler: false,
  cursorEnlarge: false,
  linkHighlight: false,
  brightness: 100,
  saturation: 100,
  textScale: 100,
  dyslexiaFont: false,
  letterSpacing: 0,
  wordSpacing: 0,
  lineHeight: 15,
  reduceMotion: false,
  largeTargets: false,
  headingOverlay: false,
  profiles: {},
  wizardComplete: false,
};
