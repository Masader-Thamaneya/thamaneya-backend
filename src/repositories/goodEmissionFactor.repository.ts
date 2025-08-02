import db from "../models";
import GoodEmissionFactorsModel, {
  GoodEmissionFactor as GoodEmissionFactorType,
  GoodEmissionFactorCreationAttributes,
} from "../models/goodEmissionFactors.model";
// import { Sector } from "../models/sector.model";
// import { Country } from "../models/country.model";
import { Op, UniqueConstraintError } from "sequelize";
import { ConflictError } from "../utils/errorMessages";

const GoodEmissionFactor =
  db.GoodEmissionFactor as typeof GoodEmissionFactorType;

class GoodEmissionFactorRepository {
  static async create(data: GoodEmissionFactorCreationAttributes) {
    return GoodEmissionFactor.create(data);
  }

  static async findById(id: string) {
    return GoodEmissionFactor.findByPk(id);
  }

  static async find(searchCriteria: any) {
    return GoodEmissionFactor.findOne({ where: searchCriteria });
  }

  static async update(id: string, updates: Partial<GoodEmissionFactorType>) {
    const report = await GoodEmissionFactor.findByPk(id);
    if (!report) throw new Error("hhhah");
    return report.update(updates);
  }
}

export default GoodEmissionFactorRepository;
