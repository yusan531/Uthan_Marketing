# Dashboard3.1 Design QA

## Source visual truth

- Browser comments and supplied Dashboard3.1 screenshots are the acceptance reference.
- Scope: September demo data, Post Plan summary, linked row selection, and the two Schedule charts.
- Existing Marketing 3.0 shell, compact density, bilingual/theme controls, and fixed sidebar are preserved.

## Visual verification

- Viewport: 1280 x 720 CSS pixels in the in-app browser.
- Default month is `2026-09`; the selector also retains August, July, and June.
- Post summary renders `98 / 124 / 160` without crossing its divider or colliding with the GAP value.
- The first Schedule chart stacks Planned, Overdue, and Completed.
- The second Schedule chart stacks the active breakdown field. Product shows product names; switching to Creator Tier shows S, A, B, and C with no status legend.
- Expanded child rows align with the parent table and each child has its own checkbox.
- The left navigation remains visible while the dashboard content scrolls.

## Functional verification

- September seed totals: Post 98, Plan 124, Target 160.
- Child selection: a child can be unchecked independently; parent and header enter the indeterminate state.
- Parent selection: checking selects every child and unchecking clears every child.
- Restoring all rows returns the summary to `98 / 124 / 160` and updates both Schedule charts.
- Changing the breakdown tab immediately changes the second chart's stacks and legend.
- Production build: `npm run build` passed.

## Findings

- No actionable visual or interaction findings remain in the requested scope.
- The repository's pre-existing untracked starter test expects a removed `_sites-preview/SkeletonPreview.tsx` and development-only preview metadata; it does not test Dashboard3.1 and remains outside this change.

final result: passed
