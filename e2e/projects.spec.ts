import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Projects', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/projects');
		await expect(page.getByRole('main', { name: 'Projects' })).toBeVisible();
	});

	test('filters projects from the URL and supports keyboard filter controls', async ({ page }) => {
		const filterButton = page.getByRole('button', { name: 'Filter projects' });

		await filterButton.focus();
		await page.keyboard.press('Enter');
		await expect(filterButton).toHaveAttribute('aria-expanded', 'true');

		const typescriptFilter = page.getByRole('checkbox', { name: 'TypeScript' });
		await typescriptFilter.focus();
		await page.keyboard.press('Space');

		await expect(page).toHaveURL('/projects?tags=typescript');
		await expect(page.getByRole('article', { name: 'Portfolio Redesign' })).toBeVisible();
		await expect(page.getByRole('article', { name: 'BusyBoard: Edge IoT System' })).toBeVisible();
		await expect(page.getByRole('article', { name: 'Visit Atlantic City' })).not.toBeVisible();

		await page.keyboard.press('Escape');
		await expect(filterButton).toBeFocused();
		await expect(page.getByRole('list', { name: 'Tag filter options' })).not.toBeVisible();

		await page.getByRole('button', { name: 'Clear all filters' }).click();
		await expect(page).toHaveURL('/projects');
	});

	test('has no automated accessibility violations in the main content', async ({ page }) => {
		const accessibilityScanResults = await new AxeBuilder({ page }).include('main').analyze();

		expect(accessibilityScanResults.violations).toEqual([]);
	});
});
