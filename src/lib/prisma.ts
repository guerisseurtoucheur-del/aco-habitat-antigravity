import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const rawConnectionString =
  process.env.SUPABASE_POSTGRES_PRISMA_URL ||
  process.env.POSTGRES_PRISMA_URL ||
  process.env.SUPABASE_POSTGRES_URL ||
  process.env.POSTGRES_URL ||
  process.env.DATABASE_URL ||
  "postgresql://postgres:postgres@localhost:5432/postgres";

// Detect if we are connecting to Supabase / a remote managed Postgres.
// In that case, force SSL with rejectUnauthorized: false to handle the
// self-signed certificate chain returned by the pooler.
const isLocal =
  rawConnectionString.includes("localhost") ||
  rawConnectionString.includes("127.0.0.1");

const isSupabase =
  rawConnectionString.includes("supabase.co") ||
  rawConnectionString.includes("supabase.com") ||
  rawConnectionString.includes("pooler.supabase");

// Strip any sslmode param from the URL because we configure SSL via the
// pool options. Mixing both can cause "self-signed certificate in chain".
const cleanedConnectionString = rawConnectionString.replace(
  /([?&])sslmode=[^&]*(&|$)/,
  (_match, prefix, suffix) => (suffix === "&" ? prefix : ""),
);

const pool = new pg.Pool({
  connectionString: cleanedConnectionString,
  ssl: isLocal && !isSupabase ? false : { rejectUnauthorized: false },
});

const adapter = new PrismaPg(pool);

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log: ["error", "warn"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
