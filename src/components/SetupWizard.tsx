import { useState } from 'react';
import { VisionEaseSettings } from '@/src/lib/types';
import { saveSettings } from '@/src/lib/storage';

type NeedKey = 'colourBlind' | 'lowVision' | 'dyslexia' | 'motor' | 'blind';

const NEEDS: { key: NeedKey; emoji: string; label: string; desc: string }[] = [
  { key: 'colourBlind', emoji: '👁', label: 'Colour Blindness',     desc: 'Difficulty distinguishing certain colours' },
  { key: 'lowVision',   emoji: '🔍', label: 'Low Vision',           desc: 'Trouble reading small text or dim content' },
  { key: 'dyslexia',    emoji: '📖', label: 'Dyslexia',             desc: 'Processing written words is challenging' },
  { key: 'motor',       emoji: '⌨️', label: 'Motor Difficulty',     desc: 'Precise clicking or typing is difficult' },
  { key: 'blind',       emoji: '👤', label: 'Blind / Screen Reader', desc: 'Rely on assistive technology to navigate' },
];

function buildRecommendations(selected: NeedKey[]): Partial<VisionEaseSettings> {
  const patch: Partial<VisionEaseSettings> = {};
  if (selected.includes('colourBlind')) patch.linkHighlight = true;
  if (selected.includes('lowVision'))   { patch.textScale = 130; patch.brightness = 90; }
  if (selected.includes('dyslexia'))    { patch.dyslexiaFont = true; patch.lineHeight = 20; }
  if (selected.includes('motor'))       { patch.largeTargets = true; patch.reduceMotion = true; }
  if (selected.includes('blind'))       { patch.headingOverlay = true; patch.focusHighlight = true; }
  return patch;
}

function buildBullets(selected: NeedKey[]): string[] {
  const bullets: string[] = [];
  if (selected.includes('colourBlind')) bullets.push('Enable link highlighter so links are always visible');
  if (selected.includes('lowVision'))   bullets.push('Increase text scale to 130% and soften brightness to 90%');
  if (selected.includes('dyslexia'))    bullets.push('Apply OpenDyslexic font and widen line height to 2.0×');
  if (selected.includes('motor'))       bullets.push('Enlarge click targets and disable animations');
  if (selected.includes('blind'))       bullets.push('Enable heading overlay and focus ring highlight');
  return bullets;
}

interface SetupWizardProps {
  onComplete: () => void;
}

export function SetupWizard({ onComplete }: SetupWizardProps) {
  const [screen, setScreen] = useState<1 | 2 | 3>(1);
  const [selected, setSelected] = useState<NeedKey[]>([]);

  const toggle = (key: NeedKey) =>
    setSelected((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );

  const handleConfirm = async () => {
    const patch = buildRecommendations(selected);
    await saveSettings({ ...patch, wizardComplete: true });
    setScreen(3);
  };

  const bullets = buildBullets(selected);

  return (
    <div className="flex flex-col min-h-[420px]">
      {/* ── Screen 1: Select needs ── */}
      {screen === 1 && (
        <div className="flex flex-col flex-1 gap-4 p-4">
          <header>
            <h1 className="text-lg font-bold text-white leading-tight">What describes you?</h1>
            <p className="text-xs text-gray-400 mt-0.5">Select all that apply — you can adjust later</p>
          </header>

          <div className="flex flex-col gap-2 flex-1" role="group" aria-label="Accessibility needs">
            {NEEDS.map((need) => {
              const isSelected = selected.includes(need.key);
              return (
                <button
                  key={need.key}
                  onClick={() => toggle(need.key)}
                  aria-pressed={isSelected}
                  className={`flex items-center gap-3 w-full text-left px-3 py-3 rounded-xl border transition-colors
                    min-h-[44px]
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f1117]
                    ${isSelected
                      ? 'bg-blue-600/25 border-blue-500 text-white'
                      : 'bg-gray-800/70 border-gray-700 text-gray-300 hover:bg-gray-700/70'
                    }`}
                >
                  <span className="text-2xl shrink-0" aria-hidden="true">{need.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium leading-snug">{need.label}</p>
                    <p className="text-xs text-gray-400 leading-snug">{need.desc}</p>
                  </div>
                  {isSelected && (
                    <span className="shrink-0 text-blue-400 font-bold" aria-hidden="true">✓</span>
                  )}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setScreen(2)}
            disabled={selected.length === 0}
            className="w-full py-3 rounded-xl font-medium text-white text-sm transition-colors
              min-h-[44px]
              bg-blue-600 hover:bg-blue-500
              disabled:opacity-40 disabled:cursor-not-allowed
              focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f1117]"
          >
            Next
          </button>
        </div>
      )}

      {/* ── Screen 2: Confirm setup ── */}
      {screen === 2 && (
        <div className="flex flex-col flex-1 gap-4 p-4">
          <header>
            <h1 className="text-lg font-bold text-white leading-tight">Here's what we'll set up</h1>
            <p className="text-xs text-gray-400 mt-0.5">Based on your selections</p>
          </header>

          <ul className="flex flex-col gap-3 flex-1" role="list">
            {bullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-2.5 text-sm text-gray-300 leading-snug">
                <span className="shrink-0 text-blue-400 mt-0.5 font-bold" aria-hidden="true">✓</span>
                {bullet}
              </li>
            ))}
          </ul>

          <div className="flex gap-2">
            <button
              onClick={() => setScreen(1)}
              className="flex-1 py-3 rounded-xl font-medium text-white text-sm transition-colors
                min-h-[44px] bg-gray-700 hover:bg-gray-600
                focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f1117]"
            >
              Back
            </button>
            <button
              onClick={handleConfirm}
              className="flex-1 py-3 rounded-xl font-medium text-white text-sm transition-colors
                min-h-[44px] bg-blue-600 hover:bg-blue-500
                focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f1117]"
            >
              Confirm
            </button>
          </div>
        </div>
      )}

      {/* ── Screen 3: Done ── */}
      {screen === 3 && (
        <div className="flex flex-col flex-1 items-center justify-center gap-5 p-6 text-center">
          <span className="text-5xl" role="img" aria-label="Party popper">🎉</span>
          <div>
            <h1 className="text-lg font-bold text-white">You're all set!</h1>
            <p className="text-sm text-gray-400 mt-1 leading-relaxed max-w-[260px] mx-auto">
              Your accessibility settings have been applied. Adjust them anytime from this popup.
            </p>
          </div>
          <button
            onClick={onComplete}
            className="w-full py-3 rounded-xl font-medium text-white text-sm transition-colors
              min-h-[44px] bg-blue-600 hover:bg-blue-500
              focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f1117]"
          >
            Done
          </button>
        </div>
      )}
    </div>
  );
}
