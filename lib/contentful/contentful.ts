import 'server-only';
import { cache } from 'react';
import { contentfulClient } from './client';
import type { ContentfulEntry, PageEntryFields, ProjectEntryFields } from '@/types/cms/contentful';

export const getProjects = cache(async (): Promise<Array<ContentfulEntry<ProjectEntryFields>>> => {
	const res = await contentfulClient.getEntries<ProjectEntryFields>({
		content_type: 'project',
		include: 3,
		order: ['-sys.createdAt'],
	});

	return res.items as Array<ContentfulEntry<ProjectEntryFields>>;
});

export const getProjectBySlug = cache(async (slug: string): Promise<ContentfulEntry<ProjectEntryFields> | null> => {
	const res = await contentfulClient.getEntries<ProjectEntryFields>({
		content_type: 'project',
		'fields.slug': slug,
		include: 2,
		limit: 1,
	});

	return (res.items[0] ?? null) as ContentfulEntry<ProjectEntryFields> | null;
});

export const getPageBySlug = cache(async (slug: string): Promise<ContentfulEntry<PageEntryFields> | null> => {
	const res = await contentfulClient.getEntries<PageEntryFields>({
		content_type: 'page',
		'fields.slug': slug,
		include: 3,
		limit: 1,
	});

	return (res.items[0] ?? null) as ContentfulEntry<PageEntryFields> | null;
});
