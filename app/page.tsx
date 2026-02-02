import { notFound } from 'next/navigation';
import { getPageBySlug } from '@/lib/contentful/contentful';
import type { ContentfulEntry, SectionEntryFields } from '@/types/cms/contentful';
import { SECTION_TYPES } from '@/types/cms/contentful';
import Hero from '@/components/sections/Hero/Hero';

const renderSection = (section: ContentfulEntry<SectionEntryFields>) => {
	const { type, title, description, asset } = section.fields;

	const sectionType = type?.fields?.type;

	switch (sectionType) {
		case SECTION_TYPES.IntroPanel: {
			return (
				<Hero
					key={section.sys.id}
					title={title ?? ''}
					description={description ?? ''}
					asset={asset ? asset[0] : undefined}
				/>
			);
		}

		default:
			return null;
	}
};

export default async function HomePage() {
	const page = await getPageBySlug('homepage');

	if (!page) notFound();

	const sections = page.fields.sections ?? [];

	return <main aria-label='Home'>{sections.map((section) => renderSection(section))}</main>;
}
