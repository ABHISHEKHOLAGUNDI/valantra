"use client";

// Phase 40: Expanded Spatial Audio Engine — Every interaction has a unique synthesized voice.
// All sounds are Web Audio API synth-generated. No external files needed.

let audioCtx: AudioContext | null = null;

const initAudio = () => {
  if (!audioCtx && typeof window !== "undefined") {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
};

const safePlay = (fn: (ctx: AudioContext) => void) => {
  try {
    initAudio();
    if (!audioCtx) return;
    if (audioCtx.state === "suspended") audioCtx.resume();
    fn(audioCtx);
  } catch (e) { /* silently fail */ }
};

// 1. NAV HOVER — Ultra-subtle high sine tick
export const playHoverSound = () => safePlay((ctx) => {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(1200, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(2000, ctx.currentTime + 0.03);
  gain.gain.setValueAtTime(0, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(0.012, ctx.currentTime + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);
  osc.connect(gain).connect(ctx.destination);
  osc.start(); osc.stop(ctx.currentTime + 0.03);
});

// 2. FAQ ACCORDION CLICK — Deep triangle thud (confirm)
export const playClickSound = () => safePlay((ctx) => {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "triangle";
  osc.frequency.setValueAtTime(300, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.1);
  gain.gain.setValueAtTime(0, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
  osc.connect(gain).connect(ctx.destination);
  osc.start(); osc.stop(ctx.currentTime + 0.1);
});

// 3. FAQ QUESTION HOVER — Soft metallic ping (different from nav hover)
export const playFaqHoverSound = () => safePlay((ctx) => {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(800, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(1400, ctx.currentTime + 0.05);
  gain.gain.setValueAtTime(0, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(0.018, ctx.currentTime + 0.008);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);
  osc.connect(gain).connect(ctx.destination);
  osc.start(); osc.stop(ctx.currentTime + 0.06);
});

// 4. ACCORDION OPEN — Rising sweep whoosh
export const playExpandSound = () => safePlay((ctx) => {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(200, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.15);
  gain.gain.setValueAtTime(0, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(0.025, ctx.currentTime + 0.03);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);
  osc.connect(gain).connect(ctx.destination);
  osc.start(); osc.stop(ctx.currentTime + 0.18);
});

// 5. ACCORDION CLOSE — Falling sweep drop
export const playCollapseSound = () => safePlay((ctx) => {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(600, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.12);
  gain.gain.setValueAtTime(0, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(0.02, ctx.currentTime + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.14);
  osc.connect(gain).connect(ctx.destination);
  osc.start(); osc.stop(ctx.currentTime + 0.14);
});

// 6. CTA BUTTON HOVER — Warm square pulse
export const playCtaHoverSound = () => safePlay((ctx) => {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "square";
  osc.frequency.setValueAtTime(440, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(520, ctx.currentTime + 0.04);
  gain.gain.setValueAtTime(0, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(0.008, ctx.currentTime + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
  osc.connect(gain).connect(ctx.destination);
  osc.start(); osc.stop(ctx.currentTime + 0.05);
});

// 7. CTA BUTTON CLICK — Heavy bass impact
export const playCtaClickSound = () => safePlay((ctx) => {
  const osc = ctx.createOscillator();
  const osc2 = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(80, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 0.15);
  osc2.type = "square";
  osc2.frequency.setValueAtTime(1000, ctx.currentTime);
  osc2.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.05);
  gain.gain.setValueAtTime(0, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
  osc.connect(gain); osc2.connect(gain); gain.connect(ctx.destination);
  osc.start(); osc2.start();
  osc.stop(ctx.currentTime + 0.15); osc2.stop(ctx.currentTime + 0.05);
});

// 8. SCROLL INDICATOR ENTER — Ethereal high harmonic
export const playScrollEnterSound = () => safePlay((ctx) => {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(1800, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(2400, ctx.currentTime + 0.08);
  gain.gain.setValueAtTime(0, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
  osc.connect(gain).connect(ctx.destination);
  osc.start(); osc.stop(ctx.currentTime + 0.1);
});

// 9. CONTACT FORM STEP — Crisp digital blip
export const playStepSound = () => safePlay((ctx) => {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "square";
  osc.frequency.setValueAtTime(660, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.04);
  gain.gain.setValueAtTime(0, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(0.015, ctx.currentTime + 0.005);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);
  osc.connect(gain).connect(ctx.destination);
  osc.start(); osc.stop(ctx.currentTime + 0.06);
});

// 10. CONTACT FORM SUBMIT — Success chime (two-tone)
export const playSubmitSound = () => safePlay((ctx) => {
  const t = ctx.currentTime;
  // Note 1
  const o1 = ctx.createOscillator(); const g1 = ctx.createGain();
  o1.type = "sine"; o1.frequency.value = 523;
  g1.gain.setValueAtTime(0, t); g1.gain.linearRampToValueAtTime(0.04, t + 0.02);
  g1.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
  o1.connect(g1).connect(ctx.destination);
  o1.start(t); o1.stop(t + 0.2);
  // Note 2
  const o2 = ctx.createOscillator(); const g2 = ctx.createGain();
  o2.type = "sine"; o2.frequency.value = 784;
  g2.gain.setValueAtTime(0, t + 0.1); g2.gain.linearRampToValueAtTime(0.04, t + 0.12);
  g2.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
  o2.connect(g2).connect(ctx.destination);
  o2.start(t + 0.1); o2.stop(t + 0.35);
});

// 11. BACK TO TOP — Reverse sweep
export const playBackToTopSound = () => safePlay((ctx) => {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sawtooth";
  osc.frequency.setValueAtTime(100, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.2);
  gain.gain.setValueAtTime(0, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(0.015, ctx.currentTime + 0.03);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22);
  osc.connect(gain).connect(ctx.destination);
  osc.start(); osc.stop(ctx.currentTime + 0.22);
});

// 12. CARD HOVER (Advantage section) — Subtle resonant pluck
export const playCardHoverSound = () => safePlay((ctx) => {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "triangle";
  osc.frequency.setValueAtTime(500, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(350, ctx.currentTime + 0.08);
  gain.gain.setValueAtTime(0, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(0.02, ctx.currentTime + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
  osc.connect(gain).connect(ctx.destination);
  osc.start(); osc.stop(ctx.currentTime + 0.1);
});

// 13. MECHANICAL KEYBOARD TYPING — Instant zero-latency key click
// Uses noise burst + sharp high-freq transient for authentic mechanical feel
// Slight randomization prevents robotic repetition
export const playTypeSound = () => safePlay((ctx) => {
  const t = ctx.currentTime;

  // Layer 1: Short noise burst (the "thock" body)
  const bufferSize = ctx.sampleRate * 0.025; // 25ms
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.15));
  }
  const noise = ctx.createBufferSource();
  noise.buffer = buffer;

  // Bandpass to shape the "plastic key" character
  const filter = ctx.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.value = 2000 + Math.random() * 1500; // 2000-3500Hz randomized
  filter.Q.value = 1.2;

  const noiseGain = ctx.createGain();
  noiseGain.gain.setValueAtTime(0.06, t);
  noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 0.025);

  noise.connect(filter).connect(noiseGain).connect(ctx.destination);
  noise.start(t);
  noise.stop(t + 0.025);

  // Layer 2: Sharp click transient (the "snap")
  const click = ctx.createOscillator();
  const clickGain = ctx.createGain();
  click.type = "square";
  click.frequency.value = 3000 + Math.random() * 2000; // Randomize pitch
  clickGain.gain.setValueAtTime(0.02, t);
  clickGain.gain.exponentialRampToValueAtTime(0.001, t + 0.008);
  click.connect(clickGain).connect(ctx.destination);
  click.start(t);
  click.stop(t + 0.008);
});
