import "./load-env";

const DEFAULT_SUPABASE_PARAMS = "sslmode=require&pgbouncer=true&connection_limit=1";

export interface ResolveDatabaseUrlOptions {
  env?: NodeJS.ProcessEnv;
}

export function resolveDatabaseUrl({ env = process.env }: ResolveDatabaseUrlOptions = {}): string | undefined {
  const directUrl = env.DATABASE_URL?.trim();
  if (directUrl) {
    return directUrl;
  }

  const projectRef = env.SUPABASE_PROJECT_REF?.trim();
  const password = env.SUPABASE_DB_PASSWORD?.trim();
  if (!projectRef || !password) {
    return undefined;
  }

  const host = env.SUPABASE_DB_HOST?.trim() ?? `db.${projectRef}.supabase.co`;
  const port = env.SUPABASE_DB_PORT?.trim() ?? "5432";
  const database = env.SUPABASE_DB_NAME?.trim() ?? "postgres";
  const user = env.SUPABASE_DB_USER?.trim() ?? "postgres";
  const extraParams = env.SUPABASE_DB_PARAMS?.trim() ?? DEFAULT_SUPABASE_PARAMS;

  const searchParams = new URLSearchParams(extraParams);
  const connectionParams = searchParams.toString();

  const encodedUser = encodeURIComponent(user);
  const encodedPassword = encodeURIComponent(password);
  const encodedDatabase = encodeURIComponent(database);

  return `postgresql://${encodedUser}:${encodedPassword}@${host}:${port}/${encodedDatabase}?${connectionParams}`;
}

export function requireDatabaseUrl(options?: ResolveDatabaseUrlOptions): string {
  const connectionString = resolveDatabaseUrl(options);

  if (!connectionString) {
    throw new Error(
      "Database connection string is not configured. Set DATABASE_URL or provide Supabase credentials.",
    );
  }

  return connectionString;
}
