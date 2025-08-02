"use strict";
import { Model, Sequelize, DataTypes } from "sequelize";

interface CountryAttributes {
  id?: number;
  name: string;
  code: string;
}

export class Country
  extends Model<CountryAttributes>
  implements CountryAttributes
{
  id!: number;
  name!: string;
  code!: string;

  static associate(models: any) {
    // A country may be referenced by companies
    Country.hasMany(models.Company, {
      foreignKey: "country_id",
      as: "companies",
    });

    Country.hasMany(models.Company, {
      foreignKey: "primary_country_id",
      as: "primaryCompanies",
    });
  }
}

export default (sequelize: Sequelize) => {
  Country.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "Country",
      tableName: "countries",
      timestamps: true,
      underscored: true,
    }
  );

  return Country;
};
