import Link from 'next/link';
import styles from './tagLinks.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTags } from '@fortawesome/free-solid-svg-icons';

import type { TagLinksProps } from '@/types/content';

export default function TagLinks({ tags, basePath = '/projects', ariaLabel = 'Project tags', showIcon = false, className, listClassName }: TagLinksProps) {
	if (!tags?.length) return null;

	return (
		<nav
			className={styles.tagLinksContainer + (className ? ` ${className}` : '')}
			aria-label={ariaLabel}>
			{showIcon ? (
				<span
					className={styles.icon}
					aria-hidden='true'>
					<FontAwesomeIcon icon={faTags} />
				</span>
			) : null}

			<ul className={`${styles.tags} ${listClassName ?? ''}`}>
				{tags.map((tag) => {
					const slug = tag.fields.slug?.trim();
					const name = tag.fields.name?.trim();

					if (!slug || !name) return null;

					const href = `${basePath}?tags=${slug}`;

					return (
						<li
							key={tag.sys.id}
							className={styles.tagItem}>
							<Link
								className={styles.tagLink}
								href={href}
								aria-label={`Filter projects by tag: ${name}`}>
								{name}
							</Link>
						</li>
					);
				})}
			</ul>
		</nav>
	);
}
