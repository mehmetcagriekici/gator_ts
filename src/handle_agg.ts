import { fetchFeed } from "./lib/rss/rss.js";

export async function handleAgg(cmdName: string, ...args: string[]) {
  const feed = await fetchFeed("https://www.wagslane.dev/index.xml")
  const items = feed.channel.item;
  for (const item of items) {
    console.log(item.title)
    console.log(item.description)
  }
}
