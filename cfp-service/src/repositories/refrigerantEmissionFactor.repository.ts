import db from "../models";
import refrigerantEmissionFactorsModel, {
  RefrigerentEmissionFactor as RefrigerantEmissionFactorType,
  RefrigerentEmissionFactorCreationAttributes,
} from "../models/refrigerantEmissionFactor.model";
// import { Sector } from "../models/sector.model";
// import { Country } from "../models/country.model";
import { Op, UniqueConstraintError } from "sequelize";
import { ConflictError } from "../utils/errorMessages";

const RefrigerantEmissionFactor =
  db.RefrigerantEmissionFactor as typeof RefrigerantEmissionFactorType;

class RefrigerantEmissionFactorRepository {
  static async create(data: RefrigerentEmissionFactorCreationAttributes) {
    return RefrigerantEmissionFactor.create(data);
  }

  static async findById(id: string) {
    return RefrigerantEmissionFactor.findByPk(id);
  }

  static async find(searchCriteria: any) {
    return RefrigerantEmissionFactor.findOne({ where: searchCriteria });
  }

  static async update(
    id: string,
    updates: Partial<RefrigerantEmissionFactorType>
  ) {
    const report = await RefrigerantEmissionFactor.findByPk(id);
    if (!report) throw new Error("hhhah");
    return report.update(updates);
  }
}

export default RefrigerantEmissionFactorRepository;
