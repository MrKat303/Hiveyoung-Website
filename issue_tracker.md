# Issue Tracker - HiveYoung Latest Audit

| ID | Severity | Category | File | Line | Description | Status |
| --- | --- | --- | --- | --- | --- | --- |
| SEC-001 | HIGH | Security/UX | `utils/validation.ts` | 4 | Overly restrictive email regex | Open |
| ARCH-001 | HIGH | Architecture | `app/(app)/contacts/page.tsx` | 1 | Monolithic component (597 LOC) | Open |
| BP-001 | HIGH | Best Practice | `app/(app)/_components/Profile/ProfileEditModal.tsx` | 30 | Anti-pattern: Syncing props to state via useEffect | Open |
| ACC-001 | MEDIUM | Accessibility | `components/ui/Accordion.tsx` | 24 | Missing ARIA roles and keyboard support | Open |
| PERF-001 | MEDIUM | Performance | `app/congreso/page.tsx` | 10-23 | Excessive CSS file imports (14 files) | Open |
| PERF-002 | MEDIUM | Performance | `app/(app)/_components/Profile/ProfileEditModal.tsx` | 36 | Missing AbortController in location fetch | Open |
| BP-002 | MEDIUM | Best Practice | `app/(app)/_components/Shared/Topbar.tsx` | 100 | Use of <img> instead of Next.js <Image> | Open |
| BP-003 | MEDIUM | Best Practice | `app/(app)/contacts/page.tsx` | 215 | Use of <img> instead of Next.js <Image> | Open |
| ACC-002 | MEDIUM | Accessibility | `app/(app)/_components/Shared/Topbar.tsx` | 80 | Search results lack keyboard navigation and ARIA roles | Open |
| CODE-001 | LOW | Maintainability | `app/(app)/_utils/skillUtils.ts` | 46 | Normalization breaks acronyms | Open |
| CODE-002 | LOW | Maintainability | `app/login/page.tsx` | 21 | Hardcoded countdown date | Open |
| DRY-001 | LOW | Maintainability | `app/(app)/contacts/page.tsx` | 250, 310 | Duplicated dropdown logic | Open |
| TYPE-001 | LOW | Typing | Multiple | - | Extensive use of 'any' in function params | Open |
| LINT-001 | HIGH | Linting | Multiple | - | 19 ESLint errors found (react-hooks/set-state-in-effect, etc.) | Open |
