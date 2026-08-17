import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Helper pour nettoyer la chaîne de connexion de ses paramètres SSL conflictuels pour le pilote pg
function cleanConnectionString(url: string): string {
  try {
    const parsed = new URL(url);
    parsed.searchParams.delete("sslmode");
    parsed.searchParams.delete("sslaccept");
    return parsed.toString();
  } catch (e) {
    return url;
  }
}

const rawConnectionString =
  process.env.SUPABASE_POSTGRES_PRISMA_URL ||
  process.env.DATABASE_URL ||
  "postgresql://postgres:postgres@localhost:5432/postgres";

const isLocalhost = rawConnectionString.includes("localhost") || rawConnectionString.includes("127.0.0.1");
const hasSslDisabled = rawConnectionString.includes("sslmode=disable");

const connectionString = cleanConnectionString(rawConnectionString);

const pool = new pg.Pool({
  connectionString,
  ssl: isLocalhost || hasSslDisabled
    ? false
    : { rejectUnauthorized: false }, // Force l'acceptation du certificat auto-signé
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
