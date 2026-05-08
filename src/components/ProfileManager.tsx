import { useState } from 'react';
import { VisionEaseSettings } from '@/src/lib/types';
import { saveSettings } from '@/src/lib/storage';

interface ProfileManagerProps {
  settings: VisionEaseSettings;
  onLoad: (patch: Partial<VisionEaseSettings>) => void;
}

export function ProfileManager({ settings, onLoad }: ProfileManagerProps) {
  const [selectedProfile, setSelectedProfile] = useState('');
  const [newProfileName, setNewProfileName] = useState('');

  const profileNames = Object.keys(settings.profiles);

  const handleSave = async () => {
    const name = newProfileName.trim();
    if (!name) return;
    // Strip meta fields before storing so profiles don't nest infinitely
    const { profiles: _p, wizardComplete: _w, ...settingsToSave } = settings;
    const profileEntry: VisionEaseSettings = {
      ...settingsToSave,
      profiles: {},
      wizardComplete: true,
    };
    const updatedProfiles = { ...settings.profiles, [name]: profileEntry };
    await saveSettings({ profiles: updatedProfiles });
    onLoad({ profiles: updatedProfiles });
    setNewProfileName('');
  };

  const handleLoad = () => {
    const profile = settings.profiles[selectedProfile];
    if (!selectedProfile || !profile) return;
    const { profiles: _p, wizardComplete: _w, ...profileSettings } = profile;
    onLoad(profileSettings);
  };

  const handleDelete = async () => {
    if (!selectedProfile) return;
    const updatedProfiles = { ...settings.profiles };
    delete updatedProfiles[selectedProfile];
    await saveSettings({ profiles: updatedProfiles });
    onLoad({ profiles: updatedProfiles });
    setSelectedProfile('');
  };

  return (
    <div className="flex flex-col gap-2 p-3 bg-gray-800/50 rounded-xl border border-gray-700/60">
      <h2 className="text-xs uppercase tracking-wider text-gray-400">Profiles</h2>

      {/* Save row */}
      <div className="flex gap-2">
        <input
          type="text"
          value={newProfileName}
          onChange={(e) => setNewProfileName(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') handleSave(); }}
          placeholder="New profile name…"
          aria-label="New profile name"
          className="flex-1 min-h-[44px] bg-gray-700 text-white text-sm rounded-lg px-3
            placeholder-gray-500 border border-gray-600
            focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-1 focus-visible:ring-offset-gray-900"
        />
        <button
          onClick={handleSave}
          disabled={!newProfileName.trim()}
          aria-label="Save current settings as a new profile"
          className="min-h-[44px] min-w-[44px] px-4 bg-blue-600 hover:bg-blue-500
            disabled:opacity-40 disabled:cursor-not-allowed
            text-white text-sm font-medium rounded-lg transition-colors
            focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-1 focus-visible:ring-offset-gray-900"
        >
          Save
        </button>
      </div>

      {/* Load / delete row — only shown when there are saved profiles */}
      {profileNames.length > 0 && (
        <div className="flex gap-2">
          <select
            value={selectedProfile}
            onChange={(e) => setSelectedProfile(e.target.value)}
            aria-label="Select a saved profile"
            className="flex-1 min-h-[44px] bg-gray-700 text-white text-sm rounded-lg px-3
              border border-gray-600
              focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-1 focus-visible:ring-offset-gray-900"
          >
            <option value="">Select profile…</option>
            {profileNames.map((name) => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
          <button
            onClick={handleLoad}
            disabled={!selectedProfile}
            aria-label="Load selected profile"
            className="min-h-[44px] min-w-[44px] px-3 bg-gray-600 hover:bg-gray-500
              disabled:opacity-40 disabled:cursor-not-allowed
              text-white text-sm rounded-lg transition-colors
              focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-1 focus-visible:ring-offset-gray-900"
          >
            Load
          </button>
          <button
            onClick={handleDelete}
            disabled={!selectedProfile}
            aria-label="Delete selected profile"
            className="min-h-[44px] min-w-[44px] px-3 bg-red-700 hover:bg-red-600
              disabled:opacity-40 disabled:cursor-not-allowed
              text-white text-sm rounded-lg transition-colors
              focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-1 focus-visible:ring-offset-gray-900"
          >
            Del
          </button>
        </div>
      )}
    </div>
  );
}
