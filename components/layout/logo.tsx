import Link from 'next/link';
import styles from './styles/header.module.css';

export default function Logo() {
	return (
		<Link
			className={styles.navLink}
			href='/'
			aria-label='Go to homepage'>
			<span>Badr Morsadi</span>
		</Link>
	);
}
