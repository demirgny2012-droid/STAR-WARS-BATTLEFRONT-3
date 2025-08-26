
export const en = {
    welcome: 'WELCOME',
    // Era/Faction/Role Selection
    chooseYourEra: 'CHOOSE YOUR ERA',
    continueMission: 'CONTINUE MISSION',
    orStartNewCampaign: 'or start a new campaign',
    chooseYourAllegiance: 'CHOOSE YOUR ALLEGIANCE',
    chooseYourPath: 'CHOOSE YOUR PATH',
    eraRepublicDescription: "Experience the epic conflict between the Galactic Republic and the Separatist Alliance, where Jedi Knights lead clone armies against endless droid forces.",
    eraCivilWarDescription: "Join the struggle for the galaxy's soul. Will you enforce order with the tyrannical Galactic Empire or fight for freedom with the Rebel Alliance?",
    factionEmpireDescription: 'Bring order to the galaxy through strength and power. Crush the rebellion and enforce the will of the Emperor.',
    factionRebelDescription: 'Fight for freedom and restore the Republic. Hope is your greatest weapon against the tyranny of the Empire.',
    factionRepublicDescription: 'For the Republic! Uphold democracy and peace across the galaxy as a Jedi Knight or elite Clone Trooper.',
    factionSeparatistDescription: 'Break away from the corrupt Republic. Command vast droid armies to secure independence for your systems.',
    roleJediDescription: "Begin your journey as a Force-sensitive youth. Wield a training saber, learn from Jedi Masters, and protect the galaxy from darkness.",
    roleCloneDescription: "Bred for battle, you are one of millions of elite soldiers. Follow orders, use advanced weaponry, and fight for the Republic.",
    roleSithDescription: "Embrace the power of the dark side. As an apprentice to a mysterious master, your ambition is your greatest weapon.",
    roleSeparatistCommanderDescription: "A brilliant tactician and leader. Command droid legions and fleets to execute the will of the Separatist Council.",


    // Character Creation
    characterCreationTitle: 'CHARACTER PROFILE',
    nameLabel: 'Name / Callsign',
    namePlaceholder: 'Enter your name',
    ageLabel: 'Age',
    agePlaceholder: "e.g., 25",
    speciesLabel: 'Species',
    speciesPlaceholder: "e.g., Human, Twi'lek, Wookiee",
    startingSituationLabel: 'Opening Scene',
    startingSituationPlaceholder: "Describe your immediate situation. e.g., 'In the trenches of Felucia, pinned down.'",
    backstoryLabel: 'Backstory (Optional)',
    backstoryPlaceholder: 'Describe your past. Where are you from? What drives you?',
    confirmCharacterButton: 'BEGIN MISSION',
    nameRequiredError: 'Name is required to begin.',

    // Game Screen
    transmissionIncoming: 'TRANSMISSION INCOMING...',
    choice: 'CHOICE',
    submit: 'SUBMIT',
    customChoicePlaceholder: 'Or, type your own action...',
    customActionPrefix: "Player's custom action",
    transmissionEnded: 'The transmission has ended.',
    errorFetchStory: 'Failed to fetch the next chapter of your story. Please try again.',

    // Game Over Screen
    outcomeVictoryTitle: 'MISSION ACCOMPLISHED!',
    outcomeVictoryMessage: 'Your actions have led to a decisive victory. The galaxy will remember your name.',
    outcomeDefeatTitle: 'MISSION FAILED',
    outcomeDefeatMessage: 'You fought bravely, but the enemy has overwhelmed your forces. Your story ends here.',
    outcomeOngoingTitle: 'CONNECTION LOST',
    outcomeOngoingMessage: 'The battle rages on...',
    playAgain: 'PLAY AGAIN',
    
    // Options Menu
    optionsTitle: 'OPTIONS',
    nicknameTitle: 'Commander Nickname',
    nicknamePlaceholder: 'Enter your callsign...',
    save: 'SAVE',
    languageTitle: 'Language',
    transmissionSpeedTitle: 'Transmission Speed',
    speedSlow: 'Slow',
    speedNormal: 'Normal',
    speedFast: 'Fast',
    speedInstant: 'Instant',
    soundEffectsTitle: 'Sound Effects',
    soundOn: 'On',
    soundOff: 'Off',
    vipCodeTitle: 'VIP Code',
    vipCodePlaceholder: 'Enter VIP code...',
    vipCodeSuccess: 'VIP Activated!',
    vipCodeError: 'Invalid Code',
    dangerZoneTitle: 'DANGER ZONE',
    restartCampaign: 'RESTART CAMPAIGN',
    clearSavedMission: 'CLEAR SAVED MISSION',

    // Confirmation Modal
    confirmRestartTitle: 'Restart Campaign?',
    confirmRestartMessage: 'Are you sure you want to restart? Your current progress will be lost.',
    confirmClearSaveTitle: 'Clear Saved Mission?',
    confirmClearSaveMessage: 'Are you sure you want to delete your saved game data? This action cannot be undone.',
    cancel: 'CANCEL',
    confirm: 'CONFIRM',

    // Gemini Service
    playerRoleSoldier: 'a soldier',
    playerRoleOperative: 'Operative',
    roleJedi: 'a Jedi Youngling',
    roleClone: 'a Clone Trooper',
    roleSith: 'a Sith Acolyte',
    roleSeparatistCommander: 'a Separatist Commander',
    turn: 'Turn',
    noBackstoryProvided: 'No backstory provided.',
    geminiSystemInstruction: `You are a storyteller for a text-based adventure game called 'STAR WARS BATTLEFRONT 3'. The story is set during the '{era}' era. The player is a {role} in the {faction}. Create an epic, branching narrative based on the player's choices. The tone should be cinematic and true to the Star Wars universe. Ensure each turn presents a challenging scenario with four distinct choices. The player may also provide a custom action. If they do, their prompt will start with 'Player's custom action:'. React to this custom action realistically within the game world. If the game is ending in victory or defeat, you can provide an empty array for choices. The game should build up to a climax, and not end in victory or defeat too quickly.`,
    geminiInitialPrompt: `This is the very first turn. Start the story for a character with the following profile:
- Name: {name}
- Age: {age}
- Species: {species}
- Faction: {faction}
- Era: {era}
- Role: {role}
- Starting Situation: {startingSituation}
- Backstory: {backstory}

Generate a compelling opening narrative and present the first four choices.`,
    geminiUserPrompt: `This is a new turn in the story.
Player's Era: {era}
Player's Faction: {faction}
Player's Role: {role}
Previous Choice History:
{history}

Based on this history, generate the next part of the story.`,
    geminiApiError: 'HoloNet connection lost! Enemy jammers are blocking our signal. We are overrun and must retreat. Mission failed.',
};
