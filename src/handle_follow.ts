import { createFeedFollow } from "./lib/db/queries/feed_follows.js";
import { getFeed } from "./lib/db/queries/feeds.js";
import { getUser } from "./lib/db/queries/users.js";
import { readConfig } from "./config.js";
import { type User } from "./lib/db/schema.js";

export async function handleFollow(cmdName: string, user: User, ...args: string[]) {
  if (args.length === 0) {
    throw new Error("follow command requires a single url argument.")
  }

  const feed = await getFeed(args[0]);

  const ff = await createFeedFollow(user.id, feed.id);
  console.log(ff.userName);
  console.log(ff.feedName);
}
