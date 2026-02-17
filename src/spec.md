# Specification

## Summary
**Goal:** Fix the app draft preview so it opens reliably, and display a clear build identifier for “Draft 23”.

**Planned changes:**
- Fix TanStack Router initialization in `frontend/src/App.tsx` to remove the circular dependency causing runtime errors and blank screen.
- Ensure the app uses a single React Query `QueryClientProvider` (avoid conflicting/nested providers between `frontend/src/main.tsx` and `frontend/src/App.tsx`).
- Add a visible, user-facing build identifier string configurable to “Draft 23” and shown in the UI without authentication or backend calls.

**User-visible outcome:** The app opens to the Home page without console ReferenceErrors, existing routes continue to work, and the UI clearly shows the build identifier “Draft 23”.
