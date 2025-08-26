import type React from 'react';
import { ROLES } from '../constants';
import type { Role } from '../types';
import type { Theme } from '../theme';
import type { locales } from '../locales';

interface RoleSelectionScreenProps {
  onSelectRole: (role: Role) => void;
  theme: Theme;
  tt: (key: keyof typeof locales.en) => string;
}

export const RoleSelectionScreen: React.FC<RoleSelectionScreenProps> = ({ onSelectRole, theme, tt }) => {
  return (
    <div className="w-full text-center animate-fade-in">
      <h3 className={`text-2xl ${theme.text.subheader} mb-8 animate-pulse`}>{tt('chooseYourPath')}</h3>
      <div className="flex flex-col md:flex-row gap-8 justify-center">
        {(Object.values(ROLES)).map((roleDetails) => {
            const borderColor = theme.border.faction(roleDetails.color);
            const hoverColor = theme.background.hover(roleDetails.hoverColor);
            const ringColor = theme.ring.faction(roleDetails.color);
          return (
            <button
              key={roleDetails.name}
              onClick={() => onSelectRole(roleDetails.name)}
              className={`w-full md:w-96 p-4 sm:p-6 border-2 ${borderColor} rounded-lg bg-black bg-opacity-50 transition-all duration-300 ease-in-out transform hover:scale-105 ${hoverColor} focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-offset-black ${ringColor}`}
            >
              <div className="flex flex-col items-center gap-4">
                <h4 className="text-3xl font-bold tracking-wider">{roleDetails.name}</h4>
                <p className={`${theme.text.secondary} font-light text-sm`}>{tt(roleDetails.descriptionKey as keyof typeof locales.en)}</p>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  );
};