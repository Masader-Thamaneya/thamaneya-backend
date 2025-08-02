import Sector from "../repositories/sector.repository";
import { InternalServerError } from "../utils/errorMessages";

class SectorService {
  static async getSectors() {
    const sectors = await Sector.getAll();

    if (!sectors || sectors.length === 0) {
      throw new InternalServerError("Sectors not found.");
    }

    return sectors.map((sector) => sector.get({ plain: true }));
  }
}

export default SectorService;
