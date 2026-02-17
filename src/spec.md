# Specification

## Summary
**Goal:** Restore the Home page header “My Profile” and “Notifications” controls so they match Version 32 visibility, styling, and interaction in the live build.

**Planned changes:**
- Reinstate the “My Profile” header control on the Home route (/) for authenticated users, matching Version 32 behavior and navigating to `/profile` on click.
- Reinstate the “Notifications” header control on the Home route (/) for admin users, matching Version 32 behavior and navigating to `/admin/notifications` on click.
- Ensure both controls render only on the Home page header (route “/”) and do not appear on headers or mobile navigation UI for any other routes.
- Verify no console errors are introduced by the header changes.

**User-visible outcome:** On the Home page only, authenticated users can click “My Profile” to go to their profile, and admin users can click “Notifications” to go to the admin notifications page; these controls are hidden elsewhere.
