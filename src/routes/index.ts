import { Router } from "express";
import reportsRoutes from "./reports.routes";
import authRoutes from "./auth.routes";
import compnayRoutes from "./company.routes";
import { authenticate } from "../middlewares/auth";

const router = Router();
router.get("/", (req, res) => {
  res.send("haha");
});

router.use("/cfp/reports", authenticate, reportsRoutes);
router.use("/auth", authRoutes);
router.use("/companies", authenticate, compnayRoutes);

export default router;
