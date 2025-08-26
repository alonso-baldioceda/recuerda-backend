// routes/bills-bills-.ts
import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  try {
    const bills = await prisma.bill.findMany({
      include: {
        details: true,
        votes: {
          include: {
            representative: {
              include: {
                province: true,
                partyAffiliations: {
                  where: {
                    from: { lte: new Date() },
                    to: { gte: new Date() },
                  },
                  include: {
                    party: true,
                  },
                  take: 1,
                },
              },
            },
          },
        },
      },
    });

    const simplified = bills.map((bill) => {
      const votesGrouped = {
        inFavor: [] as number[],
        against: [] as number[],
        absent: [] as number[],
      };

      for (const vote of bill.votes) {
        const rep = vote.representative;
        if (vote.type === "IN_FAVOR") votesGrouped.inFavor.push(rep.id);
        else if (vote.type === "AGAINST") votesGrouped.against.push(rep.id);
        else if (vote.type === "ABSENT") votesGrouped.absent.push(rep.id);
      }

      return {
        id: bill.id,
        fileNumber: bill.fileNumber,
        description: bill.description,
        status: bill.status,
        createdAt: bill.createdAt,
        votedAt: bill.votedAt,
        proposerId: bill.proposerId,
        proposerName: bill.proposerName,
        votes: votesGrouped,
      };
    });

    res.json(simplified);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
