---
wave: 4
depends_on:
  - "2-PLAN-2"
files_modified:
  - "src/app/events/page.tsx"
  - "src/components/EventCard.tsx"
autonomous: true
---

# Plan 4: Events & Workshops UI

<tasks>

<task>
<description>Build the Event Calendar and RSVP interface</description>
<read_first>
- .planning/phases/2-facilities-events/2-CONTEXT.md
</read_first>
<action>
1. Create `src/app/events/page.tsx` displaying a monthly grid or list of events and workshops.
2. Create `src/components/EventCard.tsx` showing event details and an "RSVP" button.
3. Clicking RSVP calls the `/api/rsvps` route.
4. Add capacity logic (disable RSVP if the event is full).
</action>
<acceptance_criteria>
- Events are properly displayed.
- The RSVP flow works and respects capacity limits.
</acceptance_criteria>
</task>

</tasks>

<must_haves>
- The UI should clearly distinguish between Events and Workshops.
</must_haves>
