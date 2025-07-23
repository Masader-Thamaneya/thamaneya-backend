"use strict";
import { Model, Sequelize, DataTypes } from "sequelize";
import { Sector } from "./sector.model";
import { Country } from "./country.model";

interface CompanyAttributes {
  id?: number;
  name: string;
  sector_id?: number;
  primary_country_id?: number;
  country_id?: number;
  city: string;
  size: string;
  website?: string;
  email: string;
  phone: string;
  logo_url?: string;
  description?: string;
  manufacturing_process?: string;
  is_seeded?: boolean;
}

export type CompanyCreationAttributes = Omit<CompanyAttributes, "id">;

export class Company
  extends Model<CompanyAttributes, CompanyCreationAttributes>
  implements CompanyAttributes
{
  name!: string;
  sector_id?: number;
  primary_country_id?: number;
  country_id?: number;
  city!: string;
  size!: string;
  website?: string;
  email!: string;
  phone!: string;
  logo_url?: string;
  description?: string;
  manufacturing_process?: string;
  is_seeded?: boolean;

  sector?: Sector;

  static associate(models: any) {
    Company.hasMany(models.User, {
      foreignKey: "company_id",
      as: "users",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    Company.belongsTo(models.Sector, {
      foreignKey: "sector_id",
      as: "sector",
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    });

    Company.belongsTo(models.Country, {
      foreignKey: "country_id",
      as: "country",
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    });

    Company.belongsTo(models.Country, {
      foreignKey: "primary_country_id",
      as: "primaryCountry",
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    });
  }
}

export default (sequelize: Sequelize) => {
  Company.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      sector_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      primary_country_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      country_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      size: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      website: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      logo_url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      manufacturing_process: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      is_seeded: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Company",
      tableName: "companies",
      timestamps: true,
      underscored: true,
    }
  );

  return Company;
};
