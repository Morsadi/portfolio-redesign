# AGENTS.md

## Project overview

This repository contains Badr Morsadi’s personal portfolio website.

The application is built with:

- Next.js App Router
- React
- TypeScript
- CSS Modules
- Contentful as the headless CMS
- Font Awesome
- Glide.js
- Vercel Analytics

The primary purpose of the site is to present portfolio projects, professional experience, technical skills, and personal branding in a polished, accessible, and performant interface.

## Preferred skills

When relevant, use these installed skills automatically:

- `vercel-react-best-practices` for React and Next.js performance, rendering, data fetching, bundle optimization, and refactoring.
- `vercel-composition-patterns` for component architecture, reusable APIs, compound components, context providers, and avoiding excessive boolean props.
- `web-design-guidelines` for accessibility, responsive design, interaction quality, visual usability, and UI audits.
- `next-dev-loop` for Next.js development, debugging, browser verification, and validation workflows.
- `context7-mcp` when current framework or library documentation is needed.

Apply a skill whenever its scope clearly matches the task.

This repository’s instructions are the source of truth. If generic skill guidance conflicts with this file or with established repository conventions, follow this file and the existing codebase.

## General working principles

Before making changes:

1. Read the relevant files and understand the current implementation.
2. Inspect nearby components, styles, types, and utilities before introducing a new pattern.
3. Preserve the existing architecture unless the task explicitly requires changing it.
4. Prefer focused changes over broad rewrites.
5. Do not change unrelated files.
6. Do not add dependencies unless the existing stack cannot reasonably solve the problem.
7. Explain meaningful architectural tradeoffs in the final response.

Do not claim that a command, test, build, or validation passed unless it was actually run successfully.

## Repository structure

Follow the existing responsibilities of the repository:

- `app/` contains App Router routes, layouts, metadata, loading states, and route-level composition.
- `components/` contains reusable presentation and layout components.
- `lib/contentful/` contains server-only Contentful clients and queries.
- `types/` contains shared TypeScript and CMS types.
- `styles/` contains global styles, tokens, resets, and shared styling utilities.
- Component-specific styles belong in colocated `.module.css` files.
- `public/` contains static assets.

Before creating a new directory or abstraction, confirm that an existing location does not already serve that responsibility.

## Next.js guidelines

Use Next.js App Router conventions.

### Server and Client Components

- Prefer Server Components by default.
- Add `'use client'` only when the component requires browser APIs, event handlers, local interactive state, effects, or client-only libraries.
- Keep client boundaries as small as practical.
- Do not convert an entire route or large component tree into Client Components merely to support one interactive element.
- Do not import server-only Contentful utilities into Client Components.
- Keep secrets, CMS clients, and privileged data access on the server.

### Data fetching

- Fetch Contentful data through the existing utilities in `lib/contentful/`.
- Do not create Contentful clients inside React components.
- Reuse existing queries before creating new ones.
- Keep Contentful query functions server-only.
- Return explicit typed values from CMS query functions.
- Gracefully handle missing entries and optional CMS fields.
- Use `notFound()` when a requested route-level Contentful entry does not exist and a 404 is the intended behavior.
- Avoid duplicate fetching within the same request.
- Be deliberate when introducing caching or revalidation behavior.

### Metadata and SEO

- Use the Next.js Metadata API.
- Preserve the existing metadata title template and site identity.
- Generate route-specific metadata from Contentful when applicable.
- Provide meaningful page titles and descriptions.
- Keep Open Graph and social metadata accurate.
- Provide descriptive image alternative text.
- Do not introduce conflicting hard-coded canonical domains.

### Routing

- Follow App Router file conventions.
- Use `next/link` for internal navigation.
- Use `next/image` for appropriate local or supported remote images unless there is a specific reason not to.
- Do not use client-side routing logic when a normal server route or link is sufficient.
- Add loading and error states when a route can meaningfully benefit from them.

## React guidelines

- Keep components focused on one clear responsibility.
- Prefer composition over components with many boolean props.
- Avoid deeply nested conditional rendering.
- Extract reusable behavior only after a genuine repeated pattern exists.
- Do not add state for values that can be derived during rendering.
- Avoid `useEffect` for derived state or synchronization that can be calculated directly.
- Use effects only for synchronization with external systems.
- Keep state as close as possible to the component that owns it.
- Preserve server rendering whenever possible.
- Avoid premature use of `useMemo`, `useCallback`, and `React.memo`.
- Add memoization only when there is a demonstrated or highly plausible performance benefit.
- Use stable, meaningful keys for rendered collections.
- Never use array indexes as keys when entries can be reordered, inserted, or removed.
- Handle empty, loading, error, and success states where applicable.
- Do not suppress hydration warnings unless the mismatch is understood and unavoidable.

## TypeScript guidelines

TypeScript strict mode must remain enabled.

- Do not introduce `any`.
- Prefer `unknown` for untrusted values and narrow it safely.
- Do not use `@ts-ignore`.
- Avoid `@ts-expect-error` unless the reason is documented and genuinely necessary.
- Avoid unsafe type assertions.
- Prefer interfaces or type aliases that describe the actual domain.
- Reuse types from `types/` rather than duplicating CMS or component models.
- Model optional Contentful fields explicitly.
- Use discriminated unions for mutually exclusive states.
- Use `import type` for type-only imports.
- Keep component props explicit and narrowly scoped.
- Do not weaken existing types merely to silence compiler errors.
- Validate external data at runtime when TypeScript alone cannot guarantee its shape.

## Contentful guidelines

Contentful is the source of portfolio content.

- Use the existing server-only client from `lib/contentful/client.ts`.
- Never expose `CONTENTFUL_SPACE_ID` or `CONTENTFUL_DELIVERY_TOKEN` to client-side code.
- Never rename environment variables without updating deployment configuration and documentation.
- Preserve the existing Contentful content model unless a task explicitly requires changing it.
- Keep entry-field types synchronized with the CMS model.
- Treat linked entries and assets as potentially missing.
- Avoid deeply coupling presentational components to raw Contentful response structures.
- Normalize CMS data in the data layer when transformations become non-trivial.
- Use reasonable `include` depths and avoid fetching unnecessary linked content.
- Do not log access tokens or complete CMS responses containing sensitive information.

Required server environment variables:

```text
CONTENTFUL_SPACE_ID
CONTENTFUL_DELIVERY_TOKEN
```

## CSS and visual design

The project uses CSS Modules and shared global styles.

- Keep component-specific styles in `.module.css` files.
- Do not introduce Tailwind, styled-components, Emotion, or another styling system unless explicitly requested.
- Reuse existing CSS variables, spacing, typography, colors, breakpoints, and shared classes.
- Avoid hard-coded values when an existing design token is appropriate.
- Preserve the site’s established visual identity.
- Do not redesign unrelated sections while implementing a focused feature.
- Ensure layouts work at mobile, tablet, and desktop widths.
- Avoid horizontal page overflow.
- Use fluid sizing where appropriate.
- Respect `prefers-reduced-motion`.
- Keep animations purposeful and lightweight.
- Avoid excessive transitions or scroll effects.
- Prevent layout shift by reserving space for images and dynamic content.
- Maintain sufficient color contrast.
- Keep visible focus states.

When adjusting a component, inspect its colocated CSS Module before adding new global rules.

## Accessibility

Accessibility is a release requirement.

- Use semantic HTML before adding ARIA.
- Preserve a logical heading hierarchy.
- Use landmarks such as `header`, `nav`, `main`, `section`, and `footer` appropriately.
- Every interactive element must be keyboard accessible.
- Use native `button` and `a` elements instead of clickable `div` or `span` elements.
- Provide visible keyboard focus.
- Give controls meaningful accessible names.
- Associate form labels and errors with their fields.
- Provide descriptive alternative text for meaningful images.
- Use empty alternative text for decorative images.
- Do not duplicate visible text unnecessarily in ARIA labels.
- Do not add ARIA roles that duplicate native semantics.
- Ensure dialogs and menus manage focus correctly.
- Do not rely on color alone to communicate meaning.
- Respect reduced-motion preferences.
- Ensure touch targets are comfortably usable.
- Test important interactions using keyboard-only navigation.

## Performance

Protect Core Web Vitals and minimize unnecessary client-side JavaScript.

- Prefer Server Components.
- Avoid unnecessary Client Components.
- Avoid sequential data-fetching waterfalls.
- Fetch independent data concurrently.
- Keep third-party libraries out of the client bundle unless necessary.
- Dynamically load heavy interactive features when appropriate.
- Optimize images and provide explicit dimensions.
- Avoid shipping entire icon libraries when only a few icons are needed.
- Reuse the existing Font Awesome setup.
- Avoid large dependencies for small utilities.
- Prevent unnecessary rerenders.
- Do not place expensive calculations directly in frequently rendered client components.
- Avoid unnecessary animations on initial page load.
- Preserve Vercel Analytics unless explicitly asked to remove it.

## Security

- Keep Contentful credentials server-only.
- Never commit `.env` files, access tokens, private keys, or secrets.
- Do not expose private environment variables with a `NEXT_PUBLIC_` prefix.
- Treat CMS content and URL parameters as untrusted input.
- Avoid `dangerouslySetInnerHTML`.
- When raw HTML is unavoidable, sanitize it with a well-established approach and document why it is necessary.
- Validate dynamic URLs before using them in redirects or external links.
- Add `rel="noopener noreferrer"` when appropriate for links opening new tabs.
- Do not log secrets or sensitive environment values.
- Do not add analytics, trackers, cookies, or external scripts without explicit approval.
- Keep dependency additions minimal and review their maintenance and security posture.
- Do not weaken lint, type, browser, or framework security checks to make a change pass.

## Content and copy

- Preserve the author’s voice and professional positioning.
- Keep copy clear, concise, and credible.
- Avoid exaggerated marketing language and generic AI-sounding phrases.
- Do not invent projects, employers, skills, metrics, testimonials, or accomplishments.
- Prefer editing portfolio content through Contentful when that content is CMS-managed.
- Preserve proper names, links, dates, and technical terminology.
- Use sentence case for interface text unless the existing design intentionally uses another convention.

## Dependencies

Before installing a package:

1. Check whether the functionality already exists in the repository or platform.
2. Prefer built-in React, Next.js, browser, or CSS capabilities.
3. Evaluate bundle-size and client-runtime impact.
4. Prefer actively maintained packages with TypeScript support.
5. Avoid adding overlapping libraries.
6. Explain why the dependency is necessary.

Do not update unrelated dependencies during a feature or bug-fix task.

## Validation

After changing TypeScript, React, CSS, Contentful integration, routing, or configuration, run the relevant checks.

Minimum checks:

```bash
npm run lint
npx tsc --noEmit
```

For changes affecting rendering, routes, metadata, configuration, CMS integration, or production behavior, also run:

```bash
npm run build
```

For interactive or visual changes:

1. Run the application with `npm run dev`.
2. Inspect the affected page in a browser.
3. Test desktop and mobile viewport widths.
4. Test keyboard navigation.
5. Check the browser console for errors and warnings.
6. Confirm there is no obvious layout shift or horizontal overflow.
7. Verify loading, missing-content, and error behavior when relevant.

If a required environment variable prevents a build or runtime validation, report the missing requirement clearly. Do not fabricate a successful result.

## Testing policy

The repository does not currently define an automated test command.

- Do not claim automated tests passed.
- Do not introduce a testing framework as part of an unrelated task.
- For bug fixes, describe an appropriate regression test if no test setup exists.
- When introducing substantial interactive behavior, consider whether adding Vitest, React Testing Library, or Playwright is justified.
- Adding a test framework requires explicit scope and should include configuration, example tests, scripts, and documentation.

When automated tests are later introduced:

- Test observable user behavior rather than implementation details.
- Prefer accessible queries by role, label, and text.
- Avoid large snapshot tests.
- Add regression coverage for reproducible bugs.
- Keep tests deterministic.
- Never remove or weaken tests merely to make CI pass.

## Git and change discipline

- Keep changes scoped to the requested task.
- Do not reformat unrelated files.
- Do not rename public APIs or Contentful fields without a clear migration reason.
- Preserve existing naming and formatting conventions.
- Review the diff before finishing.
- Call out generated files or lockfile changes.
- Do not commit secrets or local environment files.
- Do not force-push, rewrite history, or delete branches unless explicitly requested.
- Do not create commits or pull requests unless explicitly requested.

## Completion checklist

Before finishing, confirm:

- The requested behavior is implemented.
- Existing architecture and styling conventions are preserved.
- Server and Client Component boundaries are appropriate.
- Contentful credentials remain server-only.
- TypeScript remains strict and no unsafe types were introduced.
- Accessibility was considered.
- Responsive behavior was checked when relevant.
- Linting was run.
- Type checking was run.
- Production build was run when relevant.
- Browser behavior was checked for visual or interactive changes.
- No unrelated files were changed.
- No secrets or sensitive data were added.
- The final response accurately lists what changed and what validation was performed.
