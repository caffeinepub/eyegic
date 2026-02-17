/**
 * Build information configuration
 * This file contains the build identifier displayed in the UI
 */

export const BUILD_INFO = {
  identifier: import.meta.env.VITE_BUILD_ID || 'Draft 23',
} as const;
