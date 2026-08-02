# Design QA — Marketing 3.0 restoration

## Comparison setup

- Reference: authenticated source Target Dashboard at 1327 × 874.
- Implementation: local Target Dashboard at 1328 × 874, dark theme, administrator role, Chinese language.
- Mobile implementation: 390 × 844.
- Combined desktop comparisons: `work/qa-desktop-pass1.jpg` and `work/qa-desktop-pass2.jpg`.

## Pass 1 findings and fixes

1. **Sidebar density — medium:** The first implementation used a 224 px sidebar while the source used about 160–170 px at the same viewport. This reduced dashboard room and clipped the right side of the progress table. Fixed by reducing the fixed sidebar to 168 px while preserving its independent scrolling and collapse behavior.
2. **Budget remaining value — medium:** The secondary budget value wrapped `IDR` onto its own line. Fixed with a wider secondary value area, a smaller secondary metric size, and no wrapping.
3. **Source density — low:** The implementation intentionally keeps filter controls and result cards more compact, matching the user's explicit request to reduce whitespace while preserving the source hierarchy.

## Pass 2 verification

- **Typography:** Compact 8–13 px operational hierarchy remains readable; headings, metric values, table labels, and helper copy preserve the source's visual priority.
- **Spacing and layout:** Fixed sidebar, top breadcrumb bar, page tabs, filters, Publishing Progress, AI analysis, data table, Publishing Results, and breakdown follow the source content order. Cards use tight 4–5 px radii and restrained borders/shadows.
- **Colors and tokens:** Dark neutral surfaces, blue active states, green progress, amber budget pacing, red risk, and purple AI controls match the source semantics. Light theme was also verified.
- **Icons:** All visible controls use Lucide icons with a consistent stroke family; no emoji or handcrafted SVG substitutes are used.
- **Responsiveness:** Desktop and 390 px mobile layouts were checked. The mobile sidebar opens as a fixed overlay, filters become one column, metric cards stack, and wide operational tables remain horizontally scrollable rather than crushing fields.
- **States and interactions:** Expand/collapse menus, fixed sidebar, filters, add, edit, delete, CSV import, CSV export trigger, supervisor approval, language switch, theme switch, role-based menu visibility, mobile menu, AI analysis, tabs, and pagination were exercised. No browser console errors or warnings were present.
- **Coverage:** 35 menu pages resolve to implemented screens; 32 field-driven modules plus 3 specialized screens cover 269 editable fields and 325 visible columns across 7 roles.
- **Accessibility:** Form controls are labeled, dialogs support Escape, focus states are visible, status colors include text, buttons use semantic elements, and mobile controls retain practical hit areas.

final result: passed
