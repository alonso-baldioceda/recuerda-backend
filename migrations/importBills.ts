// scripts/import-bills.ts
import { PrismaClient } from "@prisma/client";
import fs from "fs/promises";

const prisma = new PrismaClient();

async function main() {
  const data = await fs.readFile("./data/bills.json", "utf8");
  const bills = JSON.parse(data);

  for (const bill of bills) {
    const created = new Date(bill.date);

    const newBill = await prisma.bill.create({
      data: {
        fileNumber: bill.fileNumber,
        description: bill.description,
        status: bill.status === "approved" ? "ONE" : "ZERO",
        createdAt: created,
        details: {
          create: bill.details.map((d: any) => ({
            type: d.type,
            content: d.content,
            className: d.className,
          })),
        },
        votes: {
          create: [
            ...bill.votes.inFavor.map((id: number) => ({
              representativeId: id,
              type: "IN_FAVOR",
            })),
            ...bill.votes.against.map((id: number) => ({
              representativeId: id,
              type: "AGAINST",
            })),
            ...bill.votes.absentees.map((id: number) => ({
              representativeId: id,
              type: "ABSENT",
            })),
          ],
        },
      },
    });

    console.log(`Imported bill ${newBill.fileNumber}`);
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
