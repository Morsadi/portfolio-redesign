import { notFound } from 'next/navigation';
import { getPageBySlug } from '@/lib/contentful/contentful';
import type { ContentfulEntry, SectionEntryFields } from '@/types/cms/contentful';
import { SECTION_TYPES } from '@/types/cms/contentful';
import Hero from '@/components/sections/Hero/Hero';
import ProjectExplorer from '@/components/sections/ProjectsExplorer/ProjectsExplorer';

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

export default async function Projects() {
	const page = await getPageBySlug('projects');

	if (!page) notFound();

	const sections = page.fields.sections ?? [];

	console.log('Sections:', sections);

	return (
		<main aria-label='Projects'>
			{sections.map((section) => renderSection(section))}

			<ProjectExplorer
				id='projects-explorer'
				title=''
			/>
		</main>
	);
}
