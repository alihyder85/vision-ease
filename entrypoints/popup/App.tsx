import { useEffect, useState } from 'react';
import { VisionEaseSettings } from '@/src/lib/types';
import { getSettings, saveSettings } from '@/src/lib/storage';
import { SetupWizard } from '@/src/components/SetupWizard';
import { ProfileManager } from '@/src/components/ProfileManager';
import { VisionTab } from '@/src/components/tabs/VisionTab';
import { DyslexiaTab } from '@/src/components/tabs/DyslexiaTab';
import { MobilityTab } from '@/src/components/tabs/MobilityTab';

type TabId = 'vision' | 'dyslexia' | 'mobility';

const TABS: { id: TabId; emoji: string; label: string }[] = [
  { id: 'vision',   emoji: '👁',  label: 'Vision'  },
  { id: 'dyslexia', emoji: '📖', label: 'Dyslexia' },
  { id: 'mobility', emoji: '⌨️', label: 'Mobility' },
];

function App() {
  const [settings, setSettings] = useState<VisionEaseSettings | null>(null);
  const [activeTab, setActiveTab] = useState<TabId>('vision');

  useEffect(() => {
    getSettings().then(setSettings);
  }, []);

  // Optimistic update: reflect in state immediately, persist in background
  const handleChange = async (patch: Partial<VisionEaseSettings>) => {
    if (!settings) return;
    setSettings((prev) => (prev ? { ...prev, ...patch } : prev));
    await saveSettings(patch);
  };

  const handleWizardComplete = async () => {
    const updated = await getSettings();
    setSettings(updated);
  };

  // ── Loading ──
  if (!settings) {
    return (
      <div className="w-[340px] h-32 bg-[#0f1117] flex items-center justify-center">
        <span className="text-gray-400 text-sm">Loading…</span>
      </div>
    );
  }

  // ── First-run wizard ──
  if (!settings.wizardComplete) {
    return (
      <div className="w-[340px] bg-[#0f1117]">
        <SetupWizard onComplete={handleWizardComplete} />
      </div>
    );
  }

  // ── Main popup ──
  return (
    <div className="w-[340px] bg-[#0f1117] flex flex-col">
      {/* Header */}
      <div className="px-4 pt-4 pb-2">
        <h1 className="text-base font-bold text-white leading-tight tracking-tight">VisionEase</h1>
        <p className="text-xs text-gray-500 leading-tight">Accessibility extension</p>
      </div>

      {/* Profile manager */}
      <div className="px-3 pb-2">
        <ProfileManager settings={settings} onLoad={handleChange} />
      </div>

      {/* Tab bar */}
      <div
        className="flex border-b border-gray-700/60 px-2"
        role="tablist"
        aria-label="Settings sections"
      >
        {TABS.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            id={`tab-${tab.id}`}
            aria-selected={activeTab === tab.id}
            aria-controls={`panel-${tab.id}`}
            tabIndex={activeTab === tab.id ? 0 : -1}
            onClick={() => setActiveTab(tab.id)}
            onKeyDown={(e) => {
              const idx = TABS.findIndex((t) => t.id === tab.id);
              if (e.key === 'ArrowRight') setActiveTab(TABS[(idx + 1) % TABS.length].id);
              if (e.key === 'ArrowLeft')  setActiveTab(TABS[(idx + TABS.length - 1) % TABS.length].id);
            }}
            className={`flex-1 py-2.5 flex items-center justify-center gap-1.5
              text-xs font-medium border-b-2 transition-colors min-h-[44px]
              focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-inset
              ${activeTab === tab.id
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
          >
            <span aria-hidden="true">{tab.emoji}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab panels */}
      <div className="px-3 py-2 overflow-y-auto" style={{ maxHeight: '440px' }}>
        <div
          id="panel-vision"
          role="tabpanel"
          aria-labelledby="tab-vision"
          hidden={activeTab !== 'vision'}
        >
          {activeTab === 'vision' && (
            <VisionTab settings={settings} onChange={handleChange} />
          )}
        </div>
        <div
          id="panel-dyslexia"
          role="tabpanel"
          aria-labelledby="tab-dyslexia"
          hidden={activeTab !== 'dyslexia'}
        >
          {activeTab === 'dyslexia' && (
            <DyslexiaTab settings={settings} onChange={handleChange} />
          )}
        </div>
        <div
          id="panel-mobility"
          role="tabpanel"
          aria-labelledby="tab-mobility"
          hidden={activeTab !== 'mobility'}
        >
          {activeTab === 'mobility' && (
            <MobilityTab settings={settings} onChange={handleChange} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
