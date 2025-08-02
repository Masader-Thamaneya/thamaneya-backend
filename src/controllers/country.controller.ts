import { Request, Response, NextFunction } from "express";

import CountryService from "../services/country.service";

class CountryController {
  static async getCountries(req: Request, res: Response, next: NextFunction) {
    try {
      const countries = await CountryService.getCountries();

      return res.status(200).json({
        success: true,
        message: "Countries retrieved successfully.",
        data: countries,
      });
    } catch (err: any) {
      next(err);
    }
  }
}

export default CountryController;
