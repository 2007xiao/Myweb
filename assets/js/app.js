/* 襄阳城市介绍 · 交互脚本
   纯原生 JS，无依赖。功能：
   1) 明暗主题切换并记忆
   2) 右侧目录：滚动高亮、上一节/下一节、移动端抽屉
   3) 内容块滚动渐入
   4) 图片加载失败时给出可读占位，避免版面塌陷
*/
(() => {
  'use strict';

  const root = document.documentElement;
  const rail = document.getElementById('rail');
  const railNav = document.getElementById('railNav');
  const railToggle = document.getElementById('railToggle');
  const scrim = document.getElementById('scrim');
  const themeToggle = document.getElementById('themeToggle');
  const prevBtn = document.getElementById('prevSec');
  const nextBtn = document.getElementById('nextSec');

  /* ---------- 1. 主题 ---------- */
  const STORE_KEY = 'xiangyang-theme';
  try {
    const saved = localStorage.getItem(STORE_KEY);
    if (saved === 'dark' || saved === 'light') root.dataset.theme = saved;
    else if (window.matchMedia('(prefers-color-scheme: dark)').matches) root.dataset.theme = 'dark';
  } catch (_) {}

  const paintTheme = () => {
    const dark = root.dataset.theme === 'dark';
    document.querySelector('meta[name=theme-color]')
      .setAttribute('content', dark ? '#16211d' : '#f6f3ec');
    themeToggle.textContent = dark ? '☀' : '◐';
    themeToggle.setAttribute('aria-label', dark ? '切换到浅色主题' : '切换到深色主题');
  };
  paintTheme();

  themeToggle.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    paintTheme();
    try { localStorage.setItem(STORE_KEY, root.dataset.theme); } catch (_) {}
  });

  /* ---------- 2. 右侧目录 ---------- */
  const links = [...railNav.querySelectorAll('a')];
  const targets = links
    .map(a => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);

  let current = 0;

  const setActive = (index, scroll) => {
    current = Math.max(0, Math.min(links.length - 1, index));
    links.forEach((a, i) => a.classList.toggle('active', i === current));
    if (scroll) {
      const id = links[current].getAttribute('href');
      const el = document.querySelector(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const closeDrawer = () => {
    rail.classList.remove('open');
    document.body.classList.remove('drawer-open');
    railToggle.setAttribute('aria-expanded', 'false');
    scrim.classList.remove('on');
    scrim.hidden = true;
  };

  const openDrawer = () => {
    rail.classList.add('open');
    document.body.classList.add('drawer-open');
    railToggle.setAttribute('aria-expanded', 'true');
    scrim.hidden = false;
    requestAnimationFrame(() => scrim.classList.add('on'));
  };

  railToggle.addEventListener('click', () => {
    rail.classList.contains('open') ? closeDrawer() : openDrawer();
  });
  scrim.addEventListener('click', closeDrawer);
  const railClose = document.getElementById('railClose');
  if (railClose) railClose.addEventListener('click', closeDrawer);

  links.forEach((a, i) => {
    a.addEventListener('click', e => {
      e.preventDefault();
      setActive(i, true);
      closeDrawer();
      history.replaceState(null, '', a.getAttribute('href'));
    });
  });

  prevBtn.addEventListener('click', () => setActive(current - 1, true));
  nextBtn.addEventListener('click', () => setActive(current + 1, true));

  document.addEventListener('keydown', e => {
    if (e.target.matches('input, textarea, select')) return;
    if (e.key === 'Escape') closeDrawer();
    if (e.altKey && (e.key === 'ArrowDown' || e.key === 'j')) { e.preventDefault(); setActive(current + 1, true); }
    if (e.altKey && (e.key === 'ArrowUp' || e.key === 'k')) { e.preventDefault(); setActive(current - 1, true); }
  });

  /* 滚动定位：取视口上 1/3 处所在的章节，避免长章节提前高亮 */
  let ticking = false;
  const syncActive = () => {
    ticking = false;
    const probe = window.innerHeight * 0.34;
    let best = 0;
    targets.forEach((el, i) => {
      const box = el.getBoundingClientRect();
      if (box.top - probe <= 0) best = i;
    });
    if (best !== current) setActive(best, false);
  };
  window.addEventListener('scroll', () => {
    if (!ticking) { ticking = true; requestAnimationFrame(syncActive); }
  }, { passive: true });
  window.addEventListener('resize', () => { if (window.innerWidth > 1040) closeDrawer(); });

  const hash = location.hash && document.querySelector(location.hash);
  if (hash) {
    const i = targets.indexOf(hash);
    if (i >= 0) setActive(i, false);
  } else {
    setActive(0, false);
  }
  syncActive();

  /* ---------- 3. 渐入 ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.06 });
    revealEls.forEach((el, i) => {
      el.style.transitionDelay = Math.min(i % 4, 3) * 60 + 'ms';
      io.observe(el);
    });
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  /* ---------- 4. 图片兜底 ---------- */
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', () => {
      const holder = img.closest('.ph') || img.parentElement;
      img.style.display = 'none';
      if (holder && !holder.querySelector('.img-fallback')) {
        const note = document.createElement('div');
        note.className = 'img-fallback';
        note.textContent = '图片未能加载：请确认 image/ 目录与图片文件完整。';
        note.style.cssText = 'display:flex;align-items:center;justify-content:center;' +
          'min-height:120px;padding:20px;font:12px/1.7 var(--sans);text-align:center;' +
          'color:var(--muted);background:var(--paper-2);';
        holder.appendChild(note);
      }
    });
  });
})();