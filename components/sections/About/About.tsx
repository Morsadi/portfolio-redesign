import styles from './styles/about.module.css';
import type { AboutFields } from '@/types/content';

export default function About({ title, subtitle, description, experiences }: AboutFields) {
	const headingId = 'about-section-title';
	return (
		<section
			className={styles.aboutSection}
			aria-labelledby={headingId}>
			<header className={styles.sectionHeader}>
				{title && (
					<h2
						id={headingId}
						className={styles.title}>
						{title}
					</h2>
				)}
				<div className={styles.sectionContent}>
					{subtitle && <p className={styles.subtitle}>{subtitle}</p>}
					{description && <p className={styles.description}>{description}</p>}
				</div>
			</header>

			{experiences?.length ? (
				<ul className={styles.experiences}>
					{experiences.map(({ fields: exp, sys }) => (
						<li
							key={`${sys.id}`}
							className={styles.experienceItem}>
							<div className={styles.experienceGrid}>
								<div className={styles.timeCol}>
									{exp.startDate && (
										<time
											className={styles.startDate}
											dateTime={exp.startDate}>
											{exp.startDate}
										</time>
									)}
									{exp.endDate && (
										<time
											className={styles.endDate}
											dateTime={exp.endDate}>
											- {exp.endDate}
										</time>
									)}
								</div>

								<div
									className={styles.bodyCol}
									aria-label={`Experience at ${exp.company} as ${exp.role}`}>
									<div className={styles.expHeader}>
										{exp.company && <h3 className={styles.company}>{exp.company}</h3>}
										{exp.role && <p className={styles.expSubtitle}>{exp.role}</p>}
									</div>
									{exp.description ? <p className={styles.expDescription}>{exp.description}</p> : null}
								</div>
							</div>
						</li>
					))}
				</ul>
			) : null}
		</section>
	);
}
