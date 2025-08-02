import db from "../models";
import {
  RefrigerantUsage as RefrigerantUsageType,
  RefrigerantUsageCreationAttributes,
} from "../models/refrigerantUsage.model";
// import { Sector } from "../models/sector.model";
// import { Country } from "../models/country.model";
import { Op, UniqueConstraintError } from "sequelize";
import { ConflictError } from "../utils/errorMessages";

const RefrigerantUsage = db.RefrigerantUsage as typeof RefrigerantUsageType;

class RefrigerantUsageRepository {
  static async create(data: RefrigerantUsageCreationAttributes) {
    return RefrigerantUsage.create(data);
  }

  static async bulkCreate(data: RefrigerantUsageCreationAttributes[]) {
    try {
      return await RefrigerantUsage.bulkCreate(data, {
        updateOnDuplicate: ["activity_data"],
      });
    } catch (error) {
      if (error instanceof UniqueConstraintError) {
        throw new ConflictError("Generator already exists.");
      }
      throw error;
    }
  }

  static async findById(id: string) {
    return RefrigerantUsage.findByPk(id);
  }

  static async update(id: string, updates: Partial<RefrigerantUsageType>) {
    const report = await RefrigerantUsage.findByPk(id);
    if (!report) throw new Error("hhhah");
    return report.update(updates);
  }
}

export default RefrigerantUsageRepository;
