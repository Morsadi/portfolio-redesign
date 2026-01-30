'use client';

import { useState, useRef } from 'react';
import styles from './copyButton.module.css';
import type { ButtonProps } from '@/types/ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';

export default function CopyButton({ caption, linkToCopy = '' }: ButtonProps) {
	const [copied, setCopied] = useState(false);
	const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const copyToClipboard = () => {
		const value = linkToCopy || caption;
		navigator.clipboard.writeText(value);

		setCopied(true);

		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}

		timeoutRef.current = setTimeout(() => {
			setCopied(false);
		}, 3000);
	};

	return (
		<button
			type='button'
			aria-label={caption}
			onClick={copyToClipboard}
			className={`${styles.copyButton} ${copied ? styles.copied : ''}`}>
			<span className={styles.label}>{caption}</span>
			<FontAwesomeIcon icon={faCopy} />
		</button>
	);
}
