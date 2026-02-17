import Image from 'next/image';
import type { HeroFields } from '@/types/content';
import CopyButton from '@/components/ui/CopyButton/CopyButton';

import styles from './styles/hero.module.css';

type HeroProps = HeroFields;

export default function Hero({ title, description, asset, isHomepage }: HeroProps) {
	const imgLink = asset?.fields?.file.url ? `https:${asset.fields.file.url}` : '';

	return (
		<section className={styles.hero + ` ${styles[isHomepage ? 'homepage' : 'interior']}`}>
			<div className={styles.contentSection}>
				{title && <h1 className={styles.title}>{title}</h1>}
				{description && <p className={styles.description}>{description}</p>}
				{isHomepage && (
					<CopyButton
						caption='bmorsadi@gmail.com'
						extraClassName={styles.copyButton}
					/>
				)}
			</div>
			{isHomepage && imgLink && (
				<div className={styles.imgContainer}>
					<Image
						src={imgLink}
						alt=''
						width={445}
						height={445}
						className={styles.image}
						priority
					/>
				</div>
			)}
		</section>
	);
}
