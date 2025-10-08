# Database Setup

This project uses PostgreSQL via [Drizzle ORM](https://orm.drizzle.team/). You can connect to any PostgreSQL-compatible service, but the defaults are tuned for [Supabase](https://supabase.com/), which offers a hosted Postgres instance with generous free tiers.

## 1. Option A – Provide a standard `DATABASE_URL`

If you already have a PostgreSQL connection string, add it to your environment:

```bash
export DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?sslmode=require"
```

This is the most direct approach and works for local Docker containers, managed providers like Neon/Railway, or even Supabase if you copy the full URI from the dashboard.

## 2. Option B – Use Supabase-specific variables

When `DATABASE_URL` is not present, the application now checks for Supabase credentials and assembles a secure connection string automatically. Add the following to your `.env` file (copy `.env.example` to get started):

```env
SUPABASE_PROJECT_REF=your-project-ref
SUPABASE_DB_PASSWORD=super-secret-password
# Optional overrides:
# SUPABASE_DB_HOST=db.${SUPABASE_PROJECT_REF}.supabase.co
# SUPABASE_DB_PORT=5432
# SUPABASE_DB_USER=postgres
# SUPABASE_DB_NAME=postgres
# SUPABASE_DB_PARAMS=sslmode=require&pgbouncer=true&connection_limit=1
```

These values are available inside Supabase under **Project Settings → Database → Connection Info**. The defaults enable SSL (`sslmode=require`) and PGBouncer-friendly settings so you do not exhaust the connection limit on the free tier.

## 3. Loading the environment variables

### macOS/Linux (bash/zsh)

```bash
cp .env.example .env
# edit .env with your credentials
source .env
npm run dev
```

### Windows (PowerShell)

```powershell
Copy-Item .env.example .env
# Edit .env with your credentials
Get-Content .env | ForEach-Object {
  if ($_ -match '^(\w+)=(.*)$') {
    $env:$($matches[1]) = $matches[2]
  }
}
npm run dev
```

You can also use a dotenv runner such as [`dotenv-cli`](https://github.com/dotenv-org/dotenv-vault/tree/main/packages/dotenv#readme) or VS Code's built-in "Run and Debug" env file support.

## 4. Verifying the connection

Run the TypeScript check (which exercises the Drizzle config) and start the dev server:

```bash
npm run check
npm run dev
```

If the credentials are valid you will see `Database pool connected successfully` in the terminal and the app will stay online. Migration commands like `npm run db:push` rely on the same helper, so they will also work once the environment is configured.

## 5. Next steps after connecting

With the database reachable, you can continue setting up the project:

1. **Apply the latest schema** – run `npm run db:push` to sync the tables defined in `shared/schema.ts` to your Postgres instance.
2. **Start the application** – use `npm run dev` for development or `npm run build && npm start` for a production-like run once you are ready to deploy.
3. **Configure Supabase policies (optional)** – if you plan to use Supabase Auth or Row Level Security, review the Supabase dashboard to ensure the generated tables align with your access policies.

After those steps the Teacher Insight Tracker should be able to create and query records against your Supabase database.
