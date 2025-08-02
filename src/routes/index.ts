import { Router } from "express";
import reportsRoutes from "./reports.routes";
import authRoutes from "./auth.routes";
import compnayRoutes from "./company.routes";

const router = Router();
router.get("/", (req, res) => {
  res.send("haha");
});

router.use("/cfp/reports", reportsRoutes);
router.use("/auth", authRoutes);
router.use("/companies", compnayRoutes);

export default router;
