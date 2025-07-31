import { authenticateAccessToken } from "../utils/jwt";
import { Request, Response } from "express";

import { UnauthorizedError } from "../utils/errorMessages";

/* export interface CustomRequest extends Request {
  user: JwtPayload;
} */

export const authenticate = async (req: Request, res: Response, next: any) => {
  try {
    const authHeader: string | undefined = req.headers["authorization"];
    if (!authHeader) {
      throw new UnauthorizedError("Authentication token missing");
    }
    const token: string = authHeader.split(" ")[1];

    if (!token) {
      throw new UnauthorizedError("Authentication token missing");
    }

    const decoded = authenticateAccessToken(token);
    req.user = decoded;
    next();
  } catch (err: any) {
    next(err);
  }
};
