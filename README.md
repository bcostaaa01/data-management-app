# Data Management Solution

A solution for managing data from different sources and formats. It's a full-stack application that allows you to ingest data from Excel files, export data to PDF, and store data in PostgreSQL. The application is built with the Vue + BaaS (Supabase) stack.

## 🔦 Features

- 📂 Data ingestion from Excel files
- 📄 Export data to PDF
- 📊 Data storage in PostgreSQL

## 🗄️ Supabase Setup

This app is a BaaS application: Supabase provides auth, the database, and file storage directly to the frontend. There's no separate backend server in this repo — you just need a configured Supabase project before running the app.

### 1. Create a project

Create a project at [supabase.com](https://supabase.com). From **Project Settings → API**, grab the **Project URL** and the **`anon` / `publishable`** key.

### 2. Configure environment variables

Copy `frontend/.env.example` to `frontend/.env` and fill in:

```
VITE_SUPABASE_URL=https://<your-project-ref>.supabase.co
VITE_SUPABASE_ANON_KEY=<anon/publishable key>
```

⚠️ Never put a `service_role`/secret key (`sb_secret_...`) or a Personal Access Token (`sbp_...`) in this file. Anything prefixed `VITE_` gets bundled into the shipped frontend JS and becomes publicly readable — only the `anon`/`publishable` key is safe to expose here.

### 3. Configure the auth redirect URL

Sign up/sign in send magic links that redirect to `http://localhost:5173/`. Add that under **Authentication → URL Configuration → Redirect URLs** (and your production URL once you deploy).

### 4. Create the storage bucket

Both creating the `reports` bucket and reading/writing files in it are gated by RLS — `anon`/`authenticated` requests get no access to `storage.buckets` or `storage.objects` by default, regardless of whether the bucket itself is public or private. Run this in the SQL editor **before** creating the bucket:

```sql
-- Lets an authenticated user create the bucket itself (needed for the
-- Reports page's own "Create bucket" action, or skip this and create
-- it manually via Storage → New bucket instead)
create policy "Authenticated users can create buckets"
on storage.buckets for insert
to authenticated
with check (true);

-- Actual file access, once the 'reports' bucket exists
create policy "Authenticated users can upload reports"
on storage.objects for insert
to authenticated
with check (bucket_id = 'reports');

create policy "Authenticated users can update reports"
on storage.objects for update
to authenticated
using (bucket_id = 'reports')
with check (bucket_id = 'reports');

create policy "Authenticated users can read reports"
on storage.objects for select
to authenticated
using (bucket_id = 'reports');

create policy "Authenticated users can delete reports"
on storage.objects for delete
to authenticated
using (bucket_id = 'reports');
```

Then either click **Create bucket** on the Reports page (it shows up automatically if an upload fails because the bucket is missing), or create it yourself: **Storage → New bucket**, named exactly `reports`.

#### Troubleshooting

Still seeing `new row violates row-level security policy` after adding these policies? Two most common causes, in order of likelihood:

1. **The bucket doesn't actually exist yet.** No policy can satisfy a `bucket_id = 'reports'` check if there's no row in `storage.buckets` with that id — run `select id, name, public from storage.buckets;` to confirm it's there.
2. **The policy was created against a different Supabase project** than the one in your `.env`. Run this to see exactly what's registered on the project you're actually connected to:
   ```sql
   select policyname, cmd, roles, qual, with_check
   from pg_policies
   where schemaname = 'storage' and tablename in ('objects', 'buckets');
   ```

### 5. Create the `app_settings` table

The Settings page reads and writes a single shared settings row. In the SQL editor:

```sql
create table app_settings (
  id uuid primary key default gen_random_uuid(),
  settings jsonb not null default '{}'::jsonb
);

insert into app_settings (settings) values ('{}');
```

Add RLS policies for `select`/`update` matching your auth model (e.g. allow any authenticated user).

### 6. Tables feature

The "Tables" view connects to any Postgres table by name at runtime, so no fixed schema is required there — just have at least one real table with data if you want to try it.

## 🚀 How to run the project

### Via GitHub clone

1. Clone the repository
2. Complete the [Supabase Setup](#️-supabase-setup) above
3. Run `npm install` to install the dependencies
4. Run `npm run dev` to start the development server

### Via Docker

1. Clone the repository
2. Complete the [Supabase Setup](#️-supabase-setup) above
3. Run `docker compose build` to build the Docker image or `docker build -t {whatever_name_you_want} .`
4. Run `docker compose up` to start the development server

### Architecture Diagram

![architecture-model](https://github.com/user-attachments/assets/109043fd-933a-4a75-b614-6404227ce20f)
