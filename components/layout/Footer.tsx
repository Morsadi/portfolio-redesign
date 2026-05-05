'use client';
import CopyButton from '@/components/ui/CopyButton';

import RevealOnView from '@/components/ui/RevealOnView';

import styles from './styles/footer.module.css';
import SocialIcons from './SocialIcons';

export default function Footer() {
	return (
		<RevealOnView
			as='footer'
			once={false}>
			<div className={styles.footerContainer}>
				<h2>Let&apos;s get to know each other</h2>
				<CopyButton caption='bmorsadi@gmail.com' />
				<SocialIcons />
			</div>
		</RevealOnView>
	);
}
