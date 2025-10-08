import { defineConfig } from "drizzle-kit";
import { requireDatabaseUrl } from "./server/database-url";

const databaseUrl = requireDatabaseUrl();

process.env.DATABASE_URL = databaseUrl;

export default defineConfig({
  out: "./migrations",
  schema: "./shared/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: databaseUrl,
  },
});
