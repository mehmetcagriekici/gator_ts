import { type User } from "./lib/db/schema";
import { deleteFeedFollow } from "./lib/db/queries/feed_follows.js";

export async function handleUnfollow(cmdName: string, user: User, ...args: string[]) {
  if (args.length === 0) {
    throw new Error("follow command requires a single url argument.")
  }

  await deleteFeedFollow(args[0], user.name);
}
