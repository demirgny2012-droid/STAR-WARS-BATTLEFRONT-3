import type { Language } from '../types';

export interface Settings {
  typingSpeed: number;
  nickname: string;
  isVip: boolean;
  language: Language;
}

export const DEFAULT_SETTINGS: Settings = {
  typingSpeed: 25, // 'Normal' speed
  nickname: '',
  isVip: false,
  language: 'en',
};

const SETTINGS_KEY = 'star-wars-battlefront-3-settings';

export const saveSettings = (settings: Settings): void => {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error("Failed to save settings:", error);
  }
};

export const loadSettings = (): Settings => {
  try {
    const savedSettings = localStorage.getItem(SETTINGS_KEY);
    if (savedSettings) {
      // Merge with defaults to ensure new settings are applied
      return { ...DEFAULT_SETTINGS, ...JSON.parse(savedSettings) };
    }
    return DEFAULT_SETTINGS;
  } catch (error)
    {
    console.error("Failed to load settings:", error);
    return DEFAULT_SETTINGS;
  }
};
