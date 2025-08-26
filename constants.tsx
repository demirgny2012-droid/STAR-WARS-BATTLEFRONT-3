
import type { ReactNode } from 'react';
import React from 'react';
import { Faction, Era, Role } from './types';
import type { locales } from './locales';

interface EraDetails {
  name: Era;
  descriptionKey: keyof typeof locales.en;
  color: string;
  hoverColor: string;
}

export const ERAS: Record<Era, EraDetails> = {
  [Era.Republic]: {
    name: Era.Republic,
    descriptionKey: 'eraRepublicDescription',
    color: 'border-cyan-400',
    hoverColor: 'hover:bg-cyan-900/50',
  },
  [Era.CivilWar]: {
    name: Era.CivilWar,
    descriptionKey: 'eraCivilWarDescription',
    color: 'border-amber-400',
    hoverColor: 'hover:bg-amber-900/50',
  },
};

interface FactionDetails {
    name: Faction;
    logo: ReactNode;
    era: Era[];
    descriptionKey: keyof typeof locales.en;
    color: string;
    hoverColor: string;
}

interface RoleDetails {
    name: Role;
    descriptionKey: keyof typeof locales.en;
    color: string;
    hoverColor: string;
}

export const FACTION_DETAILS: Record<Faction, FactionDetails> = {
  [Faction.GalacticRepublic]: {
    name: Faction.GalacticRepublic,
    logo: (
      <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="48" stroke="#9CA3AF" strokeWidth="4"/>
        <circle cx="50" cy="50" r="30" fill="none" stroke="#9CA3AF" strokeWidth="4"/>
        <path d="M50 2 L50 20 M50 80 L50 98 M2 50 L20 50 M80 50 L98 50 M20.5 20.5 L34.5 34.5 M65.5 65.5 L79.5 79.5 M20.5 79.5 L34.5 65.5 M65.5 34.5 L79.5 20.5" stroke="#9CA3AF" strokeWidth="4"/>
      </svg>
    ),
    era: [Era.Republic],
    descriptionKey: 'factionRepublicDescription',
    color: 'border-slate-300',
    hoverColor: 'hover:bg-slate-700/50',
  },
  [Faction.Separatists]: {
    name: Faction.Separatists,
    logo: (
      <svg width="100" height="100" viewBox="0 0 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 5 L93.3 27.5 V 72.5 L50 95 L6.7 72.5 V 27.5 L50 5 Z" stroke="#FBBF24" strokeWidth="4"/>
        <path d="M50 25 L80 41.3 V 58.7 L50 75 L20 58.7 V 41.3 L50 25 Z" fill="#FBBF24"/>
      </svg>
    ),
    era: [Era.Republic],
    descriptionKey: 'factionSeparatistDescription',
    color: 'border-indigo-400',
    hoverColor: 'hover:bg-indigo-900/50',
  },
  [Faction.GalacticEmpire]: {
    name: Faction.GalacticEmpire,
    logo: (
      <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="48" stroke="#E53E3E" strokeWidth="4"/>
        <circle cx="50" cy="50" r="15" fill="#E53E3E"/>
        <path d="M50 2 L50 25 M50 75 L50 98 M2 50 L25 50 M75 50 L98 50 M20 20 L37 37 M63 63 L80 80 M20 80 L37 63 M63 37 L80 20" stroke="#E53E3E" strokeWidth="4"/>
      </svg>
    ),
    era: [Era.CivilWar],
    descriptionKey: 'factionEmpireDescription',
    color: 'border-red-600',
    hoverColor: 'hover:bg-red-900/50',
  },
  [Faction.RebelAlliance]: {
    name: Faction.RebelAlliance,
    logo: (
       <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="48" stroke="#3B82F6" strokeWidth="4"/>
        <path d="M50 15L61.76 38.09L87.12 42.02L68.56 59.91L72.94 85.39L50 73L27.06 85.39L31.44 59.91L12.88 42.02L38.24 38.09L50 15Z" fill="#3B82F6"/>
      </svg>
    ),
    era: [Era.CivilWar],
    descriptionKey: 'factionRebelDescription',
    color: 'border-blue-500',
    hoverColor: 'hover:bg-blue-900/50',
  },
  [Faction.BountyHunter]: {
    name: Faction.BountyHunter,
    logo: (
      <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M25 10H75L65 50L75 90H25L35 50L25 10Z" stroke="#4ADE80" strokeWidth="4"/>
        <line x1="50" y1="10" x2="50" y2="90" stroke="#4ADE80" strokeWidth="4"/>
        <line x1="25" y1="50" x2="75" y2="50" stroke="#4ADE80" strokeWidth="4"/>
      </svg>
    ),
    era: [Era.Republic, Era.CivilWar],
    descriptionKey: 'roleBountyHunterDescription',
    color: 'border-green-400',
    hoverColor: 'hover:bg-green-800/50',
  },
};


export const ROLE_DETAILS: Record<Role, RoleDetails> = {
    [Role.Jedi]: {
        name: Role.Jedi,
        descriptionKey: 'roleJediDescription',
        color: 'border-sky-400',
        hoverColor: 'hover:bg-sky-900/50',
    },
    [Role.Clone]: {
        name: Role.Clone,
        descriptionKey: 'roleCloneDescription',
        color: 'border-slate-300',
        hoverColor: 'hover:bg-slate-700/50',
    },
    [Role.SithAcolyte]: {
        name: Role.SithAcolyte,
        descriptionKey: 'roleSithDescription',
        color: 'border-red-500',
        hoverColor: 'hover:bg-red-900/50',
    },
    [Role.SeparatistCommander]: {
        name: Role.SeparatistCommander,
        descriptionKey: 'roleSeparatistCommanderDescription',
        color: 'border-indigo-400',
        hoverColor: 'hover:bg-indigo-900/50',
    },
    [Role.EmpireOperative]: {
        name: Role.EmpireOperative,
        descriptionKey: 'roleEmpireOperativeDescription',
        color: 'border-red-600',
        hoverColor: 'hover:bg-red-900/50',
    },
    [Role.RebelOperative]: {
        name: Role.RebelOperative,
        descriptionKey: 'roleRebelOperativeDescription',
        color: 'border-blue-500',
        hoverColor: 'hover:bg-blue-900/50',
    },
    [Role.BountyHunter]: {
        name: Role.BountyHunter,
        descriptionKey: 'roleBountyHunterDescription',
        color: 'border-green-400',
        hoverColor: 'hover:bg-green-800/50',
    },
};

export const FACTION_ROLES: Record<Faction, Role[]> = {
    [Faction.GalacticRepublic]: [Role.Jedi, Role.Clone],
    [Faction.Separatists]: [Role.SithAcolyte, Role.SeparatistCommander],
    [Faction.GalacticEmpire]: [Role.EmpireOperative],
    [Faction.RebelAlliance]: [Role.RebelOperative],
    [Faction.BountyHunter]: [Role.BountyHunter],
};
