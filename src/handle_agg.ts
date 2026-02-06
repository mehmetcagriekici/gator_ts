import { fetchFeed } from "./lib/rss/rss.js";
import { markFeedFetched, getNextFeedToFetch } from "./lib/db/queries/feeds";
import { createPost } from "./lib/db/queries/posts.js";

export async function handleAgg(cmdName: string, ...args: string[]) {
  if (args.length === 0) {
    throw new Error("agg command takes a single argument time_between_reqs.");
  }

  const duration = parseDuration(args[0]);
  console.log(`Collecting feeds every ${duration}`)
  scrapeFeeds().catch(handleError);

  const interval = setInterval(() => {
    scrapeFeeds().catch(handleError);
  }, duration);

  await new Promise<void>((resolve) => {
    process.on("SIGINT", () => {
      console.log("Shutting down feed aggregator...");
      clearInterval(interval);
      resolve();
    });
  });
}

export async function scrapeFeeds() {
  const res = await getNextFeedToFetch();
  await markFeedFetched(res.id);

  const feed = await fetchFeed(res.url);
  const items = feed.channel.item;
  
  for (const item of items) {
    await createPost(item.title, item.link, item.description, Date.parse(item.pubDate), feed.id);
    console.log(item.title);
  }
}

function parseDuration(durationStr: string): number {
  const regex = /^(\d+)(ms|s|m|h)$/;
  const match = durationStr.match(regex);
  return parseInt(match);
}


function handleError(err) {
  if (err instanceof Error) {
    console.log(err.message);
  }
}
