import { notFound } from 'next/navigation';
import { getPageBySlug } from '@/lib/contentful/contentful';

import SectionRenderer from '@/components/layout/SectionRenderer';

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
