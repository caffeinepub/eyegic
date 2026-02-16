# Specification

## Summary
**Goal:** Fix the Home page hero text layout at md+ breakpoints and ensure the app uses the newly uploaded Eyegic logo everywhere the BrandLogo appears.

**Planned changes:**
- Adjust the Home page hero two-column layout at md and larger breakpoints so the headline “Eyewear Services, On Demand” is fully visible, not overlapped by the hero image, and renders on a single unbroken line.
- Readjust the font sizes/layout (without changing text content) so the supporting sentence “Professional opticians, rentals, and repairs delivered to your doorstep.” renders as a single unbroken line directly below the headline and remains unobstructed at md+ breakpoints.
- Add the uploaded logo file “EYEGIC LOGO for ID cards-2.png” as a static frontend asset and update the BrandLogo component to use this exact file everywhere (including desktop header and mobile menu sheet), replacing prior logo asset references.

**User-visible outcome:** On desktop/tablet, the Home hero headline and supporting sentence display cleanly as single lines beside the hero image without overlap, and the correct uploaded Eyegic logo appears consistently across the site header and mobile menu.
