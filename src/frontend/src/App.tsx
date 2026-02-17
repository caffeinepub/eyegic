import { RouterProvider, createRouter, createRoute, createRootRoute } from '@tanstack/react-router';
import { ThemeProvider } from 'next-themes';
import RootLayout from './components/layout/RootLayout';
import HomePage from './pages/HomePage';
import MobileOpticianPage from './pages/services/MobileOpticianPage';
import RentalsPage from './pages/services/RentalsPage';
import RepairsPage from './pages/services/RepairsPage';
import MobileOpticianBookingPage from './pages/bookings/mobile-optician/MobileOpticianBookingPage';
import MobileOpticianBookingConfirmationPage from './pages/bookings/mobile-optician/MobileOpticianBookingConfirmationPage';
import RepairRequestPage from './pages/bookings/repairs/RepairRequestPage';
import RepairRequestConfirmationPage from './pages/bookings/repairs/RepairRequestConfirmationPage';
import MyBookingsPage from './pages/bookings/MyBookingsPage';
import BookingDetailPage from './pages/bookings/BookingDetailPage';
import MyProfilePage from './pages/profile/MyProfilePage';
import ProviderOnboardingPage from './pages/provider/ProviderOnboardingPage';
import ProviderDashboardPage from './pages/provider/ProviderDashboardPage';
import AdminNotificationsPage from './pages/admin/AdminNotificationsPage';
import RentalsCatalogPage from './pages/rentals/RentalsCatalogPage';
import RentalItemDetailPage from './pages/rentals/RentalItemDetailPage';
import RentalBookingPage from './pages/bookings/rentals/RentalBookingPage';
import RentalBookingConfirmationPage from './pages/bookings/rentals/RentalBookingConfirmationPage';

const rootRoute = createRootRoute({
  component: RootLayout,
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

const rentalsServiceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/services/rentals',
  component: RentalsPage,
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

const repairsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/services/repairs',
  component: RepairsPage,
});

const bookMobileOpticianRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/book/mobile-optician',
  component: MobileOpticianBookingPage,
});

const bookMobileOpticianConfirmationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/book/mobile-optician/confirmation',
  component: MobileOpticianBookingConfirmationPage,
});

const bookRepairRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/book/repair',
  component: RepairRequestPage,
});

const bookRepairConfirmationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/book/repair/confirmation',
  component: RepairRequestConfirmationPage,
});

const bookRentalRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/book/rentals/$itemId',
  component: RentalBookingPage,
});

const bookRentalConfirmationRoute = createRoute({
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

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/profile',
  component: MyProfilePage,
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

const adminNotificationsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/notifications',
  component: AdminNotificationsPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  mobileOpticianRoute,
  rentalsServiceRoute,
  rentalsCatalogRoute,
  rentalItemDetailRoute,
  repairsRoute,
  bookMobileOpticianRoute,
  bookMobileOpticianConfirmationRoute,
  bookRepairRoute,
  bookRepairConfirmationRoute,
  bookRentalRoute,
  bookRentalConfirmationRoute,
  myBookingsRoute,
  bookingDetailRoute,
  profileRoute,
  providerOnboardingRoute,
  providerDashboardRoute,
  adminNotificationsRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
