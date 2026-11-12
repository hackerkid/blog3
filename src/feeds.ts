import { SUBSTACK_URL } from './substack';

// Posts published elsewhere that are listed on the site and link out to the original.
export const EXTERNAL_FEEDS = [
	{ source: 'substack', label: 'Substack', url: `${SUBSTACK_URL}/feed` },
	{ source: 'diffblog', label: 'diff.blog', url: 'https://hackerkid.diff.blog/feed.xml' },
] as const;

export type ExternalSource = typeof EXTERNAL_FEEDS[number]['source'];

export interface ExternalPost {
	title: string;
	url: string;
	pubDate: string;
	description: string;
	source: ExternalSource;
	label: string;
}

const tag = (xml: string, name: string) => {
	const match = xml.match(new RegExp(`<${name}>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?</${name}>`));
	return match ? match[1].trim() : '';
};

// Fetched at build time. If a feed is unreachable, the site still builds without its posts.
async function getFeedPosts({ source, label, url }: typeof EXTERNAL_FEEDS[number]): Promise<ExternalPost[]> {
	try {
		const response = await fetch(url);
		if (!response.ok) throw new Error(`HTTP ${response.status}`);
		const xml = await response.text();

		return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map(([, item]) => ({
			title: tag(item, 'title'),
			url: tag(item, 'link'),
			pubDate: new Date(tag(item, 'pubDate')).toISOString(),
			description: tag(item, 'description'),
			source,
			label,
		}));
	} catch (error) {
		console.warn(`Could not fetch ${label} feed: ${error}`);
		return [];
	}
}

export async function getExternalPosts(): Promise<ExternalPost[]> {
	return (await Promise.all(EXTERNAL_FEEDS.map(getFeedPosts))).flat();
}
