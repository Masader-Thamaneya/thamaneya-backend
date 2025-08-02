import { Response, CookieOptions } from "express";

const refreshTokenCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "strict",
  maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
};

export const attachRefreshToken = (res: Response, refreshToken: string) => {
  res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions);
};

export const deleteRefreshToken = (res: Response) => {
  res.clearCookie("refreshToken", refreshTokenCookieOptions);
};
