import { db } from "..";
import { users } from "../schema";

export async function createUser(name: string) {
  const [result] = await db.insert(users).values({ name: name }).returning();
  return result;
}

export async function getUser(name: string) {
  const [res] = await db.select().from(users).where(users.name === name);
  return res;
}

export async function deleteUsers() {
  await db.delete(users);
}

export async function getUsers() {
  return await db.select().from(users);
}
