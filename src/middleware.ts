import { readConfig } from "./config.js";
import { getUser } from "./lib/db/queries/users.js";
import { type User } from "./lib/db/schema.js";
import { type CommandHandler } from "./commands.js";

type UserCommandHandler = (
  cmdName: string,
  user: User,
  ...args: string[]
) => Promise<void>;

export async function middlewareLoggedIn(handler: UserCommandHandler): CommandHandler {
  const config = readConfig();
  const username = config.currentUserName;
  const user = await getUser(username);
  
  return async function(cmdName: string, ...args: string[]) {
    await handler(cmdName, user, ...args);
  }
}
