import express from "express";
import { PrismaClient } from "@prisma/client";

// Asegúrate de que estás creando el router correctamente
const router = express.Router();
const prisma = new PrismaClient();

// Define la ruta sin parámetros aquí (porque ya está en la ruta padre)
router.get("/:id", async (req: express.Request<{ id: string }>, res) => {
  try {
    const id = req.params.id;
    console.log("representative by-id route hit", id);

    const representative = await prisma.representative.findUnique({
      where: { id: Number(id) },
      include: {
        province: true,
        partyAffiliations: {
          include: {
            party: true,
          },
        },
      },
    });

    if (!representative) {
      return res.status(404).json({ error: "Representative not found" });
    }

    res.json(representative);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching representative" });
  }
});

export default router;
