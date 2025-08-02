import { Request, Response, NextFunction } from "express";
import Joi from "joi";

import { BadRequestError } from "../utils/errorMessages";

const validateBody = (schema: Joi.ObjectSchema, abortEarly: boolean) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body, { abortEarly });

    if (error) {
      const fieldErrors: Record<string, string> = {};

      for (const detail of error.details) {
        const field = detail.path[1] as string;

        fieldErrors[field] = detail.message;
      }

      //   const validationError = new Error("Validation failed");
      const validationError = new BadRequestError(
        "Validation failed",
        fieldErrors
      );

      return next(validationError);
    }

    req.body = value;
    next();
  };
};

export default validateBody;
