# Remove Pricing Section

## Goal
Remove the pricing/plans section from the site so it focuses purely on portfolio showcase and contact information.

## Changes

1. **Homepage (`src/pages/Index.tsx`)**
   - Remove the `PricingPlans` import.
   - Remove the `<PricingPlans />` component invocation and its comment wrapper.

2. **Contact page (`src/pages/Contact.tsx`)**
   - Remove the `PricingState` import from `@/components/PricingPlans`.
   - Remove the `pricing` prop from the location state type.
   - Remove the `useEffect` that pre-fills the contact form from pricing data.
   - Remove the "Pricing Summary" card rendered when `pricingData` exists.

3. **Component cleanup**
   - Delete `src/components/PricingPlans.tsx` since it will no longer be used anywhere.

## Verification
- Run a typecheck/build to confirm no broken imports or references remain.
- Confirm the homepage no longer renders the pricing section.
