import { useParams, useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import PageLayout from '../../../components/layout/PageLayout';
import { useBooking } from '../../../hooks/bookings/useBooking';
import { CheckCircle2, Loader2 } from 'lucide-react';
import BookingStatusBadge from '../../../components/bookings/BookingStatusBadge';

export default function RentalBookingConfirmationPage() {
  const { bookingId } = useParams({ from: '/book/rentals/confirmation/$bookingId' });
  const navigate = useNavigate();
  const { data: booking, isLoading } = useBooking(BigInt(bookingId));

  if (isLoading) {
    return (
      <PageLayout>
        <div className="flex justify-center items-center min-h-[50vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </PageLayout>
    );
  }

  if (!booking) {
    return (
      <PageLayout>
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Booking Not Found</CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate({ to: '/' })}>Return Home</Button>
          </CardContent>
        </Card>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <CheckCircle2 className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-3xl font-bold">Rental Confirmed!</h1>
          <p className="text-muted-foreground">
            Your rental booking has been confirmed and will be delivered soon
          </p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Booking Details</CardTitle>
              <BookingStatusBadge status={booking.status} />
            </div>
            <CardDescription>Reference ID: #{booking.id.toString()}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="text-sm font-medium text-muted-foreground">Rental Details</div>
              <div className="mt-1">{booking.details}</div>
            </div>

            <div>
              <div className="text-sm font-medium text-muted-foreground">Delivery Address</div>
              <div className="mt-1">{booking.address}</div>
            </div>

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Rental Fee</span>
                <span>${booking.price.baseFee.toString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Deposit (Refundable)</span>
                <span>${booking.price.addOns.toString()}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                <span>Total Paid</span>
                <span className="text-primary">${booking.price.total.toString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button variant="outline" onClick={() => navigate({ to: '/' })} className="flex-1">
            Return Home
          </Button>
          <Button onClick={() => navigate({ to: '/my-bookings' })} className="flex-1">
            View My Bookings
          </Button>
        </div>
      </div>
    </PageLayout>
  );
}
