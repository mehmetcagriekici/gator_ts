import { getUsers } from "./lib/db/queries/users.js";
import { getFeeds } from "./lib/db/queries/feeds.js";

export async function handleFeeds(cmdName: string, ...args: string[]) {
  const feeds = await getFeeds();
  const users = await getUsers();

  for (const feed of feeds) {
    const user = users.find(u => u.id === feed.userID);
    console.log(feed.name);
    console.log(feed.url);
    console.log(user.name);
    console.log("");
  }
}
