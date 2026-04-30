# Phase 2: Facilities & Events Modules - Context

**Gathered:** 2026-04-30
**Status:** Ready for planning

<domain>
## Phase Boundary

Build the primary user-facing features (Facility Booking, Event Calendar, RSVP system) and integrate the biometric scanner for secure access control/check-ins.

</domain>

<decisions>
## Implementation Decisions

### Facility Booking UX
- Fixed time slots (e.g., 1hr blocks)
- Strict limits at booking
- Calendar-based date picker + Slot grid
- Users can cancel anytime

### Biometric Check-in Flow
- User's own device (A "Scan to Enter" button on their digital pass)
- None for v1 (Location Verification)
- Full-screen green checkmark + Name + Facility
- Require active internet connection

### Event Calendar & RSVP
- Monthly grid with dots/highlights
- All events visible to everyone
- One-click RSVP
- Strict capacity limit

### the agent's Discretion

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- `BiometricScanner.tsx` from Phase 1
- Supabase client in `src/lib/supabase.ts`
- `auth/face` API pattern

### Established Patterns
- Client-side facial recognition via `@vladmandic/face-api` loaded from CDN
- Tailwind CSS styling

### Integration Points
- Dashboard routing for authenticated users

</code_context>

<specifics>
## Specific Ideas

No specific requirements — open to standard approaches

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>
