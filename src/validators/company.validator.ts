import Joi from "joi";

export const companyValidator = Joi.object({
  company: Joi.object({
    name: Joi.string().min(2).max(100).required().messages({
      "string.empty": "Name is required.",
      "any.required": "Name is required.",
    }),
    sector_id: Joi.number().integer().positive(),
    primary_country_id: Joi.number().integer().positive(),
    country_id: Joi.number().integer().positive(),

    city: Joi.string().min(2).max(100).required().messages({
      "string.empty": "City is required.",
      "any.required": "City is required.",
    }),

    size: Joi.string().min(1).max(50).required().messages({
      "string.empty": "Size is required.",
      "any.required": "Size is required.",
    }),

    website: Joi.string().uri().messages({
      "string.uri": "Website must be a valid URL.",
    }),

    email: Joi.string().email().required().messages({
      "string.email": "Please provide a valid email address.",
      "string.empty": "Email is required.",
      "any.required": "Email is required.",
    }),

    phone: Joi.string().min(4).max(20).required().messages({
      "string.empty": "Phone is required.",
      "any.required": "Phone is required.",
    }),

    logo_url: Joi.string().uri().messages({
      "string.uri": "Logo URL must be a valid URL.",
    }),

    description: Joi.string().allow("").max(1000),
    manufacturing_process: Joi.string().allow("").max(1000),
  }).options({ stripUnknown: true }),
});

export const updateCompanyValidator = Joi.object({
  company: Joi.object({
    name: Joi.string().min(2).max(100).messages({
      "string.empty": "Name cannot be empty.",
    }),

    sector_id: Joi.number().integer().positive(),

    primary_country_id: Joi.number().integer().positive(),

    country_id: Joi.number().integer().positive(),

    city: Joi.string().min(2).max(100).messages({
      "string.empty": "City cannot be empty.",
    }),

    size: Joi.string().min(1).max(50).messages({
      "string.empty": "Size cannot be empty.",
    }),

    website: Joi.string().uri().messages({
      "string.uri": "Website must be a valid URL.",
    }),

    email: Joi.string().email().messages({
      "string.email": "Please provide a valid email address.",
    }),

    phone: Joi.string().min(4).max(20).messages({
      "string.empty": "Phone cannot be empty.",
    }),

    logo_url: Joi.string().uri().messages({
      "string.uri": "Logo URL must be a valid URL.",
    }),

    description: Joi.string().allow("").max(1000),

    manufacturing_process: Joi.string().allow("").max(1000),
  }).options({ stripUnknown: true }),
});
