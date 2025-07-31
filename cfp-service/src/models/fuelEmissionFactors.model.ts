"use strict";
import { Model, Sequelize, DataTypes } from "sequelize";

interface FuelEmissionFactorAttributes {
  id?: number;
  fuel_id: number;
  unit_id: number;
  year: number;
  ef: number;
  wtt_ef: number;
}

export type FuelEmissionFactorCreationAttributes = Omit<
  FuelEmissionFactorAttributes,
  "id"
>;

export class FuelEmissionFactor
  extends Model<FuelEmissionFactorAttributes>
  implements FuelEmissionFactorAttributes
{
  declare fuel_id: number;
  declare unit_id: number;
  declare year: number;
  declare ef: number;
  declare wtt_ef: number;

  static associate(models: any) {
    FuelEmissionFactor.belongsTo(models.Fuel, {
      foreignKey: "fuel_id",
      as: "fuel",
    });

    FuelEmissionFactor.belongsTo(models.Unit, {
      foreignKey: "unit_id",
      as: "unit",
    });
  }
}

export default (sequelize: Sequelize) => {
  FuelEmissionFactor.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      fuel_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      unit_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      year: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },
      ef: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      wtt_ef: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "FuelEmissionFactor",
      tableName: "emission_factor_fuels",
      timestamps: false,
      underscored: true,
      indexes: [
        {
          fields: ["fuel_id"],
        },
        {
          fields: ["unit_id"],
        },
        {
          fields: ["year"],
        },
        {
          unique: true,
          fields: ["fuel_id", "unit_id", "year"], // to prevent duplicates
        },
      ],
    }
  );

  return FuelEmissionFactor;
};
