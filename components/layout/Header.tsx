'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import styles from './styles/header.module.css';

type NavItem = {
	label: string;
	href: string;
};

const NAV: NavItem[] = [
	{ label: 'Home', href: '/' },
	{ label: 'Projects', href: '/projects' },
];

export default function Header() {
	const pathname = usePathname();

	const activeHref = useMemo(() => {
		if (!pathname) return '';
		if (pathname.startsWith('/projects')) return '/projects';
		return pathname;
	}, [pathname]);

	return (
		<header className={styles.header}>
			<div className={styles.inner}>
				<Link
					className={styles.logo}
					href='/'
					aria-label='Go to homepage'>
					<span>Badr Morsadi</span>
				</Link>

				<nav
					className={styles.nav}
					aria-label='Primary navigation'>
					{NAV.map((item) => (
						<Link
							key={item.href}
							href={item.href}
							className={styles.navLink}
							data-active={activeHref === item.href ? 'true' : 'false'}>
							{item.label}
						</Link>
					))}
				</nav>
			</div>
		</header>
	);
}
