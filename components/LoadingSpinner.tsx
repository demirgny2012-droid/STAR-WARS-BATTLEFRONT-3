import type React from 'react';
import type { Theme } from '../theme';
import type { locales } from '../locales';

interface LoadingSpinnerProps {
    theme: Theme;
    tt: (key: keyof typeof locales.en) => string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ theme, tt }) => (
  <div className="flex flex-col items-center justify-center space-y-4">
    <svg
      className={`animate-spin h-12 w-12 ${theme.text.header}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 100 100"
    >
      <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="4" className="opacity-25" />
      <path
        d="M50,5 A 45,45 0 0 1 95,50"
        stroke="currentColor"
        strokeWidth="4"
        className="opacity-75"
      />
      <line x1="50" y1="0" x2="50" y2="10" stroke="currentColor" strokeWidth="2" />
      <line x1="50" y1="90" x2="50" y2="100" stroke="currentColor" strokeWidth="2" />
      <line x1="0" y1="50" x2="10" y2="50" stroke="currentColor" strokeWidth="2" />
      <line x1="90" y1="50" x2="100" y2="50" stroke="currentColor" strokeWidth="2" />
    </svg>
    <p className={`${theme.text.subheader} text-lg tracking-widest`}>{tt('transmissionIncoming')}</p>
  </div>
);