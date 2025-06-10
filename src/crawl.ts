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
    const url = new URL(linkElement.href, baseURL).href;
    urls.push(url);
  }
  return urls;
}
