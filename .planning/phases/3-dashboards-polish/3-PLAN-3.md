---
wave: 3
depends_on:
  - "3-PLAN-1"
files_modified:
  - "src/app/login/page.tsx"
  - "src/app/layout.tsx"
  - "public/manifest.json"
autonomous: true
---

# Plan 3: PWA & Polish

<tasks>

<task>
<description>Setup PWA and finish Polish</description>
<read_first>
- .planning/phases/3-dashboards-polish/3-CONTEXT.md
</read_first>
<action>
1. Create a simple `public/manifest.json` for PWA installability.
2. Link the manifest in `src/app/layout.tsx`.
3. Update `src/app/login/page.tsx` to redirect to `/dashboard` upon successful face match instead of staying on the login page.
4. Add clear error messages to `BiometricScanner.tsx` if camera is blocked (already handled by default, but verify UI matches Dark Mode preference for scanner).
</action>
<acceptance_criteria>
- The app is installable as a PWA.
- Face login correctly redirects to the User Dashboard.
</acceptance_criteria>
</task>

</tasks>

<must_haves>
- Manifest file is valid JSON.
</must_haves>
