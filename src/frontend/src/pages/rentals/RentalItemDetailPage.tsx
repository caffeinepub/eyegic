import { useParams, useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import PageLayout from '../../components/layout/PageLayout';
import { useRentalCatalog } from '../../hooks/rentals/useRentalCatalog';
import { Loader2, Package, Shield, Truck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function RentalItemDetailPage() {
  const { itemId } = useParams({ from: '/rentals/$itemId' });
  const navigate = useNavigate();
  const { data: items, isLoading } = useRentalCatalog();

  const item = items?.find((i) => i.id.toString() === itemId);

  if (isLoading) {
    return (
      <PageLayout>
        <div className="flex justify-center items-center min-h-[50vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </PageLayout>
    );
  }

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
    <PageLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <Button variant="ghost" onClick={() => navigate({ to: '/rentals' })}>
          ← Back to Catalog
        </Button>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <Card>
              <CardContent className="p-8">
                <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                  <Package className="h-24 w-24 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-2">
                <h1 className="text-3xl font-bold">{item.name}</h1>
                {item.available ? (
                  <Badge>Available</Badge>
                ) : (
                  <Badge variant="secondary">Unavailable</Badge>
                )}
              </div>
              <p className="text-lg text-muted-foreground">{item.category}</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Rental Pricing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Price per day</span>
                  <span className="font-semibold text-lg">${item.pricePerDay.toString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Refundable deposit</span>
                  <span className="font-semibold text-lg">${item.deposit.toString()}</span>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Truck className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium">Fast Delivery</div>
                  <div className="text-sm text-muted-foreground">Delivered to your address within 2-3 days</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium">Damage Protection</div>
                  <div className="text-sm text-muted-foreground">Covered for normal wear and tear</div>
                </div>
              </div>
            </div>

            <Button
              size="lg"
              className="w-full"
              onClick={() => navigate({ to: '/book/rentals/$itemId', params: { itemId: item.id.toString() } })}
              disabled={!item.available}
            >
              {item.available ? 'Rent This Item' : 'Currently Unavailable'}
            </Button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
