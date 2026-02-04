import fs from "fs";
import os from "os";
import path from "path";

export type Config = {
  dbUrl: string;
  currentUserName: string;
}

export function setUser(username: string) {
  const configPath = path.join(os.homedir(), ".gatorconfig.json");
  const configData = fs.readFileSync(configPath, {
    encoding: 'utf-8'
  });
  const buf = JSON.parse(configData);
  buf.current_user_name = username;

  fs.writeFileSync(configPath, JSON.stringify(buf));
}

export function readConfig(): Config {
  const configPath = path.join(os.homedir(), ".gatorconfig.json");
  const configData = fs.readFileSync(configPath, {
    encoding: 'utf-8'
  });

  const rawConfig = JSON.parse(configData);
  return {
    dbUrl: rawConfig.db_url,
    currentUserName: rawConfig.current_user_name
  }
}
