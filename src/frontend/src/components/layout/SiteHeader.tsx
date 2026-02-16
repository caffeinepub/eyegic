import { Link, useNavigate } from '@tanstack/react-router';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import LoginButton from '../auth/LoginButton';
import BrandLogo from '../brand/BrandLogo';

export default function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Mobile Optician', path: '/services/mobile-optician' },
    { label: 'Rentals', path: '/rentals' },
    { label: 'Repairs', path: '/services/repairs' },
    { label: 'My Bookings', path: '/my-bookings' },
    { label: 'Provider Portal', path: '/provider/dashboard' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container-custom flex h-24 md:h-28 items-center justify-between gap-4 px-4 md:px-6">
        <div className="flex items-center gap-6 md:gap-12 h-full">
          <BrandLogo variant="header" />

          <nav className="hidden md:flex items-center gap-6 lg:gap-7">
            {navLinks.slice(0, 4).map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground whitespace-nowrap"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3 md:gap-4 flex-shrink-0">
          <div className="hidden md:flex items-center gap-3 lg:gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate({ to: '/my-bookings' })}
            >
              My Bookings
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate({ to: '/provider/dashboard' })}
            >
              Provider Portal
            </Button>
            <LoginButton />
          </div>

          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="flex-shrink-0">
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex items-center justify-center py-6 border-b mb-6">
                <BrandLogo onClick={() => setMobileMenuOpen(false)} />
              </div>
              <nav className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="text-base font-medium text-foreground/80 transition-colors hover:text-foreground py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-4 border-t">
                  <LoginButton />
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
