import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
	dir: './',
});

/** @type {import('jest').Config} */
const customJestConfig = {
	coverageDirectory: '<rootDir>/coverage',
	coverageProvider: 'v8',
	collectCoverageFrom: [
		'**/*.{ts,tsx}',
		'!**/*.d.ts',
		'!<rootDir>/.next/**',
		'!<rootDir>/coverage/**',
		'!<rootDir>/test/**',
		'!<rootDir>/*.config.*',
		'!<rootDir>/next-env.d.ts',
	],
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/$1',
		'^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
		'^.+\\.(css|sass|scss)$': '<rootDir>/test/mocks/styleMock.js',
		'^.+\\.(png|jpg|jpeg|gif|webp|avif|ico|bmp|svg)$': '<rootDir>/test/mocks/fileMock.js',
		'^next/font/(.*)$': '<rootDir>/test/mocks/nextFontMock.js',
		'^server-only$': '<rootDir>/test/mocks/empty.js',
		'^next/image$': '<rootDir>/test/mocks/nextImage.tsx',
		'^next/navigation$': '<rootDir>/test/mocks/nextNavigation.ts',
	},
	setupFilesAfterEnv: ['<rootDir>/test/setup.ts'],
	testEnvironment: 'jsdom',
	testMatch: ['<rootDir>/test/**/*.test.{ts,tsx}'],
	testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
};

export default createJestConfig(customJestConfig);
