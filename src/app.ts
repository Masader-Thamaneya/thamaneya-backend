import express from "express";
import dotenv from "dotenv";
import routes from "./routes";
import { authenticate } from "./middlewares/auth";
import { errorHandler } from "./middlewares/errorHandler";
import reportsRoutes from "./routes/reports.routes";
import authRoutes from "./routes/auth.routes";
import compnayRoutes from "./routes/company.routes";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/cfp/reports", reportsRoutes);
app.use("/companies", compnayRoutes);

app.get("/", (req, res) => {
  res.send("Hello from root get");
});

app.use(errorHandler);

export default app;
