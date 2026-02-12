import { useEffect } from 'react';

export const useClickOutside = (isActive: boolean, containerEl: React.RefObject<HTMLElement | null>, onOutside: () => void) => {
	useEffect(() => {
		if (!isActive) return;

		const onMouseDown = (event: MouseEvent) => {
			const target = event.target as Node | null;
			if (!target) return;
			if (!containerEl.current?.contains(target)) onOutside();
		};

		document.addEventListener('mousedown', onMouseDown);
		return () => document.removeEventListener('mousedown', onMouseDown);
	}, [isActive, containerEl, onOutside]);
};
