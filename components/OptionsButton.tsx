
import type React from 'react';
import { GearIcon } from './Icons';
import { playHover, playClick } from '../services/audioService';

interface OptionsButtonProps {
  onClick: () => void;
}

export const OptionsButton: React.FC<OptionsButtonProps> = ({ onClick }) => (
  <button
    onClick={() => {
      playClick();
      onClick();
    }}
    onMouseEnter={playHover}
    aria-label="Open options menu"
    className="absolute top-4 right-4 text-gray-400 hover:text-yellow-400 transition-colors duration-300 z-50"
  >
    <GearIcon className="w-8 h-8 md:w-10 md:h-10" />
  </button>
);
