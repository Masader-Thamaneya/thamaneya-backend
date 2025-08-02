import PendingUser from "../repositories/pendingUser.repository";
import User from "../repositories/user.repository";
import { authenticateRefreshToken, createAccessToken } from "../utils/jwt";
import { generateOtp } from "../utils/otp";
import { generateTokens } from "../utils/jwt";
import {
  BaseError,
  ConflictError,
  NotFoundError,
  BadRequestError,
  GoneError,
} from "../utils/errorMessages";

class AuthService {
  static async signup(email: string, name: string, password: string) {
    email = email.toLowerCase();
    name = capitalizeName(name);

    const existingUser = await User.findUserByEmail(email);
    if (existingUser) {
      throw new ConflictError("Email already used.");
    }

    const otpCode = generateOtp();
    console.log("Generated OTP Code:", otpCode);
    const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await PendingUser.createOrUpdate(
      email,
      name,
      password,
      otpCode,
      otpExpiresAt
    );

    return otpExpiresAt;
  }

  static async login(email: string, password: string) {
    email = email.toLowerCase();

    const user = await User.findUserByEmail(email);

    if (!user) {
      throw new NotFoundError("User not found.");
    }
    const plainUser = user.get({ plain: true });

    if (!(await user.verifyPassword(password))) {
      throw new BadRequestError("Invalid password.");
    }

    return generateTokens({
      userId: plainUser.id!,
      email: plainUser.email,
      role: plainUser.role!,
      companyId: plainUser.companyId!,
    });
  }

  static async verifyOTP(email: string, otpCode: string) {
    email = email.toLowerCase();

    const user = await PendingUser.findByEmail(email);

    if (!user) {
      throw new NotFoundError("No signup found with this email.");
    }

    if (user.isExpired()) {
      throw new GoneError("OTP has expired. Please request a new one.");
    }

    if (!user.verifyOtp(otpCode)) {
      throw new BadRequestError("Invalid OTP code.");
    }

    const verifiedUser = await User.createUser(user);

    user.destroy();

    const plainUser = verifiedUser.get({ plain: true });

    return generateTokens({
      userId: plainUser.id!,
      email: plainUser.email,
      role: plainUser.role!,
      companyId: plainUser.companyId!,
    });
  }

  static async resendOTP(email: string) {
    email = email.toLowerCase();

    const user = await PendingUser.findByEmail(email);

    if (!user) {
      throw new NotFoundError("User not found.");
    }

    const otpCode = generateOtp();
    console.log("Regenerated OTP Code:", otpCode);
    const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await PendingUser.update(email, {
      otpCode,
      otpExpiresAt,
    });

    return otpExpiresAt;
  }

  static async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw new BadRequestError("Refresh token is required.");
    }

    const payload = authenticateRefreshToken(refreshToken);

    return createAccessToken(payload);
  }
}

function capitalizeName(name: string): string {
  return name
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
export default AuthService;
