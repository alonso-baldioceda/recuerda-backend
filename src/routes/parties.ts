import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  console.log("GET /api/parties");
  try {
    const parties = await prisma.party.findMany();
    res.json(parties);
  } catch (error) {
    res.status(500).json({ error: "Error fetching parties" });
  }
});

export default router;
