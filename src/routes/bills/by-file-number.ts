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

    type SimplifiedRep = {
      id: number;
      name: string;
      avatar: string;
      provinceId: number;
      partyId: number | null;
    };
    const votesGrouped: {
      inFavor: SimplifiedRep[];
      against: SimplifiedRep[];
      absent: SimplifiedRep[];
    } = {
      inFavor: [],
      against: [],
      absent: [],
    };

    for (const vote of bill.votes) {
      const rep = vote.representative;
      const party = rep.partyAffiliations[0]?.party;

      console.log("Processing vote for representative:", rep);
      const simplifiedRep: SimplifiedRep = {
        id: rep.id,
        name: rep.name,
        avatar: rep.avatar,
        provinceId: rep.province.id,
        partyId: party?.id || null,
      };

      if (vote.type === "IN_FAVOR") {
        votesGrouped.inFavor.push(simplifiedRep);
      }

      if (vote.type === "AGAINST") {
        votesGrouped.against.push(simplifiedRep);
      }

      if (vote.type === "ABSENT") {
        votesGrouped.absent.push(simplifiedRep);
      }
    }

    const body = {
      id: bill.id,
      fileNumber: bill.fileNumber,
      description: bill.description,
      status: bill.status,
      createdAt: bill.createdAt,
      votes: votesGrouped,
    };

    res.json(body);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
