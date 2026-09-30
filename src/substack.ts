export const SUBSTACK_URL = 'https://vishnuks.substack.com';
export const SUBSTACK_FEED_URL = `${SUBSTACK_URL}/feed`;

export interface SubstackPost {
	title: string;
	url: string;
	pubDate: string;
}

const tag = (xml: string, name: string) => {
	const match = xml.match(new RegExp(`<${name}>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?</${name}>`));
	return match ? match[1].trim() : '';
};

// Fetched at build time. If Substack is unreachable, the site still builds without these posts.
export async function getSubstackPosts(): Promise<SubstackPost[]> {
	try {
		const response = await fetch(SUBSTACK_FEED_URL);
		if (!response.ok) throw new Error(`HTTP ${response.status}`);
		const xml = await response.text();

		return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map(([, item]) => ({
			title: tag(item, 'title'),
			url: tag(item, 'link'),
			pubDate: new Date(tag(item, 'pubDate')).toISOString(),
		}));
	} catch (error) {
		console.warn(`Could not fetch Substack feed: ${error}`);
		return [];
	}
}
