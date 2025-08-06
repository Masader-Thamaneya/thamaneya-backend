import { Request, Response, NextFunction } from "express";

import AuthService from "../services/auth.service";
import { attachRefreshToken, deleteRefreshToken } from "../utils/createCookies";

class AuthController {
  static async login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body.user;
    try {
      const { accessToken, refreshToken } = await AuthService.login(
        email,
        password
      );
      attachRefreshToken(res, refreshToken);

      return res.status(200).json({
        success: true,
        message: "Login successful.",
        data: {
          accessToken,
          refreshToken,
        },
      });
    } catch (err: any) {
      next(err);
    }
  }

  static async signup(req: Request, res: Response, next: NextFunction) {
    const { email, name, password } = req.body.user;
    console.log(password);
    try {
      const otpExpiresAt = await AuthService.signup(email, name, password);
      return res.status(201).json({
        success: true,
        message: "Signup successful. OTP sent to email.",
        data: {
          email,
          otpExpiresAt,
        },
      });
    } catch (err: any) {
      next(err);
    }
  }

  static async logOut(req: Request, res: Response, next: NextFunction) {
    try {
      deleteRefreshToken(res);

      res.status(200).json({
        success: true,
        message: "Logged out successfully.",
      });
    } catch (err: any) {
      next(err);
    }
  }

  static async verifyOTP(req: Request, res: Response, next: NextFunction) {
    const { email, otp } = req.body.user;
    try {
      const { accessToken, refreshToken } = await AuthService.verifyOTP(
        email,
        otp
      );
      attachRefreshToken(res, refreshToken);
      return res.status(200).json({
        success: true,
        message: "Email successfully verified.",
        data: {
          accessToken,
          refreshToken,
        },
      });
    } catch (err: any) {
      next(err);
    }
  }

  static async resendOTP(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body.user;
    try {
      const otpExpiresAt = await AuthService.resendOTP(email);

      return res.status(200).json({
        success: true,
        message: "OTP resent to email.",
        data: {
          email,
          otpExpiresAt,
        },
      });
    } catch (err: any) {
      next(err);
    }
  }

  static async refresh(req: Request, res: Response, next: NextFunction) {
    const refreshToken: string = req.body.refreshToken;
    try {
      const accessToken = await AuthService.refresh(refreshToken);

      res.status(200).json({
        success: true,
        message: "Access token refreshed successfully.",
        data: {
          accessToken,
        },
      });
    } catch (err: any) {
      next(err);
    }
  }
}

export default AuthController;
