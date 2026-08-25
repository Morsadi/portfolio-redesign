import type { Asset } from 'contentful';

import { getAssetAlt, getAssetUrl, getProjectTagSlugs, toTagOptions } from '@/lib/contentful/helpers';
import { createProject, createTag } from '@/test/fixtures/contentful';

type AssetFixtureOptions = {
	description?: string;
	title?: string;
	url?: string;
};

const createAsset = ({ description = '', title = '', url = '//images.ctfassets.net/example.png' }: AssetFixtureOptions = {}): Asset => ({
	fields: {
		description,
		file: {
			contentType: 'image/png',
			details: { size: 1 },
			fileName: 'example.png',
			url,
		},
		title,
	},
	metadata: { tags: [] },
	sys: {
		contentType: {
			sys: { id: 'Asset', linkType: 'ContentType', type: 'Link' },
		},
		createdAt: '2026-01-01T00:00:00.000Z',
		id: 'asset-id',
		locale: 'en-US',
		type: 'Asset',
		updatedAt: '2026-01-01T00:00:00.000Z',
	},
	toPlainObject: () => ({}),
});

describe('contentful helpers', () => {
	describe('asset helpers', () => {
		it('normalizes protocol-relative asset URLs and handles missing assets', () => {
			expect(getAssetUrl(createAsset())).toBe('https://images.ctfassets.net/example.png');
			expect(getAssetUrl(createAsset({ url: 'https://images.ctfassets.net/example.png' }))).toBe('https://images.ctfassets.net/example.png');
			expect(getAssetUrl()).toBeNull();
		});

		it('uses asset description, title, then the provided fallback for alternative text', () => {
			expect(getAssetAlt(createAsset({ description: 'Portrait', title: 'Badr' }))).toBe('Portrait');
			expect(getAssetAlt(createAsset({ title: 'Badr' }))).toBe('Badr');
			expect(getAssetAlt(createAsset(), 'Fallback image')).toBe('Fallback image');
		});
	});

	describe('project tag helpers', () => {
		it('returns trimmed, non-empty tag slugs for a project', () => {
			const project = createProject({
				id: 'project-1',
				slug: 'project-1',
				tags: [createTag('tag-react', 'React', ' react '), createTag('tag-empty', 'Empty', '   ')],
				title: 'Project 1',
			});

			expect(getProjectTagSlugs(project)).toEqual(['react']);
		});

		it('deduplicates tag options by slug and sorts them by name', () => {
			const projects = [
				createProject({
					id: 'project-1',
					slug: 'project-1',
					tags: [createTag('tag-react', 'React', 'react'), createTag('tag-typescript', 'TypeScript', 'typescript')],
					title: 'Project 1',
				}),
				createProject({
					id: 'project-2',
					slug: 'project-2',
					tags: [createTag('tag-react-duplicate', 'React duplicate', 'react'), createTag('tag-contentful', 'Contentful', 'contentful')],
					title: 'Project 2',
				}),
			];

			expect(toTagOptions(projects)).toEqual([
				{ name: 'Contentful', slug: 'contentful' },
				{ name: 'React', slug: 'react' },
				{ name: 'TypeScript', slug: 'typescript' },
			]);
		});
	});
});
