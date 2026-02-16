import { Link } from '@tanstack/react-router';

interface BrandLogoProps {
  className?: string;
  onClick?: () => void;
  variant?: 'default' | 'header';
}

export default function BrandLogo({ className = '', onClick, variant = 'default' }: BrandLogoProps) {
  const textClasses = variant === 'header' 
    ? 'text-[clamp(1.75rem,5vw,3.5rem)] font-bold leading-none tracking-tight' 
    : 'text-3xl font-bold leading-none tracking-tight';

  const linkClasses = variant === 'header'
    ? `flex items-center h-full flex-shrink-0 ${className}`
    : `flex items-center flex-shrink-0 ${className}`;

  return (
    <Link to="/" className={linkClasses} onClick={onClick}>
      <span className={textClasses}>EYEGIC</span>
    </Link>
  );
}
