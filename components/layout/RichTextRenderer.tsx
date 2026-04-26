import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES, type Document, type Text } from '@contentful/rich-text-types';

type Props = {
	content: Document;
};

const RichTextRenderer = ({ content }: Props) => {
	return documentToReactComponents(content, {
		renderNode: {
			[BLOCKS.PARAGRAPH]: (node, children) => {
				const raw = node.content.map((c) => ('value' in c ? (c as Text).value : '')).join('');

				if (raw.includes('\n-')) {
					const items = raw.split('\n').filter(Boolean);

					return (
						<ul aria-label='Session details'>
							{items.map((item, i) => (
								<li key={i}>{item.replace(/^-\s*/, '')}</li>
							))}
						</ul>
					);
				}

				return <p className={styles.p}>{children}</p>;
			},

			[INLINES.HYPERLINK]: (node, children) => {
				return (
					<a
						href={node.data.uri}
						target='_blank'
						rel='noopener noreferrer'
						aria-label={`Open link: ${children}`}>
						{children}
					</a>
				);
			},
		},
	});
};

export default RichTextRenderer;
