
import React, { useState } from 'react';
import type { Settings } from '../services/settingsService';
import { CloseIcon } from './Icons';
import type { Theme } from '../theme';
import type { locales } from '../locales';

interface OptionsMenuProps {
  isOpen: boolean;
  onClose: () => void;
  settings: Settings;
  onSettingsChange: (newSettings: Partial<Settings>) => void;
  onRestart: () => void;
  onClearSave: () => void;
  theme: Theme;
  tt: (key: keyof typeof locales.en) => string;
}

const speedOptions = [
  { labelKey: 'speedSlow', value: 50 },
  { labelKey: 'speedNormal', value: 25 },
  { labelKey: 'speedFast', value: 10 },
  { labelKey: 'speedInstant', value: 0 },
];

export const OptionsMenu: React.FC<OptionsMenuProps> = ({ isOpen, onClose, settings, onSettingsChange, onRestart, onClearSave, theme, tt }) => {
  const [nicknameInput, setNicknameInput] = useState(settings.nickname);
  const [vipInput, setVipInput] = useState('');
  const [vipMessage, setVipMessage] = useState('');

  if (!isOpen) return null;

  const handleTypingSpeedChange = (speed: number) => {
    onSettingsChange({ typingSpeed: speed });
  };
  
  const handleVipSubmit = () => {
    if (vipInput.toLowerCase() === 'jarjarbinks') {
        onSettingsChange({ isVip: true });
        setVipMessage(tt('vipCodeSuccess'));
        setTimeout(() => setVipMessage(''), 2000);
    } else {
        setVipMessage(tt('vipCodeError'));
        setTimeout(() => setVipMessage(''), 2000);
    }
    setVipInput('');
  }

  return (
    <div 
        className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 animate-fade-in"
        onClick={onClose}
    >
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="options-menu-title"
        className={`bg-gray-900 border-2 ${theme.border.primary} rounded-lg shadow-2xl p-6 w-full max-w-md m-4 relative`}
        onClick={e => e.stopPropagation()} // Prevent click inside from closing the modal
      >
        <button
          onClick={onClose}
          aria-label="Close options menu"
          className="absolute top-3 right-3 text-gray-500 hover:text-white transition-colors"
        >
          <CloseIcon className="w-6 h-6" />
        </button>

        <h2 id="options-menu-title" className={`text-3xl font-bold ${theme.text.header} text-center mb-6 tracking-widest`}>{tt('optionsTitle')}</h2>
        
        <div className="space-y-6">
            {/* Nickname */}
            <div>
              <h3 className={`text-lg font-semibold ${theme.text.subheader} mb-2`}>{tt('nicknameTitle')}</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={nicknameInput}
                  onChange={(e) => setNicknameInput(e.target.value)}
                  onBlur={() => onSettingsChange({ nickname: nicknameInput })}
                  placeholder={tt('nicknamePlaceholder')}
                  className={`flex-grow bg-gray-800 border ${theme.border.secondary} rounded-md p-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 ${theme.ring.faction('border-yellow-400')}`}
                />
                <button
                  onClick={() => onSettingsChange({ nickname: nicknameInput })}
                  className="px-4 py-2 bg-yellow-500 text-black font-bold rounded hover:bg-yellow-400 transition-colors"
                >
                  {tt('save')}
                </button>
              </div>
            </div>

            {/* Language */}
            <div>
              <h3 className={`text-lg font-semibold ${theme.text.subheader} mb-2`}>{tt('languageTitle')}</h3>
              <div className="flex justify-between items-center bg-black/50 p-1 rounded-md">
                <button
                  onClick={() => onSettingsChange({ language: 'en' })}
                  className={`w-full py-3 text-base sm:text-sm font-bold rounded transition-colors ${settings.language === 'en' ? 'bg-yellow-400 text-black' : 'bg-transparent text-gray-300 hover:bg-gray-700'}`}
                >
                  ENGLISH
                </button>
                <button
                  onClick={() => onSettingsChange({ language: 'tr' })}
                  className={`w-full py-3 text-base sm:text-sm font-bold rounded transition-colors ${settings.language === 'tr' ? 'bg-yellow-400 text-black' : 'bg-transparent text-gray-300 hover:bg-gray-700'}`}
                >
                  TÜRKÇE
                </button>
              </div>
            </div>

            {/* Typing Speed */}
            <div>
              <h3 className={`text-lg font-semibold ${theme.text.subheader} mb-2`}>{tt('transmissionSpeedTitle')}</h3>
              <div className="flex justify-between items-center bg-black/50 p-1 rounded-md">
                {speedOptions.map(opt => (
                  <button
                    key={opt.labelKey}
                    onClick={() => handleTypingSpeedChange(opt.value)}
                    className={`w-full py-3 text-base sm:text-sm font-bold rounded transition-colors ${settings.typingSpeed === opt.value ? 'bg-yellow-400 text-black' : 'bg-transparent text-gray-300 hover:bg-gray-700'}`}
                  >
                    {tt(opt.labelKey as keyof typeof locales.en)}
                  </button>
                ))}
              </div>
            </div>

            {/* VIP Code */}
            {!settings.isVip && (
                <div>
                  <h3 className={`text-lg font-semibold ${theme.text.subheader} mb-2`}>{tt('vipCodeTitle')}</h3>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={vipInput}
                      onChange={(e) => setVipInput(e.target.value)}
                      placeholder={tt('vipCodePlaceholder')}
                      className={`flex-grow bg-gray-800 border ${theme.border.secondary} rounded-md p-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 ${theme.ring.faction('border-yellow-400')}`}
                    />
                    <button
                      onClick={handleVipSubmit}
                      className="px-4 py-2 bg-yellow-500 text-black font-bold rounded hover:bg-yellow-400 transition-colors"
                    >
                      {tt('submit')}
                    </button>
                  </div>
                  {vipMessage && <p className={`text-center mt-2 ${vipMessage === tt('vipCodeSuccess') ? theme.text.victory : theme.text.danger}`}>{vipMessage}</p>}
                </div>
            )}
            
            {/* Danger Zone */}
            <div className={`border-t ${theme.border.secondary} pt-4`}>
                <h3 className={`text-lg font-semibold ${theme.text.danger} mb-3 text-center`}>{tt('dangerZoneTitle')}</h3>
                <div className="flex flex-col space-y-3">
                    <button
                        onClick={onRestart}
                        className="w-full py-3 bg-red-800/80 text-white font-bold rounded hover:bg-red-700 transition-colors"
                    >
                        {tt('restartCampaign')}
                    </button>
                    <button
                        onClick={onClearSave}
                        className="w-full py-3 bg-red-800/80 text-white font-bold rounded hover:bg-red-700 transition-colors"
                    >
                        {tt('clearSavedMission')}
                    </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};