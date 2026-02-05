import { notFound } from 'next/navigation';
import { getPageBySlug } from '@/lib/contentful/contentful';
import type { ContentfulEntry, SectionEntryFields, ExperienceEntryFields } from '@/types/cms/contentful';
import { SECTION_TYPES } from '@/types/cms/contentful';
import Hero from '@/components/sections/Hero/Hero';
import About from '@/components/sections/About/About';

const renderSection = (section: ContentfulEntry<SectionEntryFields>) => {
	const { type, title, subtitle, description, asset } = section.fields;

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

		case SECTION_TYPES.About: {
			return (
				<About
					key={section.sys.id}
					title={title ?? ''}
					subtitle={subtitle ?? ''}
					description={description ?? ''}
					experiences={section.fields.items as Array<ContentfulEntry<ExperienceEntryFields>>}
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
