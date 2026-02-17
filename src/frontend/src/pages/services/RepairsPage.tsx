import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import PageLayout from '../../components/layout/PageLayout';
import { Wrench, Home, Clock, CheckCircle2 } from 'lucide-react';

export default function RepairsPage() {
  const navigate = useNavigate();

  const services = [
    'Frame adjustments',
    'Screw tightening',
    'Lens replacement',
    'Nose pad replacement',
    'Temple repair',
    'General maintenance',
  ];

  return (
    <PageLayout
      title="Repairs & Adjustments"
      description="Expert eyewear technicians at your service"
    >
      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div className="motion-safe:animate-fade-in-up">
          <img
            src="/assets/generated/eyegic-repairs-tab.dim_1400x900.png"
            alt="Repairs & Adjustments - Expert eyewear technician service"
            className="w-full h-auto rounded-2xl shadow-lg motion-safe:hover:scale-[1.02] motion-safe:transition-transform motion-safe:duration-300"
            width={1400}
            height={900}
            loading="eager"
          />
        </div>
        <div className="space-y-6 motion-safe:animate-fade-in-up motion-safe:animation-delay-150">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Services We Provide</h2>
            <div className="grid grid-cols-2 gap-3">
              {services.map((service, index) => (
                <div key={index} className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{service}</span>
                </div>
              ))}
            </div>
          </div>
          <Button size="lg" onClick={() => navigate({ to: '/book/repair' })} className="w-full md:w-auto">
            Request Repair Service
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="motion-safe:animate-scale-in motion-safe:animation-delay-200">
          <CardContent className="pt-6 text-center space-y-3">
            <Home className="h-10 w-10 text-primary mx-auto" />
            <h3 className="font-semibold">At Your Doorstep</h3>
            <p className="text-sm text-muted-foreground">
              Technicians come to you with all necessary tools
            </p>
          </CardContent>
        </Card>
        <Card className="motion-safe:animate-scale-in motion-safe:animation-delay-300">
          <CardContent className="pt-6 text-center space-y-3">
            <Clock className="h-10 w-10 text-primary mx-auto" />
            <h3 className="font-semibold">Quick Service</h3>
            <p className="text-sm text-muted-foreground">
              Most repairs completed in under 30 minutes
            </p>
          </CardContent>
        </Card>
        <Card className="motion-safe:animate-scale-in motion-safe:animation-delay-400">
          <CardContent className="pt-6 text-center space-y-3">
            <Wrench className="h-10 w-10 text-primary mx-auto" />
            <h3 className="font-semibold">Expert Technicians</h3>
            <p className="text-sm text-muted-foreground">
              Trained professionals with quality parts
            </p>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
