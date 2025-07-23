import CompanyController from "../controllers/company.controller";

import validateBody from "../middlewares/validateBody";

import {
  companyValidator,
  updateCompanyValidator,
} from "../validators/company.validator";

import express from "express";

const router = express.Router();

router.post(
  "/",
  validateBody(companyValidator, false),
  CompanyController.createCompany
);

router.get("/search", CompanyController.searchCompany);
router.get("/:id", CompanyController.getCompany);
router.put(
  "/:id",
  validateBody(updateCompanyValidator, false),
  CompanyController.updateCompany
);

router.get(
  "/test",
  validateBody(companyValidator, false),
  CompanyController.getCompany
);

export default router;
