# Phase 3: Dashboards & Polish - Context

**Gathered:** 2026-05-01
**Status:** Ready for planning

<domain>
## Phase Boundary

Provide management tools for administrators and finalize the mobile experience via user dashboards and PWA.

</domain>

<decisions>
## Implementation Decisions

### Admin Dashboard Metrics
- Today's Check-ins & Bookings
- Simple numeric KPI cards
- Hardcoded admin email for v1
- No export for v1

### User Dashboard Layout
- Unified Feed (Upcoming Bookings + RSVPs in one list)
- Only show Upcoming
- "Cancel Booking" button on cards
- Redirect directly here after face login

### PWA Strategy & Polish
- Basic Installable App (Manifest + Icon)
- Clear visual UI prompt for camera errors
- Force Dark Mode for scanner UI
- Mobile-first padding/typography

### the agent's Discretion

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- Supabase queries in API routes
- EventCard and BookingModal components

### Established Patterns
- Client-side data fetching via standard `useEffect` + `/api/...`

### Integration Points
- `/login` redirect logic
- `next.config.js` or `manifest.json` for PWA

</code_context>

<specifics>
## Specific Ideas

No specific requirements — open to standard approaches

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>
