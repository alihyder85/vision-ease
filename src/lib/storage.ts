import { DEFAULT_SETTINGS, VisionEaseSettings } from './types';

export async function getSettings(): Promise<VisionEaseSettings> {
  const stored = await browser.storage.sync.get(null);
  return { ...DEFAULT_SETTINGS, ...stored } as VisionEaseSettings;
}

export async function saveSettings(patch: Partial<VisionEaseSettings>): Promise<void> {
  await browser.storage.sync.set(patch);
}
