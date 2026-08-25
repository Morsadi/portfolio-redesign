import { buildNextSearchParams, parseTagsParam, serializeTagsParam, TAGS_QUERY_KEY } from '@/lib/contentful/tagQuery';

describe('tagQuery', () => {
	it('uses a stable query key', () => {
		expect(TAGS_QUERY_KEY).toBe('tags');
	});

	describe('parseTagsParam', () => {
		it('returns no tags for missing or blank values', () => {
			expect(parseTagsParam(null)).toEqual([]);
			expect(parseTagsParam('   ')).toEqual([]);
		});

		it('splits comma-separated values and trims whitespace', () => {
			expect(parseTagsParam(' react, typescript ,contentful ')).toEqual(['react', 'typescript', 'contentful']);
		});
	});

	describe('serializeTagsParam', () => {
		it('removes blank values and returns tags in a stable order', () => {
			expect(serializeTagsParam([' TypeScript ', '', 'react', '   ', 'contentful'])).toBe('TypeScript,contentful,react');
		});
	});

	describe('buildNextSearchParams', () => {
		it('adds normalized tags without dropping unrelated query parameters', () => {
			const params = buildNextSearchParams('view=grid&sort=newest', ['react', ' TypeScript ']);

			expect(params.toString()).toBe('view=grid&sort=newest&tags=TypeScript%2Creact');
		});

		it('removes only the tags parameter when no tags are selected', () => {
			const params = buildNextSearchParams('view=grid&tags=react%2Ctypescript&sort=newest', []);

			expect(params.toString()).toBe('view=grid&sort=newest');
		});
	});
});
