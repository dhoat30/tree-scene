# Website UI consistency

Before adding or redesigning pages, read [docs/layout-guidelines.md](docs/layout-guidelines.md) and follow the agreed layout, form and site-wide section conventions.

- Build new pages using the existing section layouts registered in `components/UI/Layout/Layout.jsx`, following other pages on the website.
- If a genuinely new layout is needed, implement it as a reusable shared section and register it in `Layout.jsx`. Do not create page-specific replacement layouts or styles for existing sections.
- Use the existing shared buttons. Improve their shared component or the MUI theme in `utils/themeSettings.js` so improvements apply consistently across the website; do not introduce page-specific button designs.
- Preserve the website’s existing colour palette and design tokens.
