import type { ContentfulEntry, SectionEntryFields, ExperienceEntryFields, ProjectEntryFields } from '@/types/cms/contentful';
import { SECTION_TYPES } from '@/types/cms/contentful';

import Hero from '@/components/sections/Hero/Hero';
import About from '@/components/sections/About/About';
import FeaturedProjects from '@/components/sections/FeaturedProjects/FeaturedProjects';
import ProjectExplorer from '@/components/sections/ProjectsExplorer/ProjectsExplorer';

type SectionRendererProps = {
	sections: Array<ContentfulEntry<SectionEntryFields>>;
	className?: string;
};

const renderSection = (section: ContentfulEntry<SectionEntryFields>) => {
	const { sys, fields } = section;
	const { type, title, subtitle, description, asset, isHomepage, items } = fields;

	const sectionType = type?.fields?.type;

	switch (sectionType) {
		case SECTION_TYPES.IntroPanel: {
			return (
				<Hero
					key={sys.id}
					title={title ?? ''}
					description={description ?? ''}
					asset={asset?.[0]}
					isHomepage={isHomepage}
				/>
			);
		}

		case SECTION_TYPES.About: {
			return (
				<About
					key={sys.id}
					title={title ?? ''}
					subtitle={subtitle ?? ''}
					description={description ?? ''}
					experiences={items as Array<ContentfulEntry<ExperienceEntryFields>>}
				/>
			);
		}

		case SECTION_TYPES.FeaturedProjects: {
			return (
				<FeaturedProjects
					key={sys.id}
					id={sys.id}
					title={title ?? ''}
					items={items as Array<ContentfulEntry<ProjectEntryFields>>}
				/>
			);
		}

		case SECTION_TYPES.ProjectsExplorer: {
			return (
				<ProjectExplorer
					key={sys.id}
					id={sys.id}
					title={title ?? ''}
				/>
			);
		}

		default:
			return null;
	}
};

export default function SectionRenderer({ sections }: SectionRendererProps) {
	if (!sections?.length) return null;

	return <>{sections.map(renderSection)}</>;
}
