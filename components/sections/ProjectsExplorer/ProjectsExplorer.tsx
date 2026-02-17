import styles from './styles/projectExplorer.module.css';
import ProjectExplorerClient from './ProjectExplorerClient';

import { getProjects } from '@/lib/contentful/contentful';
import { toTagOptions } from '@/lib/contentful/helpers';

import type { ProjectExplorerProps } from '@/types/content';

export default async function ProjectExplorer({ id, title }: ProjectExplorerProps) {
	const projects = await getProjects();
	if (!projects.length) return null;

	const tagOptions = toTagOptions(projects);

	return (
		<section
			id={`section-${id}`}
			className={styles.projectsExplorer}
			aria-labelledby={`section-${id}-title`}>
			{title ? (
				<h2
					id={`section-${id}-title`}
					className={styles.title}>
					{title}
				</h2>
			) : null}

			<ProjectExplorerClient
				sectionId={id}
				projects={projects}
				tagOptions={tagOptions}
			/>
		</section>
	);
}
