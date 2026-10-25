import { readFileSync } from 'node:fs';
import { Client } from 'pg';

const envText = readFileSync('.env.local', 'utf8');
const databaseUrl = envText
  .split(/\r?\n/)
  .find((line) => line.startsWith('DATABASE_URL='))
  ?.slice('DATABASE_URL='.length)
  .trim();

if (!databaseUrl) {
  throw new Error('DATABASE_URL is missing from .env.local.');
}

const migrationSql = readFileSync(
  'supabase/migrations/20261025000000_create_vyqor_user_data.sql',
  'utf8'
);
const client = new Client({ connectionString: databaseUrl });

try {
  await client.connect();
  await client.query(migrationSql);
  process.stdout.write('VYQOR user-data table and row-level security are ready.\n');
} catch (error) {
  const message = error instanceof Error ? error.message : 'Unknown database error';
  process.stderr.write(`Supabase migration failed: ${message}\n`);
  process.exitCode = 1;
} finally {
  await client.end().catch(() => undefined);
}
