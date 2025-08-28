
import type React from 'react';
import type { StoryOutcome } from '../types';
import type { Theme } from '../theme';
import type { locales } from '../locales';
import { playHover, playConfirm } from '../services/audioService';

interface GameOverScreenProps {
  outcome: StoryOutcome;
  onRestart: () => void;
  theme: Theme;
  tt: (key: keyof typeof locales.en) => string;
}

export const GameOverScreen: React.FC<GameOverScreenProps> = ({ outcome, onRestart, theme, tt }) => {
    let title, message, color;

    switch (outcome) {
        case 'victory':
            title = tt('outcomeVictoryTitle');
            message = tt('outcomeVictoryMessage');
            color = theme.text.victory;
            break;
        case 'defeat':
            title = tt('outcomeDefeatTitle');
            message = tt('outcomeDefeatMessage');
            color = theme.text.danger;
            break;
        default:
            title = tt('outcomeOngoingTitle');
            message = tt('outcomeOngoingMessage');
            color = theme.text.header;
            break;
    }

    return (
        <div className={`w-full max-w-2xl text-center bg-gray-900 bg-opacity-75 border-2 ${theme.border.primary} p-8 rounded-lg shadow-2xl`}>
            <h2 className={`text-4xl font-bold mb-4 tracking-widest ${color}`}>{title}</h2>
            <p className={`text-xl ${theme.text.subheader} mb-8`}>{message}</p>
            <button
                onClick={() => {
                    playConfirm();
                    onRestart();
                }}
                onMouseEnter={playHover}
                className={`px-8 py-3 bg-yellow-400 text-black font-bold text-lg rounded-md transition-transform duration-300 hover:scale-110 hover:bg-yellow-300 focus:outline-none focus:ring-4 focus:ring-yellow-400 focus:ring-opacity-50`}
            >
                {tt('playAgain')}
            </button>
        </div>
    );
};