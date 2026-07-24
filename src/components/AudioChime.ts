// Client-side Web Audio API Sound Synthesizer for Portfolio Gamification

let isMuted = false;

if (typeof window !== "undefined") {
  const savedMute = localStorage.getItem("audio_muted");
  isMuted = savedMute === "true";
}

export function setMuteState(muted: boolean) {
  isMuted = muted;
  if (typeof window !== "undefined") {
    localStorage.setItem("audio_muted", String(muted));
  }
}

export function getMuteState() {
  return isMuted;
}

function getAudioContext() {
  if (typeof window === "undefined") return null;
  const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
  if (!AudioContextClass) return null;
  return new AudioContextClass();
}

export function playTactileClick() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.connect(gain);
  gain.connect(ctx.destination);

  // Very short, high-frequency click (mechanical tactile feel)
  osc.type = "sine";
  osc.frequency.setValueAtTime(1200, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.04);

  gain.gain.setValueAtTime(0.015, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.04);

  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.04);
}

export function playSuccessChime() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.connect(gain);
  gain.connect(ctx.destination);

  // Retro positive chime: two notes ascending
  osc.type = "sine";
  
  // Note 1 (C5)
  osc.frequency.setValueAtTime(523.25, ctx.currentTime);
  // Note 2 (E5)
  osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.08);

  gain.gain.setValueAtTime(0.03, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.3);

  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.3);
}

export function playErrorBuzz() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.connect(gain);
  gain.connect(ctx.destination);

  // Low error buzz
  osc.type = "triangle";
  osc.frequency.setValueAtTime(130, ctx.currentTime);
  osc.frequency.linearRampToValueAtTime(110, ctx.currentTime + 0.25);

  gain.gain.setValueAtTime(0.05, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.25);

  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.25);
}

export function playBootBleep() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc1 = ctx.createOscillator();
  const osc2 = ctx.createOscillator();
  const gain = ctx.createGain();

  osc1.connect(gain);
  osc2.connect(gain);
  gain.connect(ctx.destination);

  osc1.type = "sine";
  osc1.frequency.setValueAtTime(440, ctx.currentTime); // A4
  osc1.frequency.setValueAtTime(880, ctx.currentTime + 0.15); // A5

  osc2.type = "sine";
  osc2.frequency.setValueAtTime(554.37, ctx.currentTime); // C#5
  osc2.frequency.setValueAtTime(1108.73, ctx.currentTime + 0.15); // C#6

  gain.gain.setValueAtTime(0.02, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.4);

  osc1.start(ctx.currentTime);
  osc1.stop(ctx.currentTime + 0.4);
  osc2.start(ctx.currentTime);
  osc2.stop(ctx.currentTime + 0.4);
}
