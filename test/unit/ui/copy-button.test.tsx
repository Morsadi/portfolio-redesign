import { act, fireEvent, render, screen } from '@testing-library/react';
import { jest } from '@jest/globals';

import CopyButton from '@/components/ui/CopyButton';

describe('CopyButton', () => {
	beforeEach(() => {
		jest.useFakeTimers();
		jest.mocked(navigator.clipboard.writeText).mockReset();
	});

	afterEach(() => {
		jest.useRealTimers();
	});

	it('copies its caption and announces temporary feedback', () => {
		render(<CopyButton caption='bmorsadi@gmail.com' />);

		const button = screen.getByRole('button', { name: 'Copy bmorsadi@gmail.com to clipboard' });
		fireEvent.click(button);

		expect(navigator.clipboard.writeText).toHaveBeenCalledWith('bmorsadi@gmail.com');
		expect(button).toBeDisabled();
		expect(screen.getByRole('status')).toHaveTextContent('Copied!');

		act(() => {
			jest.advanceTimersByTime(3000);
		});

		expect(button).toBeEnabled();
		expect(screen.getByRole('status')).toBeEmptyDOMElement();
	});

	it('copies linkToCopy when it is provided', () => {
		render(
			<CopyButton
				caption='Portfolio URL'
				linkToCopy='https://example.com/portfolio'
			/>,
		);

		fireEvent.click(screen.getByRole('button', { name: 'Copy Portfolio URL to clipboard' }));

		expect(navigator.clipboard.writeText).toHaveBeenCalledWith('https://example.com/portfolio');
	});
});
