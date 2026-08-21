import type { ContentfulEntry, ProjectEntryFields, TagEntryFields } from '@/types/cms/contentful';

type ProjectFixtureOptions = {
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

export const createProject = ({ description = 'A portfolio project.', id, slug, tags, title }: ProjectFixtureOptions): ContentfulEntry<ProjectEntryFields> => ({
	sys: { id },
	fields: {
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
