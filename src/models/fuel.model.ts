"use strict";
import { Model, Sequelize, DataTypes } from "sequelize";

interface FuelAttributes {
  id?: number;
  name: string;
  name_ar: string;
}

export class Fuel extends Model<FuelAttributes> implements FuelAttributes {
  declare name: string;
  declare name_ar: string;

  static associate(models: any) {}
}

export default (sequelize: Sequelize) => {
  Fuel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(60),
        allowNull: false,
        unique: true,
      },
      name_ar: {
        type: DataTypes.STRING(60),
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "Fuel",
      tableName: "fuels",
      timestamps: false,
      underscored: true,
    }
  );

  return Fuel;
};
