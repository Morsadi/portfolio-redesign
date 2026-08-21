import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

import FeaturedProjects from '@/components/sections/FeaturedProjects';
import { featuredProjects } from '@/test/fixtures/contentful';

describe('FeaturedProjects', () => {
	it('renders selected work with accessible project and tag links', () => {
		render(
			<FeaturedProjects
				id='selected-work'
				title='Selected Work'
				items={featuredProjects}
			/>,
		);

		expect(screen.getByRole('heading', { level: 2, name: 'Selected Work' })).toBeVisible();
		expect(screen.getAllByRole('article')).toHaveLength(3);

		for (const project of featuredProjects) {
			const { slug, title } = project.fields;

			expect(screen.getByRole('heading', { level: 3, name: title })).toBeVisible();
			expect(screen.getByRole('navigation', { name: `Tags for ${title}` })).toBeVisible();
			expect(screen.getByRole('link', { name: `Learn more about ${title}` })).toHaveAttribute('href', `/projects/${slug}`);
			expect(screen.getByRole('link', { name: `View ${title}` })).toHaveAttribute('href', `/projects/${slug}`);
		}

		expect(screen.getByRole('link', { name: 'Filter projects by tag: React' })).toHaveAttribute('href', '/projects?tags=react');
		expect(screen.getByRole('link', { name: 'Filter projects by tag: TypeScript' })).toHaveAttribute('href', '/projects?tags=typescript');
		expect(screen.getByRole('link', { name: 'Filter projects by tag: Contentful' })).toHaveAttribute('href', '/projects?tags=contentful');
	});

	it('shows an empty state when no projects are selected', () => {
		render(
			<FeaturedProjects
				id='selected-work'
				items={[]}
			/>,
		);

		expect(screen.getByRole('heading', { level: 2, name: 'Featured Work' })).toBeVisible();
		expect(screen.getByText('No projects to display.')).toBeVisible();
		expect(screen.queryByRole('article')).not.toBeInTheDocument();
	});

	it('has no automated accessibility violations', async () => {
		const { container } = render(
			<FeaturedProjects
				id='selected-work'
				title='Selected Work'
				items={featuredProjects}
			/>,
		);

		expect(await axe(container)).toHaveNoViolations();
	});
});
