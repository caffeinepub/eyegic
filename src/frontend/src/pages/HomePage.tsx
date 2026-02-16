import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, Package, Wrench, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function HomePage() {
  const navigate = useNavigate();

  const services = [
    {
      icon: Eye,
      title: 'Mobile Optician',
      description: 'Professional eye tests and frame try-ons at your home or office',
      path: '/services/mobile-optician',
      color: 'text-primary',
    },
    {
      icon: Package,
      title: 'Eyewear Rentals',
      description: 'Rent premium eyewear for events, travel, or short-term needs',
      path: '/rentals',
      color: 'text-primary',
    },
    {
      icon: Wrench,
      title: 'Repairs & Adjustments',
      description: 'Expert technicians for repairs, adjustments, and lens replacement',
      path: '/services/repairs',
      color: 'text-primary',
    },
  ];

  const steps = [
    { title: 'Request', description: 'Choose your service and schedule' },
    { title: 'Confirm', description: 'Get matched with a professional' },
    { title: 'Enjoy', description: 'Receive service at your convenience' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary/5 to-background">
        <div className="container-custom py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="space-y-6 md:pr-8 min-w-0">
              <h1 className="text-3xl sm:text-4xl md:text-[2rem] lg:text-[2.25rem] xl:text-[2.5rem] font-bold leading-tight md:whitespace-nowrap">
                Eyewear Services, <span className="text-primary">On Demand</span>
              </h1>
              <p className="text-base sm:text-lg md:text-sm lg:text-base text-muted-foreground md:whitespace-nowrap">
                Professional opticians, rentals, and repairs delivered to your doorstep.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" onClick={() => navigate({ to: '/services/mobile-optician' })} className="gap-2">
                  Book a Service
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
            <div className="relative flex-shrink-0">
              <img
                src="/assets/generated/eyegic-hero.dim_1600x900.png"
                alt="Eyegic Services"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-spacing bg-muted/30">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground">Simple, fast, and convenient</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground text-2xl font-bold">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section-spacing">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-lg text-muted-foreground">Everything you need for eyewear care</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mb-4">
                    <service.icon className={`h-12 w-12 ${service.color}`} />
                  </div>
                  <CardTitle>{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    variant="outline"
                    className="w-full gap-2"
                    onClick={() => navigate({ to: service.path })}
                  >
                    Learn More
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-spacing bg-muted/30">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Eyegic?</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              'No travel needed',
              'Professional service',
              'Flexible scheduling',
              'Affordable pricing',
            ].map((benefit, index) => (
              <div key={index} className="flex items-center gap-3 p-4 bg-background rounded-lg">
                <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0" />
                <span className="font-medium">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
