import { argv } from "node:process";
import { handleLogin } from "./handle_login.js";
import { type CommandsRegistry, registerCommand, runCommand } from "./commands.js"

function main() {
  const commandsRegistry: CommandsRegistry = {};
  registerCommand(commandsRegistry, "login", handleLogin);
  const args = argv.slice(2);
  runCommand(commandsRegistry, args[0], ...args.slice(1));
}

main();
