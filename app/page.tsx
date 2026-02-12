import { notFound } from 'next/navigation';
import { getPageBySlug } from '@/lib/contentful/contentful';
import type { ContentfulEntry, SectionEntryFields, ExperienceEntryFields, ProjectEntryFields } from '@/types/cms/contentful';
import { SECTION_TYPES } from '@/types/cms/contentful';
import Hero from '@/components/sections/Hero/Hero';
import About from '@/components/sections/About/About';
import FeaturedProjects from '@/components/sections/FeaturedProjects/FeaturedProjects';
import ProjectExplorer from '@/components/sections/ProjectsExplorer/ProjectsExplorer';

const renderSection = (section: ContentfulEntry<SectionEntryFields>) => {
	const { type, title, subtitle, description, asset, isHomepage } = section.fields;

	const sectionType = type?.fields?.type;

	console.log(section.fields);

	switch (sectionType) {
		case SECTION_TYPES.IntroPanel: {
			return (
				<Hero
					key={section.sys.id}
					title={title ?? ''}
					description={description ?? ''}
					asset={asset ? asset[0] : undefined}
					isHomepage={isHomepage}
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
		case SECTION_TYPES.FeaturedProjects: {
			return (
				<FeaturedProjects
					key={section.sys.id}
					id={section.sys.id}
					title={title ?? ''}
					items={section.fields.items as Array<ContentfulEntry<ProjectEntryFields>>}
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
