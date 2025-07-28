import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  try {
    const representatives = await prisma.representative.findMany({
      select: {
        id: true,
        name: true,
        avatar: true,
        // fuel: true,
        provinceId: true,
        partyAffiliations: {
          select: {
            id: true,
          },
        },
      },
    });
    res.json(representatives);
  } catch (error) {
    res.status(500).json({ error: "Error fetching representatives" });
  }
});

export default router;
