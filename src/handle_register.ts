import { createUser, getUser } from "./lib/db/queries/users.js";
import { setUser } from "./config.js";

export async function handleRegister(cmdName: string, ...args: string[]) {
  if (args.length === 0) {
    throw new Error("The register handler expects a single argument, the username.");
  }

  const existingUser = await getUser(args[0]);
  if (existingUser && existingUser.name === args[0]) {
    throw new Error("Existing username.");
  }

  const newUser = await createUser(args[0]);
  setUser(args[0]);

  console.log(`User ${args[0]} is created: ${newUser}`);
}
