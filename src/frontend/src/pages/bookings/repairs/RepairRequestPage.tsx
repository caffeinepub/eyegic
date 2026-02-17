import { useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import PageLayout from '../../../components/layout/PageLayout';
import RequireLogin from '../../../components/auth/RequireLogin';
import MobileNumberOtpGate from '../../../components/forms/MobileNumberOtpGate';
import RepairIssueTypeMultiSelect from '../../../components/forms/RepairIssueTypeMultiSelect';
import { useCreateRepairBooking } from '../../../hooks/bookings/useCreateRepairBooking';
import { RepairType } from '../../../backend';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { getHomeOtpVerified } from '@/utils/homeOtpSession';

export default function RepairRequestPage() {
  const navigate = useNavigate();
  const createBooking = useCreateRepairBooking();

  const [step, setStep] = useState(1);
  const [mobileNumber, setMobileNumber] = useState('');
  const [repairTypes, setRepairTypes] = useState<RepairType[]>([]);
  const [details, setDetails] = useState('');
  const [address, setAddress] = useState('');
  const [preferredTime, setPreferredTime] = useState('');

  useEffect(() => {
    // Check if coming from Home flow with verified mobile
    const { verified, mobileNumber: homeMobile } = getHomeOtpVerified();
    if (verified && homeMobile) {
      setMobileNumber(homeMobile);
      setStep(2); // Skip OTP gate
    }
  }, []);

  const handleOtpSubmit = (mobile: string) => {
    setMobileNumber(mobile);
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const bookingId = await createBooking.mutateAsync({
        repairTypes: repairTypes.length > 0 ? repairTypes : [],
        details: details || undefined,
        address: address || undefined,
        preferredTime: preferredTime || undefined,
        price: {
          baseFee: BigInt(200),
          addOns: BigInt(0),
          total: BigInt(200),
        },
      });

      toast.success('Repair request submitted successfully!');
      navigate({ to: '/book/repair/confirmation', search: { bookingId: Number(bookingId) } });
    } catch (error: any) {
      toast.error(error.message || 'Failed to create repair request');
    }
  };

  return (
    <RequireLogin message="Please log in to continue with your repair request">
      <PageLayout title="Request Repair Service" description="Get your eyewear repaired by experts">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Repairs & Adjustments</CardTitle>
              <CardDescription>
                Professional repair and adjustment services for your eyewear
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Step 1: Mobile Number + OTP */}
                {step === 1 && (
                  <MobileNumberOtpGate
                    onSubmitRequest={handleOtpSubmit}
                    disabled={createBooking.isPending}
                  />
                )}

                {/* Step 2: Repair Details */}
                {step === 2 && (
                  <>
                    <div className="mb-4 pb-4 border-b">
                      <h3 className="font-semibold text-lg">Other Optional Repair Service Details</h3>
                    </div>

                    <div className="space-y-4">
                      <RepairIssueTypeMultiSelect
                        selectedTypes={repairTypes}
                        onChange={setRepairTypes}
                      />

                      <div className="space-y-2">
                        <Label htmlFor="details">Description (Optional)</Label>
                        <Textarea
                          id="details"
                          placeholder="Describe the issue or repair needed"
                          value={details}
                          onChange={(e) => setDetails(e.target.value)}
                          rows={4}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="address">Service Address (Optional)</Label>
                        <Textarea
                          id="address"
                          placeholder="Where should we pick up or deliver?"
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
                          <span className="text-xl font-bold text-primary">Rs. 200</span>
                        </div>
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
                          'Submit Repair Request'
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
