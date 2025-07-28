import express from "express";
import representativesListRouter from "./representatives/list";
import representativesSummaryRouter from "./representatives/summary";
import representativesByIdRouter from "./representatives/by-id";

const router = express.Router();

router.use("/summary", representativesSummaryRouter);
router.use("/list", representativesListRouter);
router.use("/", representativesByIdRouter);

export default router;
