import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import PageLayout from '../../components/layout/PageLayout';
import RequireLogin from '../../components/auth/RequireLogin';
import { useCustomerBookings } from '../../hooks/bookings/useCustomerBookings';
import BookingStatusBadge from '../../components/bookings/BookingStatusBadge';
import { Loader2, Calendar, MapPin } from 'lucide-react';

export default function MyBookingsPage() {
  const navigate = useNavigate();
  const { data: bookings, isLoading } = useCustomerBookings();

  return (
    <RequireLogin message="Please log in to view your bookings">
      <PageLayout title="My Bookings" description="View and manage your service bookings">
        <div className="mb-8 rounded-2xl overflow-hidden shadow-lg motion-safe:animate-fade-in-up">
          <img
            src="/assets/generated/eyegic-my-bookings-tab.dim_1400x900.png"
            alt="My Bookings - Manage your eyewear service appointments"
            className="w-full h-auto motion-safe:hover:scale-[1.02] motion-safe:transition-transform motion-safe:duration-500"
            width={1400}
            height={900}
            loading="eager"
          />
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center min-h-[50vh]">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : bookings && bookings.length > 0 ? (
          <div className="space-y-4">
            {bookings.map((booking, index) => (
              <Card 
                key={booking.id.toString()} 
                className="hover:shadow-md transition-shadow motion-safe:animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
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
                            {new Date(booking.preferredTime).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <div>
                        <div className="font-medium">Location</div>
                        <div className="text-muted-foreground line-clamp-1">{booking.address}</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="font-semibold text-lg">
                      Total: <span className="text-primary">${booking.price.total.toString()}</span>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => navigate({ to: '/bookings/$bookingId', params: { bookingId: booking.id.toString() } })}
                    >
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="motion-safe:animate-scale-in">
            <CardContent className="py-12 text-center space-y-4">
              <p className="text-muted-foreground">You don't have any bookings yet</p>
              <Button onClick={() => navigate({ to: '/' })}>Browse Services</Button>
            </CardContent>
          </Card>
        )}
      </PageLayout>
    </RequireLogin>
  );
}
