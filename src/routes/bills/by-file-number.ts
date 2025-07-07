import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/:fileNumber", async (req, res) => {
  const { fileNumber } = req.params;

  try {
    const bill = await prisma.bill.findFirst({
      where: { fileNumber },
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
                },
              },
            },
          },
        },
      },
    });

    if (!bill) {
      res.status(404).json({ error: "Bill not found" });
      return;
    }

    console.log("BILL", bill);

    const votesGrouped = {
      inFavor: [] as number[],
      against: [] as number[],
      absent: [] as number[],
    };

    for (const vote of bill.votes) {
      const rep = vote.representative;

      if (vote.type === "IN_FAVOR") {
        votesGrouped.inFavor.push(rep.id);
      }
      if (vote.type === "AGAINST") {
        votesGrouped.against.push(rep.id);
      }
      if (vote.type === "ABSENT") {
        votesGrouped.absent.push(rep.id);
      }
    }

    const body = {
      id: bill.id,
      fileNumber: bill.fileNumber,
      description: bill.description,
      details: bill.details,
      status: bill.status,
      createdAt: bill.createdAt,
      votedAt: bill.votedAt,
      votes: votesGrouped,
    };

    res.json(body);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
