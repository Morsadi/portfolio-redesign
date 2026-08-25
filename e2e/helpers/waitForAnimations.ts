import type { Locator } from '@playwright/test';

export async function waitForAnimations(locator: Locator) {
	await locator.evaluate(async (element) => {
		const animations = element.getAnimations({ subtree: true }).filter((animation) => animation.effect?.getTiming().iterations !== Infinity);

		await Promise.all(animations.map((animation) => animation.finished.catch(() => undefined)));
	});
}
