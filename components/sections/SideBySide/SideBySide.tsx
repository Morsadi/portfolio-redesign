import Image from 'next/image';
import styles from './styles/sideBySide.module.css';

import { getAssetAlt, getAssetUrl } from '@/lib/contentful/helpers';

import type { SideBySideProps } from '@/types/content';

const IMAGE_WIDTH = 1200;
const IMAGE_HEIGHT = 686;

export default function SideBySide({ subtitle, title, description, asset, id, index = 0 }: SideBySideProps) {
	const headingId = `side-by-side-${id}-title`;

	const imgUrl = getAssetUrl(asset);
	const imgAlt = getAssetAlt(asset, title) || '';

	const isReversed = index % 2 === 1;

	return (
		<section
			className={`${styles.sideBySide} ${isReversed ? styles.reversed : ''}`}
			aria-labelledby={headingId}>
			<div className={styles.inner}>
				<div className={styles.contentSection}>
					{subtitle && subtitle?.trim() ? <p className={styles.subtitle}>{subtitle.trim()}</p> : null}
					{title && (
						<h2
							id={headingId}
							className={styles.title}>
							{title}
						</h2>
					)}

					{description && description?.trim() ? <p className={styles.description}>{description.trim()}</p> : null}
				</div>
				<div
					data-img-container
					className={styles.imgContainer}>
					{imgUrl ? (
						<Image
							src={imgUrl}
							alt={imgAlt}
							width={IMAGE_WIDTH}
							height={IMAGE_HEIGHT}
							sizes='(min-width: 64em) 600px, 100vw'
							className={styles.image}
						/>
					) : (
						<div
							className={styles.placeholder}
							aria-hidden='true'
						/>
					)}
				</div>
			</div>
		</section>
	);
}
