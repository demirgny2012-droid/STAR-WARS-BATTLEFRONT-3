

import React, { useState, useCallback, useEffect } from 'react';
import { EraSelectionScreen } from './components/EraSelectionScreen';
import { StartScreen } from './components/StartScreen';
import { GameScreen } from './components/GameScreen';
import { GameOverScreen } from './components/GameOverScreen';
import { RoleSelectionScreen } from './components/RoleSelectionScreen';
import { CharacterCreationScreen } from './components/CharacterCreationScreen';
import { Faction, type GameState, type StoryOutcome, type Era, type Role, type CharacterProfile } from './types';
import { saveGame, loadGame, clearSave } from './services/saveService';
import { loadSettings, saveSettings, type Settings, DEFAULT_SETTINGS } from './services/settingsService';
import { OptionsMenu } from './components/OptionsMenu';
import { OptionsButton } from './components/OptionsButton';
import { ConfirmationModal } from './components/ConfirmationModal';
import { defaultTheme, vipTheme } from './theme';
import { t, locales } from './locales';
import { initAudio, toggleSound } from './services/audioService';
import { EnvironmentErrorScreen } from './components/EnvironmentErrorScreen';


const App: React.FC = () => {
  const [isApiKeyMissing] = useState(!process.env.API_KEY);
  const [gameState, setGameState] = useState<GameState>('eraSelect');
  const [era, setEra] = useState<Era | null>(null);
  const [faction, setFaction] = useState<Faction | null>(null);
  const [role, setRole] = useState<Role | null>(null);
  const [characterProfile, setCharacterProfile] = useState<CharacterProfile | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [outcome, setOutcome] = useState<StoryOutcome | null>(null);
  const [saveDataExists, setSaveDataExists] = useState(false);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [confirmationModal, setConfirmationModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
  }>({ isOpen: false, title: '', message: '', onConfirm: () => {} });

  useEffect(() => {
    const savedGame = loadGame();
    setSaveDataExists(!!savedGame);
    const loadedSettings = loadSettings();
    setSettings(loadedSettings);
    initAudio(loadedSettings.soundEnabled);
  }, []);

  const theme = settings.isVip ? vipTheme : defaultTheme;
  const tt = useCallback((key: keyof typeof locales.en, replacements?: { [key: string]: string | number | undefined | null }) => t(settings.language, key, replacements), [settings.language]);

  const handleSettingsChange = useCallback((newSettings: Partial<Settings>) => {
    setSettings(prev => {
        const updated = { ...prev, ...newSettings };
        saveSettings(updated);
        if (newSettings.soundEnabled !== undefined) {
          toggleSound(newSettings.soundEnabled);
        }
        return updated;
    });
  }, []);

  const handleSelectEra = useCallback((selectedEra: Era) => {
    setEra(selectedEra);
    setGameState('start');
  }, []);

  const handleSelectFaction = useCallback((selectedFaction: Faction) => {
    setFaction(selectedFaction);
    
    if (selectedFaction === Faction.GalacticRepublic || selectedFaction === Faction.Separatists) {
      setGameState('roleSelect');
    } else {
      setGameState('characterCreation');
    }
  }, []);
  
  const handleSelectRole = useCallback((selectedRole: Role) => {
    setRole(selectedRole);
    setGameState('characterCreation');
  }, []);

  const handleCharacterCreation = useCallback((profile: CharacterProfile) => {
    handleSettingsChange({ nickname: profile.name });
    setCharacterProfile(profile);

    const currentHistory: string[] = [];
    setHistory(currentHistory);
    
    if (era && faction) {
      saveGame({ era, faction, role, characterProfile: profile, history: currentHistory });
      setSaveDataExists(true);
    }
    setGameState('playing');
  }, [era, faction, role, handleSettingsChange]);

  const handleChoiceMade = useCallback((choicePrompt: string) => {
    const newHistory = [...history, choicePrompt];
    setHistory(newHistory);
    if (era && faction && characterProfile) {
      saveGame({ era, faction, role, characterProfile, history: newHistory });
    }
  }, [history, era, faction, role, characterProfile]);

  const handleGameOver = useCallback((finalOutcome: StoryOutcome) => {
    if (finalOutcome === 'ongoing') return;
    clearSave();
    setSaveDataExists(false);
    setOutcome(finalOutcome);
    setGameState('gameover');
  }, []);

  const handleFullRestart = useCallback(() => {
    clearSave();
    setSaveDataExists(false);
    setGameState('eraSelect');
    setEra(null);
    setFaction(null);
    setRole(null);
    setCharacterProfile(null);
    setHistory([]);
    setOutcome(null);
  }, []);

  const handleRestartWithConfirmation = () => {
    setConfirmationModal({
      isOpen: true,
      title: tt('confirmRestartTitle'),
      message: tt('confirmRestartMessage'),
      onConfirm: () => {
        handleFullRestart();
        setIsOptionsOpen(false);
        setConfirmationModal({ isOpen: false, title: '', message: '', onConfirm: () => {} });
      }
    });
  };
  
  const handleClearSaveWithConfirmation = () => {
    setConfirmationModal({
      isOpen: true,
      title: tt('confirmClearSaveTitle'),
      message: tt('confirmClearSaveMessage'),
      onConfirm: () => {
        clearSave();
        setSaveDataExists(false);
        setIsOptionsOpen(false);
        setConfirmationModal({ isOpen: false, title: '', message: '', onConfirm: () => {} });
      }
    });
  };

  const handleLoadGame = useCallback(() => {
    const savedGame = loadGame();
    if (savedGame) {
      setEra(savedGame.era);
      setFaction(savedGame.faction);
      setRole(savedGame.role);
      setCharacterProfile(savedGame.characterProfile);
      setHistory(savedGame.history);
      setGameState('playing');
    }
  }, []);

  const backgroundUrl = "https://storage.googleapis.com/aistudio-project-files/e448b11a-a10e-436f-b2f5-b6d392ca4301/S52C_n4iTjG4xJ0z_star-wars-logo.png";

  const renderGameState = () => {
    if (isApiKeyMissing) {
      return <EnvironmentErrorScreen />;
    }

    switch (gameState) {
      case 'eraSelect':
        return <EraSelectionScreen onSelectEra={handleSelectEra} onLoadGame={handleLoadGame} hasSaveData={saveDataExists} theme={theme} tt={tt} />;
      case 'start':
        if (!era) return null;
        return <StartScreen era={era} onSelectFaction={handleSelectFaction} isVip={settings.isVip} theme={theme} tt={tt}/>;
      case 'roleSelect':
        if (!faction) return null;
        return <RoleSelectionScreen faction={faction} onSelectRole={handleSelectRole} theme={theme} tt={tt} />;
      case 'characterCreation':
        return <CharacterCreationScreen onConfirm={handleCharacterCreation} nickname={settings.nickname} theme={theme} tt={tt} />;
      case 'playing':
        if (!faction || !era || !characterProfile) return null;
        return <GameScreen era={era} faction={faction} role={role} characterProfile={characterProfile} history={history} onGameOver={handleGameOver} onChoiceMade={handleChoiceMade} typingSpeed={settings.typingSpeed} language={settings.language} theme={theme} tt={tt} />;
      case 'gameover':
        if (!outcome) return null;
        return <GameOverScreen outcome={outcome} onRestart={handleFullRestart} theme={theme} tt={tt} />;
      default:
        return <EraSelectionScreen onSelectEra={handleSelectEra} onLoadGame={handleLoadGame} hasSaveData={saveDataExists} theme={theme} tt={tt}/>;
    }
  };

  const showHeader = !isApiKeyMissing && (gameState === 'eraSelect' || gameState === 'start');

  return (
    <div
      className="bg-black text-white min-h-screen bg-contain bg-center bg-no-repeat bg-fixed"
      style={{ backgroundImage: `url('${backgroundUrl}')` }}
    >
      <div className="min-h-screen bg-black bg-opacity-75 flex flex-col items-center justify-center p-4 relative">
        {!isApiKeyMissing && <OptionsButton onClick={() => setIsOptionsOpen(true)} />}
        <OptionsMenu 
          isOpen={isOptionsOpen} 
          onClose={() => setIsOptionsOpen(false)}
          settings={settings}
          onSettingsChange={handleSettingsChange}
          onRestart={handleRestartWithConfirmation}
          onClearSave={handleClearSaveWithConfirmation}
          theme={theme}
          tt={tt}
        />
        <ConfirmationModal
          isOpen={confirmationModal.isOpen}
          onClose={() => setConfirmationModal({ ...confirmationModal, isOpen: false })}
          onConfirm={confirmationModal.onConfirm}
          title={confirmationModal.title}
          message={confirmationModal.message}
          theme={theme}
          tt={tt}
        />

        {showHeader && (
          <header className="w-full max-w-4xl text-center mb-4 sm:mb-8 animate-fade-in-up">
            <h1 className={`text-3xl sm:text-4xl md:text-6xl font-bold ${theme.text.header} tracking-widest`} style={{ textShadow: '2px 2px 4px #000' }}>
              {settings.nickname ? `${tt('welcome')}, ${settings.nickname}` : theme.title.main}
            </h1>
            <h2 className={`text-xl sm:text-2xl md:text-3xl font-normal ${theme.text.subheader} tracking-wider`} style={{ textShadow: '1px 1px 2px #000' }}>
              {theme.title.sub}
            </h2>
          </header>
        )}
        <main className="w-full max-w-4xl flex-grow flex items-center justify-center">
            {renderGameState()}
        </main>
      </div>
    </div>
  );
};

export default App;