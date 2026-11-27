---
"@quartz-community/reader-mode": patch
---

The reader mode button now toggles once per click after a page re-renders (for example after unlocking an encrypted page); previously each `render` event added another click listener, so a click could toggle twice and appear to do nothing.
