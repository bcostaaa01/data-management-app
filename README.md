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

Create a bucket named exactly `reports` (**Storage → New bucket**) — file upload/download/list all reference this bucket name directly.

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
