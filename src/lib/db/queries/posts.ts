import { db } from "..";
import { posts } from "../schema";
import { eq, asc } from 'drizzle-orm';

export async function createPost(title: string, url: string, description: string, publishedAt: string, feedID: string) {
  const [res] = await db.insert(posts).values({title: title,
					       url: url,
					       description: description,
					       publishedAt: new Date(publishedAt),
					       feedID: feedID,
					      })
    .returning();

  return res
}

export async function getPostsForUser() {
  const res = await db.select().from(posts).orderBy(asc(posts.publishedAt));
  return res;
}
