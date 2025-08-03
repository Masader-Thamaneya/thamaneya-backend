import User from "../repositories/user.repository";
import Company from "../repositories/company.repository";
import {
  ConflictError,
  NotFoundError,
  BadRequestError,
  GoneError,
  UnauthorizedError,
} from "../utils/errorMessages";
import { CompanyCreationAttributes } from "../models/company.model";
import { combineTableNames } from "sequelize/types/utils";

class CompanyService {
  static async getCompany(id: string) {
    if (!id) {
      throw new BadRequestError("Company ID is required.");
    }

    const company = await Company.findById(id);
    if (!company) {
      throw new NotFoundError("Company not found.");
    }

    return company.get({ plain: true });
  }

  static async createCompany(data: CompanyCreationAttributes, userId: string) {
    const company = await Company.createCompany(data);
    const user = await User.findUserById(userId);
    if (!user) {
      throw new UnauthorizedError("User not found.");
    }
    user.companyId = company.getDataValue("id");
    await user.save();
    const companyData = company.get({ plain: true });

    return companyData.id;
  }

  static async updateCompany(
    id: string,
    updates: Partial<CompanyCreationAttributes>
  ) {
    const newCompany = await Company.update(id, updates);
    if (!newCompany) {
      throw new NotFoundError("Company not found.");
    }
    return;
  }

  static async searchCompany(name: string) {
    const companies = await Company.searchByName(name);

    return companies.map((company) => company.get({ plain: true }));
  }
}

export default CompanyService;
