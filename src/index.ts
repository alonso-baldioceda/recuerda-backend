import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import billsRouter from "./routes/bills";
import provincesRouter from "./routes/provinces";
import partiesRouter from "./routes/parties";
import representativesRouter from "./routes/representatives";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/bills", billsRouter);
app.use("/api/provinces", provincesRouter);
app.use("/api/parties", partiesRouter);
app.use("/api/representatives", representativesRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
