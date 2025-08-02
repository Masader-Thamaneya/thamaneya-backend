import db from "../models";
import { Country as CountryType } from "../models/country.model";
import { Op, UniqueConstraintError } from "sequelize";
import { ConflictError } from "../utils/errorMessages";

const Country = db.Country as typeof CountryType;

class CompanyRepository {
  static async getAll() {
    return Country.findAll();
  }
}

export default CompanyRepository;
