# Specification

## Summary
**Goal:** Restore Version 27 behavior for admin OTP verification notifications and the My Profile completion percentage indicator.

**Planned changes:**
- Backend: Persist mobile-number OTP verification log records ({mobileNumber, verifiedAt}) and expose an admin-only API to list them.
- Backend: Update profile completion calculation to count all My Profile fields and return a 0–100 whole-number percentage (0 if no profile exists).
- Frontend: Restore the admin notifications control in the header for admin users, showing a badge count and linking to an Admin dashboard notifications panel.
- Frontend: Add /admin/notifications page to list OTP verification records (newest-first) with mobile number and human-readable timestamp, and block non-admin access.
- Frontend: Restore the Version 27 My Profile header control, including showing the profile completion percentage beneath it in both desktop header and mobile menu (authenticated users only).

**User-visible outcome:** Admins can see in-app notifications for OTP-verified mobile numbers (with timestamps) in the admin dashboard, and signed-in users see an accurate My Profile completion percentage displayed under the My Profile control in both desktop and mobile navigation.
