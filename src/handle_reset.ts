import { deleteUsers } from "./lib/db/queries/users.js";

export async function handleReset() {
  await deleteUsers();
  console.log("Database users table is cleared.")
}
