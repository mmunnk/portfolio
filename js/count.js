(async () => {
  const el = document.getElementById('user-count');
  if (!el) return;

  let count;
  try {
    const res = await fetch('/api/user-count');
    if (!res.ok) throw new Error(`status ${res.status}`);
    ({ count } = await res.json());
  } catch {
    return; // keep the "—" fallback
  }
  if (typeof count !== 'number') return;

  const duration = 1200;
  const start = performance.now();
  const tick = (now) => {
    const t = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = Math.round(count * eased).toLocaleString('en-GB');
    if (t < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
})();
