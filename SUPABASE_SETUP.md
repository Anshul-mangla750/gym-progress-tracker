# Supabase account setup

VYQOR uses Supabase Auth for email and password accounts. The browser uses only the project URL and publishable key from `.env.local`. Its database sync runs through the authenticated Supabase client and the `vyqor_user_data` table with row-level security.

1. In Supabase, open **Authentication → URL Configuration**.
2. Set the Site URL to the deployed VYQOR origin. During local development, use `http://localhost:5173`.
3. Add redirect URLs for `http://localhost:5173/dashboard` and `https://YOUR-DOMAIN/dashboard`.
4. In **Authentication → Providers → Email**, choose whether new accounts must confirm their email. Confirmation is supported by the sign-up screen.
5. Run `node scripts/apply-supabase-migration.mjs` to create the account-scoped data table and row-level security policy.
6. Restart the Vite development server after changing `.env.local`.

`DATABASE_URL` is used only by the migration runner and stays in the ignored `.env.local`. The Supabase secret key is not used by VYQOR. Never add a database password or secret key to a `VITE_` variable or commit it to the repository.

Account identity and basic training preferences are stored in Supabase Auth user metadata. Workout, nutrition, and progress data are synced to `vyqor_user_data`, with each row restricted to its owner by RLS. Browser local storage remains as an account-scoped cache and offline fallback.
