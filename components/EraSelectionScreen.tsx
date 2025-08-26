import type React from 'react';
import { ERAS } from '../constants';
import type { Era } from '../types';
import type { Theme } from '../theme';
import type { locales } from '../locales';

interface EraSelectionScreenProps {
  onSelectEra: (era: Era) => void;
  onLoadGame: () => void;
  hasSaveData: boolean;
  theme: Theme;
  tt: (key: keyof typeof locales.en) => string;
}

export const EraSelectionScreen: React.FC<EraSelectionScreenProps> = ({ onSelectEra, onLoadGame, hasSaveData, theme, tt }) => {
  return (
    <div className="w-full text-center animate-fade-in">
      {hasSaveData && (
        <div className="mb-8">
          <button
            onClick={onLoadGame}
            className="px-8 py-3 bg-green-500 text-white font-bold text-lg rounded-md transition-transform duration-300 hover:scale-110 hover:bg-green-400 focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-50"
          >
            {tt('continueMission')}
          </button>
          <p className="text-gray-500 text-sm mt-2">{tt('orStartNewCampaign')}</p>
        </div>
      )}
      <h3 className={`text-2xl ${theme.text.subheader} mb-8 animate-pulse`}>{tt('chooseYourEra')}</h3>
      <div className="flex flex-col md:flex-row gap-8 justify-center">
        {(Object.values(ERAS)).map((eraDetails) => {
            const borderColor = theme.border.faction(eraDetails.color);
            const hoverColor = theme.background.hover(eraDetails.hoverColor);
            const ringColor = theme.ring.faction(eraDetails.color);
            return (
              <button
                key={eraDetails.name}
                onClick={() => onSelectEra(eraDetails.name)}
                className={`w-full md:w-96 p-4 sm:p-6 border-2 ${borderColor} rounded-lg bg-black bg-opacity-50 transition-all duration-300 ease-in-out transform hover:scale-105 ${hoverColor} focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-offset-black ${ringColor}`}
              >
                <div className="flex flex-col items-center gap-4">
                  <h4 className="text-3xl font-bold tracking-wider">{eraDetails.name}</h4>
                  <p className={`${theme.text.secondary} font-light text-sm`}>{tt(eraDetails.descriptionKey as keyof typeof locales.en)}</p>
                </div>
              </button>
            )
        })}
      </div>
    </div>
  );
};