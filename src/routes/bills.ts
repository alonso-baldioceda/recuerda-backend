import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  const bills = await prisma.bill.findMany();
  res.json(bills);
});

export default router;
