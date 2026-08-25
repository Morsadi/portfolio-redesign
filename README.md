# Badr Morsadi Portfolio

This is a personal portfolio website, built to showcase my projects and skills. The project uses Next.js, TypeScript, CSS Modules, and Contentful as a headless CMS for managing portfolio content. Live site: https://www.badrmorsadi.com

## Continuous integration

GitHub Actions runs linting, TypeScript checks, Jest tests, a production build, and Chromium Playwright tests for pull requests and pushes to `master`.

The build and browser-test job requires these repository secrets:

- `CONTENTFUL_SPACE_ID`
- `CONTENTFUL_DELIVERY_TOKEN`
