import { useState, useEffect } from 'react';
import { useParams, useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import PageLayout from '../../../components/layout/PageLayout';
import RequireLogin from '../../../components/auth/RequireLogin';
import { useRentalCatalog } from '../../../hooks/rentals/useRentalCatalog';
import { useCreateRentalBooking } from '../../../hooks/bookings/useCreateRentalBooking';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

export default function RentalBookingPage() {
  const { itemId } = useParams({ from: '/book/rentals/$itemId' });
  const navigate = useNavigate();
  const { data: items } = useRentalCatalog();
  const createBooking = useCreateRentalBooking();

  const item = items?.find((i) => i.id.toString() === itemId);

  const [rentalDays, setRentalDays] = useState(1);
  const [address, setAddress] = useState('');

  const calculatePrice = () => {
    if (!item) return { baseFee: 0, deposit: 0, total: 0 };
    const baseFee = Number(item.pricePerDay) * rentalDays;
    const deposit = Number(item.deposit);
    return { baseFee, deposit, total: baseFee + deposit };
  };

  const price = calculatePrice();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!item || !address || rentalDays < 1) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      const bookingId = await createBooking.mutateAsync({
        itemId: item.id,
        rentalPeriod: BigInt(rentalDays),
        address,
        price: {
          baseFee: BigInt(price.baseFee),
          addOns: BigInt(price.deposit),
          total: BigInt(price.total),
        },
      });

      toast.success('Rental booking created successfully!');
      navigate({ to: '/book/rentals/confirmation/$bookingId', params: { bookingId: bookingId.toString() } });
    } catch (error: any) {
      toast.error(error.message || 'Failed to create rental booking');
    }
  };

  if (!item) {
    return (
      <PageLayout>
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Item Not Found</CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate({ to: '/rentals' })}>Back to Catalog</Button>
          </CardContent>
        </Card>
      </PageLayout>
    );
  }

  return (
    <RequireLogin message="Please log in to rent eyewear">
      <PageLayout title="Complete Rental Booking" description={`Renting: ${item.name}`}>
        <form onSubmit={handleSubmit}>
          <div className="max-w-2xl mx-auto space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Rental Period</CardTitle>
                <CardDescription>How long do you need this item?</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="rentalDays">Number of Days *</Label>
                  <Input
                    id="rentalDays"
                    type="number"
                    min="1"
                    value={rentalDays}
                    onChange={(e) => setRentalDays(Math.max(1, parseInt(e.target.value) || 1))}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Delivery Address</CardTitle>
                <CardDescription>Where should we deliver the item?</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="address">Full Address *</Label>
                  <Textarea
                    id="address"
                    placeholder="Enter your full delivery address..."
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    rows={3}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cost Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Rental ({rentalDays} days × ${item.pricePerDay.toString()})</span>
                  <span className="font-medium">${price.baseFee}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Refundable Deposit</span>
                  <span className="font-medium">${price.deposit}</span>
                </div>
                <div className="border-t pt-3 flex justify-between font-semibold text-lg">
                  <span>Total Due Now</span>
                  <span className="text-primary">${price.total}</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Deposit will be refunded when you return the item in good condition
                </p>
              </CardContent>
            </Card>

            <div className="flex gap-4">
              <Button type="button" variant="outline" onClick={() => navigate({ to: '/rentals/$itemId', params: { itemId } })} className="flex-1">
                Cancel
              </Button>
              <Button type="submit" disabled={createBooking.isPending} className="flex-1">
                {createBooking.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Confirm Rental
              </Button>
            </div>
          </div>
        </form>
      </PageLayout>
    </RequireLogin>
  );
}
