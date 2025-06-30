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
      type SimplifiedRep = {
        id: number;
        name: string;
        avatar: string;
        provinceName: string;
        party: { id: number; name: string; flag: string } | null;
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

        const simplifiedRep = {
          id: rep.id,
          name: rep.name,
          avatar: rep.avatar,
          provinceName: rep.province.name,
          party: party
            ? {
                id: party.id,
                name: party.name,
                flag: party.flag,
              }
            : null,
        };

        if (vote.type === "IN_FAVOR") votesGrouped.inFavor.push(simplifiedRep);
        else if (vote.type === "AGAINST")
          votesGrouped.against.push(simplifiedRep);
        else if (vote.type === "ABSENT")
          votesGrouped.absent.push(simplifiedRep);
      }

      return {
        fileNumber: bill.fileNumber,
        description: bill.description,
        status: bill.status,
        createdAt: bill.createdAt,
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
