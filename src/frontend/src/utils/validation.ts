// Validation utilities for forms

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * Validates and sanitizes phone number to exactly 10 digits
 */
export function validatePhone(phone: string): ValidationResult {
  const digitsOnly = phone.replace(/\D/g, '');
  
  if (digitsOnly.length === 0) {
    return { isValid: false, error: 'Phone number is required' };
  }
  
  if (digitsOnly.length !== 10) {
    return { isValid: false, error: 'Phone number must be exactly 10 digits' };
  }
  
  return { isValid: true };
}

/**
 * Sanitizes phone input to digits only
 */
export function sanitizePhone(phone: string): string {
  return phone.replace(/\D/g, '');
}

/**
 * Validates email format
 */
export function validateEmail(email: string): ValidationResult {
  if (email.length === 0) {
    return { isValid: false, error: 'Email is required' };
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Please enter a valid email address' };
  }
  
  return { isValid: true };
}

/**
 * Validates PIN codes (6-digit Indian postal codes separated by single space)
 */
export function validatePinCodes(pinCodes: string): ValidationResult {
  if (pinCodes.trim().length === 0) {
    return { isValid: false, error: 'Service areas (PIN codes) are required' };
  }
  
  // Check for invalid separators
  if (pinCodes.includes(',') || pinCodes.includes('\n') || /\s{2,}/.test(pinCodes)) {
    return { isValid: false, error: 'Please separate PIN codes with a single space only' };
  }
  
  const tokens = pinCodes.trim().split(' ');
  
  for (const token of tokens) {
    if (!/^\d{6}$/.test(token)) {
      return { isValid: false, error: 'Each PIN code must be exactly 6 digits' };
    }
  }
  
  return { isValid: true };
}

/**
 * Normalizes PIN codes string
 */
export function normalizePinCodes(pinCodes: string): string {
  return pinCodes.trim().replace(/\s+/g, ' ');
}
