import { readConfig } from "./config.js";
import { getUser } from "./lib/db/queries/users.js";
import { createFeed } from "./lib/db/queries/feeds.js";
import { printFeed } from "./lib/rss/rss.js";
import { createFeedFollow } from "./lib/db/queries/feed_follows.js";
import { type User } from "./lib/db/schema.js";

export async function handleAddFeed(cmdName: string, user: User, ...args: string[]) {
  if (args.length < 2) {
    throw new Error("addfeed command takes two args! name of the feed, and the url of the feed.");
  }

  const createdFeed = await createFeed(args[0], args[1], user.id);

  const ff = await createFeedFollow(user.id, createdFeed.id);
  printFeed(createdFeed, user);
}
