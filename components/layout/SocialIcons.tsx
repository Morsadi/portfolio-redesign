import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

import styles from './styles/socialIcons.module.css';

export default function SocialIcons() {
	return (
		<ul className={styles.socialIcons}>
			<li>
				<a
					href='https://www.linkedin.com/in/bmorsadi/'
					target='_blank'
					rel='noopener noreferrer'
					aria-label='LinkedIn'>
					<FontAwesomeIcon icon={faLinkedinIn} />
				</a>
			</li>

			<li>
				<a
					href='https://github.com/Morsadi'
					target='_blank'
					rel='noopener noreferrer'
					aria-label='GitHub'>
					<FontAwesomeIcon icon={faGithub} />
				</a>
			</li>
		</ul>
	);
}
