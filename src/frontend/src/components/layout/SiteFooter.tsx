import { Link } from '@tanstack/react-router';
import { Heart, Mail } from 'lucide-react';
import WhatsAppIcon from '../icons/WhatsAppIcon';
import { BUILD_INFO } from '../../config/buildInfo';

export default function SiteFooter() {
  const currentYear = new Date().getFullYear();
  const appIdentifier = typeof window !== 'undefined' ? window.location.hostname : 'eyegic';

  const handleWhatsApp = () => {
    window.open('https://wa.me/918600044322', '_blank');
  };

  const handleEmail = () => {
    window.location.href = 'mailto:info@eyegic.com';
  };

  return (
    <footer className="border-t bg-muted/30">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <Link to="/" className="inline-block">
              <span className="text-2xl font-bold leading-none tracking-tight">EYEGIC</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              On-demand eyewear services at your doorstep
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium">Services</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/services/mobile-optician" className="text-muted-foreground hover:text-foreground transition-colors">
                  Mobile Optician
                </Link>
              </li>
              <li>
                <Link to="/rentals" className="text-muted-foreground hover:text-foreground transition-colors">
                  Eyewear Rentals
                </Link>
              </li>
              <li>
                <Link to="/services/repairs" className="text-muted-foreground hover:text-foreground transition-colors">
                  Repairs & Adjustments
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium">Account</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/my-bookings" className="text-muted-foreground hover:text-foreground transition-colors">
                  My Bookings
                </Link>
              </li>
              <li>
                <Link to="/my-profile" className="text-muted-foreground hover:text-foreground transition-colors">
                  My Profile
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={handleWhatsApp}
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  8600044322
                </button>
              </li>
              <li>
                <button
                  onClick={handleEmail}
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  info@eyegic.com
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t space-y-2">
          <div className="text-center">
            <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
              {BUILD_INFO.identifier}
            </span>
          </div>
          <p className="text-center text-sm text-muted-foreground flex items-center justify-center gap-1">
            © {currentYear} Eyegic. Built with <Heart className="h-4 w-4 text-red-500 fill-red-500" /> using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(appIdentifier)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium hover:text-foreground transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
