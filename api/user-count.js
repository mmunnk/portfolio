export default async function handler(req, res) {
  try {
    const r = await fetch('https://vtrl.cc/api/userCount', {
      headers: { Authorization: `Bearer ${process.env.VTRL_STATS_TOKEN}` },
    });
    if (!r.ok) {
      res.status(502).json({ error: 'upstream' });
      return;
    }
    const { count } = await r.json();
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
    res.status(200).json({ count });
  } catch {
    res.status(502).json({ error: 'upstream' });
  }
}
