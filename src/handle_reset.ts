import { deleteUsers } from "./lib/db/queries/users.js";
import { deleteFeeds } from "./lib/db/queries/feeds.js";

export async function handleReset() {
  await deleteUsers();
  await deleteFeeds();
  console.log("Database users and feeds tables are cleared.");
}
