// Som sintetizado (Web Audio) compartilhado pelo site — sem arquivos.
// Desbloqueia no primeiro gesto do usuário (política de autoplay).

let ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const AC = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AC) return null;
  if (!ctx) ctx = new AC();
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
}

let installed = false;
export function initAudio() {
  if (installed || typeof window === "undefined") return;
  installed = true;
  const unlock = () => getCtx();
  window.addEventListener("pointerdown", unlock, { once: true });
  window.addEventListener("keydown", unlock, { once: true });
  window.addEventListener("wheel", unlock, { once: true, passive: true });
}

let lastTick = 0;
// clique seco de tecla mecânica
export function playTick(volume = 0.09) {
  const c = getCtx();
  if (!c || c.state !== "running") return;
  const now = c.currentTime;
  if (now - lastTick < 0.022) return;
  lastTick = now;
  const dur = 0.028;
  const buf = c.createBuffer(1, Math.floor(c.sampleRate * dur), c.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / d.length, 3);
  const src = c.createBufferSource();
  src.buffer = buf;
  const bp = c.createBiquadFilter();
  bp.type = "bandpass";
  bp.frequency.value = 1500 + Math.random() * 900;
  bp.Q.value = 0.9;
  const g = c.createGain();
  g.gain.value = volume;
  src.connect(bp).connect(g).connect(c.destination);
  src.start(now);
}

// "thock" grave de carta caindo
export function playThock(volume = 0.16) {
  const c = getCtx();
  if (!c || c.state !== "running") return;
  const now = c.currentTime;
  const dur = 0.09;
  const buf = c.createBuffer(1, Math.floor(c.sampleRate * dur), c.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / d.length, 2);
  const src = c.createBufferSource();
  src.buffer = buf;
  const lp = c.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.value = 650;
  const g = c.createGain();
  g.gain.value = volume;
  src.connect(lp).connect(g).connect(c.destination);
  src.start(now);
  const o = c.createOscillator();
  o.type = "sine";
  o.frequency.setValueAtTime(160, now);
  o.frequency.exponentialRampToValueAtTime(58, now + 0.08);
  const og = c.createGain();
  og.gain.setValueAtTime(volume * 0.9, now);
  og.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
  o.connect(og).connect(c.destination);
  o.start(now);
  o.stop(now + 0.1);
}
