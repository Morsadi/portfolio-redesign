import { notFound } from 'next/navigation';
import styles from './projectDetail.module.css';

import { getProjectBySlug } from '@/lib/contentful/contentful';

import TagLinks from '@/components/ui/TagLinks/TagLinks';

import SectionRenderer from '@/components/layout/SectionRenderer';

import type { ContentfulEntry, ProjectEntryFields } from '@/types/cms/contentful';

type PageProps = {
	params: Promise<{ slug: string }>;
};

function ProjectDetail({ project }: { project: ContentfulEntry<ProjectEntryFields> }) {
	const { fields, sys } = project;

	const titleId = `project-${sys.id}-title`;
	const descId = `project-${sys.id}-desc`;

	return (
		<article
			className={styles.projectDetail}
			aria-labelledby={titleId}>
			<header className={styles.detailHeader}>
				<div className={styles.headerTop}>
					<h1
						id={titleId}
						className={styles.title}>
						{fields.title}
					</h1>
				</div>

				<TagLinks
					tags={fields.tags}
					className={styles.projectTags}
				/>
				{fields.description ? (
					<p
						id={descId}
						className={styles.description}>
						{fields.description}
					</p>
				) : null}
			</header>

			{fields.sections?.length ? (
				<section
					className={styles.sections}
					aria-label='Project sections'>
					<SectionRenderer sections={fields.sections} />
				</section>
			) : null}
		</article>
	);
}
export default async function ProjectDetailPage({ params }: PageProps) {
	const { slug } = await params;

	const project = await getProjectBySlug(slug);

	if (!project) notFound();

	return <ProjectDetail project={project} />;
}
