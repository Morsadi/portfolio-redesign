'use client';

import styles from './styles/header.module.css';
import Logo from './logo';
import Navigation from './Navigation';
import CopyButton from '@/components/ui/CopyButton/CopyButton';
import { useHasMounted } from '@/hooks/useHasMounted';
import { useMediaQuery } from '@/hooks/useMediaQuery';

export default function Header() {
	const mounted = useHasMounted();
	const isMobile = useMediaQuery('(max-width: 759px)');
	return (
		<header className={styles.header}>
			<Logo />
			<div className={styles.headerRight}>
				<Navigation />
				{mounted && !isMobile && <CopyButton caption='bmorsadi@gmail.com' />}
			</div>
		</header>
	);
}
