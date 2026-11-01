/* ennaim.dev — small vanilla script: hero word cycle, marquee loop, feature tabs,
   scroll reveal, FAQ accordion, copy-email button, mobile nav. No dependencies. */
(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const EMAIL = 'yassine@ennaim.dev';

  /* 1. Hero: cycle the green word every 4.2s (mastra.ai cadence, 700ms colour fade in CSS) */
  const words = [...document.querySelectorAll('[data-cycle]')];
  if (words.length > 1 && !reduce) {
    let i = 0;
    setInterval(() => {
      words[i].classList.remove('is-on');
      i = (i + 1) % words.length;
      words[i].classList.add('is-on');
    }, 4200);
  }

  /* 2. Marquee: clone the items once so translateX(-50%) loops seamlessly */
  const track = document.querySelector('.marquee__track');
  if (track) {
    [...track.children].forEach((item) => {
      const clone = item.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      track.appendChild(clone);
    });
  }

  /* 3. Feature tabs: direction-aware switch, staggered code lines, autoplay until touched */
  const tabs = document.getElementById('tabs');
  if (tabs) {
    const triggers = [...tabs.querySelectorAll('.tabs__tab')];
    const panels = [...tabs.querySelectorAll('.tabs__panel')];
    const copies = [...tabs.querySelectorAll('.tabs__copy-item')];
    let current = 0;
    let timer = null;
    let touched = false;

    const show = (idx) => {
      if (idx === current) return;
      tabs.style.setProperty('--dir', idx > current ? 1 : -1);
      triggers.forEach((t, i) => t.setAttribute('aria-selected', String(i === idx)));
      panels.forEach((p, i) => {
        const on = i === idx;
        p.hidden = !on;
        p.classList.toggle('is-active', on);
        p.classList.remove('is-in');
        if (on) {
          p.querySelectorAll('.code .l').forEach((l, n) => l.style.setProperty('--n', n));
          void p.offsetWidth;
          p.classList.add('is-in');
        }
      });
      copies.forEach((c, i) => {
        c.classList.remove('is-in');
        c.classList.toggle('is-active', i === idx);
        if (i === idx) { void c.offsetWidth; c.classList.add('is-in'); }
      });
      current = idx;
    };
    const stopAuto = () => { touched = true; if (timer) { clearInterval(timer); timer = null; } };

    triggers.forEach((t, i) => t.addEventListener('click', () => { stopAuto(); show(i); }));
    tabs.querySelector('.tabs__bar').addEventListener('keydown', (e) => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      e.preventDefault();
      stopAuto();
      const n = (current + (e.key === 'ArrowRight' ? 1 : -1) + triggers.length) % triggers.length;
      show(n);
      triggers[n].focus();
    });

    if (!reduce && 'IntersectionObserver' in window) {
      new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && !timer && !touched) {
          timer = setInterval(() => show((current + 1) % triggers.length), 7000);
        } else if (!entry.isIntersecting && timer) {
          clearInterval(timer);
          timer = null;
        }
      }, { threshold: 0.4 }).observe(tabs);
    }
  }

  /* 5. Scroll reveal */
  const revealed = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && !reduce) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('in-view'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    revealed.forEach((el) => io.observe(el));
  } else {
    revealed.forEach((el) => el.classList.add('in-view'));
  }

  /* 6. FAQ accordion */
  document.querySelectorAll('.faq__q').forEach((q) => {
    q.addEventListener('click', () => {
      const open = q.parentElement.classList.toggle('is-open');
      q.setAttribute('aria-expanded', String(open));
    });
  });

  /* 7. Copy email: slides "Copy email" up to reveal "Copied" (mastra's agent-prompt CTA) */
  const copy = document.getElementById('copyEmail');
  if (copy) {
    copy.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(EMAIL);
      } catch {
        window.location.href = `mailto:${EMAIL}`;
        return;
      }
      copy.classList.add('is-copied');
      setTimeout(() => copy.classList.remove('is-copied'), 2000);
    });
  }

  /* 8. Mobile nav */
  const nav = document.getElementById('nav');
  const toggle = document.getElementById('navToggle');
  if (nav && toggle) {
    const setOpen = (open) => {
      nav.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    };
    toggle.addEventListener('click', () => setOpen(!nav.classList.contains('is-open')));
    nav.querySelectorAll('.nav__mobile a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
  }
})();
