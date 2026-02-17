import type { Asset } from 'contentful';
import type { ContentfulEntry, ProjectEntryFields, TagEntryFields } from '@/types/cms/contentful';

export const getAssetUrl = (asset?: Asset): string | null => {
	const url = asset?.fields?.file?.url;
	if (!url) return null;
	return url.startsWith('//') ? `https:${url}` : url;
};

export const getAssetAlt = (asset?: Asset, fallback = ''): string => {
	return asset?.fields?.description || asset?.fields?.title || fallback;
};

export const getProjectTagSlugs = (project: ContentfulEntry<ProjectEntryFields>) => (project.fields.tags ?? []).map((t) => t.fields.slug.trim()).filter(Boolean);

export const toTagOptions = (projects: Array<ContentfulEntry<ProjectEntryFields>>): TagEntryFields[] => {
	const map = new Map<string, TagEntryFields>();

	for (const project of projects) {
		for (const tag of project.fields.tags ?? []) {
			const slug = tag.fields.slug.trim();
			if (!slug) continue;

			if (!map.has(slug)) map.set(slug, tag.fields);
		}
	}

	return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name));
};
