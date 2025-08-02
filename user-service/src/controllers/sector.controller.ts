import { Request, Response, NextFunction } from "express";

import SectorService from "../services/sector.service";

class SectorController {
  static async getSectors(req: Request, res: Response, next: NextFunction) {
    try {
      const sectors = await SectorService.getSectors();

      return res.status(200).json({
        success: true,
        message: "Sectors retrieved successfully.",
        data: sectors,
      });
    } catch (err: any) {
      next(err);
    }
  }
}

export default SectorController;
