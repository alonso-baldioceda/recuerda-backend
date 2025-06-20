import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  console.log("GET /api/provinces");
  try {
    const provinces = await prisma.province.findMany();
    res.json(provinces);
  } catch (error) {
    res.status(500).json({ error: "Error fetching provinces" });
  }
});

export default router;
