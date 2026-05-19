import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const connectionString =
  process.env.SUPABASE_POSTGRES_PRISMA_URL ||
  process.env.DATABASE_URL ||
  "postgresql://postgres:postgres@localhost:5432/postgres";

const isLocalhost = connectionString.includes("localhost") || connectionString.includes("127.0.0.1");
const hasSslDisabled = connectionString.includes("sslmode=disable");

const pool = new pg.Pool({
  connectionString,
  ssl: isLocalhost || hasSslDisabled
    ? false
    : { rejectUnauthorized: false }, // Résout l'erreur TLS self-signed certificate
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
