export function printReport(pages: { [url: string]: number }) {
  console.log("===================")
  console.log("REPORT")
  console.log("===================")
  const sortedPages = sortPages(pages);
  for (const sortPage of sortedPages) {
    const url = sortPage[0]
    const hits = sortPage[1]
    console.log(`Found ${hits} links to page: ${url}`)
  }
  console.log("===================")
  console.log("END REPORT")
  console.log("===================")
}

export default function sortPages(pages: { [url: string]: number }): [string, number][] {
  return Object.entries(pages).sort((a, b) => b[1] - a[1])
}
