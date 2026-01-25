import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

/**
 * Database URL from environment variables
 */
const getDatabaseUrl = () => {
  const url = process.env.DATABASE_URL;
  
  if (!url) {
    throw new Error(
      "DATABASE_URL is not set. Please add it to your .env.local file."
    );
  }
  
  return url;
};

/**
 * Initialize Neon serverless connection
 */
const sql = neon(getDatabaseUrl());

/**
 * Drizzle ORM instance configured with Neon and schema
 */
export const db = drizzle(sql, { schema });

/**
 * Export schema for direct access
 */
export { schema };
