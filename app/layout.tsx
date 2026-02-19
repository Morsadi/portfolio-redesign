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

const defaultMetaTitle = 'Badr Morsadi | Software Developer';
const defaultMetaDescription = 'Front-end developer building data-driven applications with React, Vue, and Next.js.';

export const metadata: Metadata = {
	metadataBase: new URL('https://badrmorsadi.com'),
	title: {
		default: 'Badr Morsadi | Software Developer',
		template: '%s | Badr Morsadi | Software Developer, IoT Enthusiast',
	},
	description: defaultMetaDescription,
	openGraph: {
		siteName: defaultMetaTitle,
		type: 'website',
		title: defaultMetaTitle,
		description: defaultMetaDescription,
		url: 'https://badrmorsadi.com',
		images: [
			{
				url: '/profile.png',
			},
		],
		locale: 'en_US',
	},
	twitter: {
		card: 'summary_large_image',
	},
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
					{children}
					<Footer />
				</div>
			</body>
		</html>
	);
}
