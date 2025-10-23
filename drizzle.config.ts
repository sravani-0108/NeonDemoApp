import { defineConfig } from "drizzle-kit";
 
export default defineConfig({
schema: "./src/lib/schema", 
  out: "./drizzle/migrations",
  dialect: "postgresql",
  dbCredentials: {
    host: "ep-lucky-haze-ahzf3nu4-pooler.c-3.us-east-1.aws.neon.tech",
    port: 5432,
    user: "neondb_owner",
    password: "npg_NHI0B7XagFEk",
    database: "neondb",
    ssl: true,
  },
});
 
 