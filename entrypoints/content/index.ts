import { getSettings } from '@/src/lib/storage';
import { buildFilterCSS } from '@/src/lib/filters';
import { VisionEaseSettings } from '@/src/lib/types';
import { ReadingRuler } from './ruler';
import { applyCursorEnlargement } from '@/src/lib/cursor';
import { applyLinkHighlight } from './linkHighlight';
import { applyFocusHighlight } from './focusHighlight';
import { applyTextScale } from './textScale';
import { applyDarkModeImageFix } from './darkModeImageFix';

export default defineContentScript({
  matches: ['<all_urls>'],
  runAt: 'document_end',

  main() {
    let currentRuler: ReadingRuler | null = null;

    async function applySettings(settings: VisionEaseSettings): Promise<void> {
      document.documentElement.style.filter = buildFilterCSS(settings);
      applyDarkModeImageFix(settings.darkMode);
      applyTextScale(settings.textScale);
      applyLinkHighlight(settings.linkHighlight);
      applyFocusHighlight(settings.focusHighlight);
      applyCursorEnlargement(settings.cursorEnlarge);

      if (settings.readingRuler) {
        if (!currentRuler) {
          currentRuler = new ReadingRuler();
        }
        currentRuler.show();
      } else {
        currentRuler?.hide();
      }
    }

    async function init(): Promise<void> {
      try {
        const settings = await getSettings();
        await applySettings(settings);
      } catch (error) {
        console.error('VisionEase: Failed to load settings', error);
      }
    }

    browser.runtime.onMessage.addListener((message: unknown) => {
      const msg = message as Record<string, unknown>;
      if (msg.type === 'SETTINGS_UPDATE' && msg.settings) {
        applySettings(msg.settings as VisionEaseSettings).catch((error) => {
          console.error('VisionEase: Failed to apply settings', error);
        });
      }
    });

    init();
  },
});
