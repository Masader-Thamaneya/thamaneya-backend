import db from "../models";
import {
  Waste as WasteType,
  WasteCreationAttributes,
} from "../models/waste.model";
import wasteEmissionFactorModel, {
  WasteEmissionFactor as WasteEmissionFactorType,
} from "../models/wasteEmissionFactor.model";
import {
  WasteUsage as WasteUsageType,
  WasteUsageCreationAttributes,
} from "../models/wasteUsage.model";

// import { Sector } from "../models/sector.model";
// import { Country } from "../models/country.model";
import { Op, UniqueConstraintError } from "sequelize";
import { ConflictError } from "../utils/errorMessages";

const Waste = db.Waste as typeof WasteType;
const WasteEmissionFactor =
  db.wasteEmissionFactor as typeof WasteEmissionFactorType;
const WasteUsage = db.WasteUsage as typeof WasteUsageType;

class WasteRepository {
  static async create(data: WasteUsageCreationAttributes) {
    return WasteUsage.create(data);
  }

  static async bulkCreate(data: WasteUsageCreationAttributes[]) {
    try {
      return await WasteUsage.bulkCreate(data, {
        updateOnDuplicate: ["activity_data"],
      });
    } catch (error) {
      if (error instanceof UniqueConstraintError) {
        throw new ConflictError("Waste usage already exists.");
      }
      throw error;
    }
  }

  static async findEmissionFactor(searchCriteria: any) {
    return WasteEmissionFactor.findOne({ where: searchCriteria });
  }

  static async fetchWastes() {
    return Waste.findAll({
      order: [["name", "ASC"]],
    });
  }
}

export default WasteRepository;
