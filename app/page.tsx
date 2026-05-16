import type { Metadata } from 'next';
import { cache } from 'react';
import { notFound } from 'next/navigation';
import { getPageBySlug as _getPageBySlug } from '@/lib/contentful/contentful';

import SectionRenderer from '@/components/layout/SectionRenderer';

const getPageBySlug = cache(_getPageBySlug);

export async function generateMetadata(): Promise<Metadata> {
	const page = await getPageBySlug('homepage');

	if (!page) return {};

	const { seoTitle, seoDescription } = page.fields;

	return {
		title: seoTitle,
		description: seoDescription,
	};
}

export default async function HomePage() {
	const page = await getPageBySlug('homepage');

	if (!page) notFound();

	const sections = page.fields.sections ?? [];

	return (
		<main aria-label='Home'>
			<SectionRenderer sections={sections} />
		</main>
	);
}
