import db from "../models";
import fuelEmissionFactorsModel, {
  FuelEmissionFactor as FuelEmissionFactorType,
  FuelEmissionFactorCreationAttributes,
} from "../models/fuelEmissionFactors.model";
// import { Sector } from "../models/sector.model";
// import { Country } from "../models/country.model";
import { Op, UniqueConstraintError } from "sequelize";
import { ConflictError } from "../utils/errorMessages";

const FuelEmissionFactor =
  db.FuelEmissionFactor as typeof FuelEmissionFactorType;

class FuelEmissionFactorRepository {
  static async create(data: FuelEmissionFactorCreationAttributes) {
    return FuelEmissionFactor.create(data);
  }

  static async findById(id: string) {
    return FuelEmissionFactor.findByPk(id);
  }

  static async find(searchCriteria: any) {
    return FuelEmissionFactor.findOne({ where: searchCriteria });
  }

  static async update(id: string, updates: Partial<FuelEmissionFactorType>) {
    const report = await FuelEmissionFactor.findByPk(id);
    if (!report) throw new Error("hhhah");
    return report.update(updates);
  }
}

export default FuelEmissionFactorRepository;
