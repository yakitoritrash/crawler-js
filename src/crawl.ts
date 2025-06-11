import { JSDOM } from 'jsdom'

export function normalizeURL(urlString: string): string {
  const urlObj = new URL(urlString);
  const hostname = `${urlObj.hostname}${urlObj.pathname}`;
  if (hostname.length > 0 && hostname.slice(-1) === '/') {
    return hostname.slice(0, -1);
  }
  return hostname;
}

export function getURLsFromHTML(html: string, baseURL: string): string[] {
  const urls: string[] = [];
  const dom = new JSDOM(html);
  const linkElements = dom.window.document.querySelectorAll('a');
  for (const linkElement of linkElements) {
    const href = linkElement.getAttribute('href');
    if (!href) continue;

    if (href.startsWith('/')) {
      try {
        const url = new URL(href, baseURL);
        urls.push(url.href);
      } catch {

      }
    }
  }
  return urls;
}
