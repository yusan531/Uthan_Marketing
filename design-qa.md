# Post Plan Schedule Chart Design QA

## Source visual truth

- Source: `/Users/thanu/Downloads/20260902-175727.jpeg`
- Reference: dark-theme stacked column charts with period labels, stacked counts, and a legend.

## Implementation evidence

- Screenshot: `.playwright-cli/post-plan-day-full.png`
- Focus crop used for comparison: `.playwright-cli/post-plan-month-focus.png`
- Viewport: 1280 x 874 CSS pixels; full-page capture is 1280 x 3136 pixels.
- Source pixels: 1055 x 483. The focused implementation region was compared as a chart-region crop; no density normalization was required for the browser viewport capture.
- State: Dashboard3.1, Post Plan, dark theme, Creator Tier tab, Day period.

## Comparison

The implementation preserves the existing Marketing 3.0 shell and embeds the reference visual language in the Post Plan module. Month renders seven stacked columns and Week renders sixteen columns, with the active month/week highlighted and two linked breakdown views: the upper-tab dimension plus a product view (or Product · Tier when Product is already selected). Day is restored to a monthly calendar grid with four status labels: Published, Pending, Overdue, and Published late; delayed completions use a red dot on a green entry.

The reference image is a standalone two-chart composition while the implementation is intentionally integrated into the existing dashboard panel. This is an expected product-layout difference, not a fidelity defect.

## Primary interactions tested

- Month: two linked charts, each with exactly 7 period columns and one current-period highlight; each legend has only Planned, Overdue, and Completed.
- Week: two linked charts, each with exactly 16 period columns and one current-week highlight; each legend has only Planned, Overdue, and Completed.
- Day: monthly calendar grid replaces the previous date list and exposes all four status labels.
- Product to Creator Tier: the primary chart follows the selected tab and the secondary chart switches from Product · Tier to Product as the selected tab changes.
- Row checkbox: deselecting a product removes its dimension chip and entries from the schedule data.
- Status rendering: Day entries use planned, overdue, completed, and overdue-completed classes; Month/Week fold delayed completions into Completed and hide the fourth legend item.
- Build: `npm run build` passed.

## Required fidelity surfaces

- Fonts and typography: uses the existing Marketing 3.0 Geist tokens and compact dashboard hierarchy.
- Spacing and layout rhythm: chart is contained within the existing panel, with a scroll-safe 16-week axis and consistent bar baseline.
- Colors and visual tokens: status colors map to existing primary, success, and danger dashboard tokens; current period uses the existing primary soft token.
- Image quality and asset fidelity: no image asset is required by the reference; existing icon library and native DOM chart elements are used.
- Copy and content: Month/Week/Day, This month/This week/Today, dimension, and four status labels are exposed in the active language.

## Findings

- No actionable P0/P1/P2 findings remain.

## Comparison history

- Initial pass: replaced Month/Week calendar grids with status-stacked columns, added period markers and dimension chips.
- Post-fix pass: restored Day as a monthly calendar grid, added four status labels/colors, and added the linked secondary schedule view; no actionable P0/P1/P2 differences remained.

final result: passed
