# Design QA — Reviews Edit Drawer

- Source visual truth: `C:/Users/GST/AppData/Local/Temp/codex-clipboard-1abd077d-0379-4a60-a135-cb7db54cc2af.png`
- Implementation capture: `C:/Users/GST/Documents/Codex/2026-08-24/referenced-chatgpt-conversation-this-is-an/work/marketing-system/reviews-edit-implementation-light.png`
- Source pixels: 2560 × 1399 (reference supplied at desktop density)
- Implementation pixels / CSS viewport: 1280 × 720 at device scale 1
- State: Reviews → first record → Edit, drawer scrolled to the Spark Code / Payments / Creator Library region
- Normalization: compared the same lower-form region; the implementation remains a 75%-width right drawer by explicit user instruction, while the reference uses a centered panel.

## Full-view comparison evidence

The implementation preserves the requested right-side drawer and matches the reference's dense three-column form rhythm, fixed header/footer, internal scrolling, white/neutral control treatment, and section hierarchy. Drawer geometry is 960px of a 1280px viewport (75%).

## Focused region comparison evidence

The lower edit-only region now contains the same content structure as the reference: Has Spark Code, Expiry Date, Expired status, Spark Code, Notes, Spark Ads Status, Ad Date, Ads KOL Strategist, Payments with Add action and linked-payment table, and Creator Library with Price warning. The Spark Ads options are None, Done, CodeDeleted, Expired, and Code Incorrect.

## Findings and comparison history

- Earlier P1: edit-only Payments and Creator Library regions were absent. Fixed by adding both sections and the linked payment row.
- Earlier P1: Spark Ads Status used generic workflow values. Fixed with the five real-system values from the reference.
- Earlier P2: Expired status was absent. Fixed with the inline Normal status next to Expiry Date.
- Earlier P2: Ads owner label and edit title differed. Fixed to Ads KOL Strategist and Edit Post.
- Post-fix evidence: browser-rendered capture above; DOM verified all fields, options, table columns, footer controls, internal scroll, and 75% drawer geometry.

## Required fidelity surfaces

- Fonts and typography: hierarchy and weights match the existing Marketing system; no new font drift introduced.
- Spacing and layout rhythm: three-column lower rows, wide code/notes fields, section spacing, table density, fixed footer, and internal scroll verified.
- Colors and tokens: reused the project's existing theme tokens and semantic blue/red states.
- Image quality and assets: no reference-specific raster assets are required in this focused region; the existing Indonesian flag asset remains intact.
- Copy and content: reference labels, Spark Ads options, Payments table headings, Creator Library, and Price warning are present.

## Interaction checks

- Reviews Edit opens from a row action.
- Drawer width and internal scroll work.
- Spark Ads Status is selectable with the correct option set.
- Linked Payment ID control and Add button render.
- Confirm and Cancel remain visible in the fixed footer.
- Browser console errors checked: none.

## Follow-up polish

The real reference is a centered panel, while this implementation intentionally stays a right drawer because that superseding requirement was explicit.

final result: passed
