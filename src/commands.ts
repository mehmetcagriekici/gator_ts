export type CommandHandler = (cmdName: string, ...args: string[]) => void;

export type CommandsRegistry = {
  [key: string]: CommandHandler; 
};

export function registerCommand(registry: CommandsRegistry, cmdName: string, handler: CommandHandler) {
  registry[cmdName] = handler;
}

export function runCommand(registry: CommandsRegistry, cmdName: string, ...args: string[]) {
  if (!registry[cmdName]) {
    throw new Error("Invalid Command");
  }

  registry[cmdName](cmdName, ...args);
}
