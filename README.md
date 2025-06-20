# Recuerda Backend

This project contains the API and database setup for the **Recuerda** application. It uses [Prisma ORM](https://www.prisma.io/) to manage a MySQL database schema and perform data operations.

## Requirements

- Node.js
- MySQL (local or remote)
- A `.env` file with a valid `DATABASE_URL`

## Useful Commands

### 1. Sync your Prisma schema with the database

This will apply your Prisma `schema.prisma` to the database without losing existing data:

```bash
npx prisma db push
```

### 2. Run the seed script

This will populate the database with provinces, political parties, and representatives (including historical party affiliations):

```bash
npx ts-node prisma/seed.ts
```

> **Note:** ⚠️ Ensure that all political parties referenced in your seed data already exist in the database before creating representatives. Failing to do so may result in a Prisma P2025 error.

### 3. Generate the Prisma Client (optional)

If you make changes to the Prisma schema, run:

```bash
npx prisma generate
```

## Project Structure

- **prisma/schema.prisma**: Prisma data models (e.g., Representative, Party, Province, etc.)
- **prisma/seed.ts**: Seed script to populate the database with initial data
- **.env**: Environment variables, including `DATABASE_URL`
