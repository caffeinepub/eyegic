import { useParams, useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import PageLayout from '../../components/layout/PageLayout';
import { useBooking } from '../../hooks/bookings/useBooking';
import BookingStatusBadge from '../../components/bookings/BookingStatusBadge';
import { Loader2, Calendar, MapPin, DollarSign } from 'lucide-react';

export default function BookingDetailPage() {
  const { bookingId } = useParams({ from: '/bookings/$bookingId' });
  const navigate = useNavigate();
  const { data: booking, isLoading, error } = useBooking(BigInt(bookingId));

  if (isLoading) {
    return (
      <PageLayout>
        <div className="flex justify-center items-center min-h-[50vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </PageLayout>
    );
  }

  if (error || !booking) {
    return (
      <PageLayout>
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Booking Not Found</CardTitle>
            <CardDescription>
              {error ? 'You do not have permission to view this booking' : 'This booking does not exist'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate({ to: '/my-bookings' })}>Back to My Bookings</Button>
          </CardContent>
        </Card>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        <Button variant="ghost" onClick={() => navigate({ to: '/my-bookings' })}>
          ← Back to My Bookings
        </Button>

        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-2xl capitalize">
                  {booking.bookingType.toString().replace(/([A-Z])/g, ' $1').trim()} Service
                </CardTitle>
                <CardDescription>Booking Reference: #{booking.id.toString()}</CardDescription>
              </div>
              <BookingStatusBadge status={booking.status} />
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {booking.serviceType && (
              <div>
                <div className="text-sm font-medium text-muted-foreground mb-1">Service Type</div>
                <div className="capitalize">{booking.serviceType.toString().replace(/([A-Z])/g, ' $1').trim()}</div>
              </div>
            )}

            {booking.repairType && (
              <div>
                <div className="text-sm font-medium text-muted-foreground mb-1">Repair Type</div>
                <div className="capitalize">{booking.repairType.toString().replace(/([A-Z])/g, ' $1').trim()}</div>
              </div>
            )}

            {booking.details && (
              <div>
                <div className="text-sm font-medium text-muted-foreground mb-1">Details</div>
                <div>{booking.details}</div>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Service Address</div>
                    <div className="mt-1">{booking.address}</div>
                  </div>
                </div>
              </div>

              {booking.preferredTime && (
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Preferred Time</div>
                      <div className="mt-1">{new Date(booking.preferredTime).toLocaleString()}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Card className="bg-muted/30">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Pricing Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Base Fee</span>
                  <span>${booking.price.baseFee.toString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Add-ons</span>
                  <span>${booking.price.addOns.toString()}</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span className="text-primary">${booking.price.total.toString()}</span>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
