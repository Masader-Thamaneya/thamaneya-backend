import Report from "../repositories/report.repository";
import Generator from "../repositories/generator.repository";
import FuelEmissionFactor from "../repositories/emissionFactor.repository";
import GoodEmissionFactor from "../repositories/goodEmissionFactor.repository";
import RefrigerantEmissionFactor from "../repositories/refrigerantEmissionFactor.repository";

import {
  ConflictError,
  NotFoundError,
  BadRequestError,
  GoneError,
  UnauthorizedError,
} from "../utils/errorMessages";
import { generateOtp } from "../utils/otp";
import { RefrigerantUsage } from "../models/refrigerantUsage.model";

class ReportsService {
  static async createReport(created_by: string, company_id: string) {
    const report = await Report.create({ created_by, company_id });

    const plainReport = report.get({ plain: true });

    return plainReport.id;
  }

  static async updateReport(
    reportId: string,
    userId: string,
    companyId: string,
    reportData: any
  ) {
    // const report = await Report.update(reportId, reportData);

    const report = await Report.findById(reportId);

    if (!report) {
      throw new NotFoundError("Report is not found.");
    }

    if (!(await report.verifyUser(userId))) {
      throw new UnauthorizedError("User cannot update the report.");
    }

    // Only update fields that are present in reportData
    Object.entries(reportData).forEach(([key, value]) => {
      if (value !== undefined) {
        (report as any)[key] = value;
      }
    });
    await report.save();

    if (reportData.generators) {
      const generators = reportData.generators.map((generator: any) => {
        return {
          report_id: reportId,
          year: report.get("reporting_year"),
          ...generator,
        };
      });

      await Generator.bulkCreate(generators);
    }

    if (reportData.refrigerants) {
      const refrigerants = reportData.refrigerants.map((refrigerant: any) => {
        return {
          report_id: reportId,
          year: report.reporting_year,
          ...refrigerant,
        };
      });

      await RefrigerantUsage.bulkCreate(refrigerants);
    }

    return;
  }

  static async getReport(reportId: string, userId: string) {
    const report = await Report.findById(reportId);

    if (!report) {
      throw new NotFoundError("Report is not found.");
    }

    if (!(await report.verifyUser(userId))) {
      throw new UnauthorizedError("User cannot read the report.");
    }
    const plainReport = report.get({ plain: true });

    // console.log(plainReport);
    // for (const generator of plainReport.generators) {
    //   generator.activity_data = JSON.parse(generator.activity_data);
    // }

    return plainReport;
  }

  static async submitReport(reportId: string) {
    const report = await Report.findById(reportId);
    if (!report) throw new NotFoundError("Report not found");

    const scope1 = await scope1Emissions(reportId);
    const scope2 = await scope2Emissions(reportId);

    const s1_s2 = scope1 + scope2;
    report.scope_1_emissions = scope1;
    report.scope_2_emissions = scope2;

    report.s1_s2_emissions = s1_s2;
    report.s1_s2_per_area = s1_s2 / report.area!;
    report.s1_s2_per_employee = s1_s2 / report.number_of_employees!;
    report.s1_s2_per_revenue = s1_s2 / report.revenue!;

    await report.save();
  }
}
export default ReportsService;

const scope1Emissions = async (reportId: string) => {
  let totalEmissions = 0;
  totalEmissions = await updateGeneratorEmissions(reportId);
  totalEmissions += await updateRefrigerantsEmissions(reportId);

  return totalEmissions;
};

const scope2Emissions = async (reportId: string) => {
  const report = await Report.findById(reportId);
  if (!report) throw new NotFoundError("Report not found");

  const purchased_electricity = report.purchased_electricity || 0;
  const purchased_chilled_water = report.purchased_chilled_water || 0;

  const total_electricity = purchased_chilled_water + purchased_electricity;

  const factor = await GoodEmissionFactor.find({
    good_id: 1,
    unit_id: 10,
    year: report.reporting_year,
  });

  if (!factor) {
    throw new Error(`No emission factor found for `);
  }
  return total_electricity * factor.ef;
};

const updateGeneratorEmissions = async (reportId: string) => {
  const report = await Report.findById(reportId);

  if (!report) throw new NotFoundError("Report not found");

  if (!report.generators) {
    return 0;
  }
  const generatorEmissions = await Promise.all(
    report.generators.map(async (generator) => {
      let fuel_id: number = 1;

      if (generator.fuel_type === "gas") {
        fuel_id = 24;
      } else if (generator.fuel_type === "petrol") {
        fuel_id = 17;
      } else if (generator.fuel_type === "diesel") {
        fuel_id = 11;
      }

      const factor = await FuelEmissionFactor.find({
        fuel_id,
        unit_id: 3,
        year: report.reporting_year,
      });

      if (!factor) {
        throw new Error(
          `No emission factor found for fuel_id: ${generator.getDataValue(
            "fuel_type"
          )}`
        );
      }

      const emissions = generator.activity_data * factor.ef;

      await generator.update({ emissions });

      return emissions;
    })
  );

  const totalEmissions = generatorEmissions.reduce((sum, val) => sum + val, 0);

  return totalEmissions;
};

const updateRefrigerantsEmissions = async (reportId: string) => {
  const report = await Report.findById(reportId);

  if (!report) throw new NotFoundError("Report not found");

  if (!report.refrigerants) {
    return 0;
  }
  const refrigerantEmissions = await Promise.all(
    report.refrigerants.map(async (refrigerant) => {
      const factor = await RefrigerantEmissionFactor.find({
        gas_id: refrigerant.gas_id,
        unit_id: refrigerant.unit_id,
        year: report.reporting_year,
      });

      if (!factor) {
        throw new Error(
          `No emission factor found for gas_id: ${refrigerant.gas_id}`
        );
      }

      const emissions = refrigerant.activity_data * factor.ef;

      await refrigerant.update({ emissions });

      return emissions;
    })
  );

  const totalEmissions = refrigerantEmissions.reduce(
    (sum, val) => sum + val,
    0
  );

  return totalEmissions;
};
