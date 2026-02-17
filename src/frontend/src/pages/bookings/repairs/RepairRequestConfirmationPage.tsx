import { useParams, useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import PageLayout from '../../../components/layout/PageLayout';
import { useBooking } from '../../../hooks/bookings/useBooking';
import { CheckCircle2, Loader2 } from 'lucide-react';
import BookingStatusBadge from '../../../components/bookings/BookingStatusBadge';
import { formatINR } from '../../../utils/currency';

export default function RepairRequestConfirmationPage() {
  const { bookingId } = useParams({ from: '/book/repairs/confirmation/$bookingId' });
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
          <h1 className="text-3xl font-bold">Request Submitted!</h1>
          <p className="text-muted-foreground">
            Your repair request has been received and will be processed soon
          </p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Request Details</CardTitle>
              <BookingStatusBadge status={booking.status} />
            </div>
            <CardDescription>Reference ID: #{booking.id.toString()}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {booking.repairType && (
              <div>
                <div className="text-sm font-medium text-muted-foreground">Repair Type</div>
                <div className="mt-1 capitalize">{booking.repairType.toString().replace(/([A-Z])/g, ' $1').trim()}</div>
              </div>
            )}

            {booking.details && (
              <div>
                <div className="text-sm font-medium text-muted-foreground">Problem Description</div>
                <div className="mt-1">{booking.details}</div>
              </div>
            )}

            {booking.address && (
              <div>
                <div className="text-sm font-medium text-muted-foreground">Address</div>
                <div className="mt-1">{booking.address}</div>
              </div>
            )}

            {booking.preferredTime && (
              <div>
                <div className="text-sm font-medium text-muted-foreground">Preferred Date</div>
                <div className="mt-1">{new Date(booking.preferredTime).toLocaleDateString()}</div>
              </div>
            )}

            <div className="border-t pt-4">
              <div className="flex justify-between font-semibold text-lg">
                <span>Service Fee</span>
                <span className="text-primary">{formatINR(booking.price.total)}</span>
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
