// Session storage utility for Home-flow OTP verification state
const HOME_OTP_VERIFIED_KEY = 'eyegic_home_otp_verified';
const HOME_OTP_MOBILE_KEY = 'eyegic_home_otp_mobile';

export function setHomeOtpVerified(mobileNumber: string): void {
  sessionStorage.setItem(HOME_OTP_VERIFIED_KEY, 'true');
  sessionStorage.setItem(HOME_OTP_MOBILE_KEY, mobileNumber);
}

export function getHomeOtpVerified(): { verified: boolean; mobileNumber: string | null } {
  const verified = sessionStorage.getItem(HOME_OTP_VERIFIED_KEY) === 'true';
  const mobileNumber = sessionStorage.getItem(HOME_OTP_MOBILE_KEY);
  return { verified, mobileNumber };
}

export function clearHomeOtpVerified(): void {
  sessionStorage.removeItem(HOME_OTP_VERIFIED_KEY);
  sessionStorage.removeItem(HOME_OTP_MOBILE_KEY);
}
