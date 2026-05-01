---
wave: 2
depends_on: []
files_modified:
  - "src/app/admin/page.tsx"
autonomous: true
---

# Plan 2: Admin Dashboard

<tasks>

<task>
<description>Build the Admin Dashboard with simple KPI metrics</description>
<read_first>
- .planning/phases/3-dashboards-polish/3-CONTEXT.md
</read_first>
<action>
1. Create `src/app/admin/page.tsx`.
2. Mock an admin check (e.g., check if user is `admin@college.edu`).
3. Fetch overall system stats: total facilities, total events, total bookings.
4. Display simple numeric KPI cards for these metrics.
</action>
<acceptance_criteria>
- An admin can view high-level metrics.
</acceptance_criteria>
</task>

</tasks>

<must_haves>
- Simple, clear numeric KPI cards.
</must_haves>
