# Target Dashboard Overflow QA

## Source visual truth

- `C:\Users\GST\AppData\Local\Temp\codex-clipboard-e391842d-b0d7-458d-a0ae-1dc03a79c2fd.png`
- Source pixels: 2492 × 1415
- Requested correction: the Publishing Progress table must not extend beyond the main panel or into the gap before the Analysis panel.

## Implementation evidence

- Browser-rendered screenshot: `design-qa-wide-v21.jpg`
- Side-by-side full and focused comparison: `design-qa-comparison-v21.jpg`
- Implementation screenshot pixels: 1946 × 1131
- Browser CSS viewport override: 2048 × 1139
- State: Chinese, light theme, Dashboard route, Product dimension, rows collapsed

## Findings

- No actionable P0/P1/P2 differences remain in the annotated area.
- The table wrapper now ends 18.67 px before the main panel's right edge.
- The pace pill and progress bar remain inside the wrapper and main panel.
- The table no longer occupies the inter-panel gap or sits beneath the Analysis panel.

## Fidelity surfaces

- Fonts and typography: unchanged from the approved product design; no new wrapping or truncation was introduced.
- Spacing and layout rhythm: corrected the wrapper sizing while retaining the existing 18 px horizontal inset and main/Analysis column proportions.
- Colors and tokens: unchanged.
- Image quality and assets: not applicable; no visual assets were changed.
- Copy and content: unchanged.

## Interaction and runtime checks

- Publishing Progress tabs and row disclosure controls remain present.
- Wide-screen layout checked at the user's annotated viewport scale.
- Browser console warnings/errors: none.

## Comparison history

1. The inherited `width: 100%` combined with 18 px horizontal margins made the table wrapper wider than its parent, so the panel's overflow clipping cut into the last column.
2. Overrode the wrapper to `width: auto` with `max-width: calc(100% - 36px)` while retaining the 18 px margins.
3. Rebuilt and recaptured the wide-screen state. The wrapper and all final-column content now remain inside the panel with an 18.67 px right inset.

## Final result

final result: passed
