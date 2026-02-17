import type { ContentfulEntry, SectionEntryFields, ExperienceEntryFields, ProjectEntryFields } from '@/types/cms/contentful';
import styles from './styles/sectionRenderer.module.css';
import { SECTION_TYPES } from '@/types/cms/contentful';
import type { SectionRendererProps } from '@/types/content';

import Hero from '@/components/sections/Hero/Hero';
import About from '@/components/sections/About/About';
import FeaturedProjects from '@/components/sections/FeaturedProjects/FeaturedProjects';
import ProjectExplorer from '@/components/sections/ProjectsExplorer/ProjectsExplorer';
import SideBySide from '@/components/sections/SideBySide/SideBySide';
import Slider from '@/components/sections/Slider/Slider';

export default function SectionRenderer({ sections, externalLink }: SectionRendererProps) {
	if (!sections?.length)
		return (
			<p
				role='status'
				className={styles.noSections}>
				No sections to display.
			</p>
		);

	const renderSection = (section: ContentfulEntry<SectionEntryFields>, index: number) => {
		const { sys, fields } = section;
		const { type, title, subtitle, description, assets, isHomepage, items } = fields;

		const sectionType = type?.fields?.type;

		switch (sectionType) {
			case SECTION_TYPES.IntroPanel:
				return (
					<Hero
						key={sys.id}
						title={title ?? ''}
						description={description ?? ''}
						asset={assets?.[0]}
						isHomepage={isHomepage}
					/>
				);

			case SECTION_TYPES.About:
				return (
					<About
						key={sys.id}
						title={title ?? ''}
						subtitle={subtitle ?? ''}
						description={description ?? ''}
						experiences={items as Array<ContentfulEntry<ExperienceEntryFields>>}
					/>
				);

			case SECTION_TYPES.FeaturedProjects:
				return (
					<FeaturedProjects
						key={sys.id}
						id={sys.id}
						title={title ?? ''}
						items={items as Array<ContentfulEntry<ProjectEntryFields>>}
					/>
				);

			case SECTION_TYPES.ProjectsExplorer:
				return (
					<ProjectExplorer
						key={sys.id}
						id={sys.id}
						title={title ?? ''}
					/>
				);

			case SECTION_TYPES.SideBySide:
				return (
					<SideBySide
						key={`${sys.id}-${index}`}
						id={sys.id}
						index={index}
						subtitle={subtitle ?? ''}
						title={title ?? ''}
						description={description}
						asset={assets?.[0]}
					/>
				);

			case SECTION_TYPES.Slider:
				return (
					<Slider
						key={sys.id}
						title={title ?? ''}
						description={description ?? ''}
						assets={assets ?? []}
						websiteUrl={externalLink}
					/>
				);

			default:
				return null;
		}
	};

	return <>{sections.map(renderSection)}</>;
}
