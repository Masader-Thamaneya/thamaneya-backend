import { Request, Response, NextFunction } from "express";
import ReportService from "../services/report.service";
import { string } from "joi";

class ReportsController {
  static async createReport(req: Request, res: Response, next: NextFunction) {
    const { companyId, userId } = req.user!; // TODO: change to req.user
    try {
      const reportId = await ReportService.createReport(
        String(userId),
        String(companyId)
      );

      return res.status(201).json({
        success: true,
        message: "Carbon footprint report created successfully.",
        data: {
          reportId,
        },
      });
    } catch (err: any) {
      next(err);
    }
  }

  static async updateReport(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { userId, companyId } = req.user!;
    const { report } = req.body;

    try {
      await ReportService.updateReport(id, userId, companyId, report);
      return res.status(200).json({
        success: true,
        message: "Report was updated successfully.",
      });
    } catch (err: any) {
      next(err);
    }
  }

  static async getReport(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { userId, companyId } = req.user!;
    try {
      const report = await ReportService.getReport(id, userId);
      // const updatedReport = await ReportService.updateGeneratorEmissions(id);
      // console.log("Updated Report:", updatedReport);
      // const updatedReport = await ReportService.updateRefrigerantsEmissions(id);
      // console.log("Updated Report:", updatedReport);
      return res.status(200).json({
        success: true,
        message: "Company reports retreived successfully.",
        data: {
          report,
        },
      });
    } catch (err: any) {
      next(err);
    }
  }

  static async submitReport(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { userId, companyId } = req.user!; // TODO: change to req.user
    const { data } = req.body;
    try {
      let totalEmissions = 0;
      await ReportService.submitReport(id);

      return res.status(200).json({
        success: true,
        message: "Report was submitted successfully.",
      });
    } catch (err: any) {
      next(err);
    }
  }

  static async getGases(req: Request, res: Response, next: NextFunction) {
    try {
      const gases = await ReportService.getGases();
      return res.status(200).json({
        success: true,
        message: "Gases were retreived successfully.",
        data: {
          gases,
        },
      });
    } catch (err: any) {
      next(err);
    }
  }
  /* 
  static async submitReport(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { userId, companyId } = req.body.user; // TODO: change to req.user
    const { data } = req.body;
    try {
      await ReportService.submitReport(id, userId, companyId, data);
      return res.status(200).json({
        success: true,
        message: "Report was submitted successfully.",
      });
    } catch (err: any) {
      next(err);
    }
  }

  static async getCompanyReports(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { userId, companyId } = req.body.user; // TODO: change to req.user
    try {
      const reports = await ReportService.getCompanyReports(companyId);
      return res.status(200).json({
        success: true,
        message: "Company reports retreived successfully.",
        data: {
          reports,
        },
      });
    } catch (err: any) {
      next(err);
    }
  }

   */
}

export default ReportsController;
