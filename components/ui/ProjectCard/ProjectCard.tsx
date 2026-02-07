import Image from 'next/image';
import Link from 'next/link';
import styles from './projectCard.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import type { ProjectCardProps } from '@/types/content';
import { getAssetAlt, getAssetUrl } from '@/lib/contentful/helpers';

const CARD_IMAGE_WIDTH = 605;
const CARD_IMAGE_HEIGHT = 345;

export default function ProjectCard({ project, projectBasePath = '/projects', buttonCaption = 'Learn More' }: ProjectCardProps) {
	const { fields, sys } = project;
	const imgUrl = getAssetUrl(fields.asset);
	const imgAlt = getAssetAlt(fields.asset, fields.title);

	return (
		<article
			className={styles.projectCard}
			aria-labelledby={`project-${sys.id}-title`}>
			<div className={styles.contentSection}>
				<h3
					id={`project-${sys.id}-title`}
					className={styles.cardTitle}>
					{fields.title}
				</h3>

				{fields.tags?.length ? (
					<ul className={styles.tags}>
						{fields.tags.map((tag) => (
							<li
								key={tag.sys.id}
								className={styles.tagItem}>
								{tag.fields.name}
							</li>
						))}
					</ul>
				) : null}
				{fields.summary ? <p className={styles.cardDesc}>{fields.summary}</p> : null}

				{buttonCaption === '' ? null : (
					<Link
						href={`${projectBasePath}/${fields.slug}`}
						className={styles.learnMoreLink}
						aria-label={`View details for ${fields.title} project`}>
						{buttonCaption}
						<FontAwesomeIcon
							aria-hidden='true'
							icon={faArrowRight}
						/>
					</Link>
				)}
			</div>
			<div className={styles.imgContainer}>
				{imgUrl ? (
					<Image
						src={imgUrl}
						alt={imgAlt}
						width={CARD_IMAGE_WIDTH}
						height={CARD_IMAGE_HEIGHT}
						className={styles.cardImage}
						sizes='(min-width: 1024px) 500px, 100vw'
						aria-hidden='true'
					/>
				) : (
					<div
						className={styles.imgFallback}
						role='img'
						aria-hidden='true'
					/>
				)}
			</div>
		</article>
	);
}
