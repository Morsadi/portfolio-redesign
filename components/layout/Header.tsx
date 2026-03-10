'use client';

import styles from './styles/header.module.css';
import Logo from './logo';
import Navigation from './Navigation';
import CopyButton from '@/components/ui/CopyButton/CopyButton';

export default function Header() {
	return (
		<header className={styles.header}>
			<div className={styles.headerInner}>
				<Logo />
				<div className={styles.headerRight}>
					<Navigation />
					<CopyButton
						caption='bmorsadi@gmail.com'
						extraClassName={styles.copyButton}
					/>
				</div>
			</div>
		</header>
	);
}
