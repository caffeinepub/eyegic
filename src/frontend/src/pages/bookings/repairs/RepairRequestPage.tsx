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
import OptionalPhotoUpload from '../../../components/forms/OptionalPhotoUpload';
import { useCreateRepairBooking } from '../../../hooks/bookings/useCreateRepairBooking';
import { RepairType } from '../../../backend';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

export default function RepairRequestPage() {
  const navigate = useNavigate();
  const createBooking = useCreateRepairBooking();

  const [repairType, setRepairType] = useState<RepairType | ''>('');
  const [details, setDetails] = useState('');
  const [address, setAddress] = useState('');
  const [preferredTime, setPreferredTime] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);

  const baseFees = {
    [RepairType.adjustment]: 20,
    [RepairType.screwTightening]: 15,
    [RepairType.lensReplacement]: 60,
    [RepairType.other]: 25,
  };

  const calculatePrice = () => {
    if (!repairType) return { baseFee: 0, addOns: 0, total: 0 };
    const baseFee = baseFees[repairType as RepairType];
    const addOns = 0;
    return { baseFee, addOns, total: baseFee + addOns };
  };

  const price = calculatePrice();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!repairType || !details || !address || !preferredTime) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      const bookingId = await createBooking.mutateAsync({
        repairType: repairType as RepairType,
        details,
        address,
        preferredTime,
        price: {
          baseFee: BigInt(price.baseFee),
          addOns: BigInt(price.addOns),
          total: BigInt(price.total),
        },
      });

      toast.success('Repair request created successfully!');
      navigate({ to: '/book/repairs/confirmation/$bookingId', params: { bookingId: bookingId.toString() } });
    } catch (error: any) {
      toast.error(error.message || 'Failed to create repair request');
    }
  };

  return (
    <RequireLogin message="Please log in to request a repair service">
      <PageLayout title="Request Repair Service" description="Get expert help with your eyewear">
        <form onSubmit={handleSubmit}>
          <div className="max-w-2xl mx-auto space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Repair Details</CardTitle>
                <CardDescription>Tell us what needs fixing</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="repairType">Issue Type *</Label>
                  <Select value={repairType} onValueChange={(value) => setRepairType(value as RepairType)}>
                    <SelectTrigger id="repairType">
                      <SelectValue placeholder="Select issue type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={RepairType.adjustment}>Adjustment ($20)</SelectItem>
                      <SelectItem value={RepairType.screwTightening}>Screw Tightening ($15)</SelectItem>
                      <SelectItem value={RepairType.lensReplacement}>Lens Replacement ($60)</SelectItem>
                      <SelectItem value={RepairType.other}>Other ($25)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="details">Problem Description *</Label>
                  <Textarea
                    id="details"
                    placeholder="Describe the issue in detail..."
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    rows={4}
                    required
                  />
                </div>

                <OptionalPhotoUpload onPhotoChange={setPhoto} />
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
                <CardTitle>Estimated Pricing</CardTitle>
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
                  <span>Estimated Total</span>
                  <span className="text-primary">${price.total}</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Final price may vary based on actual work required
                </p>
              </CardContent>
            </Card>

            <div className="flex gap-4">
              <Button type="button" variant="outline" onClick={() => navigate({ to: '/services/repairs' })} className="flex-1">
                Cancel
              </Button>
              <Button type="submit" disabled={createBooking.isPending} className="flex-1">
                {createBooking.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Submit Request
              </Button>
            </div>
          </div>
        </form>
      </PageLayout>
    </RequireLogin>
  );
}
