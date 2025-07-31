import express from "express";
import CarbonController from "../controllers/reports.controller";

const router = express.Router();

router.post("/test", (req, res) => {
  res.json({ message: "Carbon Controller Test Route" });
});

router.post("/", CarbonController.createReport);
router.put("/:id", CarbonController.updateReport);
router.get("/:id", CarbonController.getReport);
/* router.post("/:id/submit", CarbonController.submitReport);

router.get("/", CarbonController.getCompanyReports);
router.get("/:id", CarbonController.getReport); */

export default router;
