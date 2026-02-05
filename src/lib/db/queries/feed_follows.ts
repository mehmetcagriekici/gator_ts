import { db } from "..";
import { feedFollows, feeds, users } from "../schema";
import { eq } from 'drizzle-orm';

export async function createFeedFollow(userID: string, feedID: string) {
  const [res] = await db.insert(feedFollows).values({userID: userID, feedID: feedID}).returning();

  return await db.select({
    userName: users.name,
    feedName: feeds.name,
  }).from(feedFollows)
    .innerJoin(users, eq(users.id, feedFollows.userID))
    .innerJoin(feeds, eq(feeds.id, feedFollows.feedID))
    .where(eq(res.id, feedFollows.id));
}

export async function getFeedFollowsForUser(username: string) {
  return await db.select({
    feedName: feeds.name,
  }).from(feedFollows)
    .innerJoin(users, eq(users.id, feedFollows.userID))
    .innerJoin(feeds, eq(feeds.id, feedFollows.feedID))
    .where(eq(users.name, username));
}

export async function deleteFeedFollow(url: string, username: string) {
  const [res] = await db.select()
    .from(feedFollows)
    .leftJoin(users, eq(users.id, feedFollows.userID))
    .leftJoin(feeds, eq(feeds.id, feedFollows.feedID))
    .where(eq(users.name, username), eq(feeds.url, url));
  
  await db.delete(feedFollows).where(eq(feedFollows.id, res.feed_follows.id));
}
