import { JSDOM } from 'jsdom'

export async function crawlPage(baseURL: string, currentURL: string, pages: { [url: string]: number}) {
  const baseURLObj = new URL(baseURL);
  const currentURLObj = new URL(currentURL);
  if (baseURLObj.hostname !== currentURLObj.hostname) {
    return pages;
  }

  const normalizedCurrentURL= normalizeURL(currentURL);
  if (normalizedCurrentURL in pages) {
    pages[normalizedCurrentURL]++
    return pages;
  }

  pages[normalizedCurrentURL] = 1

  console.log(`actively crawling: ${currentURL}`)

  try {
    const resp = await fetch(currentURL);
    if (resp.status > 399) {
      console.log(`error in fetch with status code: ${resp.status} on page ${currentURL}`)
      return pages;
    }

    const contentType = resp.headers.get("content-type")
    if (contentType) {
    if (!contentType.includes("text/html")) {
      console.log(`non html response, content type:: ${contentType} on page: ${currentURL}`)
      return pages;
    }
    }
    const htmlBody = (await resp.text());
    
    let nextURLs = getURLsFromHTML(htmlBody, baseURL);

    for (const nextURL of nextURLs) {
      pages = await crawlPage(baseURL, nextURL, pages)
    }
  } catch(err) {
    if (err instanceof Error) {
       console.log(`error in fetch: ${err.message}, on page: ${currentURL}`)
    }
  }
  return pages;
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
