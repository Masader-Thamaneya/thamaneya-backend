import AuthController from "../controllers/auth.controller";
import CompanyController from "../controllers/company.controller";

import validateBody from "../middlewares/validateBody";
import {
  loginSchema,
  signupSchema,
  otpSchema,
  otpResendSchema,
} from "../validators/auth.validator";

import { companyValidator } from "../validators/company.validator";

import express from "express";

const router = express.Router();

router.post("/login", validateBody(loginSchema, false), AuthController.login);
router.post(
  "/signup",
  validateBody(signupSchema, false),
  AuthController.signup
);
router.post(
  "/verify-otp",
  validateBody(otpSchema, false),
  AuthController.verifyOTP
);
router.post(
  "/resend-otp",
  validateBody(otpResendSchema, false),
  AuthController.resendOTP
);
router.post("/refresh", AuthController.refresh);
router.post("/log-out", AuthController.logOut);

router.get(
  "/test",
  validateBody(companyValidator, false),
  CompanyController.getCompany
);

export default router;
