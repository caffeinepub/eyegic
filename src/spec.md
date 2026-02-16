# Specification

## Summary
**Goal:** Remove all site logo rendering and all logo-management functionality from both the frontend and backend.

**Planned changes:**
- Remove all logo display from the UI (header, mobile menu header area, footer) and eliminate any BrandLogo usage/imports.
- Remove the Branding/Logo settings entry points by deleting the `/settings/branding` route and any navigation links/buttons that point to it.
- Remove frontend logo upload/fetch logic and related utilities (including any logo data-url conversion helpers) and ensure there are no remaining references to logo actor methods/types.
- Remove backend logo storage and APIs so the canister no longer exposes logo-related types/state/methods.
- Remove or leave unused (with zero runtime/code references) the bundled generated logo asset so the repository no longer depends on it.

**User-visible outcome:** The app no longer displays a logo anywhere, and users can no longer navigate to or manage a site logo in settings.
