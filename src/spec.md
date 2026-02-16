# Specification

## Summary
**Goal:** Remove all logo images throughout the app and standardize header/footer branding as bold, text-only “EYEGIC” that links to the home page.

**Planned changes:**
- Remove all rendered usages of the current logo image(s) across the app, including the header home-link `<img>` and any occurrences in header, mobile menu header, and footer.
- Replace the header brand area (desktop and mobile/menu) with a bold, text-only “EYEGIC” link to “/”, sized to the maximum that fits the header height across responsive breakpoints.
- Update the footer to no longer render a logo `<img>` and replace it with text-only “EYEGIC” (or remove the logo area) while keeping layout/spacing coherent and accessible.
- Clean up any unused imports/references created by removing image-based logo code (including `useSiteLogo()` if it becomes unused).

**User-visible outcome:** The app no longer shows any logo images; users see a bold “EYEGIC” text brand in the header (and mobile menu header) that links to “/”, and the footer no longer displays a logo image.
