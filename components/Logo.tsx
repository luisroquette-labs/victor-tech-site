export default function Logo() {
  return (
    <span className="logo">
      <svg className="mark" viewBox="0 0 64 64" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="lg" x1="14" y1="14" x2="50" y2="52" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#ff7a18" />
            <stop offset="0.5" stopColor="#ff4d12" />
            <stop offset="1" stopColor="#ff2740" />
          </linearGradient>
        </defs>
        <rect width="64" height="64" rx="16" fill="#0d0a08" stroke="rgba(255,255,255,0.08)" />
        <path d="M16 17 L32 46 L48 17" fill="none" stroke="url(#lg)" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="32" cy="14" r="3.2" fill="#ff5a1f" />
      </svg>
      <span className="word">
        <b>VICTOR</b> <span>.TECH</span>
      </span>
    </span>
  );
}
