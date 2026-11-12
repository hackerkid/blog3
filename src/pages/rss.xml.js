import rss from '@astrojs/rss';
import { SITE_TITLE, SITE_DESCRIPTION } from '../config';
import { getExternalPosts } from '../feeds';

const postImportResult = import.meta.glob('./blog/**/*.{md,mdx}', { eager: true });
const localPosts = Object.values(postImportResult).map((post) => ({
	link: post.url,
	title: post.frontmatter.title,
	pubDate: post.frontmatter.pubDate,
	description: post.frontmatter.description,
}));

export const get = async () => {
	// External posts link out to where they were published, same as on the blog page.
	const externalPosts = (await getExternalPosts()).map((post) => ({
		link: post.url,
		title: post.title,
		pubDate: post.pubDate,
		description: post.description || undefined,
	}));

	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: import.meta.env.SITE,
		items: [...localPosts, ...externalPosts].sort(
			(a, b) => new Date(b.pubDate) - new Date(a.pubDate)
		),
	});
};
