import Report from "../repositories/report.repository";
import Gas from "../repositories/gas.repository";
import Generator from "../repositories/generator.repository";
import Waste from "../repositories/waste.repository";
import Paper from "../repositories/paper.repository";

import FuelEmissionFactor from "../repositories/emissionFactor.repository";
import GoodEmissionFactor from "../repositories/goodEmissionFactor.repository";
import RefrigerantEmissionFactor from "../repositories/refrigerantEmissionFactor.repository";

import { Report as ReportType } from "../models/report.model";

import {
  ConflictError,
  NotFoundError,
  BadRequestError,
  GoneError,
  InternalServerError,
  UnauthorizedError,
} from "../utils/errorMessages";
import { generateOtp } from "../utils/otp";
import { RefrigerantUsage } from "../models/refrigerantUsage.model";

class ReportsService {
  static async getCompanyReports(companyId: string) {
    const reports = await Report.findByCompany(companyId);

    const plainReports = reports.map((report) => report.get({ plain: true }));
    return plainReports;
  }

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

    if (reportData.wastes) {
      const wastes = reportData.wastes.map((waste: any) => {
        return {
          report_id: reportId,
          unit_id: 1,
          ...waste,
        };
      });

      await Waste.bulkCreate(wastes);
    }

    if (reportData.papers) {
      const papers = reportData.papers.map((paper: any) => {
        return {
          report_id: reportId,
          ...paper,
        };
      });

      await Paper.bulkCreate(papers);
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

    const { scope_1_emissions, WTT_emissions } = await scope1Emissions(report);
    const { scope_2_emissions, category_3_emissions } = await scope2Emissions(
      report
    );
    const cat_1_emissions = await cat1Emissions(report);
    const cat_3_emissions = category_3_emissions + WTT_emissions;
    const cat_5_emissions = await cat5Emissions(report);
    const cat_7_emissions = await cat7Emissions(report);

    const scope_3_emissions =
      cat_1_emissions + cat_3_emissions + cat_5_emissions + cat_7_emissions;

    const emissions = scope_1_emissions + scope_2_emissions + scope_3_emissions;

    const s1_s2 = scope_1_emissions + scope_2_emissions;
    report.scope_1_emissions = scope_1_emissions;
    report.scope_2_emissions = scope_2_emissions;

    report.s1_s2_emissions = s1_s2;
    report.s1_s2_per_area = s1_s2 / report.area!;
    report.s1_s2_per_employee = s1_s2 / report.number_of_employees!;
    report.s1_s2_per_revenue = s1_s2 / report.revenue!;

    report.cat_1_emissions = cat_1_emissions;
    report.cat_3_emissions = cat_3_emissions;
    report.cat_5_emissions = cat_5_emissions;
    report.cat_7_emissions = cat_7_emissions;

    report.scope_3_emissions = scope_3_emissions;
    report.total_emissions = emissions;

    await report.save();
  }

  static async getGases() {
    const gases = await Gas.getAll();

    if (!gases || gases.length == 0) {
      throw new InternalServerError("No gases are found.");
    }
    return gases;
  }

  static async getWastes() {
    const wastes = await Waste.fetchWastes();

    if (!wastes || wastes.length == 0) {
      throw new InternalServerError("No wastes are found.");
    }
    return wastes;
  }
}
export default ReportsService;

const scope1Emissions = async (report: ReportType) => {
  let { emissions: scope_1_emissions, WTT_emissions } =
    await updateGeneratorEmissions(report);
  scope_1_emissions += await updateRefrigerantsEmissions(report);

  return { scope_1_emissions, WTT_emissions };
};

const scope2Emissions = async (report: ReportType) => {
  const purchased_electricity = report.purchased_electricity || 0;
  const purchased_chilled_water = report.purchased_chilled_water || 0;

  const total_electricity = purchased_chilled_water + purchased_electricity;

  const electricity_factor = await GoodEmissionFactor.find({
    good_id: 1,
    unit_id: 10,
    year: report.reporting_year,
  });

  const electricity_WTT_factor = await GoodEmissionFactor.find({
    good_id: 2,
    unit_id: 10,
    year: report.reporting_year,
  });

  const electricity_T_D_factor = await GoodEmissionFactor.find({
    good_id: 3,
    unit_id: 10,
    year: report.reporting_year,
  });

  if (
    !electricity_factor ||
    !electricity_WTT_factor ||
    !electricity_T_D_factor
  ) {
    throw new InternalServerError(`No emission factor found for electricity`);
  }

  const scope_2_emissions = total_electricity * electricity_factor.ef;
  const electricity_WTT_emissions =
    purchased_electricity * electricity_WTT_factor.ef;
  const electricity_T_D_emissions =
    purchased_electricity * electricity_T_D_factor.ef;

  const category_3_emissions =
    electricity_WTT_emissions + electricity_T_D_emissions;

  return { scope_2_emissions, category_3_emissions };
};

const cat1Emissions = async (report: ReportType) => {
  let A3_emissions = 0,
    A4_emissions = 0,
    water_emissions = 0;

  if (report.papers && report.papers.length > 0) {
    let A3_usage = 0,
      A4_usage = 0;
    const paper_factor = await GoodEmissionFactor.find({
      good_id: 7,
      unit_id: 1,
      year: report.reporting_year,
    });

    if (!paper_factor) {
      throw new InternalServerError(`No emission factor found for paper`);
    }
    report.papers.forEach((paper) => {
      if (paper.type === "A3") {
        A3_usage += paper.activity_data || 0;
      } else if (paper.type === "A4") {
        A4_usage += paper.activity_data || 0;
      }
    });

    A3_emissions = A3_usage * (5 / (10 ^ 6)) * paper_factor.ef;
    A4_emissions = A4_usage * (10 / (10 ^ 6)) * paper_factor.ef;
  }

  if (report.water_consumption) {
    const water_factor = await GoodEmissionFactor.find({
      good_id: 5,
      unit_id: 9,
      year: report.reporting_year,
    });

    if (!water_factor) {
      throw new InternalServerError(`No emission factor found for water`);
    }

    water_emissions = report.water_consumption * water_factor.ef;
  }

  return A3_emissions + A4_emissions + water_emissions;
};

const cat5Emissions = async (report: ReportType) => {
  if (!report.wastes || report.wastes.length === 0) {
    return 0;
  }
  const wasteEmissions = await Promise.all(
    report.wastes.map(async (waste) => {
      const factor = await Waste.findEmissionFactor({
        waste_id: waste.waste_id,
        unit_id: waste.unit_id,
        treatment: waste.treatment,
      });

      if (!factor) {
        throw new InternalServerError(
          `No emission factor found for waste_id: ${waste.waste_id}`
        );
      }

      const emissions = waste.activity_data * factor.ef;

      await waste.update({ emissions });

      return emissions;
    })
  );

  const totalEmissions = wasteEmissions.reduce((sum, val) => sum + val, 0);

  return totalEmissions;
};

const cat7Emissions = async (report: ReportType) => {
  if (!report.number_of_employees) {
    return 0;
  }
  const commuting_factor = await GoodEmissionFactor.find({
    good_id: 18,
    unit_id: 14,
    year: report.reporting_year,
  });

  if (!commuting_factor) {
    throw new InternalServerError(`No emission factor found for commuting`);
  }

  return commuting_factor.ef * report.number_of_employees;
};

const updateGeneratorEmissions = async (report: ReportType) => {
  if (!report.generators) {
    return { emissions: 0, WTT_emissions: 0 };
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
        throw new InternalServerError(
          `No emission factor found for fuel_id: ${generator.getDataValue(
            "fuel_type"
          )}`
        );
      }

      const emissions = generator.activity_data * factor.ef;
      const WTT_emissions = generator.activity_data * factor.wtt_ef;

      await generator.update({ emissions });

      return { emissions, WTT_emissions };
    })
  );

  const totalEmissions = generatorEmissions.reduce(
    (sum, val) => ({
      emissions: sum.emissions + val.emissions,
      WTT_emissions: sum.WTT_emissions + val.WTT_emissions,
    }),
    { emissions: 0, WTT_emissions: 0 }
  );

  return totalEmissions;
};

const updateRefrigerantsEmissions = async (report: ReportType) => {
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
        throw new InternalServerError(
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
