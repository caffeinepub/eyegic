interface BrandLogoProps {
  size?: 'default' | 'large' | 'sheet';
}

export default function BrandLogo({ size = 'default' }: BrandLogoProps) {
  const sizeClasses = {
    default: 'h-16 md:h-20',
    large: 'h-20 md:h-24',
    sheet: 'h-16',
  };

  return (
    <img
      src="/assets/generated/eyegic-logo.dim_512x256.png"
      alt="Eyegic"
      className={`${sizeClasses[size]} w-auto object-contain flex-shrink-0`}
    />
  );
}
