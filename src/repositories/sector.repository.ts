import db from "../models";
import { Sector as SectorType } from "../models/sector.model";

const Sector = db.Sector as typeof SectorType;

class SectorRepository {
  static async getAll() {
    return Sector.findAll();
  }
}

export default SectorRepository;
