import { readConfig } from "./config.js";
import { getUser } from "./lib/db/queries/users.js";
import { createFeed } from "./lib/db/queries/feeds.js";
import { printFeed } from "./lib/rss/rss.js";

export async function handleAddFeed(cmdName: string, ...args: string[]) {
  if (args.length < 2) {
    throw new Error("addfeed command takes two args! name of the feed, and the url of the feed.");
  }

  const config = readConfig();
  const username = config.currentUserName;

  const currUser = await getUser(username);
  if (!currUser) {
    throw new Error("Current user does not exist in the database.")
  }

  const createdFeed = await createFeed(args[0], args[1], currUser.id);
  printFeed(createdFeed, currUser);
}
