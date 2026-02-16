import { ReactNode } from 'react';

interface PageLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export default function PageLayout({ children, title, description, maxWidth = 'lg' }: PageLayoutProps) {
  const maxWidthClasses = {
    sm: 'max-w-2xl',
    md: 'max-w-4xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'max-w-full',
  };

  return (
    <div className="section-spacing">
      <div className={`container-custom ${maxWidthClasses[maxWidth]} mx-auto`}>
        {(title || description) && (
          <div className="mb-12 text-center">
            {title && <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>}
            {description && <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{description}</p>}
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
