import express from "express";
import CarbonController from "../controllers/reports.controller";

const router = express.Router();

router.post("/test", (req, res) => {
  res.json({ message: "Carbon Controller Test Route" });
});

router.get("/", CarbonController.getCompanyReports);
router.post("/", CarbonController.createReport);
router.get("/refrigerants", CarbonController.getGases);
router.get("/wastes", CarbonController.getWastes);

router.post("/:id/submit", CarbonController.submitReport);
router.put("/:id", CarbonController.updateReport);
router.get("/:id", CarbonController.getReport);
/* ;

router.get("/", CarbonController.getCompanyReports);
router.get("/:id", CarbonController.getReport); */

export default router;
