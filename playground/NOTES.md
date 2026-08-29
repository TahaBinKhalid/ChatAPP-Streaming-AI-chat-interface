# Notes: Hand-Built ARIA Components vs. shadcn/ui

## Concrete Gaps Identified

1. **Primitive Portals & Z-Index Management (Radix UI / shadcn Dialog):**
   * *What I built:* A standard relative/fixed React conditional render wrapper that sits inside the current DOM tree.
   * *What shadcn handled:* Automatically injects dialog elements into a React Portal (`Radix Dialog.Portal`) attached to the document body, preventing clipping from parent CSS `overflow: hidden`, `z-index`, or `transform` stacking contexts.

2. **Pointer Events & Body Scroll Locking:**
   * *What I built:* Only managed manual focus traps via event listeners and `Escape` key checks. Background content remained scrollable unless custom CSS overflow locks were manually applied.
   * *What shadcn handled:* Integrates automated body scroll locking (`aria-hidden` applied to background content pointers and `pointer-events: none` on body) to prevent background scrolling and screen-reader leakage while a modal is open.