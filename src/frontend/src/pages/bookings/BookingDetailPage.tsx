import { useParams, useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PageLayout from '../../components/layout/PageLayout';
import RequireLogin from '../../components/auth/RequireLogin';
import { useGetBooking } from '../../hooks/bookings/useGetBooking';
import { Loader2 } from 'lucide-react';
import { formatINR } from '../../utils/currency';
import { BookingType, ServiceType, RepairType } from '../../backend';

const serviceTypeLabels: Record<ServiceType, string> = {
  [ServiceType.eyeTest]: 'Eye Test',
  [ServiceType.frameTryOn]: 'Frame Try-On',
  [ServiceType.combined]: 'Combined Service',
};

const repairTypeLabels: Record<RepairType, string> = {
  [RepairType.adjustment]: 'Adjustment',
  [RepairType.screwTightening]: 'Screw Tightening',
  [RepairType.lensReplacement]: 'Lens Replacement',
  [RepairType.other]: 'Other',
};

const bookingTypeLabels: Record<BookingType, string> = {
  [BookingType.mobileOptician]: 'Mobile Optician',
  [BookingType.repair]: 'Repair Service',
  [BookingType.rental]: 'Eyewear Rental',
};

export default function BookingDetailPage() {
  const { bookingId } = useParams({ from: '/bookings/$bookingId' });
  const navigate = useNavigate();
  const { data: booking, isLoading, error } = useGetBooking(BigInt(bookingId));

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
      <PageLayout
        title={`Booking #${booking.id.toString()}`}
        description={bookingTypeLabels[booking.bookingType]}
      >
        <div className="max-w-2xl mx-auto space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Booking Information</CardTitle>
              <CardDescription>Details of your booking</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Booking ID</p>
                  <p className="font-medium">#{booking.id.toString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Type</p>
                  <p className="font-medium">{bookingTypeLabels[booking.bookingType]}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge variant="outline" className="mt-1">
                    {booking.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total</p>
                  <p className="font-semibold text-primary">{formatINR(Number(booking.price.total))}</p>
                </div>
              </div>

              {booking.serviceType && (
                <div>
                  <p className="text-sm text-muted-foreground">Service Type</p>
                  <p className="mt-1">{serviceTypeLabels[booking.serviceType]}</p>
                </div>
              )}

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

              {booking.mobileNumber && (
                <div>
                  <p className="text-sm text-muted-foreground">Mobile Number</p>
                  <p className="mt-1">{booking.mobileNumber}</p>
                </div>
              )}

              {booking.details && (
                <div>
                  <p className="text-sm text-muted-foreground">Details</p>
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
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button variant="outline" onClick={() => navigate({ to: '/my-bookings' })} className="flex-1">
              Back to Bookings
            </Button>
          </div>
        </div>
      </PageLayout>
    </RequireLogin>
  );
}
