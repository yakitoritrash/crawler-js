import { JSDOM } from 'jsdom'

export async function crawlPage(currentURL: string) {
  console.log(`actively crawling: ${currentURL}`)

  try {
    const resp = await fetch(currentURL);
    console.log(await resp.text());
  } catch(err) {
    if (err instanceof Error) {
       console.log(`error in fetch: ${err.message}, on page: ${currentURL}`)
    }
  }
}

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
    if (href.startsWith('/') || href.startsWith('https:') || href.startsWith('http://')) {
      try {
        const url = new URL(href, baseURL);
        urls.push(url.href);
      } catch (err) {
        if (err instanceof Error) {
        console.log(`error with relative url: ${err.message}`)
        }
      }
    }
  }
  return urls;
}
