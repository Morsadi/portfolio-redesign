import type { Asset, Entry } from 'contentful';

/* -------------------------------------------------------------------------------------------------
 * Contentful base helpers
 * ------------------------------------------------------------------------------------------------- */

export type ContentfulEntry<TFields> = Entry<TFields>;
export type ContentfulAsset = Asset;

/* -------------------------------------------------------------------------------------------------
 * Tags
 * ------------------------------------------------------------------------------------------------- */

export type TagEntryFields = {
	title: string;
	slug: string;
};

/* -------------------------------------------------------------------------------------------------
 * Sections (page/project building blocks)
 * ------------------------------------------------------------------------------------------------- */

export const SECTION_TYPES = {
	IntroPanel: 'IntroPanel',
	FeaturedProjects: 'FeaturedProjects',
} as const;

export type SectionType = (typeof SECTION_TYPES)[keyof typeof SECTION_TYPES];

export type SectionTypeEntryFields = {
	type: SectionType;
	label?: string;
};

export type SectionEntryFields = {
	type: ContentfulEntry<SectionTypeEntryFields>;

	title?: string;
	subtitle?: string;
	description?: string;

	body?: any; // TODO: type for rich text content

	asset?: Array<ContentfulAsset>;
};

/* -------------------------------------------------------------------------------------------------
 * Pages
 * ------------------------------------------------------------------------------------------------- */

export type PageEntryFields = {
	title: string;
	slug: string;

	thumbnail?: ContentfulAsset;

	seoTitle?: string;
	seoDescription?: string;

	sections?: Array<ContentfulEntry<SectionEntryFields>>;
};

/* -------------------------------------------------------------------------------------------------
 * Projects
 * ------------------------------------------------------------------------------------------------- */

export type ProjectEntryFields = {
	title: string;
	slug: string;

	summary?: string;
	featuredImage?: ContentfulAsset;

	tags?: Array<ContentfulEntry<TagEntryFields>>;

	sections?: Array<ContentfulEntry<SectionEntryFields>>;
};
