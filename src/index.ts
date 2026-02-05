import { argv } from "node:process";
import process from 'node:process';
import { handleLogin } from "./handle_login.js";
import { handleRegister } from "./handle_register.js";
import { handleReset } from "./handle_reset.js";
import { handleUsers } from "./handle_users.js";
import { handleAgg } from "./handle_agg.js";
import { handleAddFeed } from "./handle_addfeed.js";
import { handleFeeds } from "./handle_feeds.js";
import { handleFollow } from "./handle_follow.js";
import { handleFollowing } from "./handle_following.js";
import { handleUnfollow } from "./handle_unfollow.js";
import { middlewareLoggedIn } from "./middleware.js";

import { type CommandsRegistry, registerCommand, runCommand } from "./commands.js";

async function main() {
  let exitCode = 0;
  try {
    const commandsRegistry: CommandsRegistry = {};
    registerCommand(commandsRegistry, "login", handleLogin);
    registerCommand(commandsRegistry, "register", handleRegister);
    registerCommand(commandsRegistry, "reset", handleReset);
    registerCommand(commandsRegistry, "users", handleUsers);
    registerCommand(commandsRegistry, "agg", handleAgg);
    registerCommand(commandsRegistry, "addfeed", middlewareLoggedIn(handleAddFeed));
    registerCommand(commandsRegistry, "feeds", handleFeeds);
    registerCommand(commandsRegistry, "follow", middlewareLoggedIn(handleFollow));
    registerCommand(commandsRegistry, "following", middlewareLoggedIn(handleFollowing));
    registerCommand(commandsRegistry, "unfollow", middlewareLoggedIn(handleUnfollow));
    
    const args = argv.slice(2);
    await runCommand(commandsRegistry, args[0], ...args.slice(1));
  } catch (err) {
    if (err instanceof Error) {
      exitCode = 1;
      console.log(err.message);
    }
  } finally {
    process.exit(exitCode);
  }
}

main();
