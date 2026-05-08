import { VisionEaseSettings } from '@/src/lib/types';
import { ToggleRow } from '../ToggleRow';

interface MobilityTabProps {
  settings: VisionEaseSettings;
  onChange: (patch: Partial<VisionEaseSettings>) => void;
}

const SHORTCUTS = [
  { keys: 'Alt+D', action: 'Toggle dark mode' },
  { keys: 'Alt+C', action: 'Toggle high contrast' },
  { keys: 'Alt+H', action: 'Toggle heading overlay' },
  { keys: 'Alt+R', action: 'Read selected text' },
] as const;

export function MobilityTab({ settings, onChange }: MobilityTabProps) {
  return (
    <div className="flex flex-col">
      {/* Interaction toggles */}
      <section aria-labelledby="interactions-heading">
        <h2 id="interactions-heading" className="text-xs uppercase tracking-wider text-gray-400 mb-1">
          Interactions
        </h2>
        <ToggleRow
          label="Larger Click Targets"
          description="Expand buttons and links for easier clicking"
          checked={settings.largeTargets}
          onChange={(v) => onChange({ largeTargets: v })}
        />
        <ToggleRow
          label="Reduce Motion"
          description="Disable animations and transitions on pages"
          checked={settings.reduceMotion}
          onChange={(v) => onChange({ reduceMotion: v })}
        />
        <ToggleRow
          label="Heading Navigation Overlay"
          description="Show heading landmarks on the current page"
          checked={settings.headingOverlay}
          onChange={(v) => onChange({ headingOverlay: v })}
        />
      </section>

      <div className="border-t border-gray-700/60 my-3" />

      {/* Keyboard shortcuts reference card */}
      <section aria-labelledby="shortcuts-heading">
        <h2 id="shortcuts-heading" className="text-xs uppercase tracking-wider text-gray-400 mb-2">
          Keyboard Shortcuts
        </h2>
        <div className="bg-gray-800/80 rounded-xl overflow-hidden border border-gray-700/50">
          {SHORTCUTS.map((s, i) => (
            <div
              key={s.keys}
              className={`flex items-center justify-between px-3 py-2.5 min-h-[44px]
                ${i < SHORTCUTS.length - 1 ? 'border-b border-gray-700/50' : ''}`}
            >
              <span className="text-xs text-gray-300">{s.action}</span>
              <kbd className="bg-gray-700 border border-gray-600 text-gray-200 px-2 py-0.5 rounded text-xs font-mono">
                {s.keys}
              </kbd>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
