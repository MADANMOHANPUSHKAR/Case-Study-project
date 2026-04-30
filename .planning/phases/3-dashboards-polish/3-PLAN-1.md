---
wave: 1
depends_on: []
files_modified:
  - "src/app/dashboard/page.tsx"
autonomous: true
---

# Plan 1: User Dashboard

<tasks>

<task>
<description>Build the User Dashboard with a unified feed</description>
<read_first>
- .planning/phases/3-dashboards-polish/3-CONTEXT.md
</read_first>
<action>
1. Create `src/app/dashboard/page.tsx`.
2. Fetch the user's upcoming facility bookings from `/api/bookings`.
3. Fetch the user's upcoming RSVPs from `/api/rsvps`.
4. Combine and sort them into a single "Upcoming" unified feed.
5. Provide a "Cancel Booking" action on the cards (mock or call DELETE API).
</action>
<acceptance_criteria>
- User sees their upcoming events and facility bookings on one page.
</acceptance_criteria>
</task>

</tasks>

<must_haves>
- Mobile-friendly list layout.
</must_haves>
