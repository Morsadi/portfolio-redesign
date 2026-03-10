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

const defaultMetaTitle = 'Badr Morsadi | Software Engineer';
const defaultMetaDescription = 'Software engineer building data-driven interfaces, modern web platforms, and interactive systems that connect software with real-world data.';

export const metadata: Metadata = {
	metadataBase: new URL('https://badrmorsadi.com'),

	title: {
		default: defaultMetaTitle,
		template: '%s | Badr Morsadi',
	},

	description: defaultMetaDescription,

	keywords: [
		'Badr Morsadi',
		'Software Engineer',
		'Frontend Engineer',
		'Next.js Developer',
		'React Developer',
		'Web Applications',
		'Data Interfaces',
		'CMS Architecture',
		'IoT Dashboards',
		'Phoenix Software Developer',
	],

	openGraph: {
		siteName: defaultMetaTitle,
		type: 'website',
		title: defaultMetaTitle,
		description: defaultMetaDescription,
		url: 'https://badrmorsadi.com',
		images: [
			{
				url: '/profile.png',
				width: 1200,
				height: 630,
				alt: 'Badr Morsadi portfolio',
			},
		],
		locale: 'en_US',
	},

	twitter: {
		card: 'summary_large_image',
		title: defaultMetaTitle,
		description: defaultMetaDescription,
		images: ['/profile.png'],
	},

	authors: [{ name: 'Badr Morsadi', url: 'https://badrmorsadi.com' }],
	creator: 'Badr Morsadi',
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
