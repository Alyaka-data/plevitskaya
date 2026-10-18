// Подписи автора и встраивание дашборда по ссылке из config.js
(function () {
  var cfg = window.SITE || {};
  var author = (cfg.author || '').trim();
  document.querySelectorAll('[data-author]').forEach(function (el) {
    if (author) { el.textContent = 'Автор проекта: ' + author; el.hidden = false; }
  });

  var box = document.getElementById('dashboard-embed');
  if (!box) return;
  var raw = (cfg.dashboardUrl || '').trim();
  var frame = box.querySelector('iframe');
  var ph = box.querySelector('.placeholder');
  var open = document.getElementById('dashboard-open');
  var u = null;
  try { u = raw ? new URL(raw) : null; } catch (e) { u = null; }
  if (!u) { frame.hidden = true; ph.hidden = false; if (open) open.hidden = true; return; }
  var dark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  var e = new URL(u.toString());
  e.searchParams.set('_embedded', '1');
  e.searchParams.set('_no_controls', '1');
  e.searchParams.set('_lang', 'ru');
  e.searchParams.set('_theme', dark ? 'dark' : 'light');
  frame.src = e.toString();
  frame.hidden = false; ph.hidden = true;
  if (open) { open.href = u.toString(); open.hidden = false; }
})();
