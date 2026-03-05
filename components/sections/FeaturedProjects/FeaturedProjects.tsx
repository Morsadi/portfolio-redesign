import styles from './styles/featuredProjects.module.css';

import type { FeaturedProjectsFields } from '@/types/content';
import ProjectCard from '@/components/ui/ProjectCard/ProjectCard';

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
				{projects.map((project) => (
					<li
						key={project.sys.id}
						className={styles.projectItem}>
						<ProjectCard project={project} />
					</li>
				))}
			</ul>
		</section>
	);
}
