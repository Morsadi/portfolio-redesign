const TAGS_QUERY_KEY = 'tags';

export const parseTagsParam = (value: string | null) => {
	if (!value) return [] as string[];
	return value
		.split(',')
		.map((v) => v.trim())
		.filter(Boolean);
};

export const serializeTagsParam = (tags: string[]) =>
	tags
		.map((t) => t.trim())
		.filter(Boolean)
		.sort()
		.join(',');

export const buildNextSearchParams = (current: string, tags: string[]) => {
	const params = new URLSearchParams(current);
	if (tags.length) params.set(TAGS_QUERY_KEY, serializeTagsParam(tags));
	else params.delete(TAGS_QUERY_KEY);
	return params;
};

export { TAGS_QUERY_KEY };
