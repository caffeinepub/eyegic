import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import PageLayout from '../../components/layout/PageLayout';
import RequireLogin from '../../components/auth/RequireLogin';
import { useProvider } from '../../hooks/provider/useProvider';
import { useProviderBookings } from '../../hooks/bookings/useProviderBookings';
import { useUpdateBookingStatus } from '../../hooks/bookings/useUpdateBookingStatus';
import BookingStatusBadge from '../../components/bookings/BookingStatusBadge';
import { BookingStatus } from '../../backend';
import { Loader2, Calendar, MapPin } from 'lucide-react';
import { toast } from 'sonner';

export default function ProviderDashboardPage() {
  const navigate = useNavigate();
  const { data: provider, isLoading: providerLoading } = useProvider();
  const { data: bookings, isLoading: bookingsLoading } = useProviderBookings();
  const updateStatus = useUpdateBookingStatus();

  const handleStatusChange = async (bookingId: bigint, newStatus: BookingStatus) => {
    try {
      await updateStatus.mutateAsync({ bookingId, newStatus });
      toast.success('Booking status updated');
    } catch (error: any) {
      toast.error(error.message || 'Failed to update status');
    }
  };

  if (providerLoading) {
    return (
      <RequireLogin message="Please log in to access the provider dashboard">
        <PageLayout>
          <div className="flex justify-center items-center min-h-[50vh]">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </PageLayout>
      </RequireLogin>
    );
  }

  if (!provider) {
    return (
      <RequireLogin message="Please log in to access the provider dashboard">
        <PageLayout title="Provider Dashboard">
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle>Not Registered</CardTitle>
              <CardDescription>You need to register as a provider first</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => navigate({ to: '/provider/onboard' })}>
                Register as Provider
              </Button>
            </CardContent>
          </Card>
        </PageLayout>
      </RequireLogin>
    );
  }

  return (
    <RequireLogin message="Please log in to access the provider dashboard">
      <PageLayout title="Provider Dashboard" description={`Welcome back, ${provider.name}`}>
        <div className="mb-8 rounded-2xl overflow-hidden shadow-lg motion-safe:animate-fade-in-up">
          <img
            src="/assets/generated/eyegic-provider-portal-tab.dim_1400x900.png"
            alt="Provider Portal - Manage your service bookings and profile"
            className="w-full h-auto motion-safe:hover:scale-[1.02] motion-safe:transition-transform motion-safe:duration-500"
            width={1400}
            height={900}
            loading="eager"
          />
        </div>

        <div className="space-y-6">
          <Card className="motion-safe:animate-scale-in">
            <CardHeader>
              <CardTitle>Your Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Phone:</span> {provider.phone}
                </div>
                <div>
                  <span className="text-muted-foreground">Email:</span> {provider.email}
                </div>
                <div>
                  <span className="text-muted-foreground">Service Areas:</span> {provider.serviceAreas}
                </div>
              </div>
            </CardContent>
          </Card>

          <div>
            <h2 className="text-2xl font-bold mb-4">Your Bookings</h2>
            {bookingsLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : bookings && bookings.length > 0 ? (
              <div className="space-y-4">
                {bookings.map((booking, index) => (
                  <Card 
                    key={booking.id.toString()}
                    className="motion-safe:animate-scale-in"
                    style={{ animationDelay: `${(index + 1) * 100}ms` }}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="capitalize">
                            {booking.bookingType.toString().replace(/([A-Z])/g, ' $1').trim()}
                          </CardTitle>
                          <CardDescription>Booking #{booking.id.toString()}</CardDescription>
                        </div>
                        <BookingStatusBadge status={booking.status} />
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        {booking.preferredTime && (
                          <div className="flex items-start gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground mt-0.5" />
                            <div>
                              <div className="font-medium">Scheduled</div>
                              <div className="text-muted-foreground">
                                {new Date(booking.preferredTime).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                        )}
                        {booking.address && (
                          <div className="flex items-start gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                            <div>
                              <div className="font-medium">Location</div>
                              <div className="text-muted-foreground line-clamp-1">{booking.address}</div>
                            </div>
                          </div>
                        )}
                      </div>
                      {booking.details && (
                        <div className="text-sm">
                          <span className="font-medium">Details:</span> {booking.details}
                        </div>
                      )}
                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="font-semibold">
                          Total: <span className="text-primary">Rs. {booking.price.total.toString()}</span>
                        </div>
                        <Select
                          value={booking.status}
                          onValueChange={(value) => handleStatusChange(booking.id, value as BookingStatus)}
                          disabled={updateStatus.isPending}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Update status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value={BookingStatus.accepted}>Accepted</SelectItem>
                            <SelectItem value={BookingStatus.scheduled}>Scheduled</SelectItem>
                            <SelectItem value={BookingStatus.inProgress}>In Progress</SelectItem>
                            <SelectItem value={BookingStatus.completed}>Completed</SelectItem>
                            <SelectItem value={BookingStatus.cancelled}>Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="motion-safe:animate-scale-in motion-safe:animation-delay-100">
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">No bookings assigned yet</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </PageLayout>
    </RequireLogin>
  );
}
