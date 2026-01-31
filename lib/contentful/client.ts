import 'server-only';
import { createClient } from 'contentful';

const space = process.env.CONTENTFUL_SPACE_ID;
const accessToken = process.env.CONTENTFUL_DELIVERY_TOKEN;

if (!space || !accessToken) {
	throw new Error('Missing Contentful env vars: CONTENTFUL_SPACE_ID and CONTENTFUL_DELIVERY_TOKEN are required.');
}

export const contentfulClient = createClient({
	space,
	accessToken,
});
