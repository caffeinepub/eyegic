import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import PageLayout from '../../components/layout/PageLayout';
import RequireLogin from '../../components/auth/RequireLogin';
import { useOnboardProvider } from '../../hooks/provider/useProvider';
import { ServiceType } from '../../backend';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

export default function ProviderOnboardingPage() {
  const navigate = useNavigate();
  const onboardProvider = useOnboardProvider();

  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [serviceAreas, setServiceAreas] = useState('');
  const [availability, setAvailability] = useState('');
  const [selectedServices, setSelectedServices] = useState<ServiceType[]>([]);

  const serviceOptions = [
    { value: ServiceType.eyeTest, label: 'Eye Test' },
    { value: ServiceType.frameTryOn, label: 'Frame Try-On' },
    { value: ServiceType.combined, label: 'Combined Service' },
  ];

  const handleServiceToggle = (service: ServiceType) => {
    setSelectedServices((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !contact || !serviceAreas || selectedServices.length === 0) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      await onboardProvider.mutateAsync({
        name,
        contact,
        serviceAreas,
        services: selectedServices,
        availability,
      });

      toast.success('Provider profile created successfully!');
      navigate({ to: '/provider/dashboard' });
    } catch (error: any) {
      toast.error(error.message || 'Failed to create provider profile');
    }
  };

  return (
    <RequireLogin message="Please log in to register as a provider">
      <PageLayout title="Become a Provider" description="Join our network of eyewear professionals">
        <form onSubmit={handleSubmit}>
          <div className="max-w-2xl mx-auto space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Tell us about yourself</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact">Contact (Phone/Email) *</Label>
                  <Input
                    id="contact"
                    placeholder="phone@example.com or +1234567890"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Service Details</CardTitle>
                <CardDescription>What services do you provide?</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Services Offered *</Label>
                  <div className="space-y-2">
                    {serviceOptions.map((option) => (
                      <div key={option.value} className="flex items-center space-x-2">
                        <Checkbox
                          id={option.value}
                          checked={selectedServices.includes(option.value)}
                          onCheckedChange={() => handleServiceToggle(option.value)}
                        />
                        <Label htmlFor={option.value} className="font-normal cursor-pointer">
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="serviceAreas">Service Areas *</Label>
                  <Textarea
                    id="serviceAreas"
                    placeholder="e.g., Downtown, North District, etc."
                    value={serviceAreas}
                    onChange={(e) => setServiceAreas(e.target.value)}
                    rows={3}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="availability">Availability (Optional)</Label>
                  <Textarea
                    id="availability"
                    placeholder="e.g., Weekdays 9 AM - 5 PM, Weekends by appointment"
                    value={availability}
                    onChange={(e) => setAvailability(e.target.value)}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-4">
              <Button type="button" variant="outline" onClick={() => navigate({ to: '/' })} className="flex-1">
                Cancel
              </Button>
              <Button type="submit" disabled={onboardProvider.isPending} className="flex-1">
                {onboardProvider.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Complete Registration
              </Button>
            </div>
          </div>
        </form>
      </PageLayout>
    </RequireLogin>
  );
}
