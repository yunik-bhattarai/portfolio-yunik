/* -------- STEP 1: Animated Skill Progress Bars --------
   Paste this at the end of black.js (or save as skill-bars.js and include it)
--------------------------------------------------------------------------*/
(function initSkillBars() {
  // small mapping you can customize: skill name (lowercase) => percentage
  const SKILL_PCTS = {
    html: 90, css: 88, javascript: 82, js: 82, python: 80, java: 70,
    sql: 72, mysql: 72, unity: 65, 'c#': 60, 'c++': 60, tensorflow: 55,
    pandas: 78, numpy: 75, react: 68, flask: 66
  };

  // helper: normalize skill name to lookup key
  const normalize = s => (s || '').toString().trim().toLowerCase();

  // Create and inject styles (non-destructive)
  if (!document.getElementById('skill-bars-injected-style')) {
    const css = `
      /* Skill bars injected by Step 1 JS */
      .skill-bars { margin-top: 18px; display:flex; flex-direction:column; gap:10px; }
      .skill-bar { background:#f1f5f9; border-radius:8px; overflow:hidden; padding:8px 10px; position:relative; min-height:34px; }
      .skill-bar .fill { height:18px; width:0%; border-radius:6px; transition: width 900ms cubic-bezier(.22,.9,.2,1); background:linear-gradient(90deg,var(--primary-color), #06b6d4); box-shadow: inset 0 -2px 6px rgba(0,0,0,0.06); }
      .skill-bar .label { position:absolute; left:12px; top:50%; transform:translateY(-50%); font-size:0.9em; color:#0f172a; font-weight:700; pointer-events:none; }
      .skill-bar .pct { position:absolute; right:10px; top:50%; transform:translateY(-50%); font-size:0.82em; color:#0f172a; font-weight:800; pointer-events:none; }
      @media (max-width:600px){ .skill-bar { padding:8px; } .skill-bar .label{ font-size:0.84em } .skill-bar .pct{ font-size:0.8em } }
    `;
    const st = document.createElement('style');
    st.id = 'skill-bars-injected-style';
    st.textContent = css;
    document.head.appendChild(st);
  }

  // Find .skill-card elements
  const skillCards = Array.from(document.querySelectorAll('.skill-card'));
  if (!skillCards.length) return; // nothing to do

  skillCards.forEach(card => {
    // don't inject twice
    if (card.querySelector('.skill-bars')) return;

    // determine source labels: check .skill-tag elements inside the card
    const tagEls = Array.from(card.querySelectorAll('.skill-tag'));
    const labels = tagEls.length ? tagEls.slice(0, 6).map(t => t.textContent.trim()) : [];

    // If no tags, create 3 generic bars
    const barsToCreate = labels.length ? labels : ['Primary', 'Secondary', 'Tools'];

    const wrap = document.createElement('div');
    wrap.className = 'skill-bars';

    barsToCreate.forEach((labelText, idx) => {
      const labelKey = normalize(labelText);
      const pct = SKILL_PCTS[labelKey] !== undefined ? SKILL_PCTS[labelKey] : (70 + (idx * 7)); // fallback sample values
      const bar = document.createElement('div');
      bar.className = 'skill-bar';
      bar.dataset.pct = String(pct);
      bar.dataset.skill = labelText;

      // inner elements
      const fill = document.createElement('div');
      fill.className = 'fill';
      // label + pct will be inserted for accessibility
      const label = document.createElement('div');
      label.className = 'label';
      label.textContent = labelText;
      const pctEl = document.createElement('div');
      pctEl.className = 'pct';
      pctEl.textContent = pct + '%';

      // structure
      bar.appendChild(fill);
      bar.appendChild(label);
      bar.appendChild(pctEl);
      wrap.appendChild(bar);
    });

    // append after existing content in card (non-destructive)
    card.appendChild(wrap);
  });

  // IntersectionObserver: animate when in viewport
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const card = entry.target;
      const bars = Array.from(card.querySelectorAll('.skill-bar'));
      bars.forEach((bar, i) => {
        const pct = parseInt(bar.dataset.pct || '70', 10);
        const fill = bar.querySelector('.fill');
        const pctEl = bar.querySelector('.pct');

        if (fill) {
          // slight stagger
          setTimeout(() => {
            fill.style.width = pct + '%';
            if (pctEl) pctEl.textContent = pct + '%';
          }, i * 120);
        }
      });
      obs.unobserve(card);
    });
  }, { threshold: 0.25 });

  // observe each card
  skillCards.forEach(card => observer.observe(card));

  // Accessibility: expose progress via aria
  document.querySelectorAll('.skill-bar').forEach(bar => {
    const fill = bar.querySelector('.fill');
    const pct = parseInt(bar.dataset.pct || '0', 10);
    bar.setAttribute('role', 'progressbar');
    bar.setAttribute('aria-valuemin', '0');
    bar.setAttribute('aria-valuemax', '100');
    bar.setAttribute('aria-valuenow', String(0));
    // update aria when width animates
    const ro = new MutationObserver(() => {
      const cur = parseInt((fill.style.width || '0%').replace('%',''),10) || 0;
      bar.setAttribute('aria-valuenow', String(cur));
    });
    ro.observe(fill, { attributes: true, attributeFilter: ['style'] });
  });

})(); 
/* -------- end STEP 1 JS -------- */
