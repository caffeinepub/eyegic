import { Link } from '@tanstack/react-router';
import { Heart } from 'lucide-react';
import BrandLogo from '../brand/BrandLogo';

export default function SiteFooter() {
  const currentYear = new Date().getFullYear();
  const appIdentifier = typeof window !== 'undefined' ? window.location.hostname : 'eyegic';

  return (
    <footer className="border-t bg-muted/30">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center">
              <img
                src="/assets/generated/EYEGIC LOGO for ID cards-5.dim_1536x1024.png"
                alt="Eyegic"
                className="h-10 w-auto object-contain"
              />
            </div>
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
                <Link to="/provider/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
                  Provider Portal
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p className="flex items-center justify-center gap-1">
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
