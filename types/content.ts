import { ContentfulAsset, ExperienceEntryFields, ContentfulEntry } from './cms/contentful';

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
