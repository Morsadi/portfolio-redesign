import '@testing-library/jest-dom';
import { jest } from '@jest/globals';
import { toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

Object.defineProperty(globalThis, 'IntersectionObserver', {
	writable: true,
	value: jest.fn().mockImplementation(() => ({
		disconnect: jest.fn(),
		observe: jest.fn(),
		takeRecords: jest.fn(),
		unobserve: jest.fn(),
	})),
});

const createMatchMedia = (query: string): MediaQueryList =>
	({
		addEventListener: jest.fn(),
		addListener: jest.fn(),
		dispatchEvent: jest.fn(),
		matches: false,
		media: query,
		onchange: null,
		removeEventListener: jest.fn(),
		removeListener: jest.fn(),
	}) as MediaQueryList;

Object.defineProperty(window, 'matchMedia', {
	writable: true,
	value: jest.fn(createMatchMedia),
});

Object.defineProperty(navigator, 'clipboard', {
	configurable: true,
	value: {
		writeText: jest.fn(),
	},
});
