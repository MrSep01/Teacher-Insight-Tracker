import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from "@shared/schema";
import { resolveDatabaseUrl } from "./database-url";

type DatabaseMode = 'postgres' | 'offline';

const allowOffline = (() => {
  const raw = process.env.ALLOW_OFFLINE_DATABASE ?? (process.env.NODE_ENV === 'production' ? 'false' : 'true');
  return raw.toLowerCase() !== 'false';
})();

const connectionString = resolveDatabaseUrl();

export const databaseStatus: {
  mode: DatabaseMode;
  reason?: string;
  connectionString?: string;
} = {
  mode: 'offline',
};

export let pool: Pool | undefined;
export let db: ReturnType<typeof drizzle<typeof schema>> | undefined;

if (connectionString) {
  databaseStatus.mode = 'postgres';
  databaseStatus.connectionString = connectionString;

  // Ensure downstream consumers that still read process.env.DATABASE_URL continue to work
  process.env.DATABASE_URL = connectionString;

  pool = new Pool({
    connectionString,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
    max: 20, // Maximum number of connections in the pool
    idleTimeoutMillis: 60000, // How long a client is allowed to remain idle before being closed
    connectionTimeoutMillis: 10000, // How long to wait for a connection
    acquireTimeoutMillis: 10000, // How long to wait for a connection from the pool
    statement_timeout: 30000, // How long to wait for a query to complete
  });

  pool.on('error', (err) => {
    console.error('Database pool error:', err);
  });

  pool.on('connect', () => {
    console.log('Database pool connected successfully');
  });

  try {
    const result = await pool.query('SELECT NOW()');
    console.log('Database connection test successful:', result.rows[0]);
    db = drizzle({ client: pool, schema });
  } catch (err) {
    const maybeErrno = err as NodeJS.ErrnoException;
    if (
      allowOffline &&
      (maybeErrno?.code === 'ENETUNREACH' ||
        maybeErrno?.code === 'EAI_AGAIN' ||
        maybeErrno?.code === 'ECONNREFUSED' ||
        maybeErrno?.code === 'ETIMEDOUT' ||
        maybeErrno?.code === 'EHOSTUNREACH')
    ) {
      databaseStatus.mode = 'offline';
      databaseStatus.reason = maybeErrno.message || maybeErrno.code;
      console.warn(
        `Database connection unavailable (${maybeErrno?.code ?? 'unknown error'}) – continuing in offline demo mode. ` +
          'Configure DATABASE_URL or Supabase credentials to enable persistence.',
      );
      await pool.end().catch(() => {});
      pool = undefined;
    } else {
      throw err;
    }
  }
} else if (!allowOffline) {
  throw new Error('Database connection string is not configured. Set DATABASE_URL or provide Supabase credentials.');
} else {
  databaseStatus.reason = 'No database credentials configured';
}

if (databaseStatus.mode === 'offline') {
  console.warn('Running with the in-memory demo data store because no database connection is available.');
}
