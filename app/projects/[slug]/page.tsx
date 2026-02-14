import { notFound } from 'next/navigation';
import Link from 'next/link';
import styles from './projectDetail.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

import { getProjectBySlug } from '@/lib/contentful/contentful';

import TagLinks from '@/components/ui/TagLinks/TagLinks';

import SectionRenderer from '@/components/layout/SectionRenderer';

import type { ContentfulEntry, ProjectEntryFields } from '@/types/cms/contentful';

type PageProps = {
	params: Promise<{ slug: string }>;
};

const overviewCaption = 'Overview';
const websiteCaption = 'View Website';

function ProjectDetail({ project }: { project: ContentfulEntry<ProjectEntryFields> }) {
	const { fields, sys } = project;

	const titleId = `project-${sys.id}-title`;

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
				{fields.intro ? <p className={styles.introMessage}>{fields.intro}</p> : null}
			</header>

			{fields.overview && (
				<section
					aria-labelledby='project-overview-heading'
					className={styles.overviewSection}>
					<div>
						<header>
							<h2 id='project-overview-heading'>{overviewCaption}</h2>
						</header>

						{fields.overview && <p>{fields.overview}</p>}

						{fields.link && (
							<Link
								data-underlined-link
								href={fields.link}
								target='_blank'
								rel='noopener noreferrer'
								aria-label={`${websiteCaption} (opens in a new tab)`}>
								{websiteCaption} <FontAwesomeIcon icon={faExternalLinkAlt} />
							</Link>
						)}
					</div>
				</section>
			)}

			{fields.sections?.length ? (
				<section
					className={styles.sections}
					aria-label='Project sections'>
					<SectionRenderer sections={fields.sections} />
				</section>
			) : null}

			{/* ---- TODO: Glide slide ---- */}
		</article>
	);
}
export default async function ProjectDetailPage({ params }: PageProps) {
	const { slug } = await params;

	const project = await getProjectBySlug(slug);

	if (!project) notFound();

	return <ProjectDetail project={project} />;
}
