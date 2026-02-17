import { Link, useNavigate } from '@tanstack/react-router';
import { Menu, X, Mail } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import LoginButton from '../auth/LoginButton';
import BrandLogo from '../brand/BrandLogo';
import WhatsAppIcon from '../icons/WhatsAppIcon';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useProfileCompletion } from '../../hooks/profile/useProfileCompletion';

export default function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const { data: profileCompletion } = useProfileCompletion();

  const isAuthenticated = !!identity;

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Mobile Optician', path: '/services/mobile-optician' },
    { label: 'Rentals', path: '/rentals' },
    { label: 'Repairs', path: '/services/repairs' },
    { label: 'My Bookings', path: '/my-bookings' },
  ];

  const handleWhatsApp = () => {
    window.open('https://wa.me/918600044322', '_blank');
  };

  const handleEmail = () => {
    window.location.href = 'mailto:info@eyegic.com';
  };

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
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  Contact Us
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleWhatsApp}>
                  <WhatsAppIcon className="mr-2 h-4 w-4" />
                  WhatsApp: 8600044322
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleEmail}>
                  <Mail className="mr-2 h-4 w-4" />
                  Email: info@eyegic.com
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {isAuthenticated && (
              <div className="flex flex-col items-center">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate({ to: '/my-profile' })}
                >
                  My Profile
                </Button>
                {profileCompletion !== undefined && (
                  <span className="text-xs text-muted-foreground">
                    {profileCompletion}% complete
                  </span>
                )}
              </div>
            )}
            
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
                
                <div className="pt-4 border-t space-y-3">
                  <button
                    onClick={() => {
                      handleWhatsApp();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-2 text-base font-medium text-foreground/80 transition-colors hover:text-foreground py-2 w-full"
                  >
                    <WhatsAppIcon className="h-5 w-5" />
                    WhatsApp: 8600044322
                  </button>
                  
                  <button
                    onClick={() => {
                      handleEmail();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-2 text-base font-medium text-foreground/80 transition-colors hover:text-foreground py-2 w-full"
                  >
                    <Mail className="h-5 w-5" />
                    Email: info@eyegic.com
                  </button>

                  {isAuthenticated && (
                    <div className="pt-2">
                      <Button
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={() => {
                          navigate({ to: '/my-profile' });
                          setMobileMenuOpen(false);
                        }}
                      >
                        My Profile
                        {profileCompletion !== undefined && (
                          <span className="ml-auto text-xs text-muted-foreground">
                            {profileCompletion}%
                          </span>
                        )}
                      </Button>
                    </div>
                  )}
                </div>
                
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
