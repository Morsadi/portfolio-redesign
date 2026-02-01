import { ContentfulAsset } from './cms/contentful';

export type IntroPanelFields = {
	title: string;
	description: string;
	asset?: ContentfulAsset;
};
