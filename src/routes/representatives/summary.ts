import express from "express";
import { PrismaClient, VoteType } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  try {
    const reps = await prisma.representative.findMany({
      include: {
        province: true,
        partyAffiliations: {
          where: {
            to: {
              gte: new Date(), // partido actual
            },
          },
          include: {
            party: true,
          },
          take: 1,
        },
        votes: true,
      },
    });

    const summary = reps.map((rep) => {
      const inFavor = rep.votes.filter(
        (v) => v.type === VoteType.IN_FAVOR
      ).length;
      const against = rep.votes.filter(
        (v) => v.type === VoteType.AGAINST
      ).length;
      const absent = rep.votes.filter((v) => v.type === VoteType.ABSENT).length;

      return {
        id: rep.id,
        name: rep.name,
        avatar: rep.avatar,
        provinceId: rep.province.id,
        provinceName: rep.province.name,
        inFavor: inFavor,
        against: against,
        absent: absent,
        party: rep.partyAffiliations[0]
          ? {
              id: rep.partyAffiliations[0].party.id,
              name: rep.partyAffiliations[0].party.name,
              flag: rep.partyAffiliations[0].party.flag,
            }
          : null,
      };
    });

    res.json(summary);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
