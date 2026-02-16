# Specification

## Summary
**Goal:** Update the Eyegic logo used across the app to the most recently uploaded logo asset and ensure all visible logo placements render that same updated image.

**Planned changes:**
- Update `frontend/src/components/brand/BrandLogo.tsx` to reference the last uploaded Eyegic logo file under `/assets/generated/` (replacing the current older/incorrect logo path).
- Verify `frontend/src/components/layout/SiteHeader.tsx` (desktop header and mobile menu sheet) renders `BrandLogo` and shows the updated logo without broken-image fallback.
- Ensure no other visible components render a different Eyegic logo asset path (all logo instances match the latest uploaded file).

**User-visible outcome:** The updated Eyegic logo appears consistently in the desktop header and in the mobile menu sheet, with no mismatched or broken logos anywhere in the UI.
