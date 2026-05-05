import Image from 'next/image';
import styles from './styles/sideBySide.module.css';

import { getAssetAlt, getAssetUrl } from '@/lib/contentful/helpers';

import type { SideBySideProps } from '@/types/content';
import RichTextRenderer from '@/components/layout/RichTextRenderer';

import RevealOnView from '@/components/ui/RevealOnView';

const IMAGE_WIDTH = 1200;

export default function SideBySide({ subtitle, title, description, asset, id, index = 0, body }: SideBySideProps) {
	const headingId = `side-by-side-${id}-title`;

	const imgUrl = getAssetUrl(asset);
	const imgAlt = getAssetAlt(asset, title) || '';

	const isReversed = index % 2 === 1;

	return (
		<RevealOnView
			className={`${styles.sideBySide} ${isReversed ? styles.reversed : ''}`}
			as='section'
			ariaLabel={headingId}>
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

					{body ? (
						<div className={styles.richTextContainer}>
							<RichTextRenderer content={body} />
						</div>
					) : description?.trim() ? (
						<p className={styles.description}>{description.trim()}</p>
					) : null}
				</div>
				<div
					data-img-container
					className={styles.imgContainer}>
					{imgUrl ? (
						<Image
							src={imgUrl}
							alt={imgAlt}
							width={IMAGE_WIDTH}
							height={Math.round(IMAGE_WIDTH * 0.75)}
							sizes='(min-width: 1280px) 700px, (min-width: 1024px) 60vw, 100vw'
							quality={100}
						/>
					) : (
						<div
							className={styles.placeholder}
							aria-hidden='true'
						/>
					)}
				</div>
			</div>
		</RevealOnView>
	);
}
