import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { CheckCircle2, Loader2 } from 'lucide-react';

interface MockOtpVerificationProps {
  type: 'phone' | 'email';
  value: string;
  onVerified: () => void;
  disabled?: boolean;
}

export default function MockOtpVerification({ type, value, onVerified, disabled }: MockOtpVerificationProps) {
  const [otpSent, setOtpSent] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [enteredOtp, setEnteredOtp] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');
  const [verified, setVerified] = useState(false);

  const generateOtp = () => {
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(otp);
    setOtpSent(true);
    setError('');
    setEnteredOtp('');
    
    // Show the OTP in console for testing (mock behavior)
    console.log(`[MOCK OTP] ${type.toUpperCase()} verification code for ${value}: ${otp}`);
  };

  const handleVerify = async () => {
    setIsVerifying(true);
    setError('');
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (enteredOtp === generatedOtp) {
      setVerified(true);
      onVerified();
    } else {
      setError('Invalid OTP. Please try again.');
    }
    
    setIsVerifying(false);
  };

  const handleResend = () => {
    generateOtp();
  };

  if (verified) {
    return (
      <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-500">
        <CheckCircle2 className="h-4 w-4" />
        <span>{type === 'phone' ? 'Phone' : 'Email'} verified successfully</span>
      </div>
    );
  }

  if (!otpSent) {
    return (
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={generateOtp}
        disabled={disabled}
      >
        Send OTP
      </Button>
    );
  }

  return (
    <div className="space-y-3 p-4 border rounded-lg bg-muted/30">
      <div className="space-y-2">
        <Label htmlFor={`otp-${type}`} className="text-sm">
          Enter 4-digit OTP sent to {type === 'phone' ? 'your phone' : 'your email'}
        </Label>
        <div className="flex items-center gap-3">
          <InputOTP
            maxLength={4}
            value={enteredOtp}
            onChange={(value) => {
              setEnteredOtp(value);
              setError('');
            }}
            disabled={isVerifying}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
            </InputOTPGroup>
          </InputOTP>
        </div>
        {error && <p className="text-sm text-destructive">{error}</p>}
        <p className="text-xs text-muted-foreground">
          Mock OTP (check console): {generatedOtp}
        </p>
      </div>
      
      <div className="flex gap-2">
        <Button
          type="button"
          size="sm"
          onClick={handleVerify}
          disabled={enteredOtp.length !== 4 || isVerifying}
        >
          {isVerifying && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Verify
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleResend}
          disabled={isVerifying}
        >
          Resend OTP
        </Button>
      </div>
    </div>
  );
}
