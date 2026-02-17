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
import { formatINRWithSlash } from '../../../utils/currency';

export default function RepairRequestPage() {
  const navigate = useNavigate();
  const createBooking = useCreateRepairBooking();

  const [repairType, setRepairType] = useState<RepairType | ''>('');
  const [details, setDetails] = useState('');
  const [address, setAddress] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);

  const today = new Date().toISOString().split('T')[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const bookingId = await createBooking.mutateAsync({
        repairType: repairType || undefined,
        details: details || undefined,
        address: address || undefined,
        preferredTime: preferredDate || undefined,
        price: {
          baseFee: BigInt(99),
          addOns: BigInt(0),
          total: BigInt(99),
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
                  <Label htmlFor="repairType" className="text-sm font-medium">
                    Issue Type <span className="text-muted-foreground font-normal">(Optional)</span>
                  </Label>
                  <Select value={repairType} onValueChange={(value) => setRepairType(value as RepairType)}>
                    <SelectTrigger id="repairType">
                      <SelectValue placeholder="Select issue type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={RepairType.adjustment}>Adjustment</SelectItem>
                      <SelectItem value={RepairType.screwTightening}>Screw Tightening</SelectItem>
                      <SelectItem value={RepairType.lensReplacement}>Lens Replacement</SelectItem>
                      <SelectItem value={RepairType.other}>Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="details" className="text-sm font-medium">
                    Problem Description <span className="text-muted-foreground font-normal">(Optional)</span>
                  </Label>
                  <Textarea
                    id="details"
                    placeholder="Describe the issue in detail..."
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    rows={4}
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

            <Card>
              <CardHeader>
                <CardTitle>Service Fee</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Flat repair service fee of {formatINRWithSlash(99)} (refundable on any purchase of lens or frame)
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
