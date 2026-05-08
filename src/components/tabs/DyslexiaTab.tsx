import { VisionEaseSettings } from '@/src/lib/types';
import { ToggleRow } from '../ToggleRow';
import { SliderRow } from '../SliderRow';

interface DyslexiaTabProps {
  settings: VisionEaseSettings;
  onChange: (patch: Partial<VisionEaseSettings>) => void;
}

export function DyslexiaTab({ settings, onChange }: DyslexiaTabProps) {
  return (
    <div className="flex flex-col">
      {/* Font */}
      <section aria-labelledby="font-heading">
        <h2 id="font-heading" className="text-xs uppercase tracking-wider text-gray-400 mb-1">
          Font
        </h2>
        <ToggleRow
          label="OpenDyslexic Font"
          description="Apply dyslexia-friendly typeface to all pages"
          checked={settings.dyslexiaFont}
          onChange={(v) => onChange({ dyslexiaFont: v })}
        />
      </section>

      <div className="border-t border-gray-700/60 my-3" />

      {/* Spacing */}
      <section aria-labelledby="spacing-heading">
        <h2 id="spacing-heading" className="text-xs uppercase tracking-wider text-gray-400 mb-1">
          Spacing
        </h2>
        <SliderRow
          label="Letter Spacing"
          value={settings.letterSpacing}
          min={0}
          max={5}
          step={0.5}
          unit="px"
          onChange={(v) => onChange({ letterSpacing: v })}
        />
        <SliderRow
          label="Word Spacing"
          value={settings.wordSpacing}
          min={0}
          max={10}
          step={1}
          unit="px"
          onChange={(v) => onChange({ wordSpacing: v })}
        />
        <SliderRow
          label="Line Height"
          value={settings.lineHeight}
          min={10}
          max={30}
          step={1}
          unit="×"
          format={(v) => `${(v / 10).toFixed(1)}×`}
          onChange={(v) => onChange({ lineHeight: v })}
        />
      </section>

      <div className="border-t border-gray-700/60 my-3" />

      {/* TTS info box */}
      <div
        role="note"
        className="bg-blue-950/60 border border-blue-700/50 rounded-xl p-3"
      >
        <p className="text-xs font-semibold text-blue-300 mb-1">Text-to-speech</p>
        <p className="text-xs text-blue-200/80 leading-relaxed">
          Select any text on a page and press{' '}
          <kbd className="bg-blue-800/80 border border-blue-600 text-blue-100 px-1.5 py-0.5 rounded text-[11px] font-mono">
            Alt+R
          </kbd>{' '}
          to hear it read aloud.
        </p>
      </div>
    </div>
  );
}
