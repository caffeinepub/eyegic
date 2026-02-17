import { useRouterState } from '@tanstack/react-router';

/**
 * Hook that determines whether the current route is the Home route ("/")
 * @returns true if current route is exactly "/", false otherwise
 */
export function useIsHomeRoute(): boolean {
  const routerState = useRouterState();
  
  // Check if the current location pathname is exactly "/"
  return routerState.location.pathname === '/';
}
