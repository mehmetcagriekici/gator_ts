import { getPostsForUser } from "./lib/db/queries/posts.js";

export async function handleBrowse(cmdName: string, ...args: string[]) {
  let limit = 2;
  if (args.length > 0 && !isNan(args[0])) {
    limit = args[0];
  }

  const res = await getPostsForUser();
  return res.slice(0, limit);
}
