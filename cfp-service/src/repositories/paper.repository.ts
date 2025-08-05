import db from "../models";
import {
  PaperUsage as PaperUsageType,
  PaperUsageCreationAttributes,
} from "../models/paperUsage.model";

// import { Sector } from "../models/sector.model";
// import { Country } from "../models/country.model";
import { Op, UniqueConstraintError } from "sequelize";
import { ConflictError } from "../utils/errorMessages";

const PaperUsage = db.PaperUsage as typeof PaperUsageType;

class PaperRepository {
  static async create(data: PaperUsageCreationAttributes) {
    return PaperUsage.create(data);
  }

  static async bulkCreate(data: PaperUsageCreationAttributes[]) {
    try {
      return await PaperUsage.bulkCreate(data, {
        updateOnDuplicate: ["activity_data"],
      });
    } catch (error) {
      if (error instanceof UniqueConstraintError) {
        throw new ConflictError("Waste usage already exists.");
      }
      throw error;
    }
  }
}

export default PaperRepository;
