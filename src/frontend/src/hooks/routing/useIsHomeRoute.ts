import { useEffect } from 'react';
import { useRouterState } from '@tanstack/react-router';

/**
 * Hook that determines whether the current route is the Home route ("/")
 * Hardened for production with pathname normalization and development diagnostics
 * @returns true if current route is exactly "/", false otherwise
 */
export function useIsHomeRoute(): boolean {
  const routerState = useRouterState();
  
  // Normalize pathname to handle production edge cases
  const pathname = routerState.location.pathname;
  const normalizedPath = pathname === '' ? '/' : pathname.replace(/\/+$/, '') || '/';
  
  // Check if the normalized pathname is exactly "/" or empty (which means root)
  const isHome = normalizedPath === '/' || pathname === '' || pathname === '/index.html';
  
  // Development-only diagnostic logging (gated by import.meta.env.DEV)
  useEffect(() => {
    if (import.meta.env.DEV) {
      console.debug('[useIsHomeRoute]', {
        rawPathname: pathname,
        normalizedPath,
        isHome,
        timestamp: new Date().toISOString(),
      });
    }
  }, [pathname, normalizedPath, isHome]);
  
  return isHome;
}
