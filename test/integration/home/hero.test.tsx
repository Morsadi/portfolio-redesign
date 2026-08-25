import type { Asset } from 'contentful';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

import Hero from '@/components/sections/Hero';

const portraitAsset: Asset = {
	fields: {
		description: 'Portrait illustration',
		file: {
			contentType: 'image/png',
			details: { size: 1 },
			fileName: 'portrait.png',
			url: '//images.ctfassets.net/portrait.png',
		},
		title: 'Portrait',
	},
	metadata: { tags: [] },
	sys: {
		contentType: {
			sys: { id: 'Asset', linkType: 'ContentType', type: 'Link' },
		},
		createdAt: '2026-01-01T00:00:00.000Z',
		id: 'portrait',
		locale: 'en-US',
		type: 'Asset',
		updatedAt: '2026-01-01T00:00:00.000Z',
	},
	toPlainObject: () => ({}),
};

describe('Hero', () => {
	it('renders homepage content with a decorative portrait and copy control', () => {
		render(
			<Hero
				title='Frontend Engineer'
				description='I build accessible interfaces.'
				asset={portraitAsset}
				isHomepage
			/>,
		);

		expect(screen.getByRole('heading', { level: 1, name: 'Frontend Engineer' })).toBeVisible();
		expect(screen.getByText('I build accessible interfaces.')).toBeVisible();
		expect(screen.getByAltText('')).toHaveAttribute('src', 'https://images.ctfassets.net/portrait.png');
		expect(screen.getByRole('button', { name: 'Copy bmorsadi@gmail.com to clipboard' })).toBeVisible();
	});

	it('omits homepage-only content for an interior hero', () => {
		render(
			<Hero
				title='Selected Work'
				description='A set of projects.'
				asset={portraitAsset}
			/>,
		);

		expect(screen.getByRole('heading', { level: 1, name: 'Selected Work' })).toBeVisible();
		expect(screen.queryByAltText('')).not.toBeInTheDocument();
		expect(screen.queryByRole('button', { name: 'Copy bmorsadi@gmail.com to clipboard' })).not.toBeInTheDocument();
	});

	it('has no automated accessibility violations', async () => {
		const { container } = render(
			<Hero
				title='Frontend Engineer'
				description='I build accessible interfaces.'
				asset={portraitAsset}
				isHomepage
			/>,
		);

		expect(await axe(container)).toHaveNoViolations();
	});
});
