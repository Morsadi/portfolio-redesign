import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Homepage', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
		await expect(page.getByRole('main', { name: 'Home' })).toBeVisible();
	});

	test('supports primary navigation, email copying, and selected-work navigation', async ({ context, page }) => {
		const primaryNavigation = page.getByRole('navigation', { name: 'Primary navigation' });
		const projectsLink = primaryNavigation.getByRole('link', { name: 'Projects' });
		const portfolioRedesign = page.getByRole('article', { name: 'Portfolio Redesign' });
		const typescriptTag = portfolioRedesign.getByRole('link', { name: 'Filter projects by tag: TypeScript' });

		await expect(page.getByRole('link', { name: 'Go to homepage' })).toHaveAttribute('href', '/');
		await expect(projectsLink).toHaveAttribute('href', '/projects');
		await expect(typescriptTag).toHaveAttribute('href', '/projects?tags=typescript');

		await typescriptTag.click();
		await expect(page).toHaveURL('/projects?tags=typescript');
		await page.goBack();
		await expect(page.getByRole('main', { name: 'Home' })).toBeVisible();

		await context.grantPermissions(['clipboard-read', 'clipboard-write']);
		const header = page.getByRole('banner');
		const copyButton = header.getByRole('button', { name: 'Copy bmorsadi@gmail.com to clipboard' });

		await copyButton.click();
		await expect(copyButton).toBeDisabled();
		await expect(header.getByRole('status')).toHaveText('Copied!');
		expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('bmorsadi@gmail.com');

		await projectsLink.click();
		await expect(page).toHaveURL('/projects');
		await expect(page.getByRole('main', { name: 'Projects' })).toBeVisible();
	});

	test('has no automated accessibility violations in the main content', async ({ page }) => {
		const accessibilityScanResults = await new AxeBuilder({ page }).include('main').analyze();

		expect(accessibilityScanResults.violations).toEqual([]);
	});
});
