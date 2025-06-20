/**
 * Usage:
 *   importJsonToDb('./migrations/data/parties.json', 'party');
 *   importJsonToDb('./migrations/data/provinces.json', 'province');
 */

import { readFile } from "fs/promises";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Imports data from a JSON file into the specified table using Prisma.
 * @param jsonPath Path to the JSON file.
 * @param modelName Prisma model name (lowercase, singular).
 */
export async function importJsonToDb(
  jsonPath: string,
  modelName: keyof PrismaClient
) {
  const data = await readFile(jsonPath, "utf-8");
  const items = JSON.parse(data);

  for (const item of items) {
    // @ts-ignore
    await prisma[modelName].create({ data: item });
  }
  console.log(`Data imported into ${String(modelName)}`);
}

// Example direct usage (uncomment to use as a script):
// importJsonToDb('./migrations/data/parties.json', 'party')
//   .catch(console.error)
//   .finally(() => prisma.$disconnect());
