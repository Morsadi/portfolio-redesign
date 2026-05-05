import type { CSSProperties } from 'react';
import styles from './styles/featuredProjects.module.css';

import type { FeaturedProjectsFields } from '@/types/content';
import ProjectCard from '@/components/ui/ProjectCard';

import RevealOnView from '@/components/ui/RevealOnView';

export default function FeaturedProjects({ id, title = 'Featured Work', items }: FeaturedProjectsFields) {
	const projects = items.filter((project) => project.fields) ?? [];

	return (
		<section
			id={`section-${id}`}
			className={styles.featuredProjects}
			aria-labelledby={`section-${id}-title`}>
			<h2
				id={`section-${id}-title`}
				className={styles.title}>
				{title}
			</h2>

			{projects.length === 0 ? <p className={styles.noProjects}>No projects to display.</p> : null}

			<ul
				className={styles.projectsContainer}
				aria-label='Featured projects'>
				{projects.map((project, index) => (
					<RevealOnView
						key={project.sys.id}
						className={styles.projectItem}
						as='li'
						style={{ '--reveal-delay': `${index * 120}ms` } as CSSProperties}>
						<ProjectCard project={project} />
					</RevealOnView>
				))}
			</ul>
		</section>
	);
}
