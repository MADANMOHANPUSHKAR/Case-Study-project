---
wave: 3
depends_on: []
files_modified:
  - "src/components/BiometricScanner.tsx"
autonomous: true
---

# Plan 3: Gap Closure (Fix Model Loading)

<tasks>

<task>
<description>Fix face-api models 404 Error</description>
<read_first>
- src/components/BiometricScanner.tsx
</read_first>
<action>
1. Open `src/components/BiometricScanner.tsx`.
2. Change the model loading URI from `"/models"` to `"https://cdn.jsdelivr.net/npm/@vladmandic/face-api/model/"`. This will load the weights directly from the CDN, eliminating the need to host them manually in the `public` directory.
3. Update `loadFromUri` calls to use this CDN URL for `ssdMobilenetv1`, `faceLandmark68Net`, and `faceRecognitionNet`.
</action>
<acceptance_criteria>
- The scanner component correctly loads models from the CDN.
- The 404 error no longer appears in the console.
</acceptance_criteria>
</task>

</tasks>

<must_haves>
- The face scanner successfully loads the models and the camera feed becomes active.
</must_haves>
