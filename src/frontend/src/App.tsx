import { createRouter, RouterProvider, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import { Toaster } from '@/components/ui/sonner';
import SiteHeader from './components/layout/SiteHeader';
import SiteFooter from './components/layout/SiteFooter';
import HomePage from './pages/HomePage';
import MobileOpticianPage from './pages/services/MobileOpticianPage';
import RentalsPage from './pages/services/RentalsPage';
import RepairsPage from './pages/services/RepairsPage';
import MobileOpticianBookingPage from './pages/bookings/mobile-optician/MobileOpticianBookingPage';
import MobileOpticianBookingConfirmationPage from './pages/bookings/mobile-optician/MobileOpticianBookingConfirmationPage';
import RepairRequestPage from './pages/bookings/repairs/RepairRequestPage';
import RepairRequestConfirmationPage from './pages/bookings/repairs/RepairRequestConfirmationPage';
import RentalsCatalogPage from './pages/rentals/RentalsCatalogPage';
import RentalItemDetailPage from './pages/rentals/RentalItemDetailPage';
import RentalBookingPage from './pages/bookings/rentals/RentalBookingPage';
import RentalBookingConfirmationPage from './pages/bookings/rentals/RentalBookingConfirmationPage';
import MyBookingsPage from './pages/bookings/MyBookingsPage';
import BookingDetailPage from './pages/bookings/BookingDetailPage';
import ProviderOnboardingPage from './pages/provider/ProviderOnboardingPage';
import ProviderDashboardPage from './pages/provider/ProviderDashboardPage';

function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
      <Toaster />
    </div>
  );
}

const rootRoute = createRootRoute({
  component: Layout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const mobileOpticianRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/services/mobile-optician',
  component: MobileOpticianPage,
});

const rentalsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/services/rentals',
  component: RentalsPage,
});

const repairsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/services/repairs',
  component: RepairsPage,
});

const mobileOpticianBookingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/book/mobile-optician',
  component: MobileOpticianBookingPage,
});

const mobileOpticianConfirmationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/book/mobile-optician/confirmation/$bookingId',
  component: MobileOpticianBookingConfirmationPage,
});

const repairRequestRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/book/repairs',
  component: RepairRequestPage,
});

const repairConfirmationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/book/repairs/confirmation/$bookingId',
  component: RepairRequestConfirmationPage,
});

const rentalsCatalogRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/rentals',
  component: RentalsCatalogPage,
});

const rentalItemDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/rentals/$itemId',
  component: RentalItemDetailPage,
});

const rentalBookingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/book/rentals/$itemId',
  component: RentalBookingPage,
});

const rentalConfirmationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/book/rentals/confirmation/$bookingId',
  component: RentalBookingConfirmationPage,
});

const myBookingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/my-bookings',
  component: MyBookingsPage,
});

const bookingDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/bookings/$bookingId',
  component: BookingDetailPage,
});

const providerOnboardingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/provider/onboard',
  component: ProviderOnboardingPage,
});

const providerDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/provider/dashboard',
  component: ProviderDashboardPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  mobileOpticianRoute,
  rentalsRoute,
  repairsRoute,
  mobileOpticianBookingRoute,
  mobileOpticianConfirmationRoute,
  repairRequestRoute,
  repairConfirmationRoute,
  rentalsCatalogRoute,
  rentalItemDetailRoute,
  rentalBookingRoute,
  rentalConfirmationRoute,
  myBookingsRoute,
  bookingDetailRoute,
  providerOnboardingRoute,
  providerDashboardRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
