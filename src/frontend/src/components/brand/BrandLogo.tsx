import { Link } from '@tanstack/react-router';

interface BrandLogoProps {
  className?: string;
  onClick?: () => void;
}

export default function BrandLogo({ className = '', onClick }: BrandLogoProps) {
  return (
    <Link to="/" className={`flex items-center flex-shrink-0 ${className}`} onClick={onClick}>
      <img
        src="/assets/generated/EYEGIC LOGO for ID cards-5.dim_1536x1024.png"
        alt="Eyegic"
        className="h-12 w-auto object-contain"
      />
    </Link>
  );
}
