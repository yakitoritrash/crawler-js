export default function normalizeURL(urlString: string): string {
  const urlObj = new URL(urlString);
  return `${urlObj.hostname}${urlObj.pathname}`;
}
