
import React, { useState, useEffect, useCallback } from 'react';
import { getGameTurn } from '../services/geminiService';
import { Faction, type Era, type StorySegment, type StoryOutcome, type StoryChoice, type Role, type Language, type CharacterProfile } from '../types';
import { LoadingSpinner } from './LoadingSpinner';
import { useTypingEffect } from '../hooks/useTypingEffect';
import { FACTION_DETAILS } from '../constants';
import type { Theme } from '../theme';
import type { locales } from '../locales';
import { playHover, playClick } from '../services/audioService';

interface GameScreenProps {
  era: Era;
  faction: Faction;
  role: Role | null;
  characterProfile: CharacterProfile;
  history: string[];
  typingSpeed: number;
  language: Language;
  onGameOver: (outcome: StoryOutcome) => void;
  onChoiceMade: (choicePrompt: string) => void;
  theme: Theme;
  tt: (key: keyof typeof locales.en, replacements?: { [key: string]: string | number }) => string;
}

export const GameScreen: React.FC<GameScreenProps> = ({ era, faction, role, characterProfile, history, onGameOver, onChoiceMade, typingSpeed, language, theme, tt }) => {
  const [storySegment, setStorySegment] = useState<StorySegment | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [customChoiceText, setCustomChoiceText] = useState('');

  const factionDetails = FACTION_DETAILS[faction];
  const factionBorderColor = theme.border.faction(factionDetails.color);
  const factionRingColor = theme.ring.faction(factionDetails.color);
  const factionTextColor = theme.text.faction(factionDetails.color);
  
  const fetchNextTurn = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const segment = await getGameTurn(era, faction, role, characterProfile, history, language);
      setStorySegment(segment);
      if (segment.outcome !== 'ongoing') {
        setTimeout(() => onGameOver(segment.outcome), 5000); 
      }
    } catch (err) {
      setError(tt('errorFetchStory'));
    } finally {
      setIsLoading(false);
    }
  }, [era, faction, role, characterProfile, history, onGameOver, language, tt]);

  useEffect(() => {
    fetchNextTurn();
    // The linter warning is acceptable here as we only want this to run when the callback reference changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchNextTurn]);
  
  const [typedNarrative, skipTyping, isTyping] = useTypingEffect(storySegment?.narrative || '', typingSpeed);

  const handleChoice = (choice: StoryChoice) => {
    if (isLoading) return;
    
    playClick();
    if (isTyping) {
      skipTyping();
      setTimeout(() => onChoiceMade(choice.prompt), 50);
    } else {
        onChoiceMade(choice.prompt);
    }
  };

  const handleCustomChoiceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading || !customChoiceText.trim()) return;
    playClick();

    const submit = () => {
        onChoiceMade(`${tt('customActionPrefix')}: ${customChoiceText}`); 
        setCustomChoiceText('');
    }

    if (isTyping) {
        skipTyping();
        setTimeout(submit, 50);
    } else {
        submit();
    }
  };

  if (isLoading && !storySegment) {
    return <div><LoadingSpinner theme={theme} tt={tt} /></div>;
  }

  return (
    <div className={`w-full max-w-4xl bg-gray-900 bg-opacity-75 border-2 ${factionBorderColor} rounded-lg p-4 sm:p-6 shadow-2xl flex flex-col gap-6`}>
      <div 
        className="narrative-container min-h-[120px] sm:min-h-[150px] md:min-h-[200px] bg-black/50 p-4 rounded-md cursor-pointer narrative-bg"
        onClick={isTyping ? skipTyping : undefined}
        aria-live="polite"
      >
        <p className={`${theme.text.primary} text-base sm:text-lg whitespace-pre-wrap`}>{typedNarrative}</p>
        {isLoading && <div className="mt-4"><LoadingSpinner theme={theme} tt={tt}/></div>}
        {error && <p className={`${theme.text.danger} mt-4`}>{error}</p>}
      </div>
      
      {!isLoading && storySegment && (
        <div className="choices-container grid grid-cols-1 md:grid-cols-2 gap-4">
          {storySegment.choices.map((choice, index) => (
            <button
              key={index}
              onClick={() => handleChoice(choice)}
              onMouseEnter={playHover}
              className={`p-4 border ${theme.border.secondary} rounded-lg text-left transition-all duration-200 hover:bg-gray-800/70 hover:border-yellow-400 focus:outline-none focus:ring-2 ${factionRingColor}`}
            >
              <span className={`${factionTextColor} font-bold`}>{`${tt('choice')} ${index + 1}: `}</span>
              <span className={`${theme.text.primary}`}>{choice.text}</span>
            </button>
          ))}

          {storySegment.choices.length > 0 && (
              <form onSubmit={handleCustomChoiceSubmit} className="md:col-span-2 flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={customChoiceText}
                  onChange={(e) => setCustomChoiceText(e.target.value)}
                  placeholder={tt('customChoicePlaceholder')}
                  className={`flex-grow bg-gray-800 border ${theme.border.secondary} rounded-md p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 ${factionRingColor}`}
                  disabled={isLoading}
                  autoComplete="off"
                />
                <button
                  type="submit"
                  onMouseEnter={playHover}
                  className={`px-4 py-3 sm:py-2 bg-yellow-500 text-black font-bold rounded hover:bg-yellow-400 transition-colors disabled:bg-gray-600`}
                  disabled={isLoading || !customChoiceText.trim()}
                >
                  {tt('submit')}
                </button>
              </form>
          )}

          {storySegment.choices.length === 0 && storySegment.outcome !== 'ongoing' && (
            <div className="md:col-span-2 text-center p-4">
              <p className={`${theme.text.subheader} text-xl animate-pulse`}>{tt('transmissionEnded')}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};