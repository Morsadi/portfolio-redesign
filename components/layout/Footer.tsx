'use client';
import CopyButton from '@/components/ui/CopyButton/CopyButton';

import styles from './styles/footer.module.css';
import SocialIcons from './SocialIcons';

export default function Footer() {
	return (
		<footer>
			<div className={styles.footerContainer}>
				<h2>Let's get to know each other</h2>
				<CopyButton caption='bmorsadi@gmail.com' />
				<SocialIcons />
			</div>
		</footer>
	);
}
