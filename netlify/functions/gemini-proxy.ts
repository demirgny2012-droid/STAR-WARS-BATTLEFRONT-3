import { GoogleGenAI, Type } from "@google/genai";
import type { Handler } from '@netlify/functions';
// Fix: `Role` is an enum used as a value, so it must be imported without `type`.
import { Role, type StorySegment, type Language, type Era, type Faction, type CharacterProfile } from '../../src/types';
import { locales } from '../../src/locales';

const t = (lang: Language, key: keyof typeof locales.en, replacements?: { [key: string]: string | number | undefined | null }): string => {
  let translation = locales[lang]?.[key] || locales['en'][key];
  if (replacements) {
    Object.keys(replacements).forEach(rKey => {
      const value = replacements[rKey];
      if (value !== undefined && value !== null) {
        translation = translation.replace(new RegExp(`{${rKey}}`, 'g'), String(value));
      }
    });
  }
  return translation;
};

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
          text: { type: Type.STRING, description: "The text displayed to the player for this choice (e.g., 'Fire at the TIE Fighter')." },
          prompt: { type: Type.STRING, description: "A short phrase describing the action, to be used as input for the next story turn (e.g., 'Player fires at the TIE Fighter')." },
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

const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("API_KEY environment variable not set.");
    return { statusCode: 500, body: JSON.stringify({ error: 'Server configuration error.' }) };
  }

  try {
    const { era, faction, role, characterProfile, history, language } = JSON.parse(event.body || '{}');

    // Basic validation
    if (!era || !faction || !characterProfile || !history || !language) {
        return { statusCode: 400, body: JSON.stringify({ error: 'Missing required game data.'}) };
    }

    const ai = new GoogleGenAI({ apiKey });
    const tt = (key: Parameters<typeof t>[1], replacements?: { [key: string]: string | number | undefined | null}) => t(language, key, replacements);
  
    const playerRoleDescription = role ? tt(roleToPromptKeyMap[role]) : tt('playerRoleOperative');

    const systemInstruction = tt('geminiSystemInstruction', {
      era,
      faction,
      role: playerRoleDescription
    });
    
    const recentHistory = history.slice(-5);
    const formattedHistory = recentHistory.map((h: string, i: number) => `${tt('turn')} ${history.length - recentHistory.length + i + 1} ${tt('choice')}: ${h}`).join('\n');

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
    
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(parsed),
    };

  } catch (error) {
    console.error("Error in gemini-proxy function:", error);
    return { statusCode: 500, body: JSON.stringify({ error: 'Failed to generate story turn.' }) };
  }
};

export { handler };