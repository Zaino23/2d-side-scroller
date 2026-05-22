export const audios = {
  Run: new Audio('./soundEffects/Run.ogg'),
  Jump: new Audio('./soundEffects/Jump.mp3'),
  Roll: new Audio('./soundEffects/Roll.ogg'),
  Dive: new Audio('./soundEffects/fire.mp3'),
  Hit: new Audio('./soundEffects/Hit.mp3'),
  Hurt: new Audio('./soundEffects/Hurt.wav')
};

const audioSettings = {
  Run: {
    playbackRate: 0.2,
    volume: 0.4
  },
  Jump: {
    playbackRate: 0.7,
    volume: 0.3
  },
  Roll: {
    playbackRate: 1,
    volume: 0.3
  },
  Dive: {
    playbackRate: 3,
    volume: 0.3
  },
  Hit: {
    playbackRate: 1.4,
    volume: 0.1
  },
  Hurt: {
    playbackRate: 1,
    volume: 0.1
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

  if (sound) {
    const oneShot = sound.cloneNode();
    const settings = audioSettings[soundName];

    oneShot.playbackRate = settings?.playbackRate ?? 1;
    oneShot.volume = settings?.volume ?? 0.2;
    oneShot.currentTime = 0;
    oneShot.play().catch(() => {});
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
