
import { GoogleGenAI, Type } from "@google/genai";
import { type StorySegment, type Language, type Era, type Faction, Role, type CharacterProfile } from '../types';
import { t, locales } from '../locales';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const roleToPromptKeyMap: Record<Role, keyof typeof locales.en> = {
  [Role.Jedi]: 'roleJedi',
  [Role.Clone]: 'roleClone',
  [Role.SithAcolyte]: 'roleSith',
  [Role.SeparatistCommander]: 'roleSeparatistCommander',
  [Role.EmpireOperative]: 'roleEmpireOperative',
  [Role.RebelOperative]: 'roleRebelOperative',
  [Role.BountyHunter]: 'roleBountyHunter',
};

const storySchema = {
  type: Type.OBJECT,
  properties: {
    narrative: {
      type: Type.STRING,
      description: "A detailed and engaging paragraph of the story, describing the current situation. Should be around 100-150 words.",
    },
    choices: {
      type: Type.ARRAY,
      description: "An array of exactly 4 choices for the player. If the outcome is 'victory' or 'defeat', this can be an empty array.",
      items: {
        type: Type.OBJECT,
        properties: {
          text: {
            type: Type.STRING,
            description: "The text displayed to the player for this choice (e.g., 'Fire at the TIE Fighter').",
          },
          prompt: {
            type: Type.STRING,
            description: "A short phrase describing the action, to be used as input for the next story turn (e.g., 'Player fires at the TIE Fighter').",
          },
        },
        required: ['text', 'prompt'],
      },
    },
    outcome: {
      type: Type.STRING,
      description: "The current state of the game after this narrative segment. Can be 'ongoing', 'victory', or 'defeat'. The game should not end too quickly. A 'victory' or 'defeat' should only be declared after a few turns and a significant event.",
      enum: ['ongoing', 'victory', 'defeat'],
    },
  },
  required: ['narrative', 'choices', 'outcome'],
};

export const getGameTurn = async (
  era: Era,
  faction: Faction,
  role: Role | null,
  characterProfile: CharacterProfile,
  history: string[],
  language: Language,
): Promise<StorySegment> => {

  const tt = (key: Parameters<typeof t>[1], replacements?: { [key: string]: string | number | undefined | null}) => t(language, key, replacements);
  
  const playerRoleDescription = role ? tt(roleToPromptKeyMap[role]) : tt('playerRoleOperative');

  const systemInstruction = tt('geminiSystemInstruction', {
    era,
    faction,
    role: playerRoleDescription
  });
  
  const recentHistory = history.slice(-5);
  const formattedHistory = recentHistory.map((h, i) => `${tt('turn')} ${history.length - recentHistory.length + i + 1} ${tt('choice')}: ${h}`).join('\n');

  let userPrompt: string;

  if (history.length === 0) {
    userPrompt = tt('geminiInitialPrompt', {
        era,
        faction,
        role: playerRoleDescription,
        name: characterProfile.name,
        age: characterProfile.age,
        species: characterProfile.species,
        backstory: characterProfile.backstory,
        startingSituation: characterProfile.startingSituation,
    });
  } else {
      userPrompt = tt('geminiUserPrompt', {
        era,
        faction,
        role: playerRoleDescription,
        history: formattedHistory,
    });
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: userPrompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: storySchema,
      },
    });

    const jsonText = response.text.trim();
    const cleanedJsonText = jsonText.replace(/^'|'$/g, "").replace(/^```json\s*|```\s*$/g, '');
    const parsed = JSON.parse(cleanedJsonText) as StorySegment;
    
    if (!parsed.narrative || !parsed.choices || !parsed.outcome) {
        throw new Error("Invalid story segment structure received from API.");
    }

    return parsed;
  } catch (error) {
    console.error("Error fetching game turn from Gemini API:", error);
    // If the API fails, end the game gracefully instead of looping on an error.
    return {
      narrative: tt('geminiApiError'),
      choices: [],
      outcome: 'defeat',
    };
  }
};
