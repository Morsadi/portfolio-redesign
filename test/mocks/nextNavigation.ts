import { jest } from '@jest/globals';

let pathname = '/';
let searchParams = new URLSearchParams();

export const mockRouterReplace = jest.fn();

export const setNavigationState = (nextPathname: string, nextSearchParams = new URLSearchParams()) => {
	pathname = nextPathname;
	searchParams = nextSearchParams;
};

export const resetNavigationState = () => {
	pathname = '/';
	searchParams = new URLSearchParams();
	mockRouterReplace.mockReset();
};

export const usePathname = () => pathname;

export const useRouter = () => ({ replace: mockRouterReplace });

export const useSearchParams = () => searchParams;
