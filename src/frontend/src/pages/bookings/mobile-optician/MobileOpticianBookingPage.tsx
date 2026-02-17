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
import { formatINR } from '../../../utils/currency';

export default function MobileOpticianBookingPage() {
  const navigate = useNavigate();
  const createBooking = useCreateOpticianBooking();

  const [serviceType, setServiceType] = useState<ServiceType | ''>('');
  const [details, setDetails] = useState('');
  const [address, setAddress] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');

  const baseFees = {
    [ServiceType.eyeTest]: 99,
    [ServiceType.frameTryOn]: 99,
    [ServiceType.combined]: 149,
  };

  const calculatePrice = () => {
    if (!serviceType) return { baseFee: 0, addOns: 0, total: 0 };
    const baseFee = baseFees[serviceType as ServiceType];
    const addOns = 0;
    return { baseFee, addOns, total: baseFee + addOns };
  };

  const price = calculatePrice();
  const today = new Date().toISOString().split('T')[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate mobile number
    const cleanedMobile = mobileNumber.replace(/\D/g, '');
    
    if (cleanedMobile.length !== 10) {
      toast.error('Mobile number must be exactly 10 digits');
      return;
    }

    if (!serviceType) {
      toast.error('Please select a service type');
      return;
    }

    try {
      const bookingId = await createBooking.mutateAsync({
        serviceType: serviceType as ServiceType,
        details: details || undefined,
        address: address || undefined,
        preferredTime: preferredDate || undefined,
        price: {
          baseFee: BigInt(price.baseFee),
          addOns: BigInt(price.addOns),
          total: BigInt(price.total),
        },
        mobileNumber: cleanedMobile,
      });

      toast.success('Booking created successfully!');
      navigate({ to: '/book/mobile-optician/confirmation/$bookingId', params: { bookingId: bookingId.toString() } });
    } catch (error: any) {
      toast.error(error.message || 'Failed to create booking');
    }
  };

  return (
    <RequireLogin message="Please log in to book a mobile optician service">
      <PageLayout title="Book Mobile Optician" description="Professional eye care at your doorstep">
        <form onSubmit={handleSubmit}>
          <div className="max-w-2xl mx-auto space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Service Selection</CardTitle>
                <CardDescription>Choose the service you need</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="serviceType">Service Type *</Label>
                  <Select value={serviceType} onValueChange={(value) => setServiceType(value as ServiceType)} required>
                    <SelectTrigger id="serviceType">
                      <SelectValue placeholder="Select service type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={ServiceType.eyeTest}>Eye Test - {formatINR(99)}</SelectItem>
                      <SelectItem value={ServiceType.frameTryOn}>Frame Try-On - {formatINR(99)}</SelectItem>
                      <SelectItem value={ServiceType.combined}>Combined Service - {formatINR(149)}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mobileNumber">Mobile Number *</Label>
                  <Input
                    id="mobileNumber"
                    placeholder="10-digit mobile number"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                    maxLength={10}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Enter exactly 10 digits
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="details" className="text-sm font-medium">
                    Additional Details <span className="text-muted-foreground font-normal">(Optional)</span>
                  </Label>
                  <Textarea
                    id="details"
                    placeholder="Any specific requirements or notes..."
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
                  <Label htmlFor="address" className="text-sm font-medium">
                    Service Address <span className="text-muted-foreground font-normal">(Optional)</span>
                  </Label>
                  <Textarea
                    id="address"
                    placeholder="Enter your full address..."
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="preferredDate" className="text-sm font-medium">
                    Preferred Date <span className="text-muted-foreground font-normal">(Optional)</span>
                  </Label>
                  <Input
                    id="preferredDate"
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    min={today}
                  />
                </div>
              </CardContent>
            </Card>

            {serviceType && (
              <Card>
                <CardHeader>
                  <CardTitle>Pricing</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Service Fee</span>
                      <span>{formatINR(price.baseFee)}</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span className="text-primary">{formatINR(price.total)}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Service fee is refundable on any purchase of lens or frame
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

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
