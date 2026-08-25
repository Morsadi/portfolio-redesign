import { render, screen, within } from '@testing-library/react';
import { axe } from 'jest-axe';

import About from '@/components/sections/About';
import type { ContentfulEntry, ExperienceEntryFields } from '@/types/cms/contentful';

const experiences: Array<ContentfulEntry<ExperienceEntryFields>> = [
	{
		sys: { id: 'simpleview' },
		fields: {
			company: 'Simpleview',
			description: 'Built accessible web experiences.',
			endDate: '2025',
			role: 'Web Developer',
			startDate: '2020',
		},
	},
	{
		sys: { id: 'headrush' },
		fields: {
			company: 'Headrush',
			description: 'Implemented responsive interfaces.',
			role: 'Frontend Developer, Content Specialist',
			startDate: '2018',
		},
	},
];

describe('About', () => {
	it('renders experience entries as a labelled section and semantic list items', () => {
		render(
			<About
				title='Experience'
				subtitle='Selected roles'
				description='A brief work history.'
				experiences={experiences}
			/>,
		);

		const section = screen.getByRole('region', { name: 'Experience' });
		expect(within(section).getByRole('heading', { level: 2, name: 'Experience' })).toBeVisible();
		expect(within(section).getByText('Selected roles')).toBeVisible();

		const experienceItems = within(section).getAllByRole('listitem');
		expect(experienceItems).toHaveLength(2);
		expect(within(experienceItems[0]).getByRole('heading', { level: 3, name: 'Simpleview' })).toBeVisible();
		expect(within(experienceItems[0]).getByRole('heading', { level: 4, name: 'Web Developer' })).toBeVisible();
		expect(within(experienceItems[0]).getByText('2020')).toHaveAttribute('datetime', '2020');
		expect(within(experienceItems[0]).getByText('- 2025')).toHaveAttribute('datetime', '2025');
		expect(within(experienceItems[1]).getByRole('heading', { level: 4, name: 'Frontend Developer & Content Specialist' })).toBeVisible();
	});

	it('omits the experience list when no entries are available', () => {
		render(<About title='Experience' />);

		const section = screen.getByRole('region', { name: 'Experience' });
		expect(within(section).queryByRole('list')).not.toBeInTheDocument();
	});

	it('has no automated accessibility violations', async () => {
		const { container } = render(
			<About
				title='Experience'
				experiences={experiences}
			/>,
		);

		expect(await axe(container)).toHaveNoViolations();
	});
});
