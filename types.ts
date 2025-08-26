export enum Era {
  Republic = 'The Clone Wars',
  CivilWar = 'The Galactic Civil War',
}

export enum Faction {
  GalacticRepublic = 'Galactic Republic',
  Separatists = 'Separatist Alliance',
  GalacticEmpire = 'Galactic Empire',
  RebelAlliance = 'Rebel Alliance',
  BountyHunter = 'Bounty Hunter/Scoundrel',
}

export enum Role {
  Jedi = 'Jedi Youngling',
  Clone = 'Clone Trooper',
  SithAcolyte = 'Sith Acolyte',
  SeparatistCommander = 'Separatist Commander',
}

export type GameState = 'eraSelect' | 'start' | 'roleSelect' | 'characterCreation' | 'playing' | 'gameover';

export type StoryOutcome = 'victory' | 'defeat' | 'ongoing';

export type Language = 'en' | 'tr';

export interface StoryChoice {
  text: string;
  prompt: string;
}

export interface StorySegment {
  narrative: string;
  choices: StoryChoice[];
  outcome: StoryOutcome;
}

export interface CharacterProfile {
  name: string;
  age: string;
  species: string;
  startingSituation: string;
  backstory: string;
}
