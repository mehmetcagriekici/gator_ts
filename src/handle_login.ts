import { setUser } from "./config.js"

export function handleLogin(cmdName: string, ...args: string[]) {
  if (args.length === 0) {
    throw new Error("The login handler expects a single argument, the username.");
  }

  setUser(args[0]);

  console.log(`User ${args[0]} has been set.`);
}
