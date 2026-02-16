import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import PageLayout from '../../components/layout/PageLayout';
import { Eye, Home, Calendar, CheckCircle2 } from 'lucide-react';

export default function MobileOpticianPage() {
  const navigate = useNavigate();

  const features = [
    'Comprehensive eye examination',
    'Wide selection of frames to try',
    'Professional optician at your location',
    'Prescription and recommendations',
  ];

  return (
    <PageLayout
      title="Mobile Optician Service"
      description="Professional eye care delivered to your doorstep"
    >
      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div className="motion-safe:animate-fade-in-up">
          <img
            src="/assets/generated/eyegic-mobile-optician-tab.dim_1400x900.png"
            alt="Mobile Optician Service - Professional eye care delivered by 2-wheeler"
            className="w-full h-auto rounded-2xl shadow-lg motion-safe:hover:scale-[1.02] motion-safe:transition-transform motion-safe:duration-300"
            width={1400}
            height={900}
            loading="eager"
          />
        </div>
        <div className="space-y-6 motion-safe:animate-fade-in-up motion-safe:animation-delay-150">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">What We Offer</h2>
            <ul className="space-y-3">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          <Button size="lg" onClick={() => navigate({ to: '/book/mobile-optician' })} className="w-full md:w-auto">
            Book Mobile Optician
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="motion-safe:animate-scale-in motion-safe:animation-delay-200">
          <CardContent className="pt-6 text-center space-y-3">
            <Home className="h-10 w-10 text-primary mx-auto" />
            <h3 className="font-semibold">At Your Location</h3>
            <p className="text-sm text-muted-foreground">
              We come to your home or office at your convenience
            </p>
          </CardContent>
        </Card>
        <Card className="motion-safe:animate-scale-in motion-safe:animation-delay-300">
          <CardContent className="pt-6 text-center space-y-3">
            <Calendar className="h-10 w-10 text-primary mx-auto" />
            <h3 className="font-semibold">Flexible Scheduling</h3>
            <p className="text-sm text-muted-foreground">
              Choose a time that works best for you
            </p>
          </CardContent>
        </Card>
        <Card className="motion-safe:animate-scale-in motion-safe:animation-delay-400">
          <CardContent className="pt-6 text-center space-y-3">
            <Eye className="h-10 w-10 text-primary mx-auto" />
            <h3 className="font-semibold">Expert Care</h3>
            <p className="text-sm text-muted-foreground">
              Certified opticians with years of experience
            </p>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
