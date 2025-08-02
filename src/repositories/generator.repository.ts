import db from "../models";
import {
  Generator as GeneratorType,
  GeneratorCreationAttributes,
} from "../models/generators.model";
// import { Sector } from "../models/sector.model";
// import { Country } from "../models/country.model";
import { Op, UniqueConstraintError } from "sequelize";
import { ConflictError } from "../utils/errorMessages";

const Generator = db.Generator as typeof GeneratorType;

class GeneratorRepository {
  static async create(data: GeneratorCreationAttributes) {
    return Generator.create(data);
  }

  static async bulkCreate(data: GeneratorCreationAttributes[]) {
    try {
      return await Generator.bulkCreate(data, {
        updateOnDuplicate: ["number", "activity_data"],
      });
    } catch (error) {
      if (error instanceof UniqueConstraintError) {
        throw new ConflictError("Generator already exists.");
      }
      throw error;
    }
  }

  static async findById(id: string) {
    return Generator.findByPk(id);
  }

  static async update(id: string, updates: Partial<GeneratorType>) {
    const report = await Generator.findByPk(id);
    if (!report) throw new Error("hhhah");
    return report.update(updates);
  }
}

export default GeneratorRepository;
