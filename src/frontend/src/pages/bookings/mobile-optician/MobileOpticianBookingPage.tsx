import { useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import PageLayout from '../../../components/layout/PageLayout';
import RequireLogin from '../../../components/auth/RequireLogin';
import MobileNumberOtpGate from '../../../components/forms/MobileNumberOtpGate';
import { useCreateOpticianBooking } from '../../../hooks/bookings/useCreateOpticianBooking';
import { useLogMobileNumberVerification } from '../../../hooks/bookings/useLogMobileNumberVerification';
import { ServiceType } from '../../../backend';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { getHomeOtpVerified } from '@/utils/homeOtpSession';

export default function MobileOpticianBookingPage() {
  const navigate = useNavigate();
  const createBooking = useCreateOpticianBooking();
  const logVerification = useLogMobileNumberVerification();

  const [step, setStep] = useState(1);
  const [mobileNumber, setMobileNumber] = useState('');
  const [serviceType, setServiceType] = useState<ServiceType | ''>('');
  const [details, setDetails] = useState('');
  const [address, setAddress] = useState('');
  const [preferredTime, setPreferredTime] = useState('');
  const [isFromHomeFlow, setIsFromHomeFlow] = useState(false);

  useEffect(() => {
    // Check if coming from Home flow with verified mobile
    const { verified, mobileNumber: homeMobile } = getHomeOtpVerified();
    if (verified && homeMobile) {
      setMobileNumber(homeMobile);
      setIsFromHomeFlow(true);
      setStep(2); // Skip OTP gate
    }
  }, []);

  const handleOtpSubmit = async (mobile: string) => {
    try {
      // Log verification to backend (only when OTP is completed on this page)
      await logVerification.mutateAsync(mobile);
      setMobileNumber(mobile);
      setStep(2);
      toast.success('Mobile number verified successfully!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to verify mobile number');
    }
  };

  const handleServiceTypeSubmit = () => {
    if (!serviceType) {
      toast.error('Please select a service type');
      return;
    }
    setStep(3);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!serviceType) {
      toast.error('Please select a service type');
      return;
    }

    try {
      const bookingId = await createBooking.mutateAsync({
        serviceType: serviceType as ServiceType,
        details: details || undefined,
        address: address || undefined,
        preferredTime: preferredTime || undefined,
        price: {
          baseFee: BigInt(500),
          addOns: BigInt(0),
          total: BigInt(500),
        },
        mobileNumber,
      });

      toast.success('Booking request submitted successfully!');
      navigate({ to: '/book/mobile-optician/confirmation', search: { bookingId: Number(bookingId) } });
    } catch (error: any) {
      toast.error(error.message || 'Failed to create booking');
    }
  };

  return (
    <RequireLogin message="Please log in to continue with your booking">
      <PageLayout title="Book Mobile Optician" description="Schedule a professional optician visit">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Mobile Optician Service</CardTitle>
              <CardDescription>
                Professional eye tests and frame try-ons at your convenience
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Step 1: Mobile Number + OTP */}
                {step === 1 && (
                  <MobileNumberOtpGate
                    onSubmitRequest={handleOtpSubmit}
                    disabled={logVerification.isPending || createBooking.isPending}
                  />
                )}

                {/* Step 2: Service Type Selection */}
                {step === 2 && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="serviceType">Service Type *</Label>
                      <Select value={serviceType} onValueChange={(value) => setServiceType(value as ServiceType)}>
                        <SelectTrigger id="serviceType">
                          <SelectValue placeholder="Select service type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={ServiceType.eyeTest}>Eye Test</SelectItem>
                          <SelectItem value={ServiceType.frameTryOn}>Frame Try-On</SelectItem>
                          <SelectItem value={ServiceType.combined}>Combined (Eye Test + Frame Try-On)</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground">
                        (refundable fee on any purchase of lens or frame)
                      </p>
                    </div>

                    <Button
                      type="button"
                      onClick={handleServiceTypeSubmit}
                      disabled={!serviceType}
                      className="w-full"
                    >
                      Submit Request
                    </Button>
                  </div>
                )}

                {/* Step 3: Additional Details */}
                {step === 3 && (
                  <>
                    <div className="mb-4 pb-4 border-b">
                      <h3 className="font-semibold text-lg">Service Selection</h3>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="details">Additional Details (Optional)</Label>
                        <Textarea
                          id="details"
                          placeholder="Any specific requirements or notes"
                          value={details}
                          onChange={(e) => setDetails(e.target.value)}
                          rows={4}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="address">Service Address (Optional)</Label>
                        <Textarea
                          id="address"
                          placeholder="Where should we visit?"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          rows={3}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="preferredTime">Preferred Date (Optional)</Label>
                        <Input
                          id="preferredTime"
                          type="date"
                          value={preferredTime}
                          onChange={(e) => setPreferredTime(e.target.value)}
                          min={new Date().toISOString().split('T')[0]}
                        />
                      </div>

                      <div className="pt-4 border-t">
                        <div className="flex justify-between items-center mb-4">
                          <span className="font-semibold">Service Fee:</span>
                          <span className="text-xl font-bold text-primary">Rs. 500</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          * Refundable on purchase of lens or frame
                        </p>
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full"
                        disabled={createBooking.isPending}
                      >
                        {createBooking.isPending ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          'Confirm Booking'
                        )}
                      </Button>
                    </div>
                  </>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
      </PageLayout>
    </RequireLogin>
  );
}
