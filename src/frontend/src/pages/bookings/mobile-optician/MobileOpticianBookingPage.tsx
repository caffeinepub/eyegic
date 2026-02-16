import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import PageLayout from '../../../components/layout/PageLayout';
import RequireLogin from '../../../components/auth/RequireLogin';
import { useCreateOpticianBooking } from '../../../hooks/bookings/useCreateOpticianBooking';
import { ServiceType } from '../../../backend';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

export default function MobileOpticianBookingPage() {
  const navigate = useNavigate();
  const createBooking = useCreateOpticianBooking();

  const [serviceType, setServiceType] = useState<ServiceType | ''>('');
  const [details, setDetails] = useState('');
  const [address, setAddress] = useState('');
  const [preferredTime, setPreferredTime] = useState('');

  const baseFees = {
    [ServiceType.eyeTest]: 50,
    [ServiceType.frameTryOn]: 30,
    [ServiceType.combined]: 70,
  };

  const calculatePrice = () => {
    if (!serviceType) return { baseFee: 0, addOns: 0, total: 0 };
    const baseFee = baseFees[serviceType as ServiceType];
    const addOns = 0;
    return { baseFee, addOns, total: baseFee + addOns };
  };

  const price = calculatePrice();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!serviceType || !address || !preferredTime) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      const bookingId = await createBooking.mutateAsync({
        serviceType: serviceType as ServiceType,
        details,
        address,
        preferredTime,
        price: {
          baseFee: BigInt(price.baseFee),
          addOns: BigInt(price.addOns),
          total: BigInt(price.total),
        },
      });

      toast.success('Booking created successfully!');
      navigate({ to: '/book/mobile-optician/confirmation/$bookingId', params: { bookingId: bookingId.toString() } });
    } catch (error: any) {
      toast.error(error.message || 'Failed to create booking');
    }
  };

  return (
    <RequireLogin message="Please log in to book a mobile optician service">
      <PageLayout title="Book Mobile Optician" description="Schedule an eye test or frame try-on at your location">
        <form onSubmit={handleSubmit}>
          <div className="max-w-2xl mx-auto space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Service Details</CardTitle>
                <CardDescription>Tell us what you need</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="serviceType">Service Type *</Label>
                  <Select value={serviceType} onValueChange={(value) => setServiceType(value as ServiceType)}>
                    <SelectTrigger id="serviceType">
                      <SelectValue placeholder="Select service type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={ServiceType.eyeTest}>Eye Test ($50)</SelectItem>
                      <SelectItem value={ServiceType.frameTryOn}>Frame Try-On ($30)</SelectItem>
                      <SelectItem value={ServiceType.combined}>Combined Service ($70)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="details">Additional Details (Optional)</Label>
                  <Textarea
                    id="details"
                    placeholder="Any specific requirements or concerns..."
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Location & Schedule</CardTitle>
                <CardDescription>Where and when should we visit?</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="address">Service Address *</Label>
                  <Textarea
                    id="address"
                    placeholder="Enter your full address..."
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    rows={3}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="preferredTime">Preferred Date & Time *</Label>
                  <Input
                    id="preferredTime"
                    type="datetime-local"
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pricing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Base Fee</span>
                  <span className="font-medium">${price.baseFee}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Add-ons</span>
                  <span className="font-medium">${price.addOns}</span>
                </div>
                <div className="border-t pt-3 flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span className="text-primary">${price.total}</span>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-4">
              <Button type="button" variant="outline" onClick={() => navigate({ to: '/services/mobile-optician' })} className="flex-1">
                Cancel
              </Button>
              <Button type="submit" disabled={createBooking.isPending} className="flex-1">
                {createBooking.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Confirm Booking
              </Button>
            </div>
          </div>
        </form>
      </PageLayout>
    </RequireLogin>
  );
}
