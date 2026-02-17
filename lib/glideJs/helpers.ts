// glide options. Can be extended with custom options when initializing Glide in Slider component.
// Will leave for now
export const glideOptions = {
	type: 'carousel',
	perView: 3,
	gap: 15,
	focusAt: 0,
	animationDuration: 1000,
	peek: { before: 100, after: 100 },
	breakpoints: {
		1920: {
			perView: 2,
		},
		1440: {
			perView: 2,
			gap: 10,
			peek: { before: 50, after: 50 },
		},
		1024: {
			focusAt: 'center',
			perView: 1,
			gap: 10,
			peek: { before: 100, after: 100 },
		},
		640: {
			focusAt: 'center',
			perView: 1,
			gap: 10,
			peek: { before: 50, after: 50 },
		},
	},
} as const;
