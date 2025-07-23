import { Request, Response, NextFunction } from "express";

import db from "../models";
import { Company as CompanyType } from "../models/company.model";
import { Sector as SectorType } from "../models/sector.model";

import CompanyRepository from "../repositories/company.repository";

import CompanyService from "../services/company.service";

import { authenticateAccessToken } from "../utils/jwt";

const Company = db.Company as typeof CompanyType;
const Sector = db.Sector as typeof SectorType;

class CompanyController {
  static async getCompany(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user!;
      const { id } = req.params;

      const company = await CompanyService.getCompany(parseInt(id));

      return res.status(200).json({
        success: true,
        message: "Company retrieved successfully.",
        data: company,
      });
    } catch (err: any) {
      next(err);
    }
  }
  static async createCompany(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id;
      if (!userId) {
      }
      const data = req.body.company;
      const id = await CompanyService.createCompany(data);

      return res.status(200).json({
        success: true,
        message: "Company created successfully.",
        data: { id },
      });
    } catch (err: any) {
      next(err);
    }
  }

  static async updateCompany(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const updates = req.body.company;

      await CompanyService.updateCompany(parseInt(id), updates);

      return res.status(200).json({
        success: true,
        message: "Company updated successfully.",
      });
    } catch (err: any) {
      next(err);
    }
  }

  static async searchCompany(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = req.query;

      if (!name) {
        return res.status(400).json({
          success: false,
          message: "Company name is required for search.",
        });
      }

      const companies = await CompanyRepository.searchByName(name as string);

      return res.status(200).json({
        success: true,
        message: "Companies retrieved successfully.",
        data: companies,
      });
    } catch (err: any) {
      next(err);
    }
  }
}

export default CompanyController;
