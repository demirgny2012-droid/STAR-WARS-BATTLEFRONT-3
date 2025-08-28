import type { SaveData } from '../types';

const SAVE_KEY = 'star-wars-battlefront-3-save';

// The function now takes the core game data and wraps it in the SaveData structure with a timestamp.
// This is more robust as it ensures the save structure is always correct.
export const saveGame = (data: Omit<SaveData, 'savedAt'>): void => {
  try {
    const saveData: SaveData = {
      era: data.era,
      faction: data.faction,
      role: data.role,
      characterProfile: data.characterProfile,
      history: data.history,
      savedAt: Date.now(),
    };
    localStorage.setItem(SAVE_KEY, JSON.stringify(saveData));
  } catch (error) {
    console.error("Failed to save game:", error);
  }
};

// The load function now validates the data structure to prevent crashes from corrupted or outdated saves.
export const loadGame = (): SaveData | null => {
  try {
    const savedDataString = localStorage.getItem(SAVE_KEY);
    if (!savedDataString) {
      return null;
    }

    const loadedData = JSON.parse(savedDataString);

    // Validate that the loaded data has the essential properties before returning it.
    // This prevents errors if the save file is corrupted or from an incompatible older version.
    if (
      typeof loadedData === 'object' &&
      loadedData !== null &&
      'era' in loadedData &&
      'faction' in loadedData &&
      'history' in loadedData &&
      Array.isArray(loadedData.history) &&
      'characterProfile' in loadedData
    ) {
      return loadedData as SaveData;
    }

    // If validation fails, the save is considered corrupted.
    throw new Error("Invalid or corrupted save data structure.");

  } catch (error) {
    console.error("Failed to load game:", error);
    // In case of parsing or validation error, clear the corrupted save.
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