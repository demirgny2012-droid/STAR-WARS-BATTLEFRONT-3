
import type React from 'react';
import { FACTION_DETAILS } from '../constants';
import { type Faction, type Era } from '../types';
import type { Theme } from '../theme';
import type { locales } from '../locales';
import { playHover, playConfirm } from '../services/audioService';

interface StartScreenProps {
  onSelectFaction: (faction: Faction) => void;
  era: Era;
  theme: Theme;
  tt: (key: keyof typeof locales.en) => string;
}

export const StartScreen: React.FC<StartScreenProps> = ({ onSelectFaction, era, theme, tt }) => {
  const factionsForEra = Object.values(FACTION_DETAILS).filter(faction => faction.era.includes(era));
  
  return (
    <div className="w-full text-center animate-fade-in-up">
      <h3 className={`text-2xl ${theme.text.subheader} mb-2`}>{era}</h3>
      <h4 className={`text-xl ${theme.text.secondary} mb-8 animate-pulse`}>{tt('chooseYourAllegiance')}</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-center">
        {factionsForEra.map((faction) => {
          const borderColor = theme.border.faction(faction.color);
          const hoverColor = theme.background.hover(faction.hoverColor);
          const ringColor = theme.ring.faction(faction.color);

          return (
            <button
              key={faction.name}
              onClick={() => {
                playConfirm();
                onSelectFaction(faction.name);
              }}
              onMouseEnter={playHover}
              className={`w-full p-6 border-2 ${borderColor} rounded-lg bg-black bg-opacity-50 transition-all duration-300 ease-in-out transform hover:scale-105 ${hoverColor} focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-offset-black ${ringColor}`}
            >
              <div className="flex flex-col items-center gap-4">
                <div className="h-24 w-24 flex items-center justify-center">{faction.logo}</div>
                <h4 className="text-3xl font-bold tracking-wider">{faction.name}</h4>
                <p className={`${theme.text.secondary} font-light text-sm mt-2`}>{tt(faction.descriptionKey)}</p>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  );
};
