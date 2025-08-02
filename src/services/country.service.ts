import Country from "../repositories/country.repository";
import { InternalServerError } from "../utils/errorMessages";

class CountryService {
  static async getCountries() {
    const countries = await Country.getAll();

    if (!countries || countries.length === 0) {
      throw new InternalServerError("Countries not found.");
    }

    return countries.map((country) => country.get({ plain: true }));
  }
}

export default CountryService;
