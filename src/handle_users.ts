import { getUsers } from "./lib/db/queries/users.js";
import { readConfig } from "./config.js";

export async function handleUsers() {
  const users = await getUsers();

  const config = readConfig();

  for (const user of users) {
    if (user.name === config.currentUserName) {
      console.log(`* ${user.name} (current)`);
    } else {
      console.log(`* ${user.name}`);
    }
  }
}
