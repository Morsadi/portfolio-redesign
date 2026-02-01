'use client';
import Image from 'next/image';
import type { IntroPanelFields } from '@/types/content';
import CopyButton from '@/components/ui/CopyButton/CopyButton';

import styles from './styles/introPanel.module.css';

type IntroPanelProps = IntroPanelFields;

export default function IntroPanel({ title, description, asset }: IntroPanelProps) {
	const imgLink = asset?.fields?.file.url ? `https:${asset.fields.file.url}` : '';

	return (
		<section className={styles.introPanel}>
			<div className={styles.contentSection}>
				<h1 className={styles.title}>{title}</h1>
				<p className={styles.description}>{description}</p>
				<CopyButton
					caption='bmorsadi@gmail.com'
					extraClassName={styles.copyButton}
				/>
			</div>
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
		</section>
	);
}
