"use strict";
import { Model, Sequelize, DataTypes } from "sequelize";

interface WasteEmissionFactorAttributes {
  id?: number;
  waste_type_id: number;
  treatment: "Recycled" | "Combustion" | "Composting" | "Landfill";
  unit_id: number;
  ef: number;
}

export type WasteEmissionFactorCreationAttributes = Omit<
  WasteEmissionFactorAttributes,
  "id"
>;

export class WasteEmissionFactor
  extends Model<
    WasteEmissionFactorAttributes,
    WasteEmissionFactorCreationAttributes
  >
  implements WasteEmissionFactorAttributes
{
  declare waste_type_id: number;
  declare treatment: "Recycled" | "Combustion" | "Composting" | "Landfill";
  declare unit_id: number;
  declare ef: number;

  static associate(models: any) {
    WasteEmissionFactor.belongsTo(models.waste_types, {
      foreignKey: "waste_type_id",
      as: "waste",
    });
  }
}

export default (sequelize: Sequelize) => {
  WasteEmissionFactor.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      waste_type_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      treatment: {
        type: DataTypes.ENUM(
          "Recycled",
          "Combustion",
          "Composting",
          "Landfill"
        ),
        allowNull: false,
      },
      unit_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      ef: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "WasteEmissionFactor",
      tableName: "emission_factor_waste",
      timestamps: false,
      underscored: true,
      indexes: [
        {
          fields: ["waste_type_id"],
        },
        {
          fields: ["treatment"],
        },
        {
          unique: true,
          fields: ["waste_type_id", "treatment"], // to prevent duplicates
        },
      ],
    }
  );

  return WasteEmissionFactor;
};
