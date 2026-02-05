import { readConfig } from "./config.js";
import { getFeedFollowsForUser } from "./lib/db/queries/feed_follows.js";
import { type User } from "./lib/db/schema.js";

export async function handleFollowing(cmdName: string, user: User, ...args: string[]) {
  const feedNames = await getFeedFollowsForUser(user.name);
  for (const feedName of feedNames) {
    console.log(feedName);
  }
}
