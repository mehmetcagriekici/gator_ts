import { db } from "..";
import { feeds } from "../schema";
import { eq, sql } from 'drizzle-orm';

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

export async function markFeedFetched(feedID: string) {
  await db.update(feeds)
    .set({lastFetchedAt: sql`NOW()`, updatedAt: sql`NOW()`})
    .where(eq(feeds.id, feedID));
}

export async function getNextFeedToFetch() {
  const [res] = await db.execute(sql`SELECT * FROM feeds ORDER BY last_fetched_at NULLS FIRST`);
  return res;
}
