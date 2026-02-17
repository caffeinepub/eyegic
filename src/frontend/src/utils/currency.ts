/**
 * Formats a number or bigint as INR currency with Rs. prefix
 */
export function formatINR(amount: number | bigint): string {
  const numAmount = typeof amount === 'bigint' ? Number(amount) : amount;
  return `Rs. ${numAmount}`;
}

/**
 * Formats INR with additional text (e.g., "Rs. 99/-")
 */
export function formatINRWithSlash(amount: number | bigint): string {
  const numAmount = typeof amount === 'bigint' ? Number(amount) : amount;
  return `Rs. ${numAmount}/-`;
}
