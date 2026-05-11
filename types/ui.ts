import { type CSSProperties, type ElementType, type ReactNode } from 'react';
export interface ButtonProps {
	caption: string;
	linkToCopy?: string;
	extraClassName?: string;
}

export type RevealOnViewProps = {
	children: ReactNode;
	as?: ElementType;
	className?: string;
	activeClassName?: string;
	threshold?: number;
	rootMargin?: string;
	once?: boolean;
	ariaLabel?: string;
	key?: string;
	style?: CSSProperties;
};
