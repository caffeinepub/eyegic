# Specification

## Summary
**Goal:** Use the single user-uploaded EYEGIC logo file everywhere in the app and remove any other logo usage.

**Planned changes:**
- Add the static asset `EYEGIC LOGO for ID cards-5.png` to the frontend and ensure it is loadable by the UI.
- Create a reusable `BrandLogo` component that renders only `EYEGIC LOGO for ID cards-5.png`.
- Replace text-based branding in the site header and footer (including the mobile sheet header area) with `BrandLogo`.
- Remove/avoid any remaining frontend references, logic, or UI related to other logo assets or logo fetching/upload/management so no other logo can appear.

**User-visible outcome:** The header and footer show the uploaded EYEGIC logo image (not text), and the app does not display or manage any other logo.
