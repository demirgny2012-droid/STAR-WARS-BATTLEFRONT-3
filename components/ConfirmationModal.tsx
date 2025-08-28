
import React from 'react';
import type { Theme } from '../theme';
import type { locales } from '../locales';
import { playHover, playClick, playConfirm } from '../services/audioService';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  theme: Theme;
  tt: (key: keyof typeof locales.en) => string;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onClose, onConfirm, title, message, theme, tt }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-60"
      onClick={() => {
        playClick();
        onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirmation-modal-title"
        className={`bg-gray-900 border-2 ${theme.border.danger} rounded-lg shadow-2xl p-6 w-full max-w-sm m-4 text-center`}
        onClick={e => e.stopPropagation()}
      >
        <h2 id="confirmation-modal-title" className={`text-2xl font-bold ${theme.text.danger} mb-4`}>{title}</h2>
        <p className={`${theme.text.primary} mb-6`}>{message}</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => {
              playClick();
              onClose();
            }}
            onMouseEnter={playHover}
            className="px-6 py-2 bg-gray-600 text-white font-bold rounded hover:bg-gray-500 transition-colors"
          >
            {tt('cancel')}
          </button>
          <button
            onClick={() => {
              playConfirm();
              onConfirm();
            }}
            onMouseEnter={playHover}
            className="px-6 py-2 bg-red-600 text-white font-bold rounded hover:bg-red-500 transition-colors"
          >
            {tt('confirm')}
          </button>
        </div>
      </div>
    </div>
  );
};