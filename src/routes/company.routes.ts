import CompanyController from "../controllers/company.controller";
import CountryController from "../controllers/country.controller";
import SectorController from "../controllers/sector.controller";

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
router.get("/countries", CountryController.getCountries);
router.get("/sectors", SectorController.getSectors);

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
