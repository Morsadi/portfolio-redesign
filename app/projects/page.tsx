import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPageBySlug } from '@/lib/contentful/contentful';
import SectionRenderer from '@/components/layout/SectionRenderer';

export const metadata: Metadata = {
	title: 'Projects',
	description: 'Selected web development projects including CMS architecture, migration tools, and scalable component systems.',
};

export default async function Projects() {
	const page = await getPageBySlug('projects');

	if (!page) notFound();

	const sections = page.fields.sections ?? [];

	return (
		<main aria-label='Projects'>
			<SectionRenderer sections={sections} />
		</main>
	);
}
