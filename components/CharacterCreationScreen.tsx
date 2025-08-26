
import React, { useState } from 'react';
import type { CharacterProfile } from '../types';
import type { Theme } from '../theme';
import type { locales } from '../locales';
import { playHover, playConfirm } from '../services/audioService';

interface CharacterCreationScreenProps {
  onConfirm: (profile: CharacterProfile) => void;
  nickname: string;
  theme: Theme;
  tt: (key: keyof typeof locales.en) => string;
}

const InputField: React.FC<{
  label: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  theme: Theme;
}> = ({ label, id, value, onChange, placeholder, theme }) => (
  <div>
    <label htmlFor={id} className={`block text-lg font-semibold ${theme.text.subheader} mb-2`}>
      {label}
    </label>
    <input
      type="text"
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full bg-gray-800 border-2 ${theme.border.secondary} rounded-md p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 ${theme.ring.faction('border-yellow-400')}`}
      required={id === 'name'}
    />
  </div>
);

const TextareaField: React.FC<{
    label: string;
    id: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder: string;
    theme: Theme;
    rows?: number;
}> = ({ label, id, value, onChange, placeholder, theme, rows = 3 }) => (
    <div>
        <label htmlFor={id} className={`block text-lg font-semibold ${theme.text.subheader} mb-2`}>
        {label}
        </label>
        <textarea
            id={id}
            name={id}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            rows={rows}
            className={`w-full bg-gray-800 border-2 ${theme.border.secondary} rounded-md p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 ${theme.ring.faction('border-yellow-400')}`}
        />
    </div>
);


export const CharacterCreationScreen: React.FC<CharacterCreationScreenProps> = ({ onConfirm, nickname, theme, tt }) => {
  const [profile, setProfile] = useState<CharacterProfile>({
    name: nickname || '',
    age: '',
    species: '',
    startingSituation: '',
    backstory: '',
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile.name.trim()) {
        setError(tt('nameRequiredError'));
        return;
    }
    setError(null);
    playConfirm();
    onConfirm(profile);
  };

  return (
    <div className={`w-full max-w-2xl bg-gray-900 bg-opacity-75 border-2 ${theme.border.primary} p-4 sm:p-6 md:p-8 rounded-lg shadow-2xl animate-fade-in-up`}>
      <h3 className={`text-3xl font-bold ${theme.text.header} text-center mb-6 tracking-widest`}>{tt('characterCreationTitle')}</h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField 
                label={tt('nameLabel')}
                id="name"
                value={profile.name}
                onChange={handleChange}
                placeholder={tt('namePlaceholder')}
                theme={theme}
            />
            <InputField 
                label={tt('ageLabel')}
                id="age"
                value={profile.age}
                onChange={handleChange}
                placeholder={tt('agePlaceholder')}
                theme={theme}
            />
        </div>
        <InputField 
            label={tt('speciesLabel')}
            id="species"
            value={profile.species}
            onChange={handleChange}
            placeholder={tt('speciesPlaceholder')}
            theme={theme}
        />
        <TextareaField 
            label={tt('startingSituationLabel')}
            id="startingSituation"
            value={profile.startingSituation}
            onChange={handleChange}
            placeholder={tt('startingSituationPlaceholder')}
            theme={theme}
        />
        <TextareaField 
            label={tt('backstoryLabel')}
            id="backstory"
            value={profile.backstory}
            onChange={handleChange}
            placeholder={tt('backstoryPlaceholder')}
            theme={theme}
            rows={4}
        />

        {error && <p className={`text-center font-semibold ${theme.text.danger}`}>{error}</p>}
        
        <div className="text-center pt-4">
          <button
            type="submit"
            onMouseEnter={playHover}
            className={`px-12 py-4 bg-yellow-400 text-black font-bold text-xl rounded-md transition-transform duration-300 hover:scale-110 hover:bg-yellow-300 focus:outline-none focus:ring-4 focus:ring-yellow-400 focus:ring-opacity-50`}
          >
            {tt('confirmCharacterButton')}
          </button>
        </div>
      </form>
    </div>
  );
};
