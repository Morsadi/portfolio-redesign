import { ContentfulAsset } from './cms/contentful';

export type HeroFields = {
	title: string;
	description: string;
	asset?: ContentfulAsset;
	variant?: 'homepage' | 'projects' | 'projectDetail';
};
