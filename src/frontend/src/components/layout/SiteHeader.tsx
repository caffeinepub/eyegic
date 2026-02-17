import { useState } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, ChevronDown, LogOut, LogIn } from 'lucide-react';
import BrandLogo from '../brand/BrandLogo';
import WhatsAppIcon from '../icons/WhatsAppIcon';
import AdminNotificationsControl from './header/AdminNotificationsControl';
import MyProfileControl from './header/MyProfileControl';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import { useIsCallerAdmin } from '../../hooks/auth/useIsCallerAdmin';
import { useIsHomeRoute } from '../../hooks/routing/useIsHomeRoute';

export default function SiteHeader() {
  const navigate = useNavigate();
  const { identity, login, clear, loginStatus } = useInternetIdentity();
  const queryClient = useQueryClient();
  const { data: isAdmin } = useIsCallerAdmin();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isHomeRoute = useIsHomeRoute();

  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === 'logging-in';

  const handleLogout = async () => {
    await clear();
    queryClient.clear();
    navigate({ to: '/' });
  };

  const handleLogin = async () => {
    try {
      await login();
    } catch (error: any) {
      console.error('Login error:', error);
      if (error.message === 'User is already authenticated') {
        await clear();
        setTimeout(() => login(), 300);
      }
    }
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const navLinks = [
    { to: '/services/mobile-optician', label: 'Mobile Optician' },
    { to: '/services/rentals', label: 'Rentals' },
    { to: '/services/repairs', label: 'Repairs' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/98 backdrop-blur-md supports-[backdrop-filter]:bg-background/98 shadow-sm">
      <div className="container-custom flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <BrandLogo variant="header" onClick={closeMobileMenu} />

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="hidden md:flex gap-1">
                Contact Us
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <a
                  href="https://wa.me/918600044322"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  WhatsApp
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href="mailto:info@eyegic.com" className="flex items-center gap-2">
                  <span>📧</span>
                  Email
                </a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {isAuthenticated ? (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate({ to: '/my-bookings' })}
                className="hidden md:flex"
              >
                My Bookings
              </Button>

              {isHomeRoute && (
                <div className="hidden md:flex">
                  <MyProfileControl variant="desktop" />
                </div>
              )}

              {isHomeRoute && isAdmin && (
                <div className="hidden md:flex">
                  <AdminNotificationsControl />
                </div>
              )}

              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="hidden md:flex gap-2"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </>
          ) : (
            <Button
              variant="default"
              size="sm"
              onClick={handleLogin}
              disabled={isLoggingIn}
              className="hidden md:flex gap-2"
            >
              <LogIn className="h-4 w-4" />
              {isLoggingIn ? 'Logging in...' : 'Login'}
            </Button>
          )}

          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <div className="flex flex-col gap-4 mt-8">
                <BrandLogo onClick={closeMobileMenu} />

                <nav className="flex flex-col gap-3">
                  {navLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={closeMobileMenu}
                      className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>

                <div className="border-t pt-4 flex flex-col gap-3">
                  <div className="text-sm font-medium mb-2">Contact Us</div>
                  <a
                    href="https://wa.me/918600044322"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground py-2"
                    onClick={closeMobileMenu}
                  >
                    <WhatsAppIcon className="h-4 w-4" />
                    WhatsApp
                  </a>
                  <a
                    href="mailto:info@eyegic.com"
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground py-2"
                    onClick={closeMobileMenu}
                  >
                    <span>📧</span>
                    Email
                  </a>
                </div>

                {isAuthenticated && (
                  <div className="border-t pt-4 flex flex-col gap-3">
                    <Button
                      variant="ghost"
                      className="justify-start"
                      onClick={() => {
                        navigate({ to: '/my-bookings' });
                        closeMobileMenu();
                      }}
                    >
                      My Bookings
                    </Button>

                    {isHomeRoute && (
                      <MyProfileControl variant="mobile" onNavigate={closeMobileMenu} />
                    )}

                    {isHomeRoute && isAdmin && (
                      <Button
                        variant="ghost"
                        className="justify-start"
                        onClick={() => {
                          navigate({ to: '/admin/notifications' });
                          closeMobileMenu();
                        }}
                      >
                        Admin Notifications
                      </Button>
                    )}

                    <Button
                      variant="outline"
                      className="justify-start gap-2"
                      onClick={() => {
                        handleLogout();
                        closeMobileMenu();
                      }}
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </Button>
                  </div>
                )}

                {!isAuthenticated && (
                  <div className="border-t pt-4">
                    <Button
                      variant="default"
                      className="w-full gap-2"
                      onClick={() => {
                        handleLogin();
                        closeMobileMenu();
                      }}
                      disabled={isLoggingIn}
                    >
                      <LogIn className="h-4 w-4" />
                      {isLoggingIn ? 'Logging in...' : 'Login'}
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
