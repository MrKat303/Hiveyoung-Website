# Quick Wins - HiveYoung Latest

High-impact, low-effort fixes that can be implemented immediately.

| Fix | Description | Effort | Impact |
| --- | --- | --- | --- |
| **Fix Email Validation** | Update the regex in `utils/validation.ts` to be more permissive. | 5 mins | HIGH |
| **Add AbortController** | Prevent race conditions in location search in `ProfileEditModal.tsx`. | 10 mins | MEDIUM |
| **Add Key Prop to Modals** | Replace `useEffect` sync with a `key` prop on `ProfileEditModal` in `ProfilePage.tsx`. | 15 mins | HIGH |
| **Basic ARIA for Accordion** | Add `role="button"` and `aria-expanded` to `Accordion.tsx`. | 10 mins | MEDIUM |
| **Acronym Whitelist** | Update `skillUtils.ts` to skip normalization for common acronyms like AWS, UI, UX. | 15 mins | LOW |
| **Replace <img> with <Image>** | Update Topbar and Contacts page to use optimized Next.js Image component. | 20 mins | MEDIUM |

## Implementation Examples

### Fix Email Validation (`utils/validation.ts`)
```typescript
export const isValidEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};
```

### AbortController (`ProfileEditModal.tsx`)
```typescript
  useEffect(() => {
    if (locationQuery.length < 3) {
      setLocationSuggestions([]);
      return;
    }

    const controller = new AbortController();
    const fetchLocations = async () => {
      try {
        const response = await fetch(
          `https://photon.komoot.io/api/?q=${encodeURIComponent(locationQuery)}&limit=5`,
          { signal: controller.signal }
        );
        // ... rest of logic
      } catch (err) {
        if (err.name === 'AbortError') return;
        console.error('Error fetching locations:', err);
      }
    };
    // ...
    return () => controller.abort();
  }, [locationQuery]);
```
