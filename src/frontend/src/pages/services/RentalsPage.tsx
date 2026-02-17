import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import PageLayout from '../../components/layout/PageLayout';
import { Package, Truck, RotateCcw, Shield } from 'lucide-react';

export default function RentalsPage() {
  const navigate = useNavigate();

  return (
    <PageLayout
      title="Eyewear Rentals"
      description="Premium eyewear for events, travel, and short-term needs"
    >
      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div className="space-y-6 motion-safe:animate-fade-in-up">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Why Rent?</h2>
            <p className="text-muted-foreground">
              Perfect for special occasions, trying new styles, or temporary needs. Get access to premium eyewear
              without the commitment of buying.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Package className="h-5 w-5 text-primary" />
                <span>Wide selection of styles</span>
              </li>
              <li className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-primary" />
                <span>Fast delivery and pickup</span>
              </li>
              <li className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <span>Damage protection included</span>
              </li>
            </ul>
          </div>
          <Button size="lg" onClick={() => navigate({ to: '/rentals' })} className="w-full md:w-auto">
            Browse Rental Catalog
          </Button>
        </div>
        <div className="motion-safe:animate-fade-in-up motion-safe:animation-delay-150">
          <img
            src="/assets/generated/eyegic-rentals-tab.dim_1400x900.png"
            alt="Eyewear Rentals - Premium glasses for short-term use"
            className="w-full h-auto rounded-2xl shadow-lg motion-safe:animate-float-gentle motion-safe:hover:scale-105 motion-safe:transition-all motion-safe:duration-500"
            width={1400}
            height={900}
            loading="eager"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="motion-safe:animate-scale-in motion-safe:animation-delay-200">
          <CardContent className="pt-6 text-center space-y-3">
            <Package className="h-10 w-10 text-primary mx-auto" />
            <h3 className="font-semibold">Choose Your Style</h3>
            <p className="text-sm text-muted-foreground">
              Browse our curated collection of premium eyewear for every occasion
            </p>
          </CardContent>
        </Card>

        <Card className="motion-safe:animate-scale-in motion-safe:animation-delay-300">
          <CardContent className="pt-6 text-center space-y-3">
            <Truck className="h-10 w-10 text-primary mx-auto" />
            <h3 className="font-semibold">Fast Delivery</h3>
            <p className="text-sm text-muted-foreground">
              Quick delivery to your doorstep and hassle-free returns
            </p>
          </CardContent>
        </Card>

        <Card className="motion-safe:animate-scale-in motion-safe:animation-delay-400">
          <CardContent className="pt-6 text-center space-y-3">
            <RotateCcw className="h-10 w-10 text-primary mx-auto" />
            <h3 className="font-semibold">Flexible Terms</h3>
            <p className="text-sm text-muted-foreground">
              Rent for as long as you need with easy extension options
            </p>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
