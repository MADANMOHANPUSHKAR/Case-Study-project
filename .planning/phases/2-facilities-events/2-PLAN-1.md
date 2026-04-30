---
wave: 1
depends_on: []
files_modified:
  - "supabase/migrations/01_facilities_events.sql"
  - "src/lib/types.ts"
autonomous: true
---

# Plan 1: Database Schema & Types

<tasks>

<task>
<description>Create database schema for facilities, events, and bookings</description>
<read_first>
- .planning/phases/2-facilities-events/2-CONTEXT.md
</read_first>
<action>
1. Create a new migration file `supabase/migrations/01_facilities_events.sql`.
2. Define tables:
   - `facilities`: id, name, type (gym, pool), max_capacity.
   - `facility_bookings`: id, facility_id, user_id, start_time, end_time, status (active, cancelled, checked_in).
   - `events`: id, title, description, date, capacity, is_workshop.
   - `event_rsvps`: id, event_id, user_id, status (registered, attended).
3. Create `src/lib/types.ts` reflecting these database schemas.
</action>
<acceptance_criteria>
- Migration file exists and has correct SQL.
- `src/lib/types.ts` is created and exported properly.
</acceptance_criteria>
</task>

</tasks>

<must_haves>
- The SQL migration must be valid PostgreSQL.
</must_haves>
