import Link from 'next/link';
import styles from './layout.module.css';

export default function NotFound() {
	return (
		<main aria-labelledby='not-found-title'>
			<section className={styles.notFound}>
				<h1
					id='not-found-title'
					className={styles.title}>
					Page not found
				</h1>

				<div className={styles.actions}>
					<Link
						data-underlined-link
						href='/'
						className={styles.primaryButton}
						aria-label='Go back to the homepage'>
						Home
					</Link>

					<Link
						data-underlined-link
						href='/projects'
						className={styles.secondaryButton}
						aria-label='View projects'>
						View projects
					</Link>
				</div>
			</section>
		</main>
	);
}
