import { VisionEaseSettings } from '@/src/lib/types';
import { ToggleRow } from '../ToggleRow';
import { SliderRow } from '../SliderRow';

const CB_OPTIONS = [
  { value: 'none', label: 'None' },
  { value: 'deuteranopia', label: 'Deuteranopia' },
  { value: 'protanopia', label: 'Protanopia' },
  { value: 'tritanopia', label: 'Tritanopia' },
  { value: 'achromatopsia', label: 'Achromato.' },
] as const;

interface VisionTabProps {
  settings: VisionEaseSettings;
  onChange: (patch: Partial<VisionEaseSettings>) => void;
}

export function VisionTab({ settings, onChange }: VisionTabProps) {
  return (
    <div className="flex flex-col">
      {/* Colour blindness filter */}
      <section aria-labelledby="cb-heading">
        <h2 id="cb-heading" className="text-xs uppercase tracking-wider text-gray-400 mb-2">
          Colour Filter
        </h2>
        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Colour blindness filter">
          {CB_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => onChange({ cbFilter: opt.value })}
              aria-pressed={settings.cbFilter === opt.value}
              className={`px-3 py-2 rounded-full text-xs font-medium transition-colors
                min-h-[44px] min-w-[44px]
                focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900
                ${settings.cbFilter === opt.value
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </section>

      <div className="border-t border-gray-700/60 my-3" />

      {/* Display toggles */}
      <section aria-labelledby="display-heading">
        <h2 id="display-heading" className="text-xs uppercase tracking-wider text-gray-400 mb-1">
          Display
        </h2>
        <ToggleRow
          label="Dark Mode"
          description="Invert page colours for low-light use"
          checked={settings.darkMode}
          onChange={(v) => onChange({ darkMode: v })}
        />
        <ToggleRow
          label="High Contrast"
          description="Sharpen text and UI edges"
          checked={settings.highContrast}
          onChange={(v) => onChange({ highContrast: v })}
        />
        <ToggleRow
          label="Focus Highlight"
          description="Ring around the focused element"
          checked={settings.focusHighlight}
          onChange={(v) => onChange({ focusHighlight: v })}
        />
        <ToggleRow
          label="Reading Ruler"
          description="Horizontal guide follows the cursor"
          checked={settings.readingRuler}
          onChange={(v) => onChange({ readingRuler: v })}
        />
        <ToggleRow
          label="Cursor Enlargement"
          description="Bigger mouse cursor on all pages"
          checked={settings.cursorEnlarge}
          onChange={(v) => onChange({ cursorEnlarge: v })}
        />
        <ToggleRow
          label="Link Highlighter"
          description="Underline and colour all links"
          checked={settings.linkHighlight}
          onChange={(v) => onChange({ linkHighlight: v })}
        />
      </section>

      <div className="border-t border-gray-700/60 my-3" />

      {/* Sliders */}
      <section aria-labelledby="adjust-heading">
        <h2 id="adjust-heading" className="text-xs uppercase tracking-wider text-gray-400 mb-1">
          Adjustments
        </h2>
        <SliderRow
          label="Text Scale"
          value={settings.textScale}
          min={80}
          max={200}
          step={5}
          unit="%"
          onChange={(v) => onChange({ textScale: v })}
        />
        <SliderRow
          label="Brightness"
          value={settings.brightness}
          min={30}
          max={150}
          step={5}
          unit="%"
          onChange={(v) => onChange({ brightness: v })}
        />
        <SliderRow
          label="Saturation"
          value={settings.saturation}
          min={0}
          max={200}
          step={5}
          unit="%"
          onChange={(v) => onChange({ saturation: v })}
        />
      </section>
    </div>
  );
}
