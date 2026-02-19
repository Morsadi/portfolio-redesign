import { cache } from 'react';
import { getProjectBySlug } from '@/lib/contentful/contentful';

// Cache the project by slug helps not eat up API calls
export const getProjectBySlugCached = cache(async (slug: string) => {
	return getProjectBySlug(slug);
});
