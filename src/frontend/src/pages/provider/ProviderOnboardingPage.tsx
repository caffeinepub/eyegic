import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import PageLayout from '../../components/layout/PageLayout';
import RequireLogin from '../../components/auth/RequireLogin';
import MockOtpVerification from '../../components/forms/MockOtpVerification';
import AvailabilitySelector from '../../components/forms/AvailabilitySelector';
import { useOnboardProvider } from '../../hooks/provider/useProvider';
import { ServiceType } from '../../backend';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { validatePhone, sanitizePhone, validateEmail, validatePinCodes } from '../../utils/validation';

export default function ProviderOnboardingPage() {
  const navigate = useNavigate();
  const onboardProvider = useOnboardProvider();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [serviceAreas, setServiceAreas] = useState('');
  const [availability, setAvailability] = useState('');
  const [selectedServices, setSelectedServices] = useState<ServiceType[]>([]);
  
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  
  const [phoneError, setPhoneError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [pinError, setPinError] = useState('');
  const [availabilityError, setAvailabilityError] = useState('');

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

  const handlePhoneChange = (value: string) => {
    const sanitized = sanitizePhone(value);
    setPhone(sanitized);
    setPhoneVerified(false);
    
    if (sanitized.length > 0) {
      const validation = validatePhone(sanitized);
      setPhoneError(validation.error || '');
    } else {
      setPhoneError('');
    }
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    setEmailVerified(false);
    
    if (value.length > 0) {
      const validation = validateEmail(value);
      setEmailError(validation.error || '');
    } else {
      setEmailError('');
    }
  };

  const handleServiceAreasChange = (value: string) => {
    setServiceAreas(value);
    
    if (value.trim().length > 0) {
      const validation = validatePinCodes(value);
      setPinError(validation.error || '');
    } else {
      setPinError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    let hasError = false;

    if (!name) {
      toast.error('Please enter your name');
      return;
    }

    const phoneValidation = validatePhone(phone);
    if (!phoneValidation.isValid) {
      setPhoneError(phoneValidation.error || '');
      hasError = true;
    }

    if (!phoneVerified) {
      toast.error('Please verify your phone number');
      return;
    }

    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid) {
      setEmailError(emailValidation.error || '');
      hasError = true;
    }

    if (!emailVerified) {
      toast.error('Please verify your email address');
      return;
    }

    const pinValidation = validatePinCodes(serviceAreas);
    if (!pinValidation.isValid) {
      setPinError(pinValidation.error || '');
      hasError = true;
    }

    if (!availability) {
      setAvailabilityError('Availability is required');
      toast.error('Please select your availability');
      return;
    }

    if (selectedServices.length === 0) {
      toast.error('Please select at least one service');
      return;
    }

    if (hasError) {
      toast.error('Please fix all errors before submitting');
      return;
    }

    try {
      await onboardProvider.mutateAsync({
        name,
        phone,
        email,
        serviceAreas: serviceAreas.trim(),
        services: selectedServices,
        availability,
      });

      toast.success('Provider profile created successfully!');
      navigate({ to: '/provider/dashboard' });
    } catch (error: any) {
      toast.error(error.message || 'Failed to create provider profile');
    }
  };

  const phoneValidation = validatePhone(phone);
  const emailValidation = validateEmail(email);

  return (
    <RequireLogin message="Please log in to register as a provider">
      <PageLayout title="Become a Partner" description="Join our network of eyewear professionals">
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
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    placeholder="10-digit mobile number"
                    value={phone}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    maxLength={10}
                    required
                  />
                  {phoneError && <p className="text-sm text-destructive">{phoneError}</p>}
                  {phone.length === 10 && phoneValidation.isValid && !phoneVerified && (
                    <MockOtpVerification
                      type="phone"
                      value={phone}
                      onVerified={() => setPhoneVerified(true)}
                    />
                  )}
                  {phoneVerified && (
                    <p className="text-sm text-green-600 dark:text-green-500">✓ Phone verified</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => handleEmailChange(e.target.value)}
                    required
                  />
                  {emailError && <p className="text-sm text-destructive">{emailError}</p>}
                  {email.length > 0 && emailValidation.isValid && !emailVerified && (
                    <MockOtpVerification
                      type="email"
                      value={email}
                      onVerified={() => setEmailVerified(true)}
                      disabled={!emailValidation.isValid}
                    />
                  )}
                  {emailVerified && (
                    <p className="text-sm text-green-600 dark:text-green-500">✓ Email verified</p>
                  )}
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
                  <Label htmlFor="serviceAreas">Service Areas (PIN Codes) *</Label>
                  <Input
                    id="serviceAreas"
                    placeholder="e.g., 411001 411002 411003"
                    value={serviceAreas}
                    onChange={(e) => handleServiceAreasChange(e.target.value)}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Enter 6-digit Indian PIN codes separated by a single space
                  </p>
                  {pinError && <p className="text-sm text-destructive">{pinError}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="availability">Availability *</Label>
                  <AvailabilitySelector
                    value={availability}
                    onChange={(value) => {
                      setAvailability(value);
                      setAvailabilityError('');
                    }}
                  />
                  {availabilityError && <p className="text-sm text-destructive">{availabilityError}</p>}
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
