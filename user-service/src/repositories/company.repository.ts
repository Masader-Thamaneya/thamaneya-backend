import db from "../models";
import {
  Company as CompanyType,
  CompanyCreationAttributes,
} from "../models/company.model";
import { Sector } from "../models/sector.model";
import { Country } from "../models/country.model";
import { Op, UniqueConstraintError } from "sequelize";
import { ConflictError } from "../utils/errorMessages";

const Company = db.Company as typeof CompanyType;

class CompanyRepository {
  static async createCompany(data: CompanyCreationAttributes) {
    try {
      return Company.create(data);
    } catch (error: any) {
      if (error instanceof UniqueConstraintError) {
        throw new ConflictError("Company already exists");
      }
      throw error;
    }
  }

  static async findById(id: string) {
    return Company.findByPk(id, {
      include: [
        { model: db.Sector as typeof Sector, as: "sector" },
        { model: db.Country as typeof Country, as: "country" },
        { model: db.Country as typeof Country, as: "primaryCountry" },
      ],
    });
  }

  static async update(id: string, updates: Partial<CompanyType>) {
    const company = await Company.findByPk(id);
    if (!company) return null;
    try {
      return company.update(updates);
    } catch (error: any) {
      if (error instanceof UniqueConstraintError) {
        throw new ConflictError("Company already exists");
      }
      throw error;
    }
  }

  static async delete(id: number) {
    return Company.destroy({ where: { id } });
  }

  static async findBySector(sectorId: number) {
    return Company.findAll({
      where: { sector_id: sectorId },
      include: [{ model: db.Sector as typeof Sector, as: "sector" }],
    });
  }

  static async searchByName(name: string) {
    return Company.findAll({
      where: {
        name: { [Op.like]: `%${name}%` },
      },
    });
  }
}

export default CompanyRepository;
