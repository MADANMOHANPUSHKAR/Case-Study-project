---
wave: 2
depends_on:
  - "2-PLAN-1"
files_modified:
  - "src/app/api/facilities/route.ts"
  - "src/app/api/bookings/route.ts"
  - "src/app/api/events/route.ts"
  - "src/app/api/rsvps/route.ts"
autonomous: true
---

# Plan 2: API Routes

<tasks>

<task>
<description>Build API endpoints for data fetching and mutations</description>
<read_first>
- src/lib/types.ts
</read_first>
<action>
1. Create `src/app/api/facilities/route.ts` to GET facilities.
2. Create `src/app/api/bookings/route.ts` to POST a new booking and GET user's bookings.
3. Create `src/app/api/events/route.ts` to GET upcoming events and workshops.
4. Create `src/app/api/rsvps/route.ts` to POST a new RSVP.
</action>
<acceptance_criteria>
- All API routes return proper JSON responses.
</acceptance_criteria>
</task>

</tasks>

<must_haves>
- APIs must handle missing data gracefully.
</must_haves>
