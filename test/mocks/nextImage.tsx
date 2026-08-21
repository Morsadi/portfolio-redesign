import type { ComponentProps } from 'react';

type NextImageProps = ComponentProps<'img'> & {
	blurDataURL?: string;
	fill?: boolean;
	priority?: boolean;
	quality?: number;
	src: string | { src: string };
};

export default function NextImage({ alt, blurDataURL, fill, priority, quality, src, ...props }: NextImageProps) {
	void blurDataURL;
	void fill;
	void priority;
	void quality;

	const imageSrc = typeof src === 'string' ? src : src.src;

	return (
		// eslint-disable-next-line @next/next/no-img-element
		<img
			{...props}
			alt={alt ?? ''}
			src={imageSrc}
		/>
	);
}
