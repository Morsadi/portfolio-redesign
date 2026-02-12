import type { Metadata } from 'next';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;
import styles from './layout.module.css';

import { Inter } from 'next/font/google';
import '../styles/_index.css';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const inter = Inter({
	subsets: ['latin'],
	variable: '--font-geist-sans',
	weight: ['400', '500', '600', '700', '900'],
});

export const metadata: Metadata = {
	title: 'Badr Morsadi',
	description: 'A web developer portfolio showcasing projects and skills.',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={`${inter.variable}`}>
				<div className={styles.pageContainer}>
					<Header />
					<main className={styles.mainContainer}>{children}</main>
					<Footer />
				</div>
			</body>
		</html>
	);
}
