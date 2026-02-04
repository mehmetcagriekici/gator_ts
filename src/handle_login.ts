import { setUser } from "./config.js";
import { getUser } from "./lib/db/queries/users.js";

export async function handleLogin(cmdName: string, ...args: string[]) {
  if (args.length === 0) {
    throw new Error("The login handler expects a single argument, the username.");
  }

  const existingUser = await getUser(args[0]);
  if (existingUser.name != args[0]) {
    throw new Error("User does not exist.")
  }

  setUser(args[0]);

  console.log(`User ${args[0]} has been set.`);
}
