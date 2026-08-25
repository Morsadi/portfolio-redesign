import type { ContentfulAsset, ContentfulEntry, ProjectEntryFields, TagEntryFields } from '@/types/cms/contentful';

type AssetFixtureOptions = {
	description?: string;
	title?: string;
	url?: string;
};

type ProjectFixtureOptions = Omit<Partial<ProjectEntryFields>, 'description' | 'slug' | 'tags' | 'title'> & {
	description?: string;
	id: string;
	slug: string;
	tags?: Array<ContentfulEntry<TagEntryFields>>;
	title: string;
};

export const createTag = (id: string, name: string, slug: string): ContentfulEntry<TagEntryFields> => ({
	sys: { id },
	fields: { name, slug },
});

export const createAsset = ({ description = '', title = '', url = '//images.ctfassets.net/example.png' }: AssetFixtureOptions = {}): ContentfulAsset => ({
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

export const createProject = ({ description = 'A portfolio project.', id, slug, tags, title, ...fields }: ProjectFixtureOptions): ContentfulEntry<ProjectEntryFields> => ({
	sys: { id },
	fields: {
		...fields,
		description,
		slug,
		tags,
		title,
	},
});

export const featuredProjects = [
	createProject({
		id: 'project-atlas',
		slug: 'atlas',
		tags: [createTag('tag-react', 'React', 'react')],
		title: 'Atlas',
	}),
	createProject({
		id: 'project-beacon',
		slug: 'beacon',
		tags: [createTag('tag-typescript', 'TypeScript', 'typescript')],
		title: 'Beacon',
	}),
	createProject({
		id: 'project-compass',
		slug: 'compass',
		tags: [createTag('tag-contentful', 'Contentful', 'contentful')],
		title: 'Compass',
	}),
];
