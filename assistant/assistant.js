/*
  Sapphire, the "Ask about Shaniah" assistant (her look lives in sapphire.js).

  Today it answers from assistant/knowledge.json with keyword matching (no AI, no cost).
  To switch on live AI later: deploy assistant/worker.js (see README) and paste its URL
  into AI_ENDPOINT below. If the AI ever fails, it falls back to the scripted answers.
*/
(function () {
  var AI_ENDPOINT = ''; // e.g. 'https://ask-shaniah.<your-subdomain>.workers.dev'

  var KB_URL = 'assistant/knowledge.json';
  var kb = null, history = [], busy = false;

  // ---------- Build the widget ----------
  var launcher = el('button', { class: 'ask-launcher', type: 'button', 'aria-expanded': 'false', 'aria-controls': 'ask-panel' });
  launcher.innerHTML = '<span class="ask-launcher-blob">' + window.sapphireSVG(76) + '</span><span class="ask-launcher-label">Ask Sapphire<small>about Niah</small></span>';

  var panel = el('section', { class: 'ask-panel', id: 'ask-panel', role: 'dialog', 'aria-label': 'Ask Sapphire about Niah', hidden: '' });
  panel.innerHTML =
    '<header class="ask-head">' +
      '<span class="ask-avatar">' + window.sapphireSVG(52) + '</span>' +
      '<div><strong>Sapphire</strong><span class="ask-sub">Celestial guide to Niah\'s work</span></div>' +
      '<button type="button" class="ask-close" aria-label="Close">&times;</button>' +
    '</header>' +
    '<div class="ask-log" aria-live="polite"></div>' +
    '<form class="ask-form" autocomplete="off">' +
      '<label class="sr-only" for="ask-input">Your question</label>' +
      '<input id="ask-input" type="text" maxlength="300" placeholder="Ask a question…" />' +
      '<button type="submit" aria-label="Send"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button>' +
    '</form>';

  document.body.appendChild(launcher);
  document.body.appendChild(panel);

  var log = panel.querySelector('.ask-log');
  var form = panel.querySelector('.ask-form');
  var input = panel.querySelector('#ask-input');

  launcher.addEventListener('click', function () { panel.hidden ? open() : close(); });
  panel.querySelector('.ask-close').addEventListener('click', close);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !panel.hidden) close(); });
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var q = input.value.trim();
    if (q && !busy) { input.value = ''; ask(q); }
  });
  // Links inside answers that point at this page's sections should close the panel on small screens.
  log.addEventListener('click', function (e) {
    var a = e.target.closest('a');
    if (a && window.matchMedia('(max-width: 600px)').matches) close();
  });

  function open() {
    panel.hidden = false;
    launcher.setAttribute('aria-expanded', 'true');
    launcher.classList.add('is-open');
    load().then(function () {
      if (!log.children.length) {
        bot(kb.greeting);
        chips(kb.starters);
      }
    });
    setTimeout(function () { input.focus(); }, 50);
  }
  function close() {
    panel.hidden = true;
    launcher.setAttribute('aria-expanded', 'false');
    launcher.classList.remove('is-open');
    launcher.focus();
  }

  function load() {
    if (kb) return Promise.resolve();
    return fetch(KB_URL).then(function (r) { return r.json(); }).then(function (d) { kb = d; })
      .catch(function () {
        kb = { greeting: 'Sorry, I couldn\'t load my answers right now.', fallback: '<a href="index.html#contact">Send Niah a message</a> instead.', starters: [], entries: [] };
      });
  }

  // ---------- Conversation ----------
  function ask(q, fromChip) {
    clearChips();
    user(q);
    busy = true;
    var typing = bot('<span class="ask-typing"><i></i><i></i><i></i><em>' + (kb.thinking || 'Thinking…') + '</em></span>');
    var scripted = match(q), answerEl;

    var reply = AI_ENDPOINT ? askAI(q).catch(function () { return null; }) : delay(900).then(function () { return null; });
    reply.then(function (aiText) {
      typing.remove();
      if (aiText) {
        var m = bot('');
        m.textContent = aiText; // AI text is shown as plain text, never as HTML
        answerEl = m;
        history.push({ role: 'user', content: q }, { role: 'assistant', content: aiText });
        history = history.slice(-8);
        chips(scripted ? scripted.related : kb.starters);
      } else if (scripted) {
        answerEl = bot((scripted.lead ? '<span class="ask-lead">' + scripted.lead + '</span>' : '') + scripted.answer);
        chips(scripted.related);
      } else {
        answerEl = bot(kb.fallback);
        chips(kb.starters);
      }
      // Keep the start of the answer in view so long answers read from the top.
      log.scrollTop = Math.max(0, answerEl.offsetTop - 12);
      busy = false;
      if (!fromChip) input.focus();
    });
  }

  function askAI(q) {
    return fetch(AI_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: q, history: history })
    }).then(function (r) {
      if (!r.ok) throw new Error('AI ' + r.status);
      return r.json();
    }).then(function (d) {
      if (!d || !d.answer) throw new Error('empty');
      return String(d.answer);
    });
  }

  // ---------- Scripted matching ----------
  function norm(s) {
    return ' ' + s.toLowerCase().replace(/[’']/g, '\'').replace(/[^a-z0-9+#/'\- ]+/g, ' ').replace(/\s+/g, ' ').trim() + ' ';
  }
  function match(q) {
    if (!kb || !kb.entries.length) return null;
    var text = norm(q), best = null, bestScore = 0;
    kb.entries.forEach(function (e) {
      var score = 0;
      e.keywords.forEach(function (k) {
        var kn = norm(k);
        // whole-word or whole-phrase match; also allow simple plurals ("workshops" -> "workshop")
        if (text.indexOf(kn) !== -1 || text.indexOf(kn.replace(/ $/, 's ')) !== -1) {
          score += 1 + (kn.trim().split(' ').length - 1) * 1.5 + (kn.length > 8 ? 0.5 : 0);
        }
      });
      if (text.trim() === norm(e.question).trim()) score += 100;
      if (score > bestScore) { bestScore = score; best = e; }
    });
    if (bestScore >= 1) return best;
    // Broad questions like "tell me about her" go to the entry that lists them under "broad".
    for (var i = 0; i < kb.entries.length; i++) {
      var e = kb.entries[i];
      if ((e.broad || []).some(function (k) { return text.indexOf(norm(k)) !== -1; })) return e;
    }
    return null;
  }
  function byId(id) {
    for (var i = 0; i < kb.entries.length; i++) if (kb.entries[i].id === id) return kb.entries[i];
    return null;
  }

  // ---------- Rendering ----------
  function user(text) {
    var m = el('div', { class: 'ask-msg ask-user' });
    m.textContent = text;
    log.appendChild(m); scroll();
  }
  function bot(html) {
    var m = el('div', { class: 'ask-msg ask-bot' });
    m.innerHTML = html; // answers come from knowledge.json, which only Shaniah edits
    log.appendChild(m); scroll();
    return m;
  }
  function chips(ids) {
    if (!ids || !ids.length) return;
    var wrap = el('div', { class: 'ask-chips' });
    ids.forEach(function (id) {
      var e = byId(id);
      if (!e) return;
      var b = el('button', { type: 'button', class: 'ask-chip' });
      b.textContent = e.question;
      b.addEventListener('click', function () { if (!busy) ask(e.question, true); });
      wrap.appendChild(b);
    });
    log.appendChild(wrap); scroll();
  }
  function clearChips() {
    Array.prototype.forEach.call(log.querySelectorAll('.ask-chips'), function (c) { c.remove(); });
  }
  function scroll() { log.scrollTop = log.scrollHeight; }
  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }
  function el(tag, attrs) {
    var n = document.createElement(tag);
    for (var k in attrs) n.setAttribute(k, attrs[k]);
    return n;
  }
})();
