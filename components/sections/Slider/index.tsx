'use client';

import { useEffect, useId, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Glide from '@glidejs/glide';
import '@glidejs/glide/dist/css/glide.core.min.css';

import styles from './styles/slider.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

import type { SliderProps } from '@/types/content';
import { getAssetAlt, getAssetUrl } from '@/lib/contentful/helpers';
import { glideOptions } from '@/lib/glideJs/helpers';

export default function Slider({ title, description, websiteUrl, assets, ariaLabel = 'Project gallery', className }: SliderProps) {
	const id = useId();
	const rootRef = useRef<HTMLDivElement | null>(null);
	const glideRef = useRef<Glide | null>(null);

	const items = (assets ?? []).filter(Boolean);
	const hasSlides = items.length > 0;

	const trackId = `glide-track-${id}`;
	const titleId = title ? `slider-title-${id}` : undefined;

	useEffect(() => {
		if (!rootRef.current) return;
		if (!hasSlides) return;

		glideRef.current?.destroy();
		glideRef.current = null;

		const glide = new Glide(rootRef.current, glideOptions);

		glide.mount();
		glideRef.current = glide;

		return () => {
			glide.destroy();
			glideRef.current = null;
		};
	}, [hasSlides, items.length]);

	if (!hasSlides) return null;

	return (
		<section className={`${styles.sliderSection} ${className ?? ''}`}>
			{(title || description) && (
				<header className={styles.sectionHeader}>
					{title ? (
						<h2
							id={titleId}
							className={styles.title}>
							{title}
						</h2>
					) : null}

					{description ? <p className={styles.description}>{description}</p> : null}

					{websiteUrl ? (
						<Link
							data-underlined-link
							href={websiteUrl}
							target='_blank'
							rel='noopener noreferrer'
							className={styles.websiteLink}
							aria-label='View project website (opens in a new tab)'>
							View Project{' '}
							<FontAwesomeIcon
								icon={faExternalLinkAlt}
								aria-hidden='true'
							/>
						</Link>
					) : null}
				</header>
			)}

			<div
				ref={rootRef}
				className={`${styles.glide} glide`}
				role='region'
				aria-roledescription='carousel'
				aria-live='off'
				aria-label={title ? undefined : ariaLabel}
				aria-labelledby={titleId}>
				<div
					className={styles.controls}
					data-glide-el='controls'>
					<button
						type='button'
						className={styles.navButton}
						data-glide-dir='<'
						aria-controls={trackId}
						aria-label='Previous slide'>
						<FontAwesomeIcon
							icon={faChevronLeft}
							aria-hidden='true'
						/>
					</button>

					<button
						type='button'
						className={styles.navButton}
						data-glide-dir='>'
						aria-controls={trackId}
						aria-label='Next slide'>
						<FontAwesomeIcon
							icon={faChevronRight}
							aria-hidden='true'
						/>
					</button>
				</div>

				<div
					id={trackId}
					className={`${styles.track} glide__track`}
					data-glide-el='track'>
					<ul className={`${styles.slides} glide__slides`}>
						{items.map((asset) => {
							const url = getAssetUrl(asset);
							if (!url) return null;

							const alt = getAssetAlt(asset, 'Project image') || '';
							const key = asset.sys?.id ?? url;

							return (
								<li
									key={key}
									className={`${styles.slide} glide__slide`}>
									<figure className={styles.figure}>
										<Image
											src={url}
											alt={alt}
											width={852}
											height={597}
											sizes='(min-width: 1921px) calc((100vw - 230px) / 3), (min-width: 1441px) calc((100vw - 215px) / 2), (min-width: 1025px) calc((100vw - 110px) / 2), (min-width: 641px) calc(100vw - 200px), calc(100vw - 100px)'
											className={styles.image}
										/>
									</figure>
								</li>
							);
						})}
					</ul>
				</div>
			</div>
		</section>
	);
}
