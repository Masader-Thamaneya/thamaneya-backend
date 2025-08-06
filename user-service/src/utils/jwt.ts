import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({ quiet: true });
const accessSecretKey = process.env.ACCESS_SECRET;
const refreshSecretKey = process.env.REFRESH_SECRET;

type JwtPayload = {
  userId: string;
  email: string;
  role: "admin" | "employee" | "manager";
  companyId: string;
};

if (!accessSecretKey || !refreshSecretKey) {
  throw Error("A JWT secret key not added");
}

export const createAccessToken = (JwtPayload: JwtPayload) => {
  const token = jwt.sign(JwtPayload, accessSecretKey, { expiresIn: "2h" });
  return token;
};

export const authenticateAccessToken = (token: string): JwtPayload => {
  const decoded = jwt.verify(token, accessSecretKey) as jwt.JwtPayload;
  return decoded as JwtPayload;
};

export const createRefreshToken = (JwtPayload: JwtPayload) => {
  const token = jwt.sign(JwtPayload, refreshSecretKey, { expiresIn: "14d" });
  return token;
};

export const authenticateRefreshToken = (token: string): JwtPayload => {
  const decoded = jwt.verify(token, refreshSecretKey) as jwt.JwtPayload;
  return decoded as JwtPayload;
};

export const generateTokens = (JwtPayload: JwtPayload) => {
  const accessToken = createAccessToken(JwtPayload);
  console.log(JwtPayload);
  console.log(accessToken);
  const refreshToken = createRefreshToken(JwtPayload);

  return { accessToken, refreshToken };
};
