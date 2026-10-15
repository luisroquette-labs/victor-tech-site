// Capa SVG determinística por slug — brasas/circuito na paleta do site.
function mulberry32(a: number) {
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function seedFrom(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export default function PostCover({ slug }: { slug: string }) {
  const rnd = mulberry32(seedFrom(slug));
  const W = 400, H = 250;
  const nodes = Array.from({ length: 16 }, () => ({
    x: 20 + rnd() * (W - 40),
    y: 20 + rnd() * (H - 40),
    r: 1 + rnd() * 3,
    cyan: rnd() < 0.25,
  }));
  const lines = Array.from({ length: 10 }, () => ({
    a: Math.floor(rnd() * nodes.length),
    b: Math.floor(rnd() * nodes.length),
  }));

  return (
    <svg className="cover" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <radialGradient id={`bg-${slug}`} cx="70%" cy="20%" r="90%">
          <stop offset="0" stopColor="#1a0f08" />
          <stop offset="1" stopColor="#07090c" />
        </radialGradient>
      </defs>
      <rect width={W} height={H} fill={`url(#bg-${slug})`} />
      {lines.map((l, i) => {
        const a = nodes[l.a], b = nodes[l.b];
        return <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="rgba(255,122,24,0.18)" strokeWidth="1" />;
      })}
      {nodes.map((n, i) => (
        <circle key={i} cx={n.x} cy={n.y} r={n.r} fill={n.cyan ? "#28d3ec" : "#ff5a1f"} opacity={0.5 + rnd() * 0.5} />
      ))}
    </svg>
  );
}
