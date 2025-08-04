import db from "../models";
import {
  Report as ReportType,
  ReportCreationAttributes,
} from "../models/report.model";
// import { Sector } from "../models/sector.model";
// import { Country } from "../models/country.model";
import { Op, UniqueConstraintError } from "sequelize";
import { ConflictError } from "../utils/errorMessages";

const Report = db.Report as typeof ReportType;

class ReportRepository {
  static async create(data: ReportCreationAttributes) {
    console.log("Creating report with data:", data);
    return Report.create(data);
  }

  static async findById(id: string) {
    return Report.findByPk(id, {
      include: [
        { model: db.Generator, as: "generators" },
        { model: db.RefrigerantUsage, as: "refrigerants" },
        { model: db.WasteUsage, as: "wastes" },
      ],
    });
  }

  static async update(id: string, updates: Partial<ReportType>) {
    const report = await Report.findByPk(id);
    if (!report) throw new Error("hhhah");
    return report.update(updates);
  }

  // static async delete(id: number) {
  //   return Company.destroy({ where: { id } });
  // }

  static async findByCreator(created_by: number) {
    return Report.findAll({
      where: { created_by },
    });
  }

  static async findByCompany(company_id: string) {
    return Report.findAll({
      where: {
        company_id,
      },
    });
  }
}

export default ReportRepository;
