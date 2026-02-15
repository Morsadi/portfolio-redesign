import { ContentfulAsset, ExperienceEntryFields, ContentfulEntry, ProjectEntryFields, TagEntryFields } from './cms/contentful';

export type HeroFields = {
	title: string;
	description: string;
	asset?: ContentfulAsset;
	isHomepage?: boolean;
};

export type AboutFields = {
	title?: string;
	subtitle?: string;
	description?: string;
	experiences?: Array<ContentfulEntry<ExperienceEntryFields>>;
};

export type FeaturedProjectsFields = {
	id: string;
	title?: string;
	items: Array<ContentfulEntry<ProjectEntryFields>>;
	buttonCaption?: string;
	projectBasePath?: string;
};

export type TagLinksProps = {
	tags?: Array<ContentfulEntry<TagEntryFields>>;
	basePath?: string;
	ariaLabel?: string;
	showIcon?: boolean;
	className?: string;
	listClassName?: string;
};

export type ProjectCardProps = {
	project: ContentfulEntry<ProjectEntryFields>;
	projectBasePath?: string;
	buttonCaption?: string;
	visitWebsiteCaption?: string;
};

export type ProjectExplorerProps = {
	id: string;
	title?: string;
	tags?: Array<ContentfulEntry<TagEntryFields>>;
};

export type SideBySideProps = {
	index?: number;
	id: string;
	subtitle?: string;
	title?: string;
	description?: string;
	asset?: ContentfulAsset;
};
