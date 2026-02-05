import type { Asset } from 'contentful';

/* -------------------------------------------------------------------------------------------------
 * Contentful primitives
 * ------------------------------------------------------------------------------------------------- */

export type ContentfulSys = {
	id: string;
};

export type ContentfulEntry<TFields> = {
	sys: ContentfulSys;
	fields: TFields;
};

export type ContentfulAsset = Asset;

/* -------------------------------------------------------------------------------------------------
 * Tags
 * ------------------------------------------------------------------------------------------------- */

export type TagEntryFields = {
	title: string;
	slug: string;
};

/* -------------------------------------------------------------------------------------------------
 * Experiences
 * ------------------------------------------------------------------------------------------------- */

export type ExperienceEntryFields = {
	company: string;
	role: string;
	startDate: string;
	endDate?: string;
	description?: string;
	body?: any; // TODO: type for rich text content
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

/* -------------------------------------------------------------------------------------------------
 * Sections (page/project building blocks)
 * ------------------------------------------------------------------------------------------------- */

export const SECTION_TYPES = {
	IntroPanel: 'IntroPanel',
	About: 'About',
	FeaturedProjects: 'FeaturedProjects',
} as const;

export type SectionType = (typeof SECTION_TYPES)[keyof typeof SECTION_TYPES];

export type SectionTypeEntryFields = {
	type: SectionType;
	label?: string;
};

export type SectionItemsEntry = ContentfulEntry<ProjectEntryFields> | ContentfulEntry<ExperienceEntryFields> | ContentfulEntry<SectionEntryFields>;

export type SectionEntryFields = {
	type: ContentfulEntry<SectionTypeEntryFields>;
	title?: string;
	subtitle?: string;
	description?: string;

	body?: any; // TODO: type for rich text content

	asset?: Array<ContentfulAsset>;
	items?: Array<SectionItemsEntry>;
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
