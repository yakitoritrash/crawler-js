import { crawlPage } from "./crawl";

export default function sortPages(pages: { [url: string]: number }): [string, number][] {
  return Object.entries(pages).sort((a, b) => b[1] - a[1])
}
