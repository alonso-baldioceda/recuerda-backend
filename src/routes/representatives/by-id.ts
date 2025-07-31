import express from "express";
import { PrismaClient } from "@prisma/client";

// Asegúrate de que estás creando el router correctamente
const router = express.Router();
const prisma = new PrismaClient();

// Define la ruta sin parámetros aquí (porque ya está en la ruta padre)
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const representative = await prisma.representative.findUnique({
      where: { id: Number(id) },
      include: {
        province: true,
        biography: {
          include: {
            paragraphs: true,
          },
        },
        votes: true,
      },
    });

    if (!representative) {
      return res.status(404).json({ error: "Representative not found" });
    }

    // Conteo de votos por tipo
    const voteCounts = {
      IN_FAVOR: 0,
      AGAINST: 0,
      ABSENT: 0,
    };

    for (const vote of representative.votes) {
      if (vote.type in voteCounts) {
        voteCounts[vote.type]++;
      }
    }

    const { province, votes, ...rest } = representative;
    res.json({
      ...rest,
      provinceName: province?.name ?? null,
      biography: representative.biography,
      voteCounts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching representative" });
  }
});

export default router;
