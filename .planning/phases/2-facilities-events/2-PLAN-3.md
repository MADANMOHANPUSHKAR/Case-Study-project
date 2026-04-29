---
wave: 3
depends_on:
  - "2-PLAN-2"
files_modified:
  - "src/app/facilities/page.tsx"
  - "src/components/BookingModal.tsx"
autonomous: true
---

# Plan 3: Facility Booking UI

<tasks>

<task>
<description>Build the Facility Booking UI</description>
<read_first>
- .planning/phases/2-facilities-events/2-CONTEXT.md
</read_first>
<action>
1. Create `src/app/facilities/page.tsx`. This page should fetch and display available facilities (Gym, Pool).
2. Create `src/components/BookingModal.tsx` which allows a user to select a date and an available 1-hour time slot.
3. Upon confirming the booking, call the `/api/bookings` route.
4. Integrate the `BiometricScanner` into a "Check-In" flow (e.g. user clicks "Check In", scans face, and if it matches, the booking status is updated to `checked_in`).
</action>
<acceptance_criteria>
- The user can successfully book a time slot.
- The check-in flow works visually.
</acceptance_criteria>
</task>

</tasks>

<must_haves>
- Uses the BiometricScanner component effectively.
</must_haves>
