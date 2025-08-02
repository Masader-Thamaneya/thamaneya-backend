import Joi from "joi";

const emailValidator = Joi.string().required().email().strict().messages({
  "string.empty": "Email is required.",
  "any.required": "Email is required.",
  "string.email": "Please provide a valid email address.",
});

const passwordValidator = Joi.string()
  .required()
  .min(8)
  .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$"))
  .messages({
    "string.empty": "Password is required.",
    "any.required": "Password is required.",
    "string.min": "Password must be at least 8 characters long.",
    "string.pattern.base": "Please provide a valid password.",
  });

export const signupSchema = Joi.object({
  user: Joi.object({
    name: Joi.string().required().min(2).max(50).messages({
      "string.empty": "Name is required.",
      "any.required": "Name is required.",
      "string.min": "Name must be at least 2 characters.",
      "string.max": "Name must be at most 50 characters.",
    }),
    email: emailValidator,
    password: passwordValidator,
  }),
});

export const loginSchema = Joi.object({
  user: Joi.object({
    email: emailValidator,
    password: passwordValidator,
  }),
});

export const otpSchema = Joi.object({
  user: Joi.object({
    email: emailValidator,
    otp: Joi.string().required().length(6).messages({
      "string.empty": "OTP is required.",
      "any.required": "OTP is required.",
      "string.length": "OTP must be exactly 6 characters long.",
    }),
  }),
});

export const otpResendSchema = Joi.object({
  user: Joi.object({
    email: emailValidator,
  }),
});
