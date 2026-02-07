import type { Asset } from 'contentful';

export const getAssetUrl = (asset?: Asset): string | null => {
	const url = asset?.fields?.file?.url;
	if (!url) return null;
	return url.startsWith('//') ? `https:${url}` : url;
};

export const getAssetAlt = (asset?: Asset, fallback = ''): string => {
	return asset?.fields?.description || asset?.fields?.title || fallback;
};
