import db from "../models";
import { Gas as GasType } from "../models/gas.model";

const Gas = db.Gas as typeof GasType;

class GasRepository {
  static async getAll() {
    return Gas.findAll();
  }
}

export default GasRepository;
