let _wakeLock = null;

async function requestWakeLock() {
  if (!('wakeLock' in navigator)) return;
  try { _wakeLock = await navigator.wakeLock.request('screen'); } catch(e) {}
}

document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') requestWakeLock();
});

requestWakeLock();

class LiveTimer {
  constructor() {
    this.startTs  = null;
    this.pausedMs = 0;
    this.pauseTs  = null;
    this.running  = false;
  }

  start() {
    this.startTs  = Date.now();
    this.pausedMs = 0;
    this.pauseTs  = null;
    this.running  = true;
  }

  pause() {
    if (!this.running) return;
    this.pauseTs = Date.now();
    this.running = false;
  }

  resume() {
    if (this.running || this.pauseTs === null) return;
    this.pausedMs += Date.now() - this.pauseTs;
    this.pauseTs  = null;
    this.running  = true;
  }

  elapsed() {
    if (this.startTs === null) return 0;
    const ref = this.pauseTs !== null ? this.pauseTs : Date.now();
    return ref - this.startTs - this.pausedMs;
  }

  restore(startTs, pausedMs, pauseTs) {
    this.startTs  = startTs  || null;
    this.pausedMs = pausedMs || 0;
    this.pauseTs  = pauseTs  || null;
    this.running  = this.startTs !== null && this.pauseTs === null;
  }
}

let _audioCtx = null;

function _getAudioCtx() {
  if (!_audioCtx) {
    const C = window.AudioContext || window.webkitAudioContext;
    if (C) _audioCtx = new C();
  }
  return _audioCtx;
}

function beep(freq = 880, dur = 0.12, vol = 0.75) {
  const ctx = _getAudioCtx();
  if (!ctx) return;
  try {
    if (ctx.state === 'suspended') ctx.resume();
    const osc  = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(vol, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + dur + 0.01);
  } catch(e) {}
}

function formatTime(ms) {
  const neg = ms < 0;
  const abs = Math.abs(ms);
  const s   = Math.floor(abs / 1000);
  const h   = Math.floor(s / 3600);
  const m   = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  const sign = neg ? '-' : '';
  if (h > 0) {
    return `${sign}${h}:${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`;
  }
  return `${sign}${m}:${String(sec).padStart(2,'0')}`;
}

function todayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}
