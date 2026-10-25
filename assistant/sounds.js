/* Sapphire's sounds: soft celestial chimes made with the Web Audio API (no audio files).
   window.sapphireSound(name) plays one of: 'open', 'close', 'listening', 'thinking', 'happy', 'puzzled'.
   window.sapphireSound.muted (true/false) is remembered per visitor. */
(function () {
  var ctx = null, master = null, space = null;
  var KEY = 'sapphire-muted';
  var VOLUME = 0.5;

  var muted = false;
  try { muted = localStorage.getItem(KEY) === '1'; } catch (e) {}

  // A dreamy echo shared by every sound.
  function build(ac, out) {
    var m = ac.createGain(); m.gain.value = VOLUME; m.connect(out);
    var delay = ac.createDelay(1); delay.delayTime.value = 0.23;
    var fb = ac.createGain(); fb.gain.value = 0.38;
    var tone = ac.createBiquadFilter(); tone.type = 'lowpass'; tone.frequency.value = 3200;
    var wet = ac.createGain(); wet.gain.value = 0.35;
    delay.connect(tone); tone.connect(fb); fb.connect(delay); tone.connect(wet); wet.connect(m);
    return { master: m, space: delay };
  }

  function ensure() {
    if (ctx) { if (ctx.state === 'suspended') ctx.resume(); return true; }
    var AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return false;
    ctx = new AC();
    var b = build(ctx, ctx.destination); master = b.master; space = b.space;
    return true;
  }

  // One bell-like note: a sine with a soft attack, gentle decay and a faint overtone.
  function note(ac, dest, verb, freq, t, dur, vol, opts) {
    opts = opts || {};
    var g = ac.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + (opts.attack || 0.015));
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    g.connect(dest); g.connect(verb);
    [[1, 1], [2.01, 0.18], [3.98, 0.05]].forEach(function (p) {
      var o = ac.createOscillator(), og = ac.createGain();
      o.type = 'sine';
      o.frequency.setValueAtTime(freq * p[0], t);
      if (opts.bendTo) o.frequency.exponentialRampToValueAtTime(opts.bendTo * p[0], t + dur * 0.7);
      og.gain.value = p[1];
      o.connect(og); og.connect(g);
      o.start(t); o.stop(t + dur + 0.05);
    });
  }

  // Notes from a dreamy pentatonic scale.
  var N = { G4: 392, A4: 440, C5: 523.25, D5: 587.33, E5: 659.25, G5: 783.99, A5: 880, C6: 1046.5, D6: 1174.66, E6: 1318.5, G6: 1568, A6: 1760 };
  function sparkle(ac, d, v, t, count, spread) {
    var pool = [N.C6, N.D6, N.E6, N.G6, N.A6];
    for (var i = 0; i < count; i++) note(ac, d, v, pool[(i * 3 + 1) % pool.length], t + i * spread, 0.5, 0.05);
  }

  var SOUNDS = {
    open: function (ac, d, v, t) { [N.C5, N.E5, N.G5, N.C6].forEach(function (f, i) { note(ac, d, v, f, t + i * 0.07, 0.9, 0.16); }); sparkle(ac, d, v, t + 0.3, 3, 0.06); },
    close: function (ac, d, v, t) { [N.G5, N.E5, N.C5].forEach(function (f, i) { note(ac, d, v, f, t + i * 0.07, 0.6, 0.11); }); },
    listening: function (ac, d, v, t) { note(ac, d, v, N.A4, t, 0.35, 0.12); note(ac, d, v, N.D5, t + 0.09, 0.45, 0.1); },
    thinking: function (ac, d, v, t) { [N.E6, N.G5, N.D6, N.A5, N.C6].forEach(function (f, i) { note(ac, d, v, f, t + i * 0.13, 0.7, 0.06); }); },
    happy: function (ac, d, v, t) { [N.E5, N.G5, N.C6].forEach(function (f, i) { note(ac, d, v, f, t + i * 0.08, 1.0, 0.15); }); sparkle(ac, d, v, t + 0.26, 5, 0.05); },
    puzzled: function (ac, d, v, t) { note(ac, d, v, N.D5, t, 0.32, 0.12); note(ac, d, v, N.A4, t + 0.16, 0.6, 0.12, { bendTo: N.D5 }); }
  };

  window.sapphireSound = function (name) {
    if (muted || !SOUNDS[name] || !ensure()) return;
    SOUNDS[name](ctx, master, space, ctx.currentTime + 0.02);
  };
  Object.defineProperty(window.sapphireSound, 'muted', {
    get: function () { return muted; },
    set: function (v) { muted = !!v; try { localStorage.setItem(KEY, muted ? '1' : '0'); } catch (e) {} }
  });
  // Lets the preview tool render the sounds offline.
  window.sapphireSound._render = function (ac, out, name, t) { var b = build(ac, out); SOUNDS[name](ac, b.master, b.space, t); };
})();
