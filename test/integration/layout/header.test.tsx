import { render, screen, within } from '@testing-library/react';
import { axe } from 'jest-axe';

import Header from '@/components/layout/Header';
import { resetNavigationState, setNavigationState } from '@/test/mocks/nextNavigation';

describe('Header', () => {
	beforeEach(() => {
		resetNavigationState();
	});

	it('renders homepage navigation and identifies the active route', () => {
		setNavigationState('/projects/portfolio-redesign');
		render(<Header />);

		expect(screen.getByRole('banner')).toBeVisible();
		expect(screen.getByRole('link', { name: 'Go to homepage' })).toHaveAttribute('href', '/');

		const navigation = screen.getByRole('navigation', { name: 'Primary navigation' });
		const navigationQueries = within(navigation);
		expect(navigationQueries.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
		expect(navigationQueries.getByRole('link', { name: 'Home' })).not.toHaveAttribute('aria-current');
		expect(navigationQueries.getByRole('link', { name: 'Projects' })).toHaveAttribute('href', '/projects');
		expect(navigationQueries.getByRole('link', { name: 'Projects' })).toHaveAttribute('aria-current', 'page');

		expect(screen.getByRole('button', { name: 'Copy bmorsadi@gmail.com to clipboard' })).toBeVisible();
	});

	it('has no automated accessibility violations', async () => {
		const { container } = render(<Header />);

		expect(await axe(container)).toHaveNoViolations();
	});
});
