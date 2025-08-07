"use strict";
import { Model, Sequelize, DataTypes } from "sequelize";
import { Generator } from "./generators.model";
import { RefrigerantUsage } from "./refrigerantUsage.model";
import { WasteUsage } from "./wasteUsage.model";
import { PaperUsage } from "./paperUsage.model";

interface ReportAttributes {
  id?: string;
  company_id?: string;
  created_by: string;
  status?:
    | "draft"
    | "unverified"
    | "submitted"
    | "verified"
    | "revision_required"
    | "archived";
  number_of_facilities?: number;
  area?: number;
  area_unit?: string;
  number_of_employees?: number;
  revenue?: number;
  revenue_currency?: string;
  reporting_year?: number;
  base_year?: number;

  purchased_electricity?: number;
  purchased_chilled_water?: number;

  water_consumption?: number;

  scope_1_emissions?: number;
  scope_2_emissions?: number;
  scope_3_emissions?: number;
  cat_1_emissions?: number;
  cat_3_emissions?: number;
  cat_5_emissions?: number;
  cat_7_emissions?: number;

  total_emissions?: number;
  s1_s2_emissions?: number;
  s1_s2_per_employee?: number;
  s1_s2_per_area?: number;
  s1_s2_per_revenue?: number;
}

export type ReportCreationAttributes = Omit<ReportAttributes, "id">;

export class Report
  extends Model<ReportAttributes, ReportCreationAttributes>
  implements ReportAttributes
{
  declare company_id?: string;
  declare created_by: string;
  declare status:
    | "draft"
    | "unverified"
    | "submitted"
    | "verified"
    | "revision_required"
    | "archived";
  declare number_of_facilities?: number;
  declare area?: number;
  declare area_unit?: string;
  declare number_of_employees?: number;
  declare revenue?: number;
  declare revenue_currency?: string;
  declare reporting_year?: number;
  declare base_year?: number;

  declare purchased_electricity?: number;
  declare purchased_chilled_water?: number;

  declare water_consumption?: number;

  declare scope_1_emissions?: number;
  declare scope_2_emissions?: number;
  declare scope_3_emissions?: number;
  declare cat_1_emissions?: number;
  declare cat_3_emissions?: number;
  declare cat_5_emissions?: number;
  declare cat_7_emissions?: number;

  declare total_emissions?: number;
  declare s1_s2_emissions?: number;
  declare s1_s2_per_employee?: number;
  declare s1_s2_per_area?: number;
  declare s1_s2_per_revenue?: number;

  declare generators?: Generator[];
  declare refrigerants?: RefrigerantUsage[];
  declare wastes?: WasteUsage[];
  declare papers?: PaperUsage[];

  static associate(models: any) {
    Report.hasMany(models.Generator, {
      foreignKey: "report_id",
      as: "generators",
    });
    Report.hasMany(models.RefrigerantUsage, {
      foreignKey: "report_id",
      as: "refrigerants",
    });
    Report.hasMany(models.WasteUsage, {
      foreignKey: "report_id",
      as: "wastes",
    });
    Report.hasMany(models.PaperUsage, {
      foreignKey: "report_id",
      as: "papers",
    });
    // Report.hasMany(models.Fuel, {
    //   foreignKey: "fuel_id",
    //   as: "fuel",
    // });
    // FuelEmissionFactor.belongsTo(models.Unit, {
    //   foreignKey: "unit_id",
    //   as: "unit",
    // });
  }

  async verifyUser(userId: string): Promise<boolean> {
    return this.created_by == userId;
  }

  async submit(userId: string): Promise<void> {
    this.verifyUser(userId);
    const requiredFields = [
      "area",
      "area_unit",
      "number_of_employees",
      "revenue",
      "revenue_currency",
      "reporting_year",
      "base_year",
    ];

    for (const field of requiredFields) {
      const value = this[field as keyof Report];
      if (!value) {
        throw new Error(`${field} is required to submit the report.`);
      }
    }

    this.status = "submitted";
    await this.save();
  }
}

export default (sequelize: Sequelize) => {
  Report.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      company_id: {
        type: DataTypes.UUID,
        allowNull: true, // Change in production
      },
      created_by: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM(
          "draft",
          "unverified",
          "submitted",
          "verified",
          "revision_required",
          "archived"
        ),
        allowNull: false,
        defaultValue: "draft",
      },
      number_of_facilities: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      area: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      area_unit: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      number_of_employees: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      revenue: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      revenue_currency: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      reporting_year: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      base_year: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },

      purchased_electricity: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      purchased_chilled_water: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },

      water_consumption: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },

      scope_1_emissions: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      scope_2_emissions: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      scope_3_emissions: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      cat_1_emissions: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      cat_3_emissions: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      cat_5_emissions: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      cat_7_emissions: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },

      total_emissions: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      s1_s2_emissions: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      s1_s2_per_employee: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      s1_s2_per_area: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      s1_s2_per_revenue: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Report",
      tableName: "reports",
      timestamps: true,
      underscored: true,
      indexes: [
        {
          fields: ["company_id"],
        },
        {
          fields: ["created_by"],
        },
      ],
    }
  );

  return Report;
};
