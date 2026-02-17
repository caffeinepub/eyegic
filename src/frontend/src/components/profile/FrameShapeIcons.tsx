export function AviatorIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 10 L8 6 L16 6 L21 10 L19 14 L16 16 L8 16 L5 14 Z" />
      <line x1="12" y1="6" x2="12" y2="10" />
    </svg>
  );
}

export function CatEyeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M2 12 Q6 8 12 8 Q18 8 22 12 Q18 16 12 16 Q6 16 2 12" />
      <path d="M22 12 L20 10" />
      <path d="M2 12 L4 10" />
    </svg>
  );
}

export function HexagonIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M8 4 L16 4 L20 12 L16 20 L8 20 L4 12 Z" />
    </svg>
  );
}

export function OvalIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <ellipse cx="12" cy="12" rx="9" ry="6" />
    </svg>
  );
}

export function RectangleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="4" y="8" width="16" height="8" rx="1" />
    </svg>
  );
}

export function RoundIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="7" />
    </svg>
  );
}

export function SquareIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="5" y="7" width="14" height="10" rx="1" />
    </svg>
  );
}

export function WayfarerIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 10 L6 7 L18 7 L21 10 L19 15 L16 17 L8 17 L5 15 Z" />
    </svg>
  );
}

export function WraparoundIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M2 12 Q4 8 12 8 Q20 8 22 12 Q20 16 12 16 Q4 16 2 12" />
      <path d="M2 12 L1 14" />
      <path d="M22 12 L23 14" />
    </svg>
  );
}
