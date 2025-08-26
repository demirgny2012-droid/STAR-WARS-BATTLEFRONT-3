import type { Era, Faction, Role, CharacterProfile } from '../types';

export interface SaveData {
  era: Era;
  faction: Faction;
  role: Role | null;
  characterProfile: CharacterProfile | null;
  history: string[];
}

const SAVE_KEY = 'star-wars-battlefront-3-save';

export const saveGame = (saveData: SaveData): void => {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(saveData));
  } catch (error) {
    console.error("Failed to save game:", error);
  }
};

export const loadGame = (): SaveData | null => {
  try {
    const savedData = localStorage.getItem(SAVE_KEY);
    if (savedData) {
      return JSON.parse(savedData) as SaveData;
    }
    return null;
  } catch (error) {
    console.error("Failed to load game:", error);
    // In case of parsing error, clear the corrupted save
    localStorage.removeItem(SAVE_KEY);
    return null;
  }
};

export const clearSave = (): void => {
  try {
    localStorage.removeItem(SAVE_KEY);
  } catch (error) {
    console.error("Failed to clear save data:", error);
  }
};