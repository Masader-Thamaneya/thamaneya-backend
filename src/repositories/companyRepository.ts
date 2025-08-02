import db from "../models";

const Company = db.Company;

export class CompanyRepository {
  static async createCompany(name: string): Promise<any> {
    try {
      console.log("Creating company with data:", name);
      const company = await Company.create({ name });
      return company;
    } catch (error: any) {
      throw new Error(`Error creating company: ${error.message}`);
    }
  }

  static async getCompanyById(id: number): Promise<any> {
    try {
      const company = await Company.findByPk(id);
      if (!company) {
        throw new Error("Company not found");
      }
      return company;
    } catch (error: any) {
      throw new Error(`Error fetching company: ${error.message}`);
    }
  }

  async updateCompany(id: number, data: any): Promise<any> {
    try {
      const company = await CompanyRepository.getCompanyById(id);
      return await company.update(data);
    } catch (error: any) {
      throw new Error(`Error updating company: ${error.message}`);
    }
  }

  static async deleteCompany(id: number): Promise<void> {
    try {
      const company = await CompanyRepository.getCompanyById(id);
      if (!company) {
        throw new Error(`Company with ID ${id} not found`);
      }
      await company.destroy();
    } catch (error: any) {
      throw new Error(`Error deleting company: ${error.message}`);
    }
  }
}
