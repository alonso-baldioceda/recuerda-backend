import express from "express";
import summary from "./bills/summary";
import byFileNumberRouter from "./bills/by-file-number";

const router = express.Router();

router.get("/", (req, res) => {
  console.log("worked");
  res.json({ message: "worked" });
});

router.use("/summary", summary);
router.use("/by-file-number", byFileNumberRouter);

export default router;
