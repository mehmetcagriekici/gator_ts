import { XMLParser } from "fast-xml-parser";
import { type Feed, type User } from "../db/schema.js";

export type RSSFeed = {
  channel: {
    title: string;
    link: string;
    description: string;
    item: RSSItem[];
  };
};

export type RSSItem = {
  title: string;
  link: string;
  description: string;
  pubDate: string;
};

export async function fetchFeed(feedUrl: string): RssFeed {
  const resp = await fetch(feedUrl, {
    headers: {
      "User-Agent": "gator"
    }
  });

  const data = await resp.text();
  const parser = new XMLParser();
  const xmlObj = parser.parse(data);
  const channel = xmlObj["rss"]["channel"];
  
  if (!channel) {
    throw new Error("Cannot continue with xml parsing. Invalid syntax. Object does not contain channel key.");
  }

  const title = channel["title"];
  const link = channel["link"];
  const description = channel["description"];

  if (!title || !link || !description) {
    throw new Error("Cannot continue with xml parsing. Invalid syntax. Object does not contain one of the channel keys.");
  }

  let items = [];
  if (channel["item"]) {
    if (Array.isArray(channel["item"])) items = channel["item"];
    else items = Array.from(Object.values(channel["item"]));
  }

  const results: RSSFeed = {
    channel: {
      title,
      link,
      description,
      item: []
    }
  }
  
  for (const item of items) {
    const itemTitle = item["title"];
    const itemLink = item["link"];
    const itemDesc = item["description"];
    const pubDate = item["pubDate"];
    if (!itemTitle || !itemLink || !itemDesc || !pubDate) {
      continue;
    }
    
    results.channel.item.push(item);
  }

  return results;
}

export function printFeed(feed: Feed, user: User) {
  console.log(user.name);
  console.log(feed.name);
  console.log(feed.url);
}
