import type React from 'react';
import { FACTION_DETAILS, ERA_FACTIONS } from '../constants';
import { Faction, type Era } from '../types';
import type { Theme } from '../theme';
import type { locales } from '../locales';

interface StartScreenProps {
  era: Era;
  onSelectFaction: (faction: Faction) => void;
  isVip: boolean;
  theme: Theme;
  tt: (key: keyof typeof locales.en, replacements?: { [key: string]: string | number }) => string;
}

export const StartScreen: React.FC<StartScreenProps> = ({ era, onSelectFaction, isVip, theme, tt }) => {
  const factionsForEra = [...ERA_FACTIONS[era]];
  if (isVip) {
    factionsForEra.push(Faction.BountyHunter);
  }
  
  return (
    <div className="w-full text-center animate-fade-in">
      <h3 className={`text-2xl ${theme.text.subheader} mb-2`}>{era}</h3>
      <h4 className={`text-xl ${theme.text.secondary} mb-8 animate-pulse`}>{tt('chooseYourAllegiance')}</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
        {factionsForEra.map((faction) => {
          const factionDetails = FACTION_DETAILS[faction];
          if (!factionDetails) return null;
          const borderColor = theme.border.faction(factionDetails.color);
          const hoverColor = theme.background.hover(factionDetails.hoverColor);
          const ringColor = theme.ring.faction(factionDetails.color);

          return (
            <button
              key={factionDetails.name}
              onClick={() => onSelectFaction(factionDetails.name)}
              className={`w-full p-6 border-2 ${borderColor} rounded-lg bg-black bg-opacity-50 transition-all duration-300 ease-in-out transform hover:scale-105 ${hoverColor} focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-offset-black ${ringColor}`}
            >
              <div className="flex flex-col items-center gap-4">
                <div className="h-24 w-24 flex items-center justify-center">{factionDetails.logo}</div>
                <h4 className="text-3xl font-bold tracking-wider">{factionDetails.name}</h4>
                <p className={`${theme.text.secondary} font-light text-sm`}>{tt(factionDetails.descriptionKey as keyof typeof locales.en)}</p>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  );
};
