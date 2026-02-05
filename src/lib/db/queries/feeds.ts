import { db } from "..";
import { feeds } from "../schema";
import { eq } from 'drizzle-orm';

export async function createFeed(name: string, url: string, userID: string) {
  const [res] = await db.insert(feeds).values({name: name, url: url, userID: userID}).returning();
  return res;
}

export async function getFeed(url: string) {
  const [res] = await db.select().from(feeds).where(eq(feeds.url, url));
  return res
}

export async function deleteFeeds() {
  await db.delete(feeds);
}

export async function getFeeds() {
  return await db.select().from(feeds);
}
