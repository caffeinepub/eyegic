# Specification

## Summary
**Goal:** Improve partner onboarding data collection/verification, enforce future-date booking rules, update header navigation, and add a logged-in My Profile area with a cohesive (non-blue/purple) visual theme.

**Planned changes:**
- Update “Become a Provider” form to collect Phone Number and Email as separate inputs and require mock 4-digit OTP verification for both before submission.
- Add validation for Service Areas to accept 6-digit Indian PIN codes, allowing multiple PIN codes separated by exactly one space.
- Replace provider Availability free-text with a required calendar-based selector (future dates only) supporting individual dates or a date range plus a daily From–To time range, and persist it through the backend.
- Update “Request Repair Service” and “Book Mobile Optician” scheduling fields to be date-only (no time), disallow past dates, and remain optional.
- Update header navigation by replacing “Provider Portal” with “Contact Us” offering a WhatsApp action for +91 8600044322 (with icon) and an email action to info@eyegic.com.
- Add “My Profile” entry in header (desktop/mobile) requiring login, allowing optional profile fields (name, age, gender, address), profile & prescription image uploads, multi-select frame-shape preferences with small icons, and a profile completion percentage (shown beneath the My Profile button and/or within the profile page).
- Apply consistent spacing/typography/validation styling across updated/new UI using a primary theme direction that is not blue/purple.

**User-visible outcome:** Users can complete provider onboarding only after verifying phone and email via mock OTP, enter valid PIN-code service areas, select future availability via a calendar with times, book services with future date-only scheduling, access Contact Us actions from the header, and manage an optional My Profile (including images, frame-shape preferences with icons, and a completion percentage) in a consistent non-blue/purple theme.
