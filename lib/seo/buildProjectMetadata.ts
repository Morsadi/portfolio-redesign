import type { Metadata } from 'next';
import type { ProjectEntryFields } from '@/types/cms/contentful';

export const buildProjectMetadata = (project: ProjectEntryFields): Metadata => {
	const { title, description, featuredAsset } = project;

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			images: featuredAsset ? [{ url: `https:${featuredAsset.fields.file.url}` }] : [],
		},
	};
};
