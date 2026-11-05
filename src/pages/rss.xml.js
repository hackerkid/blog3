import rss from '@astrojs/rss';
import { SITE_TITLE, SITE_DESCRIPTION } from '../config';
import { getSubstackPosts } from '../substack';

const postImportResult = import.meta.glob('./blog/**/*.{md,mdx}', { eager: true });
const localPosts = Object.values(postImportResult).map((post) => ({
	link: post.url,
	title: post.frontmatter.title,
	pubDate: post.frontmatter.pubDate,
	description: post.frontmatter.description,
}));

export const get = async () => {
	// Substack posts link out to Substack, same as on the blog page.
	const substackPosts = (await getSubstackPosts()).map((post) => ({
		link: post.url,
		title: post.title,
		pubDate: post.pubDate,
	}));

	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: import.meta.env.SITE,
		items: [...localPosts, ...substackPosts].sort(
			(a, b) => new Date(b.pubDate) - new Date(a.pubDate)
		),
	});
};
