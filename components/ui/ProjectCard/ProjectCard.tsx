import Image from 'next/image';
import Link from 'next/link';
import styles from './projectCard.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import type { ProjectCardProps } from '@/types/content';
import { getAssetAlt, getAssetUrl } from '@/lib/contentful/helpers';
import TagLinks from '../TagLinks/TagLinks';

const CARD_IMAGE_WIDTH = 605;
const CARD_IMAGE_HEIGHT = 345;

export default function ProjectCard({ project, projectBasePath = '/projects', buttonCaption = 'Learn More' }: ProjectCardProps) {
	const { fields, sys } = project;
	const imgUrl = getAssetUrl(fields.featuredAsset);
	const imgAlt = getAssetAlt(fields.featuredAsset, fields.title);

	return (
		<article
			id={`project-${sys.id}`}
			className={styles.projectCard}
			aria-labelledby={`project-${sys.id}-title`}>
			<div className={styles.contentSection}>
				<h3
					id={`project-${sys.id}-title`}
					className={styles.cardTitle}>
					{fields.title}
				</h3>

				<TagLinks
					tags={fields.tags}
					className={styles.projectTags}
				/>

				{fields.description ? <p className={styles.cardDesc}>{fields.description}</p> : null}
				{buttonCaption === '' ? null : (
					<div className={styles.actionButtons}>
						<Link
							data-underlined-link
							href={`${projectBasePath}/${fields.slug}`}
							className={styles.learnMoreLink}
							aria-label={`View details`}>
							{buttonCaption}
							<FontAwesomeIcon
								aria-hidden='true'
								icon={faArrowRight}
							/>
						</Link>
					</div>
				)}
			</div>
			<div className={styles.imgContainer}>
				<Link
					href={`${projectBasePath}/${fields.slug}`}
					className={styles.imageLink}
					aria-label={`View details`}>
					{imgUrl ? (
						<Image
							src={imgUrl}
							alt={imgAlt}
							width={CARD_IMAGE_WIDTH}
							height={CARD_IMAGE_HEIGHT}
							className={styles.cardImage}
							sizes='(min-width: 1550px) 500px, (min-width: 1024px) calc(calc(100vw - 40px) / 3), (min-width: 640px) calc(calc(100vw - 40px) / 2), calc(100vw - 20px)'
							aria-hidden='true'
						/>
					) : (
						<div
							className={styles.imgFallback}
							role='img'
							aria-hidden='true'
						/>
					)}
				</Link>
			</div>
		</article>
	);
}
