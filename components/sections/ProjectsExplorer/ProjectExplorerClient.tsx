'use client';

import { useMemo, useRef, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import styles from './styles/projectExplorer.module.css';
import ProjectCard from '@/components/ui/ProjectCard/ProjectCard';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faCirclePlus } from '@fortawesome/free-solid-svg-icons';

import type { ContentfulEntry, ProjectEntryFields, TagEntryFields } from '@/types/cms/contentful';

import { useClickOutside } from '@/hooks/useClickOutside';
import { TAGS_QUERY_KEY, parseTagsParam, serializeTagsParam } from '@/lib/contentful/tagQuery';
import { getProjectTagSlugs } from '@/lib/contentful/helpers';

type ProjectExplorerClientProps = {
	sectionId: string;
	projects: Array<ContentfulEntry<ProjectEntryFields>>;
	tagOptions: TagEntryFields[];
};

export default function ProjectExplorerClient({ sectionId, projects, tagOptions }: ProjectExplorerClientProps) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const [isOpen, setIsOpen] = useState(false);

	const filterControlsRef = useRef<HTMLDivElement | null>(null);

	useClickOutside(isOpen, filterControlsRef, () => setIsOpen(false));

	const allowedSlugs = useMemo(() => new Set(tagOptions.map((t) => t.slug.trim()).filter(Boolean)), [tagOptions]);

	const selectedSlugs = useMemo(() => {
		const fromUrl = parseTagsParam(searchParams.get(TAGS_QUERY_KEY));
		return new Set(fromUrl.filter((slug) => allowedSlugs.has(slug)));
	}, [searchParams, allowedSlugs]);

	const selectedCount = selectedSlugs.size;

	const setTagsInUrl = (next: string[]) => {
		const params = new URLSearchParams(searchParams.toString());

		if (next.length) params.set(TAGS_QUERY_KEY, serializeTagsParam(next));
		else params.delete(TAGS_QUERY_KEY);

		const query = params.toString();
		router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
	};

	const toggleTag = (slug: string) => {
		const next = new Set(selectedSlugs);
		if (next.has(slug)) next.delete(slug);
		else next.add(slug);

		setTagsInUrl(Array.from(next));
	};

	const clearTagsAndClose = () => {
		setTagsInUrl([]);
		setIsOpen(false);
	};

	const projectTagSlugsById = useMemo(() => {
		const map = new Map<string, string[]>();
		for (const project of projects) {
			map.set(project.sys.id, getProjectTagSlugs(project));
		}
		return map;
	}, [projects]);

	const filteredProjects = useMemo(() => {
		if (!selectedSlugs.size) return projects;

		return projects.filter((project) => {
			const slugs = projectTagSlugsById.get(project.sys.id) ?? [];
			return slugs.some((slug) => selectedSlugs.has(slug));
		});
	}, [projects, selectedSlugs, projectTagSlugsById]);

	return (
		<div className={styles.projectExplorerClient}>
			<div className={styles.filter}>
				<div
					ref={filterControlsRef}
					className={styles.filterControls}>
					<button
						type='button'
						className={styles.dropdownButton}
						aria-label={selectedCount ? `Filter projects (${selectedCount} selected)` : 'Filter projects'}
						aria-expanded={isOpen}
						aria-controls={`tags-panel-${sectionId}`}
						onClick={() => setIsOpen((v) => !v)}>
						<span className={styles.dropdownButtonLabel}>Filter</span>
						<FontAwesomeIcon
							icon={faFilter}
							aria-hidden='true'
						/>
					</button>

					<button
						type='button'
						className={`${styles.clearButton} ${selectedCount > 0 ? '' : styles.hidden}`}
						onClick={clearTagsAndClose}
						aria-label='Clear all filters'>
						Clear all filters <span className={styles.clearButtonCount}>({selectedCount})</span>
					</button>
					<ul
						id={`tags-panel-${sectionId}`}
						aria-hidden={!isOpen}
						className={`${styles.dropdownPanel} ${isOpen ? styles.open : ''}`}
						aria-label='Tag filter options'>
						{tagOptions.map((tag) => {
							const slug = tag.slug.trim();
							const name = tag.name.trim();

							if (!slug || !name) return null;

							const inputId = `tag-${sectionId}-${slug}`;
							const checked = selectedSlugs.has(slug);

							return (
								<li
									key={slug}
									className={styles.option}>
									<label
										htmlFor={inputId}
										className={styles.optionLabel}>
										<input
											id={inputId}
											type='checkbox'
											className={styles.optionCheckbox}
											checked={checked}
											onChange={() => toggleTag(slug)}
										/>
										<FontAwesomeIcon
											icon={faCirclePlus}
											aria-hidden='true'
											className={styles.optionIcon}
										/>
										<span className={styles.optionText}>{name}</span>
									</label>
								</li>
							);
						})}
					</ul>
				</div>
			</div>

			<ul
				className={styles.projectsContainer}
				aria-label='Projects'>
				{filteredProjects.map((project) => (
					<li
						key={project.sys.id}
						className={styles.projectItem}>
						<ProjectCard project={project} />
					</li>
				))}
			</ul>

			<p className={styles.resultsCount}>
				{filteredProjects.length === 0 ? 'No projects match the selected filters.' : `${filteredProjects.length} result${filteredProjects.length === 1 ? '' : 's'}`}
			</p>
		</div>
	);
}
