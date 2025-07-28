import express from "express";
import summary from "./bills/summary";
import byFileNumberRouter from "./bills/by-file-number";

const router = express.Router();

router.use("/summary", summary);
router.use("/by-file-number", byFileNumberRouter);

export default router;
