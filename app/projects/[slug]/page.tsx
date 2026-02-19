import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import styles from './projectDetail.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

import SectionRenderer from '@/components/layout/SectionRenderer';
import TagLinks from '@/components/ui/TagLinks/TagLinks';

import { getProjectBySlug } from '@/lib/contentful/contentful';
import { getAssetAlt, getAssetUrl } from '@/lib/contentful/helpers';
import { getProjectBySlugCached } from '@/lib/contentful/projects';
import { buildProjectMetadata } from '@/lib/seo/buildProjectMetadata';

import type { ContentfulEntry, ProjectEntryFields } from '@/types/cms/contentful';

type ParamsProps = {
	params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: ParamsProps): Promise<Metadata> {
	const { slug } = await params;
	const project = await getProjectBySlugCached(slug);

	if (!project) {
		return { title: 'Project Not Found' };
	}

	return buildProjectMetadata(project.fields);
}

const overviewCaption = 'Overview';
const websiteCaption = 'View Website';

function ProjectDetail({ project }: { project: ContentfulEntry<ProjectEntryFields> }) {
	const { fields, sys } = project;

	const titleId = `project-${sys.id}-title`;

	const websiteUrl = fields.link;

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

						{websiteUrl && (
							<Link
								data-underlined-link
								href={websiteUrl}
								target='_blank'
								rel='noopener noreferrer'
								aria-label={`${websiteCaption} (opens in a new tab)`}>
								{websiteCaption} <FontAwesomeIcon icon={faExternalLinkAlt} />
							</Link>
						)}
					</div>
				</section>
			)}
			{/* if not sections, displaye a fullwidth featured image */}
			{fields.sections?.length ? (
				<div className={styles.projectSections}>
					<SectionRenderer
						sections={fields.sections}
						externalLink={websiteUrl}
					/>
				</div>
			) : (
				fields.featuredAsset && (
					<div
						data-img-container
						className={styles.featuredImage}>
						<Image
							src={getAssetUrl(fields.featuredAsset) || ''}
							alt={getAssetAlt(fields.featuredAsset, fields.title)}
							width={1920}
							height={1080}
							sizes='100vw'
							className={styles.image}
							priority
						/>
					</div>
				)
			)}
		</article>
	);
}
export default async function ProjectDetailPage({ params }: ParamsProps) {
	const { slug } = await params;

	const project = await getProjectBySlug(slug);

	if (!project)
		return (
			<section className={styles.notFound}>
				<h1 className={styles.title}>Project not found</h1>
			</section>
		);

	return <ProjectDetail project={project} />;
}
