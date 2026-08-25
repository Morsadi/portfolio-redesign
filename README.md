# Badr Morsadi Portfolio

[![CI](https://github.com/Morsadi/portfolio-redesign/actions/workflows/ci.yml/badge.svg)](https://github.com/Morsadi/portfolio-redesign/actions/workflows/ci.yml)

A content-driven portfolio built with Next.js, TypeScript, and Contentful, showcasing selected projects, professional experience, and technical work.

[View live site](https://www.badrmorsadi.com)

## Features

* Contentful-managed projects, page sections, assets, and metadata
* Dynamic project pages and tag-based project filtering
* Responsive layouts with CSS Modules and Next.js image optimization
* Accessible keyboard, focus, clipboard, and status interactions
* Project galleries powered by Glide.js
* Automated unit, integration, accessibility, and end-to-end testing
* Vercel Analytics

## Tech Stack

* **Frontend:** Next.js 16, React 19, TypeScript
* **CMS:** Contentful Delivery API
* **Styling:** CSS Modules
* **UI:** Font Awesome, Glide.js
* **Testing:** Jest, React Testing Library, user-event, jest-axe, Playwright, Axe
* **CI:** GitHub Actions

## Project Structure

```text
app/                  App Router pages, layouts, and metadata
components/           Reusable application and UI components
lib/contentful/       Contentful client, queries, and helpers
styles/               Global styles and shared design tokens
types/                Application and CMS types
test/                 Jest tests, fixtures, and mocks
e2e/                  Playwright end-to-end tests
.github/workflows/    GitHub Actions workflows
```

## Getting Started

Node.js 20 is recommended to match the CI environment.

Install dependencies:

```bash
npm ci
```

Create `.env.local` with the required Contentful credentials:

```text
CONTENTFUL_SPACE_ID=
CONTENTFUL_DELIVERY_TOKEN=
```

Start the development server:

```bash
npm run dev
```

Then open `http://localhost:3000`.

Contentful credentials are server-only and should never be committed or exposed through `NEXT_PUBLIC_` variables.

### Production

```bash
npm run build
npm run start
```

## Testing

| Command               | Purpose                             |
| --------------------- | ----------------------------------- |
| `npm run lint`        | Run ESLint                          |
| `npm run typecheck`   | Run TypeScript checks               |
| `npm test`            | Run Jest unit and integration tests |
| `npm run test:watch`  | Run Jest in watch mode              |
| `npm run test:e2e`    | Run Playwright end-to-end tests     |
| `npm run test:e2e:ui` | Open the Playwright UI              |
| `npm run test:e2e:ci` | Run the Chromium CI suite           |

Install Playwright browsers before the first local E2E run:

```bash
npx playwright install
```

Playwright manages the application server during E2E testing. The test suite also includes automated accessibility checks with Axe.

## Continuous Integration

GitHub Actions runs on pull requests and pushes to `master`.

The pipeline:

1. Installs dependencies and runs linting, TypeScript checks, and Jest tests.
2. Builds the production application after quality checks pass.
3. Runs Playwright E2E tests in Chromium against the production build.
4. Uploads Playwright diagnostics when E2E tests fail.

The `master` branch requires both CI jobs to pass before changes can be merged. Contentful credentials are provided through GitHub repository secrets only to steps that require them.
