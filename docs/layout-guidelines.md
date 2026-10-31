# Page and layout guidelines

These are the agreed conventions for adding and updating Treescene pages. Follow them alongside the repository's `AGENTS.md`.

## Start with the existing layout system

Build pages from the shared sections registered in [`components/UI/Layout/Layout.jsx`](../components/UI/Layout/Layout.jsx). Pages supply content and configuration; shared components own layout, spacing, typography and responsive behaviour.

Before creating a section, check whether an existing one fits. If the content needs a genuinely different layout, create a reusable section under `components/UI/Layout/Sections/` and register its `acf_fc_layout` key in `Layout.jsx`. Do not recreate an existing layout in page-specific JSX or CSS.

Improve existing shared components globally when the improvement should apply throughout the site. The shelterbelt page is an example of a locally authored service page that uses the same section schemas as CMS-authored pages.

## Which section to use

| Content | Layout key | Agreed treatment |
| --- | --- | --- |
| Centred hero with an image or video below | `hero_section`, `layout: 'rows'` | Centred location label, balanced heading, readable text width, shared CTAs and quieter trust text. Buttons stack on mobile. |
| Hero with copy and media side by side | `hero_section`, `layout: 'columns'` | Reuse the existing column hero when that composition fits. |
| Service choices or scope of work | `services` | Introduction with the quote CTA alongside it, followed by balanced service cards. The CTA does not occupy a service-card column. |
| Detailed equipment or service benefits | `benefits_grid` | Heading and introduction above two equal columns; one column on mobile. Green icons, smaller card headings, clear paragraph spacing and an optional shared CTA below. |
| Short checklist points | `service_checklist` | Retain this for shorter content. Do not squeeze eight detailed benefits beside an oversized heading. |
| Image with supporting explanation | `row` | Existing alternating image/copy layout and shared CTA. |
| Steps in the customer journey | `new_process` | Existing shared process section. |
| Company-wide reasons to choose Treescene | `usp` | Use the shared USP component, CMS content and statistics. Clear introduction/statistics above a balanced card grid. |
| Questions and answers | `local_faq` | Shared FAQ section and accordion: balanced introduction, rounded cards, green plus/minus controls, clear expanded/focus states and mobile spacing. |
| Service coverage | `areas_covered` | Reusable grouped location lists using the shared coverage data. See the site-wide placement rule below. |
| Dedicated quote-page introduction and form | `quote_request` | Shared reference-based quote layout described below. |
| Closing call to action | `cta_section` | Existing shared CTA section and button. |

Other existing layouts, including testimonials, project galleries, tabs and jobs maps, remain available in `Layout.jsx`. This table is a selection guide, not a requirement to put every section on every page.

### Detailed benefits example

```js
{
  acf_fc_layout: 'benefits_grid',
  title: 'Why choose our specialist equipment?',
  description: 'A short introduction to the benefits.',
  items: [
    { title: 'Controlled handling', description: '<p>Benefit explanation.</p>' },
    { title: 'Flexible access', description: '<p>Benefit explanation.</p>' },
  ],
  cta_group: {
    cta: { title: 'Request a free quote', url: '/get-a-quote' },
  },
}
```

Keep meaningful client-supplied benefits and operating limitations. Improve presentation without silently dropping information; remove repetition where the same explanation already appears elsewhere.

## Shared design and controls

- Preserve the existing green, sage and warm off-white palette. Use `app/tokens.css` and the shared MUI theme in `utils/themeSettings.js`.
- Use the existing Work Sans typography, readable line lengths and responsive heading sizes.
- Use shared MUI buttons and their existing variants. Improve the shared theme/component when a button needs refinement; do not invent a page-specific button design.
- Use `Button` with `component={Link}` for linked buttons. Avoid nesting a button inside an anchor.
- Regular text inputs and Google address autocomplete share [`StyledTextField`](../components/UI/Forms/InputFields/StyledTextField.jsx). Keep label and input typography consistent; the agreed weight is 350.
- Reuse `GoogleMapsLoader` and `GoogleAutocomplete` for address suggestions. Keep optional address fields optional and retain manual entry while autocomplete is unavailable or loading.

## FAQ links

FAQ answers remain text. To add a supporting link, use the shared optional `link` field rather than introducing page-specific accordion markup or rendering arbitrary answer HTML:

```js
{
  question: 'How much does tree removal cost?',
  answer: 'The quote depends on the size, condition and access.',
  link: {
    title: 'Read our tree removal cost guide',
    url: '/tree-removal-cost-tauranga',
  },
}
```

The accordion handles the link styling. Keep FAQ structured data aligned with the visible questions and answers.

## Dedicated quote pages

The approved reference uses service copy on the left and a prominent form on the right. Adapt it to Treescene's colours, wording and verified claims; do not copy the cleaning company's phone number, insurance, certifications or promises.

Use these shared sources:

- [`utils/serviceQuotePages.js`](../utils/serviceQuotePages.js): per-service copy, benefits, process steps, photograph, FAQ and form attribution.
- [`ServiceQuotePage`](../components/Pages/ServiceQuotePage/ServiceQuotePage.jsx): page shell, metadata helper, structured data, shared sections and footer.
- [`QuoteRequest`](../components/UI/Layout/Sections/QuoteRequest/QuoteRequest.jsx): registered as `quote_request` in `Layout.jsx`.
- [`ServiceQuoteForm`](../components/UI/Forms/ServiceQuoteForm.jsx): shared form behaviour and presentation.
- [`utils/serviceQuoteSubmission.js`](../utils/serviceQuoteSubmission.js): enquiry payload and delivery-result handling.

The layout includes four benefit cards, a simple three-step process, a real equipment/project photo and the quote form. On mobile, the form follows the introduction before the supporting benefit/process content.

Require first name, last name, email and phone. Address and message are optional. Reuse address autocomplete. Use the existing submission endpoints and thank-you route, with service-specific form names, CRM values and analytics events. An upstream error returned inside HTTP 200 must not count as successful delivery.

Existing routes:

- `/tree-removal-quote`
- `/hedge-shelterbelt-trimming-quote`

Add future quote services through the shared configuration and page wrapper rather than copying the layout or submission logic. Match CRM service values to the existing integration.

## Areas Covered: include once on every page

[`utils/serviceAreas.js`](../utils/serviceAreas.js) is the shared source for location groups, the coverage summary and service-area metadata. It includes Tauranga suburbs and surrounding communities extending to Waihi, Matamata, Paengaroa, Maketu and Okere Falls.

`SiteAreasCovered` is the configured site-wide instance of the reusable Areas Covered layout:

- The shared `Footer` renders it above the footer.
- Standalone pages without that footer, including confirmation and 404 pages, include it explicitly.
- Do not also add an `areas_covered` section to a page that already receives `SiteAreasCovered` through its footer.
- When adding a new page, verify there is exactly one coverage section.

## Footer and branding

Use the shared footer rather than copying its markup. Its agreed design includes a brand/newsletter row, two-column service links, information links, a compact contact/social card and a simpler copyright bar. The main footer uses the sage `--light-surface-variant` token, with a dark green copyright bar.

Preserve CMS contact details, certifications, social links, newsletter behaviour and existing navigation links. The white-backed logo currently blends into light surfaces through a shared `mix-blend-mode: multiply` rule in `app/globals.scss`; the original image itself has not been made transparent.

## Images and video

Use real Treescene project/equipment assets where available, with accurate alt text and captions. Use clearly identified placeholders where suitable images are missing. Do not invent project results or testimonials.

Service-card images normally come from the CMS service's hero image, falling back to its before/after **after image**. Locally authored services and quote pages supply their image paths in their content/configuration files.

For the video gallery:

- React Player v3 uses `src`, not the old `url` property.
- Show a thumbnail and play control first; load/play the full video after interaction.
- Keep the explicit player wrapper and 16:9 gallery-card sizing so previews do not collapse into strips or leave large gaps.

## Before handing over a new page

Check the appropriate shared layout, metadata/canonical URL, service-specific CTAs and enquiry attribution, image text and mobile behaviour. Confirm the site-wide sections appear once.

Run checks appropriate to the change. For quote-form changes, the existing regression checks are:

```bash
node --test tests/serviceQuoteSubmission.test.mjs
```

Use mocked requests for submission testing; do not create real test enquiries, send emails or fire live conversion events. Run the production build for structural/integration changes and visually inspect desktop/mobile when browser tools are available. Report any verification limit accurately. Documentation-only changes do not require an application build.

Adding a renderer in `Layout.jsx` makes it available to locally configured pages. If it also needs to be selectable by WordPress editors, the corresponding CMS flexible-content fields must be configured separately; frontend registration alone does not add CMS editing controls.
