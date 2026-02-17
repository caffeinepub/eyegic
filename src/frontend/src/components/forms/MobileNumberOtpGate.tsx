import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import MockOtpVerification from './MockOtpVerification';
import { sanitizePhone, validatePhone } from '@/utils/validation';

interface MobileNumberOtpGateProps {
  onSubmitRequest: (mobileNumber: string) => void;
  disabled?: boolean;
}

export default function MobileNumberOtpGate({ onSubmitRequest, disabled }: MobileNumberOtpGateProps) {
  const [mobileNumber, setMobileNumber] = useState('');
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [validationError, setValidationError] = useState('');

  const handleMobileChange = (value: string) => {
    const sanitized = sanitizePhone(value);
    setMobileNumber(sanitized);
    setValidationError('');
  };

  const handleSendOtp = () => {
    const validation = validatePhone(mobileNumber);
    if (!validation.isValid) {
      setValidationError(validation.error || '');
      return;
    }
    setShowOtp(true);
  };

  const handleOtpVerified = () => {
    setIsOtpVerified(true);
  };

  const handleSubmitRequest = () => {
    if (isOtpVerified && mobileNumber.length === 10) {
      onSubmitRequest(mobileNumber);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="mobileNumber">Mobile Number *</Label>
        <Input
          id="mobileNumber"
          placeholder="10-digit mobile number"
          value={mobileNumber}
          onChange={(e) => handleMobileChange(e.target.value)}
          maxLength={10}
          disabled={isOtpVerified || disabled}
        />
        {validationError && (
          <p className="text-sm text-destructive">{validationError}</p>
        )}
        <p className="text-xs text-muted-foreground">
          Enter exactly 10 digits
        </p>
      </div>

      {!showOtp && !isOtpVerified && (
        <Button
          type="button"
          variant="outline"
          onClick={handleSendOtp}
          disabled={mobileNumber.length !== 10 || disabled}
        >
          Send OTP
        </Button>
      )}

      {showOtp && !isOtpVerified && (
        <MockOtpVerification
          type="phone"
          value={mobileNumber}
          onVerified={handleOtpVerified}
          disabled={disabled}
        />
      )}

      {isOtpVerified && (
        <Button
          type="button"
          onClick={handleSubmitRequest}
          disabled={disabled}
          className="w-full"
        >
          Submit Request
        </Button>
      )}
    </div>
  );
}
