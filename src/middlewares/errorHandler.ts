import { Request, Response, NextFunction } from "express";
import { BaseError, InternalServerError } from "../utils/errorMessages";
import dotenv from "dotenv";

dotenv.config({ quiet: true });

const isDevelopment = process.env.NODE_ENV == "development";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (isDevelopment) {
    console.log("Error occurred:", err);
  }
  if (err instanceof BaseError) {
    return res.status(err.statusCode).json(err.response);
  } else {
    if (isDevelopment) {
      const error = new BaseError("Internal Server Error", 500, {
        devError: err.stack || String(err),
      });
      error.response;
      return res.status(error.statusCode).json(error.response);
    }
    const error = new InternalServerError("Internal Server Error");
    return res.status(error.statusCode).json(error.response);
  }
}
