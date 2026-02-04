import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "src/lib/db",
  out: "src/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgres://postgres:postgres@localhost:5432/gator?sslmode=disable",
  },
});
