'use client';

import { useEffect, useRef, useState } from 'react';
import type { RevealOnViewProps } from '@/types/ui';
import styles from './RevealOnView.module.css';

export const RevealOnView = ({
	children,
	as: Component = 'div',
	className = '',
	activeClassName = styles.active,
	threshold = 0.2,
	rootMargin = '0px 0px -10% 0px',
	once = true,
	ariaLabel,
	key,
	style,
}: RevealOnViewProps) => {
	const elementRef = useRef<HTMLElement | null>(null);
	const [isActive, setIsActive] = useState(false);

	useEffect(() => {
		const element = elementRef.current;

		if (!element) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsActive(true);

					if (once) {
						observer.unobserve(element);
					}
				} else if (!once) {
					setIsActive(false);
				}
			},
			{
				threshold,
				rootMargin,
			},
		);

		observer.observe(element);

		return () => {
			observer.disconnect();
		};
	}, [once, rootMargin, threshold]);

	return (
		<Component
			ref={elementRef}
			className={`${styles.reveal} ${isActive ? activeClassName : ''} ${className}`}
			aria-label={ariaLabel}
			data-active={isActive}
			key={key}
			style={style}>
			{children}
		</Component>
	);
};

export default RevealOnView;
