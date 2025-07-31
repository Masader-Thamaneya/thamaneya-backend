import { Router } from "express";
import reportsRoutes from "./reports.routes";

const router = Router();

router.use("/cfp/reports", reportsRoutes);

export default router;
