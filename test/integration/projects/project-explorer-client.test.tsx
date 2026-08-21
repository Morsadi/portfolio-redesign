import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import ProjectExplorerClient from '@/components/sections/ProjectsExplorer/ProjectExplorerClient';
import { featuredProjects } from '@/test/fixtures/contentful';
import { mockRouterReplace, resetNavigationState, setNavigationState } from '@/test/mocks/nextNavigation';

const tagOptions = [
	{ name: 'React', slug: 'react' },
	{ name: 'TypeScript', slug: 'typescript' },
	{ name: 'Contentful', slug: 'contentful' },
];

const renderExplorer = () =>
	render(
		<ProjectExplorerClient
			sectionId='projects'
			projects={featuredProjects}
			tagOptions={tagOptions}
		/>,
	);

describe('ProjectExplorerClient', () => {
	beforeEach(() => {
		resetNavigationState();
		setNavigationState('/projects');
	});

	it('opens a checkbox filter menu and keeps its controls out of the accessibility tree while closed', async () => {
		const user = userEvent.setup();
		renderExplorer();

		const filterButton = screen.getByRole('button', { name: 'Filter projects' });
		expect(filterButton).toHaveAttribute('aria-expanded', 'false');
		expect(screen.queryByRole('list', { name: 'Tag filter options' })).not.toBeInTheDocument();
		expect(screen.queryByRole('button', { name: 'Clear all filters' })).not.toBeInTheDocument();

		await user.click(filterButton);

		expect(filterButton).toHaveAttribute('aria-expanded', 'true');
		expect(screen.getByRole('checkbox', { name: 'React' })).not.toBeChecked();
		expect(screen.getByRole('checkbox', { name: 'TypeScript' })).not.toBeChecked();
	});

	it('updates the URL while preserving unrelated query parameters and supports multiple filters', async () => {
		const user = userEvent.setup();
		setNavigationState('/projects', new URLSearchParams('view=grid'));
		const { rerender } = renderExplorer();

		await user.click(screen.getByRole('button', { name: 'Filter projects' }));
		await user.click(screen.getByRole('checkbox', { name: 'React' }));

		expect(mockRouterReplace).toHaveBeenLastCalledWith('/projects?view=grid&tags=react', { scroll: false });

		setNavigationState('/projects', new URLSearchParams('view=grid&tags=react'));
		rerender(
			<ProjectExplorerClient
				sectionId='projects'
				projects={featuredProjects}
				tagOptions={tagOptions}
			/>,
		);

		expect(screen.getByRole('checkbox', { name: 'React' })).toBeChecked();
		await user.click(screen.getByRole('checkbox', { name: 'TypeScript' }));

		expect(mockRouterReplace).toHaveBeenLastCalledWith('/projects?view=grid&tags=react%2Ctypescript', { scroll: false });
	});

	it('filters projects from URL state, ignores invalid tags, and clears filters', async () => {
		const user = userEvent.setup();
		setNavigationState('/projects', new URLSearchParams('view=grid&tags=react,unknown'));
		const { rerender } = renderExplorer();

		expect(screen.getByRole('article', { name: 'Atlas' })).toBeVisible();
		expect(screen.queryByRole('article', { name: 'Beacon' })).not.toBeInTheDocument();
		expect(screen.queryByRole('article', { name: 'Compass' })).not.toBeInTheDocument();

		await user.click(screen.getByRole('button', { name: 'Filter projects (1 selected)' }));
		await user.click(screen.getByRole('button', { name: 'Clear all filters' }));

		expect(mockRouterReplace).toHaveBeenLastCalledWith('/projects?view=grid', { scroll: false });
		expect(screen.queryByRole('list', { name: 'Tag filter options' })).not.toBeInTheDocument();

		setNavigationState('/projects', new URLSearchParams('tags=unknown'));
		rerender(
			<ProjectExplorerClient
				sectionId='projects'
				projects={featuredProjects}
				tagOptions={tagOptions}
			/>,
		);

		expect(screen.getAllByRole('article')).toHaveLength(3);
	});

	it('closes on outside click and restores focus to the filter button on Escape', async () => {
		const user = userEvent.setup();
		renderExplorer();

		const filterButton = screen.getByRole('button', { name: 'Filter projects' });
		await user.click(filterButton);
		fireEvent.mouseDown(document.body);
		expect(screen.queryByRole('list', { name: 'Tag filter options' })).not.toBeInTheDocument();

		await user.click(filterButton);
		const reactCheckbox = screen.getByRole('checkbox', { name: 'React' });
		reactCheckbox.focus();
		await user.keyboard('{Escape}');

		expect(screen.queryByRole('list', { name: 'Tag filter options' })).not.toBeInTheDocument();
		expect(filterButton).toHaveFocus();
	});

	it('has no automated accessibility violations when its filter menu is open', async () => {
		const user = userEvent.setup();
		const { container } = renderExplorer();

		await user.click(screen.getByRole('button', { name: 'Filter projects' }));

		expect(await axe(container)).toHaveNoViolations();
	});
});
