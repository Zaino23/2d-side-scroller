export const audios = {
  Run: new Audio('./soundEffects/Run.ogg'),
  Jump: new Audio('./soundEffects/Jump.wav'),
  Roll: new Audio('./soundEffects/Roll.ogg'),
  Dive: new Audio('./soundEffects/Dive.ogg'),
  HitHurt: new Audio('./soundEffects/HitHurt.wav')
};

const audioSettings = {
  Run: {
    playbackRate: 0.25,
    volume: 0.2
  },
  Jump: {
    playbackRate: 1,
    volume: 0.1
  },
  Roll: {
    playbackRate: 1,
    volume: 0.3
  },
  Dive: {
    playbackRate: 1,
    volume: 0.3
  },
  HitHurt: {
    playbackRate: 1,
    volume: 0.3
  }
};

function applyAudioSettings(soundName, fallbackVolume) {
  const sound = audios[soundName];
  const settings = audioSettings[soundName];

  if (!sound || !settings) return;

  sound.playbackRate = settings.playbackRate;
  sound.volume = settings.volume ?? fallbackVolume;
}

export function playSFX(soundName) {
  const sound = audios[soundName];

  if(sound && !!sound.paused) {
    
    applyAudioSettings(soundName, 0.2);

    sound.play().catch(() => {})
  }
}

export function startLoopingSFX(soundName) {
  const sound = audios[soundName];

  if(sound && sound.paused) {
    sound.loop = true;
    sound.currentTime = 0;
    applyAudioSettings(soundName, 0.3);
    sound.play().catch(() => {})
  }
}

export function stopLoopingSFX(soundName) {
  const sound = audios[soundName];

  if(sound && !sound.paused) {
    sound.pause();
  }
}
