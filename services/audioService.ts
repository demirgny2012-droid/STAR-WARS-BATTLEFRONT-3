// Base64 encoded WAV files for UI sounds
const SOUND_DATA = {
    hover: 'data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAAAAAC/',
    click: 'data:audio/wav;base64,UklGRiwaAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YRIaAACAgICAgICAgICAgICAgICAgICAgICAgICA',
    confirm: 'data:audio/wav;base64,UklGRkIAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQgAAACAgIAAAICAAAAAgIAAgIAAgA==',
};

let isSoundEnabled = true;
let audioContext: AudioContext | null = null;
const audioBuffers: { [key: string]: AudioBuffer } = {};

const createAudioContext = () => {
  if (audioContext) return;
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      audioContext = new AudioContextClass();
    }
  } catch(e) {
    console.error("Could not create AudioContext:", e);
  }
};

const loadSound = async (name: string, url: string) => {
    if (!audioContext) return;
    try {
        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        audioBuffers[name] = await audioContext.decodeAudioData(arrayBuffer);
    } catch(e) {
        console.error(`Failed to load sound: ${name}`, e);
    }
};

export const initAudio = (initialState = true) => {
    // Audio context can only be created after a user interaction.
    // We will attempt to create it here, but it may be suspended.
    // The playSound function will handle resuming it.
    createAudioContext();
    if (audioContext) {
        Object.entries(SOUND_DATA).forEach(([name, url]) => {
            if (!audioBuffers[name]) {
                loadSound(name, url);
            }
        });
    }
    isSoundEnabled = initialState;
};

const playSound = (buffer: AudioBuffer) => {
    if (!audioContext || !isSoundEnabled) return;

    // Resume the audio context if it's suspended (common in modern browsers)
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }
    
    const source = audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(audioContext.destination);
    source.start(0);
};

export const playHover = () => audioBuffers.hover && playSound(audioBuffers.hover);
export const playClick = () => audioBuffers.click && playSound(audioBuffers.click);
export const playConfirm = () => audioBuffers.confirm && playSound(audioBuffers.confirm);


export const toggleSound = (enabled: boolean) => {
    isSoundEnabled = enabled;
};
