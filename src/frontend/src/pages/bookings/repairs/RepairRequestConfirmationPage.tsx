import { useSearch, useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PageLayout from '../../../components/layout/PageLayout';
import RequireLogin from '../../../components/auth/RequireLogin';
import { useGetBooking } from '../../../hooks/bookings/useGetBooking';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { formatINR } from '../../../utils/currency';
import { RepairType } from '../../../backend';

const repairTypeLabels: Record<RepairType, string> = {
  [RepairType.adjustment]: 'Adjustment',
  [RepairType.screwTightening]: 'Screw Tightening',
  [RepairType.lensReplacement]: 'Lens Replacement',
  [RepairType.other]: 'Other',
};

export default function RepairRequestConfirmationPage() {
  const search = useSearch({ from: '/book/repair/confirmation' }) as { bookingId?: number };
  const navigate = useNavigate();
  const bookingId = search.bookingId;
  const { data: booking, isLoading, error } = useGetBooking(bookingId ? BigInt(bookingId) : BigInt(0));

  if (!bookingId) {
    return (
      <RequireLogin message="Please log in to view your booking">
        <PageLayout title="Invalid Booking" description="">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardContent className="pt-6">
                <p className="text-destructive">Invalid booking ID</p>
                <Button onClick={() => navigate({ to: '/' })} className="mt-4">
                  Return Home
                </Button>
              </CardContent>
            </Card>
          </div>
        </PageLayout>
      </RequireLogin>
    );
  }

  if (isLoading) {
    return (
      <RequireLogin message="Please log in to view your booking">
        <PageLayout title="Loading..." description="">
          <div className="flex justify-center items-center min-h-[400px]">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </PageLayout>
      </RequireLogin>
    );
  }

  if (error || !booking) {
    return (
      <RequireLogin message="Please log in to view your booking">
        <PageLayout title="Error" description="">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardContent className="pt-6">
                <p className="text-destructive">Failed to load booking details</p>
              </CardContent>
            </Card>
          </div>
        </PageLayout>
      </RequireLogin>
    );
  }

  return (
    <RequireLogin message="Please log in to view your booking">
      <PageLayout title="Repair Request Confirmed" description="Your request has been submitted successfully">
        <div className="max-w-2xl mx-auto space-y-6">
          <Card className="border-green-200 dark:border-green-900">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <CheckCircle2 className="h-16 w-16 text-green-600 dark:text-green-500" />
              </div>
              <CardTitle className="text-2xl">Request Confirmed!</CardTitle>
              <CardDescription>
                Your repair request has been submitted. We'll contact you soon.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Booking Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Booking ID</p>
                  <p className="font-medium">#{booking.id.toString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge variant="outline" className="mt-1">
                    {booking.status}
                  </Badge>
                </div>
              </div>

              {booking.repairTypes && booking.repairTypes.length > 0 && (
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Issue Types</p>
                  <div className="flex flex-wrap gap-2">
                    {booking.repairTypes.map((type) => (
                      <Badge key={type} variant="secondary">
                        {repairTypeLabels[type]}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {booking.details && (
                <div>
                  <p className="text-sm text-muted-foreground">Problem Description</p>
                  <p className="mt-1">{booking.details}</p>
                </div>
              )}

              {booking.address && (
                <div>
                  <p className="text-sm text-muted-foreground">Service Address</p>
                  <p className="mt-1">{booking.address}</p>
                </div>
              )}

              {booking.preferredTime && (
                <div>
                  <p className="text-sm text-muted-foreground">Preferred Date</p>
                  <p className="mt-1">{booking.preferredTime}</p>
                </div>
              )}

              <div className="pt-4 border-t">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Total Fee</span>
                  <span className="text-2xl font-bold text-primary">
                    {formatINR(Number(booking.price.total))}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Refundable on any purchase of lens or frame
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button variant="outline" onClick={() => navigate({ to: '/' })} className="flex-1">
              Back to Home
            </Button>
            <Button onClick={() => navigate({ to: '/my-bookings' })} className="flex-1">
              View My Bookings
            </Button>
          </div>
        </div>
      </PageLayout>
    </RequireLogin>
  );
}
