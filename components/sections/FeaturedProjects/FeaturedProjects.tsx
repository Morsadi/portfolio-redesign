import { useId, useMemo } from 'react';
import styles from './styles/featuredProjects.module.css';

import type { ContentfulEntry, ProjectEntryFields, SectionItemsEntry } from '@/types/cms/contentful';
import type { FeaturedProjectsFields } from '@/types/content';

import ProjectCard from '@/components/ui/ProjectCard/ProjectCard';

type FeaturedProjectsProps = FeaturedProjectsFields & {
	projectBasePath?: string;
};

const isProjectEntry = (entry: SectionItemsEntry): entry is ContentfulEntry<ProjectEntryFields> => {
	return typeof (entry as ContentfulEntry<ProjectEntryFields>)?.fields?.slug === 'string' && typeof (entry as ContentfulEntry<ProjectEntryFields>)?.fields?.title === 'string';
};

export default function FeaturedProjects({ title = 'Featured Work', items, projectBasePath = '/projects' }: FeaturedProjectsProps) {
	const sectionId = useId();

	const projects = useMemo(() => (items ?? []).filter(isProjectEntry).slice(0, 3), [items]);

	if (!projects.length) return null;

	return (
		<section
			className={styles.featuredProjects}
			aria-labelledby={`${sectionId}-title`}>
			<h2
				id={`${sectionId}-title`}
				className={styles.title}>
				{title}
			</h2>

			<div
				className={styles.projectsContainer}
				role='grid'
				aria-label='Featured projects'>
				{projects.map((project) => (
					<ProjectCard
						key={project.sys.id}
						project={project}
						projectBasePath={projectBasePath}
					/>
				))}
			</div>
		</section>
	);
}
