import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

import ProjectDetailPage from '@/app/projects/[slug]/page';
import { getProjectBySlug } from '@/lib/contentful/contentful';
import { createAsset, createProject, createTag } from '@/test/fixtures/contentful';

jest.mock('@/lib/contentful/contentful', () => ({
	getProjectBySlug: jest.fn(),
}));

jest.mock('@/lib/contentful/projects', () => ({
	getProjectBySlugCached: jest.fn(),
}));

const mockedGetProjectBySlug = jest.mocked(getProjectBySlug);

describe('ProjectDetailPage', () => {
	beforeEach(() => {
		mockedGetProjectBySlug.mockReset();
	});

	it('renders project content, tag-filter navigation, and a safe external project link', async () => {
		mockedGetProjectBySlug.mockResolvedValue(
			createProject({
				description: 'A dashboard for IoT systems.',
				id: 'busyboard',
				slug: 'busyboard-edge-iot-system',
				tags: [createTag('react', 'React', 'react')],
				title: 'Busyboard',
				featuredAsset: createAsset({ description: 'Busyboard dashboard', url: '//images.ctfassets.net/busyboard.png' }),
				intro: 'A responsive monitoring interface.',
				overview: 'Built for busy operations teams.',
				link: 'https://example.com/busyboard',
			}),
		);

		render(await ProjectDetailPage({ params: Promise.resolve({ slug: 'busyboard-edge-iot-system' }) }));

		expect(screen.getByRole('article', { name: 'Busyboard' })).toBeVisible();
		expect(screen.getByRole('heading', { level: 1, name: 'Busyboard' })).toBeVisible();
		expect(screen.getByText('A responsive monitoring interface.')).toBeVisible();
		expect(screen.getByRole('link', { name: 'Filter projects by tag: React' })).toHaveAttribute('href', '/projects?tags=react');
		expect(screen.getByRole('heading', { level: 2, name: 'Overview' })).toBeVisible();
		expect(screen.getByRole('link', { name: 'View Project (opens in a new tab)' })).toHaveAttribute('href', 'https://example.com/busyboard');
		expect(screen.getByAltText('Busyboard dashboard')).toHaveAttribute('src', 'https://images.ctfassets.net/busyboard.png');
	});

	it('renders a clear not-found state when the project does not exist', async () => {
		mockedGetProjectBySlug.mockResolvedValue(null);

		render(await ProjectDetailPage({ params: Promise.resolve({ slug: 'missing-project' }) }));

		expect(screen.getByRole('heading', { level: 1, name: 'Project not found' })).toBeVisible();
		expect(screen.queryByRole('article')).not.toBeInTheDocument();
	});

	it('has no automated accessibility violations for a populated project', async () => {
		mockedGetProjectBySlug.mockResolvedValue(
			createProject({
				id: 'busyboard',
				slug: 'busyboard-edge-iot-system',
				title: 'Busyboard',
			}),
		);

		const { container } = render(await ProjectDetailPage({ params: Promise.resolve({ slug: 'busyboard-edge-iot-system' }) }));

		expect(await axe(container)).toHaveNoViolations();
	});
});
