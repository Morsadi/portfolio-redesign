import { ContentfulAsset, ExperienceEntryFields, ContentfulEntry, ProjectEntryFields } from './cms/contentful';

export type HeroFields = {
	title: string;
	description: string;
	asset?: ContentfulAsset;
	variant?: 'homepage' | 'projects' | 'projectDetail';
};

export type AboutFields = {
	title?: string;
	subtitle?: string;
	description?: string;
	experiences?: Array<ContentfulEntry<ExperienceEntryFields>>;
};

export type FeaturedProjectsFields = {
	title?: string;
	items: Array<ContentfulEntry<ProjectEntryFields>>;
	buttonCaption?: string;
};

export type ProjectCardProps = {
	project: ContentfulEntry<ProjectEntryFields>;
	projectBasePath?: string;
	buttonCaption?: string;
};
