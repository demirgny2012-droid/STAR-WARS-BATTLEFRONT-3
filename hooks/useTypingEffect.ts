
import { useState, useEffect, useCallback, useRef } from 'react';

// Returns: [displayed text, function to skip typing, boolean for isTyping]
export const useTypingEffect = (text: string, speed: number = 20): [string, () => void, boolean] => {
  const [displayedText, setDisplayedText] = useState('');
  const intervalIdRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const isTyping = text.length > 0 && displayedText.length < text.length;

  const clearTypingInterval = useCallback(() => {
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
    }
  }, []);

  useEffect(() => {
    setDisplayedText('');
    clearTypingInterval();

    if (text) {
      let i = 0;
      intervalIdRef.current = setInterval(() => {
        if (i < text.length) {
          // Use substring to avoid potential issues with character-by-character append
          setDisplayedText(text.substring(0, i + 1));
          i++;
        } else {
          clearTypingInterval();
        }
      }, speed);
    }

    return clearTypingInterval;
  }, [text, speed, clearTypingInterval]);

  const skipTyping = useCallback(() => {
    clearTypingInterval();
    setDisplayedText(text);
  }, [text, clearTypingInterval]);

  return [displayedText, skipTyping, isTyping];
};
