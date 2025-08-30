
import { type StorySegment, type Language, type Era, type Faction, Role, type CharacterProfile } from '../types';
import { t } from '../locales';

export const getGameTurn = async (
  era: Era,
  faction: Faction,
  role: Role | null,
  characterProfile: CharacterProfile,
  history: string[],
  language: Language,
): Promise<StorySegment> => {
  try {
    const response = await fetch('/.netlify/functions/gemini-proxy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        era,
        faction,
        role,
        characterProfile,
        history,
        language,
      }),
    });

    if (!response.ok) {
      // Try to parse error from proxy response body
      const errorData = await response.json().catch(() => null);
      console.error("Error from proxy server:", response.status, errorData?.error);
      throw new Error(errorData?.error || `Request failed with status ${response.status}`);
    }

    const data: StorySegment = await response.json();

    if (!data.narrative || !data.choices || !data.outcome) {
        throw new Error("Invalid story segment structure received from proxy.");
    }

    return data;
  } catch (error) {
    console.error("Error fetching game turn from proxy:", error);
    const narrative = (error as Error).message.includes('Server configuration error')
        ? t(language, 'geminiClientError') // Use client error for missing key
        : t(language, 'geminiApiError');   // Use API error for other issues
    
    return {
      narrative,
      choices: [],
      outcome: 'defeat',
    };
  }
};
