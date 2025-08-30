
export const en = {
    welcome: 'WELCOME',
    // Era/Faction/Role Selection
    chooseYourEra: 'CHOOSE YOUR ERA',
    continueMission: 'CONTINUE MISSION',
    or: 'OR',
    startNewCampaign: 'START A NEW CAMPAIGN',
    chooseYourAllegiance: 'CHOOSE YOUR ALLEGIANCE',
    chooseYourPath: 'CHOOSE YOUR PATH',
    eraRepublicDescription: "Experience the epic conflict between the Galactic Republic and the Separatist Alliance, where Jedi Knights lead clone armies against endless droid forces.",
    eraCivilWarDescription: "Join the struggle for the galaxy's soul. Will you enforce order with the tyrannical Galactic Empire or fight for freedom with the Rebel Alliance?",
    factionRepublicDescription: "The defenders of peace and justice, the Republic stands against the growing threat of the Separatists with its army of clone troopers led by Jedi Generals.",
    factionSeparatistDescription: "Seeking to break away from the Republic, the Separatist Alliance leverages a massive droid army to fight for their independence.",
    factionEmpireDescription: "Forged from the ashes of the Republic, the Empire rules the galaxy through fear and military might, seeking to crush any who oppose it.",
    factionRebelDescription: "A brave coalition of freedom fighters, the Rebel Alliance stands as the galaxy's last hope against the tyranny of the Empire.",
    roleJediDescription: "Begin your journey as a Force-sensitive youth. Wield a training saber, learn from Jedi Masters, and protect the galaxy from darkness.",
    roleCloneDescription: "Bred for battle, you are one of millions of elite soldiers. Follow orders, use advanced weaponry, and fight for the Republic.",
    roleSithDescription: "Embrace the power of the dark side. As an apprentice to a mysterious master, your ambition is your greatest weapon.",
    roleSeparatistCommanderDescription: "A brilliant tactician and leader. Command droid legions and fleets to execute the will of the Separatist Council.",
    roleEmpireOperativeDescription: "An elite agent of the Empire. Infiltrate, sabotage, and eliminate key targets to crush the Rebel Alliance and enforce the Emperor's will.",
    roleRebelOperativeDescription: "A resourceful spy and soldier for the Rebellion. Fight from the shadows to liberate the galaxy from the Empire's grasp.",
    roleBountyHunterDescription: "Forge your own path. Take on contracts from the highest bidder, navigating the treacherous underworld with skill and cunning.",


    // Character Creation
    characterCreationTitle: 'CHARACTER PROFILE',
    nameLabel: 'Name / Callsign',
    namePlaceholder: 'Enter your name',
    ageLabel: 'Age',
    agePlaceholder: 'e.g., 25 standard years',
    speciesLabel: 'Species',
    speciesPlaceholder: 'e.g., Human, Twi\'lek, Wookiee',
    backstoryLabel: 'Backstory',
    backstoryPlaceholder: "e.g., A former farmer from Dantooine who lost everything to the Empire. A slick-talking smuggler with a debt to a Hutt.",
    startingSituationLabel: 'Opening Scene',
    startingSituationPlaceholder: "e.g., 'My ship just crash-landed on a hostile jungle moon.' or 'Undercover in a cantina, waiting for a secret contact.'",
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
    playerRoleOperative: 'Operative',
    roleJedi: 'a Jedi Youngling',
    roleClone: 'a Clone Trooper',
    roleSith: 'a Sith Acolyte',
    roleSeparatistCommander: 'a Separatist Commander',
    roleEmpireOperative: 'an Imperial Operative',
    roleRebelOperative: 'a Rebel Operative',
    roleBountyHunter: 'a Bounty Hunter',
    turn: 'Turn',
    geminiSystemInstruction: `You are a 'Star Wars Loremaster' and the storyteller for a text-based adventure game called 'STAR WARS BATTLEFRONT 3'. Your knowledge of the Star Wars universe, including all canon (films, series, books, comics) and Legends (Expanded Universe) material, is encyclopedic and flawless. You must incorporate specific, nuanced details about characters, locations, technology, alien species, and historical events to create a deeply immersive and authentic experience. The story is set during the '{era}' era. The player is a {role} in the {faction}. Create an epic, branching narrative based on the player's choices. The tone must be cinematic and absolutely true to the Star Wars universe, avoiding any factual errors or inconsistencies with the established lore. Ensure each turn presents a challenging scenario with four distinct, believable choices. The player may provide a custom action starting with 'Player's custom action:'. React to this custom action realistically within the game world. The game should build up to a climax and not end in victory or defeat too quickly.`,
    geminiInitialPrompt: `This is the very first turn. Start the story for a character with the following profile:
- Name: {name}
- Age: {age}
- Species: {species}
- Backstory: {backstory}
- Faction: {faction}
- Era: {era}
- Role: {role}
- Starting Situation: {startingSituation}

Generate a compelling opening narrative based on all these details and present the first four choices.`,
    geminiUserPrompt: `This is a new turn in the story.
Player's Era: {era}
Player's Faction: {faction}
Player's Role: {role}
Previous Choice History:
{history}

Based on this history, generate the next part of the story.`,
    geminiClientError: 'The connection to the HoloNet could not be established. The game host must configure their API key.',
    geminiApiError: 'HoloNet connection lost! Enemy jammers are blocking our signal. We are overrun and must retreat. Mission failed.',
};
